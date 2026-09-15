import React from 'react';

const ExplainabilitySection = () => (
  <section className="w-full px-8 py-24 bg-slate-50" id="explainability">
    <div className="max-w-7xl mx-auto flex flex-col gap-12">
      <div className="flex flex-col gap-4 max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-wider text-primary">Visual Interpretability</span>
        <h2 className="text-4xl font-bold text-slate-900">Beyond the Black Box</h2>
        <p className="text-lg text-slate-600 leading-relaxed">
          Our implementation of Grad-CAM provides clinicians with a saliency map that highlights retinal regions that contributed strongly to the model prediction, transforming a probability score into visual evidence.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="bg-[#213145] p-4 rounded-3xl shadow-2xl aspect-square relative overflow-hidden">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7-TwQlLMUhLubHmPhNgSCLqhVbtr_rNp7POsFho6znRXnumQKpqOS-NtVAm2eQ-MAK7210E67pEeXuDSY19nCLhCB4sJmmWE4VC_62koTyGmjADEr9R7dNngw-m1ZKlyoFRan0UsETOb0lNTwrXhrLSgmnVlqFQJmA2NNczjo_a-fBy31CLV0E7CEv2YpeVILrWjtFUH7WQDE2unvY-gw2jootNuKNY0MHWNZxNgejS7RVVPiWUhU6w"
            className="w-full h-full object-cover opacity-50"
            alt="Explainability background"
          />
          <div className="absolute inset-0 bg-radial from-red-500/60 via-transparent to-transparent mix-blend-screen" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white font-mono text-xs bg-black/60 px-3 py-1 rounded-full border border-white/20">Saliency Map Activation</span>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">visibility</span>
            </div>
            <div>
              <h4 className="font-bold text-slate-900">Visual Verification</h4>
              <p className="text-sm text-slate-600">Clinicians can review retinal regions highlighted by the AI and assess the associated visual evidence.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-tertiary/10 text-tertiary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">psychology</span>
            </div>
            <div>
              <h4 className="font-bold text-slate-900">Audit Trail</h4>
              <p className="text-sm text-slate-600">Every AI screening result can be accompanied by a Grad-CAM heatmap, providing a visual record of the regions that contributed to the model prediction.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">verified</span>
            </div>
            <div>
              <h4 className="font-bold text-slate-900">Reduced False Positives</h4>
              <p className="text-sm text-slate-600">By inspecting the heatmaps, doctors can quickly dismiss AI errors caused by imaging artifacts or dust on the lens.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ExplainabilitySection;
