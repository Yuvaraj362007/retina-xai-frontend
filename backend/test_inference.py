import torch
from torchvision import transforms
from PIL import Image

MODEL_PATH = "models/diabetic_retinopathy_full_model.pth"
IMAGE_PATH = "/Users/yuvarajd/Desktop/kaggle.correct.1.png"

CLASS_NAMES = [
    "No DR",
    "Mild DR",
    "Moderate DR",
    "Severe DR",
    "Proliferative DR",
]

# Select device
if torch.backends.mps.is_available():
    device = torch.device("mps")
elif torch.cuda.is_available():
    device = torch.device("cuda")
else:
    device = torch.device("cpu")

print("Device:", device)

# Load model
model = torch.load(
    MODEL_PATH,
    map_location="cpu",
    weights_only=False
)

model = model.to(device)
model.eval()

# Model-card preprocessing
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

# Load image
image = Image.open(IMAGE_PATH).convert("RGB")

print("Input image:", IMAGE_PATH)
print("Original size:", image.size)

# Prepare input
input_tensor = transform(image).unsqueeze(0).to(device)

print("Model input shape:", tuple(input_tensor.shape))

# Real inference
with torch.no_grad():
    logits = model(input_tensor)
    probabilities = torch.softmax(logits, dim=1)

predicted_class = probabilities.argmax(dim=1).item()
confidence = probabilities[0, predicted_class].item()

print()
print("--- REAL MODEL OUTPUT ---")

for i, probability in enumerate(probabilities[0]):
    print(
        f"{i} - {CLASS_NAMES[i]}: "
        f"{probability.item() * 100:.2f}%"
    )

print()
print("Predicted class:", predicted_class)
print("Predicted label:", CLASS_NAMES[predicted_class])
print(f"Confidence: {confidence * 100:.2f}%")
print(f"Probability sum: {probabilities.sum().item():.6f}")
