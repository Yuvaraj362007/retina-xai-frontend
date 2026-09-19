import os
import uuid

from PIL import Image


UPLOAD_DIR = "uploads"
PROCESSED_DIR = "processed"


os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(PROCESSED_DIR, exist_ok=True)


def save_original_image(
    image: Image.Image,
    extension: str = "png",
):
    file_id = uuid.uuid4().hex

    filename = f"{file_id}.{extension}"

    path = os.path.join(
        UPLOAD_DIR,
        filename
    )

    image.save(path)

    return path


def generate_processed_path(
    suffix: str,
    extension: str = "png",
):
    file_id = uuid.uuid4().hex

    filename = f"{file_id}_{suffix}.{extension}"

    return os.path.join(
        PROCESSED_DIR,
        filename
    )
