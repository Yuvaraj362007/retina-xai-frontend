import React from 'react';

const Technology = () => {
  const stages = [
    { stage: "STAGE 1 : FIELD", title: "Fundus Acquisition", text: "Digital Fundus Camera or Smartphone-adaptor capturing 45° macula-centered TIFF/PNG.", meta: "DICOM / JPEG 2000", color: "text-primary" },
    { stage: "STAGE 2 : MATLAB CORE", title: "Image Preprocessing", text: "Quality guard (luminance check), contrast enhancement (CLAHE), and morphological noise filtering.", meta: "Image Processing Toolbox™", color: "text-tertiary" },
    { stage: "STAGE 3 : INFERENCE", title: "Deep Learning + XAI", text: "CNN classification backbone with backward gradient hooks computing Grad-CAM activation maps.", meta: "Deep Learning Toolbox™", color: "text-primary" },
    { stage: "STAGE 4 : SCALE", title: "Simulink System Model", text: "Stateflow modeling of network latency, physician review queues, and patient triage alerts.", meta: "Simulink® Discrete-Event", color: "text-slate-500" },
  ];

  return (
    <section className="w-full px-8 py-24 bg-white" id="technology">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col gap-4 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Engineering Stack</span>
          <h2 className="text-4xl font-bold text-slate-900">Built with MATLAB. Designed for Real-World Deployment.</h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Leveraging MathWorks MATLAB & Simulink toolboxes to create deterministic, reproducible medical image
            processing code that exports cleanly to C/C++ for embedded screening units.
          </p>
        </div>
        <div className="bg-slate-50 p-8 rounded-3xl shadow-sm border border-slate-200 flex flex-col gap-12">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900">Hardware-to-Cloud Distributed Data Flow</h3>
            <span className="font-mono text-[11px] text-slate-500 bg-slate-200 px-2 py-1 rounded">MathWorks Medical Imaging Pipeline</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {stages.map((s, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-3">
                <span className={`font-mono text-xs font-bold ${s.color}`}>{s.stage}</span>
                <h4 className="text-base font-bold text-slate-900">{s.title}</h4>
                <p className="text-sm text-slate-600 leading-relaxed">{s.text}</p>
                <div className="mt-auto text-[11px] text-slate-400 font-mono">{s.meta}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-slate-200">
            <span className="text-xs font-semibold text-slate-900 mr-2">Components:</span>
            {["MATLAB R2024b", "Simulink", "Computer Vision Toolbox", "Grad-CAM Feature Activation", "MATLAB Coder (Edge C-MEX)", "Lightweight Edge AI"].map((tag, i) => (
              <span key={i} className="bg-slate-100 text-slate-700 px-3 py-1 rounded text-xs font-mono border border-slate-200">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technology;
