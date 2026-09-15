from PIL import Image
import io
from fastapi import HTTPException, status

# 10MB limit is reasonable for high-res retinal fundus images while preventing DOS attacks
MAX_FILE_SIZE = 10 * 1024 * 1024
ALLOWED_MIME_TYPES = ["image/jpeg", "image/png"]
ALLOWED_FORMATS = ["JPEG", "PNG"]

def validate_image(file_content: bytes, filename: str, content_type: str):
    """
    Validates the uploaded image file and extracts basic metadata.

    Args:
        file_content (bytes): The raw bytes of the uploaded file.
        filename (str): The name of the file.
        content_type (str): The MIME type provided by the upload.

    Returns:
        dict: A dictionary containing image metadata if valid.

    Raises:
        HTTPException: If the image is invalid, too large, or unsupported.
    """
    # 1. Validate File Size
    if len(file_content) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"File too large. Maximum allowed size is {MAX_FILE_SIZE // (1024 * 1024)}MB"
        )

    # 2. Validate MIME Type
    if content_type not in ALLOWED_MIME_TYPES:
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail=f"Unsupported file type. Allowed types are: {', '.join(ALLOWED_MIME_TYPES)}"
        )

    try:
        # 3. Validate content is actually a readable image using Pillow
        image = Image.open(io.BytesIO(file_content))

        # Verify format is in our allowed list (Pillow's .format is 'JPEG', 'PNG', etc.)
        if image.format not in ALLOWED_FORMATS:
            raise HTTPException(
                status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
                detail=f"Unsupported image format: {image.format}. Allowed: {', '.join(ALLOWED_FORMATS)}"
            )

        # Read metadata
        width, height = image.size
        img_format = image.format

        return {
            "filename": filename,
            "content_type": content_type,
            "format": img_format,
            "width": width,
            "height": height
        }

    except Exception as e:
        # If Pillow cannot open the image, it's either corrupted or not an image
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or corrupted image file"
        )
