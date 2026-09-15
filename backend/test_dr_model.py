from models.dr_model import DRModel


IMAGE_PATH = "/Users/yuvarajd/Desktop/kaggle.correct.1.png"


model = DRModel()

result = model.predict(IMAGE_PATH)

print()
print("=== DR MODEL RESULT ===")
print("Predicted class:", result["predicted_class"])
print("Predicted label:", result["predicted_label"])
print(f"Confidence: {result['confidence'] * 100:.2f}%")

print()
print("Class probabilities:")

class_names = [
    "No DR",
    "Mild DR",
    "Moderate DR",
    "Severe DR",
    "Proliferative DR",
]

for name, probability in zip(
    class_names,
    result["probabilities"]
):
    print(f"{name}: {probability * 100:.2f}%")
