from typing import Any, Dict


class EvidenceService:
    """
    Evidence aggregation layer for RETINA-XAI.

    This service does not make a medical diagnosis.
    It organizes model output, image quality,
    and explainability information for human review.
    """

    def build_evidence(
        self,
        model_result: Dict[str, Any],
        image_quality: Dict[str, Any],
        explainability_result: Dict[str, Any] | None,
    ) -> Dict[str, Any]:

        evidence = {
            "prediction": None,
            "image_quality": None,
            "explainability": None,
            "human_review": {
                "required": True,
                "message": (
                    "AI output requires review by a qualified clinician."
                ),
            },
        }

        # ---------------------------------------------
        # Model prediction evidence
        # ---------------------------------------------

        if model_result is not None:

            evidence["prediction"] = {
                "predicted_class": (
                    model_result.get("predicted_class")
                ),
                "predicted_label": (
                    model_result.get("predicted_label")
                ),
                "model_probability": (
                    model_result.get("confidence")
                ),
            }

        # ---------------------------------------------
        # Image quality evidence
        # ---------------------------------------------

        if image_quality is not None:

            evidence["image_quality"] = {
                "status": (
                    image_quality.get("status")
                ),
                "checks": (
                    image_quality.get("checks")
                ),
                "metrics": (
                    image_quality.get("metrics")
                ),
            }

        # ---------------------------------------------
        # Explainability evidence
        # ---------------------------------------------

        if explainability_result is not None:

            evidence["explainability"] = {
                "method": (
                    explainability_result.get("method")
                ),
                "status": (
                    explainability_result.get("status")
                ),
                "target_layer": (
                    explainability_result.get("target_layer")
                ),
                "target_class": (
                    explainability_result.get("target_class")
                ),
                "target_label": (
                    explainability_result.get("target_label")
                ),
            }

        return evidence
