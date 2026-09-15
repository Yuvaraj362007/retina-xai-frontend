import React from 'react';

const Problem = () => {
  const problems = [
    {
      icon: "visibility_off",
      color: "text-primary",
      bg: "bg-slate-100",
      title: "Millions Need Screening",
      text: "With diabetic prevalence rising sharply in semi-urban and rural areas, traditional periodic ophthalmic exams are mathematically impossible under current specialist ratios. Screening volumes overwhelm local clinics.",
      status: "Status Quo: Backlogs spanning months"
    },
    {
      icon: "distance",
      color: "text-tertiary",
      bg: "bg-slate-100",
      title: "Specialists Are Concentrated",
      text: "More than 70% of vitreoretinal surgeons and trained ophthalmologists operate in tier-1 urban hubs. Patients in rural primary health centers face costly travel simply to receive basic stage confirmation.",
      status: "Geographic disparity: 1 eye surgeon per 100k"
    },
    {
      icon: "indeterminate_question_box",
      color: "text-red-500",
      bg: "bg-slate-100",
      title: "“Black-Box” AI Isn’t Enough",
      text: "Standard deep neural networks output a label without spatial rationale. Clinicians cannot ethically base an invasive laser or anti-VEGF referral on opaque probability distributions without verifiable visual justification.",
      status: "Adoption barrier: Lack of interpretable evidence"
    }
  ];

  return (
    <section className="w-full px-8 py-24 bg-white" id="problem">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="max-w-3xl flex flex-col gap-4">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">The Public Health Challenge</span>
          <h2 className="text-4xl font-bold text-slate-900">Diabetic Retinopathy Shouldn’t Become Blindness by Delay.</h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Diabetic Retinopathy can progress quietly for years without noticeable vision changes.
            The public health roadblock is not merely disease classification; it is identifying high-risk individuals
            at primary health centers before irreversible retinal damage occurs.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((p, idx) => (
            <div key={idx} className="bg-slate-50 p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-6">
              <div className={`w-12 h-12 rounded-lg ${p.bg} ${p.color} flex items-center justify-center`}>
                <span className="material-symbols-outlined text-3xl">{p.icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900">{p.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{p.text}</p>
              <div className="mt-auto pt-4 text-xs font-mono text-slate-500 font-medium">
                {p.status}
              </div>
            </div>
          ))}
        </div>
        <div className="w-full bg-primary-container text-white p-8 rounded-2xl shadow-sm flex flex-col md:flex-row items-center gap-6">
          <div className="p-3 bg-white/10 rounded-full shrink-0">
            <span className="material-symbols-outlined text-4xl">psychology_alt</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-widest text-cyan-200 font-bold">Our Guiding Principle</span>
            <p className="text-lg italic font-medium">
              “Our approach does not ask doctors to blindly trust AI. It shows them the morphological evidence behind every prediction.”
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;
