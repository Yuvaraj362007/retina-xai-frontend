import os
import cv2
import torch
import numpy as np

from PIL import Image
from torchvision import transforms
from pytorch_grad_cam import GradCAM
from pytorch_grad_cam.utils.model_targets import ClassifierOutputTarget
from pytorch_grad_cam.utils.image import show_cam_on_image


class GradCAMService:
    def __init__(self, model, device):
        self.model = model
        self.device = device

        self.transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(
                mean=[0.485, 0.456, 0.406],
                std=[0.229, 0.224, 0.225]
            )
        ])

        # Last convolutional block of ResNet50
        self.target_layers = [self.model.layer4[-1]]

    def generate(
        self,
        image: Image.Image,
        predicted_class: int,
        output_path: str
    ):
        image = image.convert("RGB")

        input_tensor = self.transform(image)
        input_tensor = input_tensor.unsqueeze(0).to(self.device)

        targets = [
            ClassifierOutputTarget(predicted_class)
        ]

        with GradCAM(
            model=self.model,
            target_layers=self.target_layers
        ) as cam:

            grayscale_cam = cam(
                input_tensor=input_tensor,
                targets=targets
            )

            grayscale_cam = grayscale_cam[0]

        original = np.array(image)

        original_resized = cv2.resize(
            original,
            (224, 224)
        )

        rgb_float = (
            original_resized.astype(np.float32) / 255.0
        )

        visualization = show_cam_on_image(
            rgb_float,
            grayscale_cam,
            use_rgb=True
        )

        os.makedirs(
            os.path.dirname(output_path),
            exist_ok=True
        )

        cv2.imwrite(
            output_path,
            cv2.cvtColor(
                visualization,
                cv2.COLOR_RGB2BGR
            )
        )

        return {
            "gradcam_path": output_path,
            "grayscale_cam": grayscale_cam,
            "original_resized": original_resized,
        }

    def generate_candidate_map(
        self,
        grayscale_cam,
        original_resized,
        output_path: str,
    ):
        """
        Generate an AI-highlighted candidate-region map from Grad-CAM.

        These regions represent areas with stronger model activation.
        They are not confirmed clinical lesions.
        """

        cam_uint8 = np.uint8(
            np.clip(grayscale_cam, 0, 1) * 255
        )

        threshold_value = int(
            np.percentile(cam_uint8, 85)
        )

        _, mask = cv2.threshold(
            cam_uint8,
            threshold_value,
            255,
            cv2.THRESH_BINARY
        )

        kernel = np.ones((5, 5), np.uint8)

        mask = cv2.morphologyEx(
            mask,
            cv2.MORPH_OPEN,
            kernel
        )

        mask = cv2.morphologyEx(
            mask,
            cv2.MORPH_CLOSE,
            kernel
        )

        contours, _ = cv2.findContours(
            mask,
            cv2.RETR_EXTERNAL,
            cv2.CHAIN_APPROX_SIMPLE
        )

        candidate_regions = []

        overlay = original_resized.copy()

        for contour in contours:
            area = cv2.contourArea(contour)

            if area < 20:
                continue

            x, y, w, h = cv2.boundingRect(contour)

            candidate_regions.append({
                "x": int(x),
                "y": int(y),
                "width": int(w),
                "height": int(h),
                "area": float(round(area, 2)),
            })

            cv2.drawContours(
                overlay,
                [contour],
                -1,
                (255, 0, 0),
                2,
            )

        blended = cv2.addWeighted(
            original_resized,
            0.75,
            overlay,
            0.25,
            0,
        )

        os.makedirs(
            os.path.dirname(output_path),
            exist_ok=True
        )

        cv2.imwrite(
            output_path,
            cv2.cvtColor(
                blended,
                cv2.COLOR_RGB2BGR
            )
        )

        return {
            "lesion_map_path": output_path,
            "candidate_regions": candidate_regions,
            "candidate_region_count": len(candidate_regions),
            "threshold_percentile": 85,
        }
