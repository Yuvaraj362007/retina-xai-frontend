import React from 'react';

const Report = ({ data }) => {
  if (!data) return null;

  const prediction =
    data.prediction?.severity ||
    data.prediction?.classification ||
    data.model?.predicted_label ||
    'AI screening result unavailable';

  const confidence =
    data.prediction?.confidence ??
    data.model?.confidence ??
    null;

  const imageQuality =
    data.imageQuality?.status ||
    data.image_quality?.status ||
    'UNKNOWN';

  const gradcamUrl =
    data.explainability?.gradcamUrl ||
    data.explainability?.gradcam_url ||
    null;

  const candidateCount =
    data.explainability?.candidate_region_count ??
    data.explainability?.candidateRegionCount ??
    0;

  const reviewRequired =
    data.evidence?.human_review?.required ??
    true;

  const qualityPass = String(imageQuality).toUpperCase() === 'PASS';

  const handleVoiceGuidance = () => {
    if (!('speechSynthesis' in window)) {
      alert('Voice guidance is not supported in this browser.');
      return;
    }

    window.speechSynthesis.cancel();

    const message = reviewRequired
      ? 'உங்கள் கண் பரிசோதனை முடிந்தது. மேலும் பரிசோதனைக்காக தகுதியான கண் மருத்துவரை அணுகவும்.'
      : 'உங்கள் கண் பரிசோதனை முடிந்தது. அடுத்த கட்டத்திற்கு சுகாதார பணியாளரின் ஆலோசனையைப் பின்பற்றவும்.';

    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = 'ta-IN';
    utterance.rate = 0.9;

    const voices = window.speechSynthesis.getVoices();
    const tamilVoice = voices.find((voice) =>
      voice.lang.toLowerCase().startsWith('ta')
    );

    if (tamilVoice) {
      utterance.voice = tamilVoice;
    }

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="bg-white text-slate-900 rounded-2xl shadow-lg border border-slate-200 p-8 flex flex-col gap-8 font-sans max-w-4xl mx-auto my-12">
      {/* Header */}
      <div className="flex justify-between items-start border-b border-slate-200 pb-4 gap-4">
        <div className="flex flex-col">
          <span className="text-xl font-bold text-slate-900 uppercase tracking-tight">
            RETINA-XAI SCREENING EVIDENCE
          </span>
          <span className="text-xs text-slate-500 font-mono mt-1">
            AI-assisted diabetic retinopathy screening prototype
          </span>
        </div>

        <div className="text-right flex flex-col items-end">
          <span
            className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wide ${
              qualityPass
                ? 'bg-emerald-100 text-emerald-900'
                : 'bg-amber-100 text-amber-900'
            }`}
          >
            {qualityPass ? 'SCREENING COMPLETED' : 'REVIEW IMAGE'}
          </span>

          {data.date && (
            <span className="text-xs text-slate-500 mt-1">
              {data.date}
            </span>
          )}
        </div>
      </div>

      {/* Patient View */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <div className="flex items-center gap-3 mb-5">
          <div
            className={`w-11 h-11 rounded-full flex items-center justify-center text-xl ${
              qualityPass ? 'bg-emerald-100' : 'bg-amber-100'
            }`}
          >
            {qualityPass ? '✓' : '!'}
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Patient view
            </div>
            <div className="text-lg font-bold text-slate-900">
              Screening status
            </div>
          </div>
        </div>

        <div className="text-2xl font-bold text-slate-900">
          AI screening result: {prediction}
        </div>

        <p className="text-sm text-slate-600 mt-3 leading-relaxed">
          The patient does not need to operate the technical AI system.
          Healthcare-worker assistance is part of the screening workflow.
        </p>

        <div className="mt-5 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={handleVoiceGuidance}
            className="px-4 py-3 rounded-xl bg-slate-900 text-white text-sm font-semibold"
          >
            🔊 Play in Tamil
          </button>

          <div className="px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm text-slate-700">
            Next step: follow the healthcare worker's guidance and complete
            clinician review where required.
          </div>
        </div>
      </div>

      {/* Evidence Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-slate-200 p-4">
          <span className="text-xs text-slate-500">AI screening result</span>
          <p className="font-bold text-lg text-slate-900 mt-1">
            {prediction}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 p-4">
          <span className="text-xs text-slate-500">Image quality</span>
          <p className="font-bold text-lg text-slate-900 mt-1">
            {String(imageQuality).toUpperCase()}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 p-4">
          <span className="text-xs text-slate-500">Candidate regions</span>
          <p className="font-bold text-lg text-slate-900 mt-1">
            {candidateCount}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            AI-highlighted candidate region(s)
          </p>
        </div>
      </div>

      {/* Visual Evidence */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div className="w-full aspect-square bg-slate-950 rounded-xl overflow-hidden relative">
          {gradcamUrl ? (
            <img
              src={gradcamUrl}
              alt="Grad-CAM visual explanation"
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-center text-sm text-slate-400 px-6">
              Grad-CAM visual evidence will appear here after analysis.
            </div>
          )}

          <span className="absolute bottom-3 left-3 text-[10px] bg-black/70 text-white px-2 py-1 rounded">
            Grad-CAM Evidence
          </span>
        </div>

        <div className="flex flex-col gap-5 text-sm">
          <div>
            <span className="text-slate-500 text-xs uppercase tracking-wide">
              Screening evidence
            </span>

            <div className="mt-3 space-y-3">
              <div className="flex gap-2">
                <span className="text-emerald-600">✓</span>
                <span>Image quality: {String(imageQuality).toUpperCase()}</span>
              </div>

              <div className="flex gap-2">
                <span className="text-emerald-600">✓</span>
                <span>AI screening classification: {prediction}</span>
              </div>

              <div className="flex gap-2">
                <span className="text-emerald-600">✓</span>
                <span>
                  Grad-CAM: {gradcamUrl ? 'completed' : 'available from analysis'}
                </span>
              </div>

              <div className="flex gap-2">
                <span className="text-emerald-600">✓</span>
                <span>
                  Candidate regions: {candidateCount}
                </span>
              </div>
            </div>
          </div>

          {confidence !== null && (
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
              <span className="text-slate-500 text-xs">
                Model probability
              </span>

              <p className="font-mono text-lg text-slate-900 mt-1">
                {(Number(confidence) * 100).toFixed(2)}%
              </p>
            </div>
          )}

          <div className="rounded-xl bg-amber-50 border border-amber-200 p-4">
            <span className="font-semibold text-amber-900">
              Human review
            </span>

            <p className="text-sm text-amber-900 mt-1">
              {reviewRequired
                ? 'AI output requires review by a qualified clinician.'
                : 'Follow the configured clinical review workflow.'}
            </p>
          </div>

          <div className="rounded-xl bg-white border border-slate-200 p-4">
            <span className="font-semibold text-slate-900">
              Candidate-region note
            </span>

            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              AI-highlighted candidate regions are not confirmed clinical
              lesions.
            </p>
          </div>
        </div>
      </div>

      {/* Why different */}
      <div className="rounded-2xl bg-slate-900 text-white p-6">
        <div className="text-xs uppercase tracking-wide text-slate-400">
          Why RETINA-XAI is different
        </div>

        <h3 className="text-xl font-bold mt-2">
          Not just a prediction. An understandable screening workflow.
        </h3>

        <p className="text-sm text-slate-300 mt-3 leading-relaxed">
          RETINA-XAI is designed as an explainable screening workflow rather
          than a black-box prediction tool. It combines image-quality
          validation, AI screening, visual explanation, candidate-region
          evidence and human review in one workflow.
        </p>

        <div className="mt-5 grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-semibold">
          <div className="rounded-lg bg-white/10 p-3 text-center">
            Image Quality
          </div>
          <div className="rounded-lg bg-white/10 p-3 text-center">
            AI Screening
          </div>
          <div className="rounded-lg bg-white/10 p-3 text-center">
            Explanation
          </div>
          <div className="rounded-lg bg-white/10 p-3 text-center">
            Evidence
          </div>
          <div className="rounded-lg bg-white/10 p-3 text-center">
            Human Review
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-200 pt-5 text-xs text-slate-500 leading-relaxed">
        <span className="font-semibold text-slate-700">
          AI-assisted screening output.
        </span>{' '}
        This prototype is not an autonomous medical diagnosis system.
        Final clinical interpretation requires review by a qualified clinician.
      </div>
    </div>
  );
};

export default Report;
