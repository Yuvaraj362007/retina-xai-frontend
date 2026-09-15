import torch
from torchvision import transforms
from PIL import Image

MODEL_PATH = "models/diabetic_retinopathy_full_model.pth"
CLASS_NAMES = [
    "No DR",
    "Mild DR",
    "Moderate DR",
    "Severe DR",
    "Proliferative DR",
]


class DRModel:
    def __init__(self):
        if torch.backends.mps.is_available():
            self.device = torch.device("mps")
        elif torch.cuda.is_available():
            self.device = torch.device("cuda")
        else:
            self.device = torch.device("cpu")

        print(f"Loading DR model on: {self.device}")

        self.model = torch.load(
            MODEL_PATH,
            map_location="cpu",
            weights_only=False
        )

        self.model = self.model.to(self.device)
        self.model.eval()

        self.transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(
                mean=[0.485, 0.456, 0.406],
                std=[0.229, 0.224, 0.225]
            )
        ])

        print("DR model loaded successfully.")
        print(f"Output classes: {len(CLASS_NAMES)}")

    def predict(self, image: Image.Image):
        # Accept the PIL Image directly from FastAPI
        image = image.convert("RGB")

        input_tensor = self.transform(image)
        input_tensor = input_tensor.unsqueeze(0).to(self.device)

        with torch.no_grad():
            logits = self.model(input_tensor)
            probabilities = torch.softmax(logits, dim=1)

        predicted_class = probabilities.argmax(dim=1).item()
        confidence = probabilities[0, predicted_class].item()

        probability_list = [
            float(probability)
            for probability in probabilities[0]
        ]

        return {
            "predicted_class": predicted_class,
            "predicted_label": CLASS_NAMES[predicted_class],
            "confidence": confidence,
            "probabilities": probability_list,
        }
