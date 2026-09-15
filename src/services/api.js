const API_BASE_URL = 'https://tent-value-brand-epinions.trycloudflare.com';

export const api = {

  async analyzeFundusImage(imageFile) {

    const formData = new FormData();
    formData.append('file', imageFile);

    const response = await fetch(
      `${API_BASE_URL}/api/analyze`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Backend analysis failed: ${response.status} ${errorText}`
      );
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(
        data.message || 'Backend analysis failed'
      );
    }

    const model = data.model || {};
    const quality = data.image_quality || {};
    const explainability = data.explainability || {};
    const evidence = data.evidence || {};

    let gradcamUrl = null;

    if (explainability.output_file) {
      const filename = explainability.output_file
        .split('/')
        .pop();

      gradcamUrl = `${API_BASE_URL}/processed/${filename}`;
    }

    return {
      analysisId: data.analysis_id || null,

      prediction: {
        classification: model.predicted_label || 'N/A',
        severity: model.predicted_label || 'N/A',
        confidence: model.confidence || 0,
      },

      imageQuality: {
        status: (quality.status || 'FAIL').toLowerCase(),
        metrics: quality.metrics || {},
        checks: quality.checks || {},
      },

      preprocessing: data.preprocessing || null,

      explainability: {
        method: explainability.method || 'Grad-CAM',
        status: explainability.status || 'unknown',
        reasoning:
          explainability.target_label
            ? `Grad-CAM generated for the model prediction: ${explainability.target_label}.`
            : 'Grad-CAM attribution generated.',
        gradcamUrl,
      },

      evidence: [
        {
          detected: true,
          description:
            `Model prediction: ${model.predicted_label || 'N/A'}`
        },
        {
          detected: quality.status === 'PASS',
          description:
            `Image quality: ${quality.status || 'UNKNOWN'}`
        },
        {
          detected: explainability.status === 'completed',
          description:
            `Grad-CAM: ${explainability.status || 'unknown'}`
        },
        {
          detected:
            evidence.human_review?.required === true,
          description:
            'Qualified clinician review required'
        },
      ],

      backendEvidence: evidence,

      rawResponse: data,
    };
  },

  async generateReport(analysisId) {

    if (!analysisId) {
      throw new Error(
        'Analysis ID is required to generate the report.'
      );
    }

    const response = await fetch(
      `${API_BASE_URL}/api/reports/${analysisId}`
    );

    if (!response.ok) {
      throw new Error(
        `Report request failed: ${response.status}`
      );
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(
        data.message || 'Unable to retrieve report.'
      );
    }

    return data.report;
  },

  async submitPilotRequest(formData) {

    console.log(
      'Pilot request:',
      formData
    );

    return {
      success: true,
      message: 'Inquiry registered successfully!'
    };
  }

};
