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

        return output_path
