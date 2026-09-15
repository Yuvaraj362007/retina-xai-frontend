export const demoScreeningResults = {
  "SAMPLE_A": {
    id: "sample_a",
    title: "Sample A: Moderate NPDR",
    badge: "Referable",
    badgeColor: "bg-amber-100 text-amber-900",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7-TwQlLMUhLubHmPhNgSCLqhVbtr_rNp7POsFho6znRXnumQKpqOS-NtVAm2eQ-MAK7210E67pEeXuDSY19nCLhCB4sJmmWE4VC_62koTyGmjADEr9R7dNngw-m1ZKlyoFRan0UsETOb0lNTwrXhrLSgmnVlqFQJmA2NNczjo_a-fBy31CLV0E7CEv2YpeVILrWjtFUH7WQDE2unvY-gw2jootNuKNY0MHWNZxNgejS7RVVPiWUhU6w",
    screeningId: "RXAI-DEMO-A",
    imageQuality: {
      status: "pass",
      score: 98.2,
      metrics: {
        sharpness: "High",
        illumination: "Optimal",
        coverage: "Full Macula"
      }
    },
    prediction: {
      classification: "Referable DR",
      severity: "Moderate NPDR",
      confidence: 0.947,
      icdrGrade: "Grade 2"
    },
    evidence: {
      microaneurysms: { detected: true, count: 6, description: "Multiple small red dots in macular area" },
      hemorrhages: { detected: true, type: "Blot/Flame", description: "Perimacular hemorrhages observed" },
      exudates: { detected: true, type: "Hard Lipid", description: "Focal clusters adjacent to foveal avascular zone" }
    },
    explainability: {
      gradcamUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7-TwQlLMUhLubHmPhNgSCLqhVbtr_rNp7POsFho6znRXnumQKpqOS-NtVAm2eQ-MAK7210E67pEeXuDSY19nCLhCB4sJmmWE4VC_62koTyGmjADEr9R7dNngw-m1ZKlyoFRan0UsETOb0lNTwrXhrLSgmnVlqFQJmA2NNczjo_a-fBy31CLV0E7CEv2YpeVILrWjtFUH7WQDE2unvY-gw2jootNuKNY0MHWNZxNgejS7RVVPiWUhU6w",
      lesionUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7-TwQlLMUhLubHmPhNgSCLqhVbtr_rNp7POsFho6znRXnumQKpqOS-NtVAm2eQ-MAK7210E67pEeXuDSY19nCLhCB4sJmmWE4VC_62koTyGmjADEr9R7dNngw-m1ZKlyoFRan0UsETOb0lNTwrXhrLSgmnVlqFQJmA2NNczjo_a-fBy31CLV0E7CEv2YpeVILrWjtFUH7WQDE2unvY-gw2jootNuKNY0MHWNZxNgejS7RVVPiWUhU6w",
      reasoning: "Saliency gradients concentrated predominantly on temporal macula ring clusters corresponding to lipid exudation and focal microvascular dilatations."
    },
    humanReviewRequired: true,
    isDemo: true
  },
  "SAMPLE_B": {
    id: "sample_b",
    title: "Sample B: Mild Non-Referable",
    badge: "Non-Referable",
    badgeColor: "bg-emerald-100 text-emerald-900",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7-TwQlLMUhLubHmPhNgSCLqhVbtr_rNp7POsFho6znRXnumQKpqOS-NtVAm2eQ-MAK7210E67pEeXuDSY19nCLhCB4sJmmWE4VC_62koTyGmjADEr9R7dNngw-m1ZKlyoFRan0UsETOb0lNTwrXhrLSgmnVlqFQJmA2NNczjo_a-fBy31CLV0E7CEv2YpeVILrWjtFUH7WQDE2unvY-gw2jootNuKNY0MHWNZxNgejS7RVVPiWUhU6w",
    screeningId: "RXAI-DEMO-B",
    date: "2026-09-13",
    imageQuality: {
      status: "pass",
      score: 96.5,
      metrics: {
        sharpness: "Medium",
        illumination: "Good",
        coverage: "Full Macula"
      }
    },
    prediction: {
      classification: "Non-Referable",
      severity: "Mild NPDR",
      confidence: 0.882,
      icdrGrade: "Grade 1"
    },
    evidence: {
      microaneurysms: { detected: true, count: 1, description: "Isolated microaneurysm in periphery" },
      hemorrhages: { detected: false, description: "No hemorrhages observed" },
      exudates: { detected: false, description: "Hard exudates absent" }
    },
    explainability: {
      gradcamUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7-TwQlLMUhLubHmPhNgSCLqhVbtr_rNp7POsFho6znRXnumQKpqOS-NtVAm2eQ-MAK7210E67pEeXuDSY19nCLhCB4sJmmWE4VC_62koTyGmjADEr9R7dNngw-m1ZKlyoFRan0UsETOb0lNTwrXhrLSgmnVlqFQJmA2NNczjo_a-fBy31CLV0E7CEv2YpeVILrWjtFUH7WQDE2unvY-gw2jootNuKNY0MHWNZxNgejS7RVVPiWUhU6w",
      lesionUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7-TwQlLMUhLubHmPhNgSCLqhVbtr_rNp7POsFho6znRXnumQKpqOS-NtVAm2eQ-MAK7210E67pEeXuDSY19nCLhCB4sJmmWE4VC_62koTyGmjADEr9R7dNngw-m1ZKlyoFRan0UsETOb0lNTwrXhrLSgmnVlqFQJmA2NNczjo_a-fBy31CLV0E7CEv2YpeVILrWjtFUH7WQDE2unvY-gw2jootNuKNY0MHWNZxNgejS7RVVPiWUhU6w",
      reasoning: "Sparsely isolated activation on a single peripheral microaneurysm. Macular zone clear. Routine 12-month re-examination recommended."
    },
    humanReviewRequired: false,
    isDemo: true
  },
  "SAMPLE_C": {
    id: "sample_c",
    title: "Sample C: Quality Fail",
    badge: "Quality Fail",
    badgeColor: "bg-red-100 text-red-900",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7-TwQlLMUhLubHmPhNgSCLqhVbtr_rNp7POsFho6znRXnumQKpqOS-NtVAm2eQ-MAK7210E67pEeXuDSY19nCLhCB4sJmmWE4VC_62koTyGmjADEr9R7dNngw-m1ZKlyoFRan0UsETOb0lNTwrXhrLSgmnVlqFQJmA2NNczjo_a-fBy31CLV0E7CEv2YpeVILrWjtFUH7WQDE2unvY-gw2jootNuKNY0MHWNZxNgejS7RVVPiWUhU6w",
    screeningId: "RXAI-DEMO-C",
    date: "2026-09-13",
    imageQuality: {
      status: "fail",
      score: 38.1,
      metrics: {
        sharpness: "Poor (Motion Blur)",
        illumination: "Low",
        coverage: "Insufficient"
      }
    },
    prediction: null,
    evidence: null,
    explainability: null,
    humanReviewRequired: true,
    isDemo: true,
    failureReason: "Motion blur artifact detected. Fundus features cannot be reliably segmented."
  }
};
