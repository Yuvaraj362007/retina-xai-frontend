import cv2
import numpy as np

def apply_clahe_preprocessing(image_bgr: np.ndarray) -> np.ndarray:
    """
    Applies CLAHE (Contrast Limited Adaptive Histogram Equalization) to the
    luminance channel of a BGR image.

    Args:
        image_bgr: Input image in BGR format (numpy array).

    Returns:
        Enhanced image in BGR format.
    """
    # Convert BGR to LAB color space
    lab = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2LAB)

    # Split channels
    l, a, b = cv2.split(lab)

    # Create CLAHE object
    # Prototype parameters: clipLimit=2.0, tileGridSize=(8, 8)
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))

    # Apply CLAHE to the L (luminance) channel
    cl = clahe.apply(l)

    # Merge channels back
    merged_lab = cv2.merge((cl, a, b))

    # Convert back to BGR
    enhanced_bgr = cv2.cvtColor(merged_lab, cv2.COLOR_LAB2BGR)

    return enhanced_bgr
