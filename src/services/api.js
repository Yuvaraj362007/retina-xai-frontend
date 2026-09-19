const API_BASE_URL = 'https://sessions-toolbar-titles-instances.trycloudflare.com';

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
    let lesionUrl = null;

    if (explainability.lesion_map_file) {
      const filename = explainability.lesion_map_file
        .split('/')
        .pop();

      lesionUrl = `${API_BASE_URL}/processed/${filename}`;
    }



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
        lesionUrl,
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
    const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbwVxZqszC4xZeDsEflaH7M95I-IeNB5LBiJHcfiujNJM965epXaIrgRHpeZvt-oUNA/exec';

    try {
      await fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(formData)
      });

      return {
        success: true,
        message: 'Inquiry registered successfully!'
      };
    } catch (error) {
      console.error('Pilot request failed:', error);

      return {
        success: false,
        message: 'Unable to register inquiry. Please try again.'
      };
    }
  }
};
