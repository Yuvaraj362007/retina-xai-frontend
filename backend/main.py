import os
import uuid
from io import BytesIO

import cv2
import numpy as np
from fastapi import FastAPI, File, UploadFile
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image

from utils.clahe import apply_clahe_preprocessing
from models.dr_model import DRModel
from services.gradcam import GradCAMService
from services.evidence import EvidenceService
from database.analysis import save_analysis
from database.db import get_connection
from storage.file_storage import (
    save_original_image,
    generate_processed_path,
)
# -----------------------------------------------------
# App configuration
# -----------------------------------------------------

app = FastAPI(
    title="RETINA-XAI Backend",
    description="AI-assisted diabetic retinopathy screening prototype",
    version="0.3.0",
)


# -----------------------------------------------------
# CORS
# -----------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -----------------------------------------------------
# Directories
# -----------------------------------------------------

UPLOAD_DIR = "backend/uploads"
PROCESSED_DIR = "processed"

os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(PROCESSED_DIR, exist_ok=True)

app.mount("/processed", StaticFiles(directory=PROCESSED_DIR), name="processed")
# -----------------------------------------------------
# AI Services
# -----------------------------------------------------

dr_model = DRModel()

gradcam_service = GradCAMService(
    dr_model.model,
    dr_model.device
)

evidence_service = EvidenceService()


# -----------------------------------------------------
# Health check
# -----------------------------------------------------

@app.get("/health")
def health_check():
    return {
        "success": True,
        "status": "healthy",
        "service": "RETINA-XAI Backend",

        "model": {
            "status": "loaded",
            "device": str(dr_model.device),
            "classes": 5,
        },

        "explainability": {
            "method": "Grad-CAM",
            "status": "available",
            "target_layer": "layer4[-1]",
        },
    }


# -----------------------------------------------------
# Image quality functions
# -----------------------------------------------------

def calculate_image_quality(image: Image.Image):
    """
    Technical image-quality checks.
    These checks are not clinical diagnostic measurements.
    """

    rgb_image = np.array(image.convert("RGB"))

    gray = cv2.cvtColor(
        rgb_image,
        cv2.COLOR_RGB2GRAY
    )

    height, width = gray.shape

    # Brightness
    brightness = float(np.mean(gray))

    # Contrast
    contrast = float(np.std(gray))

    # Sharpness
    sharpness = float(
        cv2.Laplacian(
            gray,
            cv2.CV_64F
        ).var()
    )

    # Technical thresholds for prototype screening
    resolution_pass = (
        width >= 512 and
        height >= 512
    )

    brightness_pass = (
        20 <= brightness <= 220
    )

    contrast_pass = (
        contrast >= 15
    )

    sharpness_pass = (
        sharpness >= 10
    )

    quality_pass = all([
        resolution_pass,
        brightness_pass,
        contrast_pass,
        sharpness_pass,
    ])

    return {
        "status": (
            "PASS"
            if quality_pass
            else "FAIL"
        ),

        "checks": {
            "resolution": (
                "PASS"
                if resolution_pass
                else "FAIL"
            ),

            "brightness": (
                "PASS"
                if brightness_pass
                else "FAIL"
            ),

            "contrast": (
                "PASS"
                if contrast_pass
                else "FAIL"
            ),

            "sharpness": (
                "PASS"
                if sharpness_pass
                else "FAIL"
            ),
        },

        "metrics": {
            "brightness": round(
                brightness,
                2
            ),

            "contrast": round(
                contrast,
                2
            ),

            "sharpness": round(
                sharpness,
                2
            ),
        },

        "_internal": {
            "quality_pass": quality_pass,
            "resolution_pass": resolution_pass,
            "brightness_pass": brightness_pass,
            "contrast_pass": contrast_pass,
            "sharpness_pass": sharpness_pass,
        },
    }


# -----------------------------------------------------
# Analyze image
# -----------------------------------------------------

@app.post("/api/analyze")
async def analyze_image(
    file: UploadFile = File(...)
):

    # -------------------------------------------------
    # 1. Validate file type
    # -------------------------------------------------

    if not file.content_type or not file.content_type.startswith(
        "image/"
    ):
        return {
            "success": False,
            "status": "error",
            "message": "Please upload a valid image file.",
        }


    # -------------------------------------------------
    # 2. Read uploaded file
    # -------------------------------------------------

    file_bytes = await file.read()

    if not file_bytes:
        return {
            "success": False,
            "status": "error",
            "message": "Uploaded file is empty.",
        }


    # -------------------------------------------------
    # 3. Open image
    # -------------------------------------------------

    try:
        image = Image.open(
            BytesIO(file_bytes)
        )

        image.load()

    except Exception as e:

        return {
            "success": False,
            "status": "error",
            "message": "Unable to read the uploaded image.",
            "error": str(e),
        }


    image = image.convert("RGB")


    # -------------------------------------------------
    # 4. Basic image information
    # -------------------------------------------------

    width, height = image.size


    # -------------------------------------------------
    # 5. Save uploaded image
    # -------------------------------------------------

    upload_id = uuid.uuid4().hex
    analysis_id = uuid.uuid4()

    original_extension = (
        "png"
        if file.filename.lower().endswith(".png")
        else "jpg"
    )

    original_path = save_original_image(
        image=image,
        extension=original_extension,
    )
    # -------------------------------------------------
    # 6. Image Quality Guard
    # -------------------------------------------------

    quality_result = calculate_image_quality(
        image
    )

    quality_pass = quality_result["_internal"]["quality_pass"]

    resolution_pass = quality_result["_internal"]["resolution_pass"]
    brightness_pass = quality_result["_internal"]["brightness_pass"]
    contrast_pass = quality_result["_internal"]["contrast_pass"]
    sharpness_pass = quality_result["_internal"]["sharpness_pass"]

    brightness = quality_result["metrics"]["brightness"]
    contrast = quality_result["metrics"]["contrast"]
    sharpness = quality_result["metrics"]["sharpness"]


    # -------------------------------------------------
    # 7. CLAHE preprocessing
    # -------------------------------------------------

    preprocessing_result = None

    try:

        image_np = np.array(image)

        enhanced_img = apply_clahe_preprocessing(
            image_np
        )

        clahe_path = generate_processed_path(
            "clahe"
        )

        if isinstance(enhanced_img, Image.Image):

            enhanced_img.save(
                clahe_path
            )

        else:

            cv2.imwrite(
                clahe_path,
                enhanced_img
            )

        preprocessing_result = {
            "method": "CLAHE",
            "status": "completed",
            "output_file": clahe_path,
        }

    except Exception as e:

        preprocessing_result = {
            "method": "CLAHE",
            "status": "failed",
            "error": str(e),
        }

    # -------------------------------------------------
    # 8. Real DR model inference
    # -------------------------------------------------

    model_result = None

    try:

        model_result = dr_model.predict(
            image
        )

    except Exception as e:

        model_result = {
            "status": "failed",
            "error": str(e),
        }


    # -------------------------------------------------
    # 9. Grad-CAM explainability
    # -------------------------------------------------

    explainability_result = None

    if (
        model_result is not None
        and "predicted_class" in model_result
    ):

        try:

            gradcam_path = generate_processed_path(
                "gradcam"
            )

            gradcam_result = gradcam_service.generate(
                image=image,
                predicted_class=model_result[
                    "predicted_class"
                ],
                output_path=gradcam_path,
            )

            lesion_map_path = generate_processed_path(
                "lesion_map"
            )

            candidate_map_result = (
                gradcam_service.generate_candidate_map(
                    grayscale_cam=gradcam_result[
                        "grayscale_cam"
                    ],
                    original_resized=gradcam_result[
                        "original_resized"
                    ],
                    output_path=lesion_map_path,
                )
            )

            explainability_result = {
                "method": "Grad-CAM",
                "status": "completed",
                "target_layer": "layer4[-1]",
                "target_class": model_result[
                    "predicted_class"
                ],
                "target_label": model_result[
                    "predicted_label"
                ],
                "output_file": gradcam_path,
                "lesion_map_file": candidate_map_result[
                    "lesion_map_path"
                ],
                "candidate_region_count": candidate_map_result[
                    "candidate_region_count"
                ],
                "candidate_regions": candidate_map_result[
                    "candidate_regions"
                ],
                "lesion_map_status": "completed",
                "lesion_map_note": (
                    "AI-highlighted candidate regions "
                    "derived from Grad-CAM activation; "
                    "not confirmed clinical lesions."
                ),
            }

        except Exception as e:

            explainability_result = {
                "method": "Grad-CAM",
                "status": "failed",
                "error": str(e),
            }

    # -------------------------------------------------
    # 10. Evidence Layer
    # -------------------------------------------------

    image_quality_result = {
        "status": (
            "PASS"
            if quality_pass
            else "FAIL"
        ),

        "checks": {
            "resolution": (
                "PASS"
                if resolution_pass
                else "FAIL"
            ),

            "brightness": (
                "PASS"
                if brightness_pass
                else "FAIL"
            ),

            "contrast": (
                "PASS"
                if contrast_pass
                else "FAIL"
            ),

            "sharpness": (
                "PASS"
                if sharpness_pass
                else "FAIL"
            ),
        },

        "metrics": {
            "brightness": round(
                brightness,
                2
            ),

            "contrast": round(
                contrast,
                2
            ),

            "sharpness": round(
                sharpness,
                2
            ),
        },
    }


    evidence_result = evidence_service.build_evidence(
        model_result=model_result,
        image_quality=image_quality_result,
        explainability_result=explainability_result,
    )
    # -----------------------------------------------------
    # Save analysis to PostgreSQL
    # -----------------------------------------------------

    save_analysis(
        analysis_id=analysis_id,
        filename=file.filename,
        image_format=file.content_type,
        image_width=width,
        image_height=height,
        image_quality=image_quality_result,
        model_result=model_result,
        preprocessing_result=preprocessing_result,
        explainability_result=explainability_result,
    )
    # -----------------------------------------------------
    # 11. Final response
    # -----------------------------------------------------

    return {

        "success": True,

        "status": "prototype",

        "filename": file.filename,

        "image": {
            "format": image.format,
            "width": width,
            "height": height,
        },

        "image_quality": image_quality_result,

        "preprocessing": (
            preprocessing_result
        ),

        "model": model_result,

        "explainability": (
            explainability_result
        ),

        "evidence": evidence_result,
    }
# -----------------------------------------------------
# 12. Human Review - List analyses
# -----------------------------------------------------

@app.get("/api/reviews")
def get_reviews():

    connection = get_connection()

    try:

        cursor = connection.cursor()

        cursor.execute(
            """
            SELECT
                id,
                filename,
                predicted_label,
                model_probability,
                quality_status,
                gradcam_status,
                review_status,
                reviewer_name,
                reviewer_comment,
                reviewed_at,
                created_at
            FROM analyses
            ORDER BY created_at DESC
            """
        )

        rows = cursor.fetchall()

        reviews = []

        for row in rows:

            reviews.append({
                "id": str(row[0]),
                "filename": row[1],
                "predicted_label": row[2],
                "model_probability": row[3],
                "quality_status": row[4],
                "gradcam_status": row[5],
                "review_status": row[6],
                "reviewer_name": row[7],
                "reviewer_comment": row[8],
                "reviewed_at": (
                    row[9].isoformat()
                    if row[9]
                    else None
                ),
                "created_at": (
                    row[10].isoformat()
                    if row[10]
                    else None
                ),
            })

        return {
            "success": True,
            "count": len(reviews),
            "reviews": reviews,
        }

    finally:

        cursor.close()
        connection.close()


# -----------------------------------------------------
# 13. Human Review - Submit review
# -----------------------------------------------------

@app.post("/api/reviews/{analysis_id}")
def submit_review(
    analysis_id: str,
    review_status: str,
    reviewer_name: str,
    reviewer_comment: str = "",
):

    allowed_statuses = {
        "pending",
        "reviewed",
        "requires_retake",
        "referred",
    }

    if review_status not in allowed_statuses:

        return {
            "success": False,
            "message": (
                "Invalid review status."
            ),
            "allowed_statuses": list(
                allowed_statuses
            ),
        }

    connection = get_connection()

    try:

        cursor = connection.cursor()

        cursor.execute(
            """
            UPDATE analyses
            SET
                review_status = %s,
                reviewer_name = %s,
                reviewer_comment = %s,
                reviewed_at = CURRENT_TIMESTAMP
            WHERE id = %s
            RETURNING id
            """,
            (
                review_status,
                reviewer_name,
                reviewer_comment,
                analysis_id,
            ),
        )

        result = cursor.fetchone()

        if result is None:

            connection.rollback()

            return {
                "success": False,
                "message": "Analysis not found.",
            }

        connection.commit()

        return {
            "success": True,
            "message": "Human review recorded successfully.",
            "analysis_id": str(result[0]),
            "review_status": review_status,
            "reviewer_name": reviewer_name,
        }

    except Exception:

        connection.rollback()
        raise

    finally:

        cursor.close()
        connection.close()
# -----------------------------------------------------
# 14. Screening Report
# -----------------------------------------------------

@app.get("/api/reports/{analysis_id}")
def get_screening_report(
    analysis_id: str
):

    connection = get_connection()

    try:

        cursor = connection.cursor()

        cursor.execute(
            """
            SELECT
                id,
                filename,
                image_format,
                image_width,
                image_height,

                quality_status,
                brightness,
                contrast,
                sharpness,

                predicted_class,
                predicted_label,
                model_probability,

                clahe_status,

                gradcam_status,
                gradcam_target_class,
                gradcam_target_label,

                human_review_required,

                status,

                review_status,
                reviewer_name,
                reviewer_comment,
                reviewed_at,

                created_at

            FROM analyses

            WHERE id = %s
            """,
            (analysis_id,),
        )

        row = cursor.fetchone()

        if row is None:

            return {
                "success": False,
                "message": "Analysis not found.",
            }

        report = {

            "analysis_id": str(row[0]),

            "status": row[17],

            "image": {
                "filename": row[1],
                "format": row[2],
                "width": row[3],
                "height": row[4],
            },

            "image_quality": {
                "status": row[5],
                "metrics": {
                    "brightness": row[6],
                    "contrast": row[7],
                    "sharpness": row[8],
                },
            },

            "model": {
                "predicted_class": row[9],
                "predicted_label": row[10],
                "model_probability": row[11],
            },

            "preprocessing": {
                "method": "CLAHE",
                "status": row[12],
            },

            "explainability": {
                "method": "Grad-CAM",
                "status": row[13],
                "target_class": row[14],
                "target_label": row[15],
            },

            "human_review": {
                "required": row[16],
                "status": row[18],
                "reviewer_name": row[19],
                "reviewer_comment": row[20],
                "reviewed_at": (
                    row[21].isoformat()
                    if row[21]
                    else None
                ),
            },

            "created_at": (
                row[22].isoformat()
                if row[22]
                else None
            ),

            "clinical_disclaimer": (
                "This prototype provides AI-assisted "
                "screening support only. It is not a "
                "substitute for professional medical "
                "diagnosis or treatment. AI output "
                "requires review by a qualified clinician."
            ),
        }

        return {
            "success": True,
            "report": report,
        }

    finally:

        cursor.close()
        connection.close()
