import torch
import numpy as np
import cv2

from PIL import Image
from torchvision import transforms
from pytorch_grad_cam import GradCAM
from pytorch_grad_cam.utils.model_targets import ClassifierOutputTarget
from pytorch_grad_cam.utils.image import show_cam_on_image


MODEL_PATH = "models/diabetic_retinopathy_full_model.pth"
IMAGE_PATH = "/Users/yuvarajd/Desktop/kaggle.correct.1.png"

CLASS_NAMES = [
    "No DR",
    "Mild DR",
    "Moderate DR",
    "Severe DR",
    "Proliferative DR",
]


# -----------------------------
# Device
# -----------------------------
if torch.backends.mps.is_available():
    device = torch.device("mps")
elif torch.cuda.is_available():
    device = torch.device("cuda")
else:
    device = torch.device("cpu")

print(f"Device: {device}")


# -----------------------------
# Load model
# -----------------------------
print("Loading model...")

model = torch.load(
    MODEL_PATH,
    map_location="cpu",
    weights_only=False
)

model = model.to(device)
model.eval()

print("Model loaded.")


# -----------------------------
# Preprocessing
# -----------------------------
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])


# -----------------------------
# Load image
# -----------------------------
image = Image.open(IMAGE_PATH).convert("RGB")

input_tensor = transform(image).unsqueeze(0).to(device)

print(f"Input shape: {tuple(input_tensor.shape)}")


# -----------------------------
# Find predicted class
# -----------------------------
with torch.no_grad():
    logits = model(input_tensor)
    probabilities = torch.softmax(logits, dim=1)

predicted_class = probabilities.argmax(dim=1).item()
confidence = probabilities[0, predicted_class].item()

print()
print("Prediction:")
print(f"Class: {predicted_class}")
print(f"Label: {CLASS_NAMES[predicted_class]}")
print(f"Confidence: {confidence:.4%}")


# -----------------------------
# Grad-CAM
# -----------------------------
print()
print("Starting Grad-CAM...")

target_layers = [model.layer4[-1]]

targets = [
    ClassifierOutputTarget(predicted_class)
]

with GradCAM(
    model=model,
    target_layers=target_layers
) as cam:

    grayscale_cam = cam(
        input_tensor=input_tensor,
        targets=targets
    )

    grayscale_cam = grayscale_cam[0]


# -----------------------------
# Create overlay
# -----------------------------
original = np.array(image)

original_resized = cv2.resize(
    original,
    (224, 224)
)

rgb_float = original_resized.astype(np.float32) / 255.0

visualization = show_cam_on_image(
    rgb_float,
    grayscale_cam,
    use_rgb=True
)


# -----------------------------
# Save result
# -----------------------------
output_path = "processed/gradcam_test.png"

cv2.imwrite(
    output_path,
    cv2.cvtColor(visualization, cv2.COLOR_RGB2BGR)
)

print()
print("Grad-CAM completed successfully.")
print(f"Target layer: layer4[-1]")
print(f"Output: {output_path}")
