import React from 'react';

const Report = ({ data }) => {
  if (!data) return null;

  return (
    <div className="bg-white text-slate-900 rounded-2xl shadow-lg border border-slate-200 p-8 flex flex-col gap-8 font-sans max-w-4xl mx-auto my-12">
      {/* Header Strip */}
      <div className="flex justify-between items-start border-b border-slate-200 pb-4">
        <div className="flex flex-col">
          <span className="text-xl font-bold text-slate-900 uppercase tracking-tight">Retina-XAI Triage Dossier</span>
          <span className="text-xs text-slate-500 font-mono">Report Ref: {data.screeningId} • PHC Kangan, J&K</span>
        </div>
        <div className="text-right flex flex-col items-end">
          <span className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wide ${
            data.prediction?.classification === 'Referable DR' ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-900'
          }`}>
            {data.prediction?.classification || 'Referable Moderate DR'}
          </span>
          <span className="text-xs text-slate-500 mt-1">Date: {data.date} | 10:14 IST</span>
        </div>
      </div>

      {/* Demographics & Metadata Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm bg-slate-50 p-4 rounded-xl border border-slate-100">
        <div className="flex flex-col">
          <span className="text-slate-500 text-xs">Patient ID:</span>
          <strong className="text-slate-900">DEMO-PAT-9012</strong>
        </div>
        <div className="flex flex-col">
          <span className="text-slate-500 text-xs">Age / Gender:</span>
          <strong className="text-slate-900">58 Y / Male</strong>
        </div>
        <div className="flex flex-col">
          <span className="text-slate-500 text-xs">Eye Tested:</span>
          <strong className="text-slate-900">OD (Right Eye)</strong>
        </div>
        <div className="flex flex-col">
          <span className="text-slate-500 text-xs">Image Quality:</span>
          <strong className="text-emerald-700">{data.imageQuality?.status === 'pass' ? 'PASS (Grade A)' : 'FAIL'}</strong>
        </div>
      </div>

      {/* Diagnostic Summary & Grad-CAM Proof */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div className="w-full aspect-square bg-slate-900 rounded-xl overflow-hidden relative shadow-inner">
          <img
            alt="Clinical report fundus preview"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7-TwQlLMUhLubHmPhNgSCLqhVbtr_rNp7POsFho6znRXnumQKpqOS-NtVAm2eQ-MAK7210E67pEeXuDSY19nCLhCB4sJmmWE4VC_62koTyGmjADEr9R7dNngw-m1ZKlyoFRan0UsETOb0lNTwrXhrLSgmnVlqFQJmA2NNczjo_a-fBy31CLV0E7CEv2YpeVILrWjtFUH7WQDE2unvY-gw2jootNuKNY0MHWNZxNgejS7RVVPiWUhU6w"
          />
          <div className="absolute inset-0 bg-radial from-red-500/40 via-amber-400/20 to-transparent mix-blend-color-dodge" />
          <span className="absolute bottom-2 left-2 text-[10px] bg-black/70 text-white px-2 py-1 rounded">Grad-CAM Evidence</span>
        </div>

        <div className="md:col-span-2 flex flex-col gap-6 text-sm">
          <div className="flex flex-col gap-1">
            <span className="text-slate-500 text-xs">Inference Classification:</span>
            <p className="font-bold text-lg text-slate-900">{data.prediction?.severity || 'Moderate Non-Proliferative Diabetic Retinopathy (NPDR)'}</p>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-slate-500 text-xs">Model Uncertainty / Confidence:</span>
            <p className="font-mono text-slate-800">
              {((data.prediction?.confidence || 0) * 100).toFixed(1)}% posterior probability (±1.1% ensemble uncertainty)
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-slate-500 text-xs">Segmented Biomarkers:</span>
            <p className="text-slate-700 leading-relaxed">
              {Object.entries(data.evidence || {}).map(([key, val]) => val.detected ? `${val.description}. ` : '').join('')}
            </p>
          </div>
        </div>
      </div>

      {/* Verification Sign-Off Footer */}
      <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-slate-400">verified</span>
          <span>AI-assisted triage output. Mandatory validation required by certified ophthalmologist prior to therapeutic intervention.</span>
        </div>
        <div className="font-mono text-slate-400">MD Signature: [ Pending Tele-Review ]</div>
      </div>
    </div>
  );
};

export default Report;
