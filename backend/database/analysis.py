from database.db import get_connection


def save_analysis(
    analysis_id,
    filename,
    image_format,
    image_width,
    image_height,
    image_quality,
    model_result,
    preprocessing_result,
    explainability_result,
):
    connection = get_connection()

    try:
        cursor = connection.cursor()

        cursor.execute(
            """
            INSERT INTO analyses (
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
                status
            )
            VALUES (
                %s, %s, %s, %s, %s,
                %s, %s, %s, %s,
                %s, %s, %s,
                %s,
                %s, %s, %s,
                %s,
                %s
            )
            """,
            (
                str(analysis_id),
                filename,
                image_format,
                image_width,
                image_height,

                image_quality.get("status"),
                image_quality.get("metrics", {}).get("brightness"),
                image_quality.get("metrics", {}).get("contrast"),
                image_quality.get("metrics", {}).get("sharpness"),

                model_result.get("predicted_class")
                if model_result
                else None,

                model_result.get("predicted_label")
                if model_result
                else None,

                model_result.get("confidence")
                if model_result
                else None,

                preprocessing_result.get("status")
                if preprocessing_result
                else None,

                explainability_result.get("status")
                if explainability_result
                else None,

                explainability_result.get("target_class")
                if explainability_result
                else None,

                explainability_result.get("target_label")
                if explainability_result
                else None,

                True,

                "prototype",
            ),
        )

        connection.commit()

        return True

    except Exception:
        connection.rollback()
        raise

    finally:
        cursor.close()
        connection.close()
