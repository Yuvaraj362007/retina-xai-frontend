import numpy as np
import cv2
import os

def create_test_images():
    # 1. Create a "PASS" image
    # Size: 800x600 (meets MIN_WIDTH=640, MIN_HEIGHT=480)
    pass_img = np.full((600, 800, 3), 128, dtype=np.uint8)
    # Add some noise/detail for contrast and sharpness
    cv2.circle(pass_img, (400, 300), 200, (200, 100, 100), -1)
    cv2.circle(pass_img, (400, 300), 150, (100, 200, 100), -1)
    cv2.imwrite("pass_image.jpg", pass_img)

    # 2. Create a "FAIL" image (Low resolution)
    # Size: 100x100 (fails MIN_WIDTH/HEIGHT)
    fail_img = np.full((100, 100, 3), 128, dtype=np.uint8)
    cv2.imwrite("fail_image.jpg", fail_img)

    print("Test images created: pass_image.jpg, fail_image.jpg")

if __name__ == "__main__":
    create_test_images()
