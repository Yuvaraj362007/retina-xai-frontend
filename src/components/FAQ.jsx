import React, { useState } from 'react';

const FAQ = () => {
  const faqs = [
    {
      q: "Why MATLAB and Simulink instead of a standard Python application?",
      a: "MathWorks MATLAB provides certified, deterministic medical image processing toolboxes, rigorously tested numerical stability, and automatic C/C++ code generation through MATLAB Coder. Simulink enables discrete-event system simulation to mathematically model patient flow, network latency, and district triage bottlenecks before field hardware is purchased."
    },
    {
      q: "How does this work in remote areas with limited internet?",
      a: "The entire inference pipeline (Quality Guard, CLAHE, Lesion Segmentation, CNN Staging, and Grad-CAM generation) can run offline on a modest laptop or embedded micro-computer at the screening camp. It stores reports encrypted locally and synchronizes triage queues with tertiary hospitals whenever internet connectivity resumes."
    },
    {
      q: "Is this replacing the ophthalmologist?",
      a: "No. RETINA-XAI is strictly a clinical decision-support and triage tool. It empowers paramedical staff and optometrists to quickly screen thousands of asymptomatic patients, filtering referable moderate/severe cases to ophthalmologists for final therapeutic diagnosis and laser/surgical intervention."
    },
    {
      q: "What happens when the captured image quality is poor?",
      a: "Our pipeline includes a strict \"Quality Guard\" stage. If illumination is too dim, motion blur is present, or the macula is not centered, the model refuses to issue a diagnostic classification. Instead, it triggers an immediate REJECT signal asking the operator to recapture while the patient is still present."
    },
    {
      q: "Can this currently be used as a definitive medical diagnosis?",
      a: "No. In its current phase as a Smart India Hackathon 2026 finalist project, it is a research and screening demonstration prototype. All predictions must be correlated with certified slit-lamp ophthalmoscopy and verified by licensed clinical practitioners before any medical decisions are taken."
    },
    {
      q: "What does Grad-CAM explainability provide that normal AI doesn’t?",
      a: "Gradient-weighted Class Activation Mapping (Grad-CAM) computes the gradients of the score for the predicted DR class with respect to the final convolutional feature maps. This illuminates exactly which retinal regions (e.g., microaneurysms or hard exudates) drove the classification, enabling clinicians to audit the algorithm's clinical reasoning instantly."
    }
  ];

  return (
    <section className="w-full px-8 py-24 bg-white" id="faq">
      <div className="max-w-4xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col gap-4 text-center items-center">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Frequently Asked Questions</span>
          <h2 className="text-4xl font-bold text-slate-900">Clinical, Algorithmic & Operational Inquiries</h2>
        </div>
        <div className="flex flex-col gap-4">
          {faqs.map((faq, idx) => (
            <FaqItem key={idx} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </div>
    </section>
  );
};

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-slate-50 rounded-2xl shadow-sm overflow-hidden border border-slate-100 transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 text-left flex items-center justify-between font-semibold text-slate-900 hover:bg-slate-100 transition-colors"
      >
        <span>{question}</span>
        <span className={`material-symbols-outlined text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          expand_more
        </span>
      </button>
      <div className={`transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="px-6 pb-6 text-sm text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
          {answer}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
