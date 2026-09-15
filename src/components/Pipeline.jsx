import React from 'react';

const Pipeline = () => {
  const steps = [
    { id: "01", title: "Image Acquisition", text: "Fundus snapshot captured via digital non-mydriatic camera at local screening center.", meta: "Input: RGB Fundus", color: "text-primary", border: "" },
    { id: "02", title: "Quality Guard", text: "Checks blur, illumination, and field coverage. Poor quality triggers immediate recapture request.", meta: "FAIL = Recapture", color: "text-amber-600", border: "border-l-4 border-amber-500" },
    { id: "03", title: "CLAHE Contrast", text: "Contrast-Limited Adaptive Histogram Equalization sharpens subtle micro-vessel walls.", meta: "MATLAB Toolbox", color: "text-primary", border: "" },
    { id: "04", title: "Lesion Seg", text: "Analyze retinal regions associated with microaneurysms, hemorrhages, and lipid exudates using image-processing and AI-based methods.", meta: "Pixel Regions", color: "text-primary", border: "" },
    { id: "05", title: "DR Classification", text: "Deep CNN categorizes stage: No DR, Mild, Moderate (Referable), Severe, or PDR.", meta: "ICDR Staging", color: "text-primary", border: "" },
    { id: "06", title: "Grad-CAM XAI", text: "Generates a gradient-based saliency heatmap highlighting retinal regions that contributed strongly to the model prediction.", meta: "Interpretability", color: "text-tertiary", border: "border-l-4 border-tertiary" },
    { id: "07", title: "Human Review", text: "Qualified clinician reviews the report, verifies AI findings, and determines the appropriate clinical action.", meta: "Clinical Action", color: "text-slate-500", border: "" },
  ];

  return (
    <section className="w-full px-8 py-24 bg-slate-100" id="pipeline">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col gap-4 text-center items-center">
          <span className="text-xs font-bold uppercase tracking-wider text-tertiary">System Architecture</span>
          <h2 className="text-4xl font-bold text-slate-900">From Retinal Image to Explainable Clinical Insight</h2>
          <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
            An integrated screening flow incorporating automatic quality assessment, adaptive enhancement,
            pathological region analysis, multi-class neural estimation, and visual saliency interpretation.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
          {steps.map((step, idx) => (
            <div key={idx} className={`bg-white p-4 rounded-xl shadow-sm flex flex-col gap-3 relative ${step.border}`}>
              <span className={`font-mono font-bold text-xs ${step.color}`}>{step.id}</span>
              <h4 className="text-sm font-bold text-slate-900">{step.title}</h4>
              <p className="text-xs text-slate-600 leading-snug">{step.text}</p>
              <div className="mt-auto pt-3 text-[10px] text-slate-400 font-mono">{step.meta}</div>
            </div>
          ))}
        </div>
        <div className="bg-slate-200 text-slate-900 rounded-2xl p-6 flex items-center justify-between shadow-sm border border-slate-300">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-2xl">verified_user</span>
            <span className="text-lg font-semibold">AI → Evidence → Human Clinical Decision</span>
          </div>
          <a className="text-primary hover:text-primary-container font-bold text-xs flex items-center gap-1 transition-colors" href="#demo">
            <span>Test Pipeline in Playground</span>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Pipeline;
