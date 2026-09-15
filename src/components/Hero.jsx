import React from 'react';
import { theme } from '../theme';

const Hero = () => {
  return (
    <section className="w-full px-8 py-16 lg:py-24 bg-white" id="home">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column */}
        <div className="lg:col-span-7 flex flex-col items-start gap-6">
          <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-600 px-4 py-1.5 rounded-full shadow-sm text-xs font-semibold tracking-wider uppercase">
            <span className="inline-block w-2 h-2 rounded-full bg-tertiary animate-ping"></span>
            <span className="inline-block w-2 h-2 rounded-full bg-tertiary -ml-3"></span>
            <span>Smart India Hackathon 2026 • Medical AI</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
            Ending Preventable Blindness. Not with a “Black Box,” but with <span className="text-primary">Transparent AI</span>.
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
            India has 77 million diabetic adults, but not enough doctors to screen them all. We have built an
            AI-assisted screening pipeline that analyzes retinal images and highlights which retinal regions contributed to the model’s prediction
            —bringing explainable screening closer to underserved and rural communities.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
            <a className="inline-flex items-center justify-center gap-2 font-semibold bg-primary text-white px-6 py-3 rounded-lg shadow-md hover:bg-primary-container transition-all" href="#demo">
              <span>See the AI in Action</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </a>
            <a className="inline-flex items-center justify-center gap-2 font-semibold bg-slate-50 text-slate-900 px-6 py-3 rounded-lg shadow-sm border border-slate-200 hover:bg-slate-100 transition-all" href="#validation">
              <span>Read Clinical Validation</span>
              <span className="material-symbols-outlined text-lg">upload_file</span>
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-6 pt-4 text-slate-500 font-medium text-xs">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-tertiary text-lg">verified</span>
              <span>Human-in-the-Loop</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-tertiary text-lg">schema</span>
              <span>Grad-CAM Explainable AI</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-tertiary text-lg">developer_board</span>
              <span>MATLAB + Simulink Verified</span>
            </div>
          </div>
        </div>
        {/* Right Column: Clinical Diagnostic Box */}
        <div className="lg:col-span-5 relative">
          <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl"></div>
          <div className="relative bg-[#213145] text-[#eaf1ff] rounded-2xl shadow-2xl overflow-hidden p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between text-xs font-medium pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400"></span>INFERENCE ENGINE: PYTHON AI BACKEND</div>
              <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase">Live Inspector</span>
            </div>
            <div className="text-[10px] text-inverse-on-surface/60 font-mono text-center mb-2">
                Live: FastAPI + PyTorch + Grad-CAM</div>
            <div className="relative w-full aspect-square bg-black rounded-xl overflow-hidden flex items-center justify-center group">
              <img
                alt="Retinal Fundus"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7-TwQlLMUhLubHmPhNgSCLqhVbtr_rNp7POsFho6znRXnumQKpqOS-NtVAm2eQ-MAK7210E67pEeXuDSY19nCLhCB4sJmmWE4VC_62koTyGmjADEr9R7dNngw-m1ZKlyoFRan0UsETOb0lNTwrXhrLSgmnVlqFQJmA2NNczjo_a-fBy31CLV0E7CEv2YpeVILrWjtFUH7WQDE2unvY-gw2jootNuKNY0MHWNZxNgejS7RVVPiWUhU6w"
              />
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#38bdf8] opacity-80 pointer-events-none animate-scan"></div>
              <div className="absolute inset-0 bg-radial from-red-500/20 via-yellow-400/10 to-transparent mix-blend-color-dodge pointer-events-none"></div>
              {/* ROI Markers */}
              <div className="absolute top-[48%] left-[54%] flex flex-col items-start pointer-events-none animate-pulse">
                <div className="w-6 h-6 rounded-full border-2 border-red-500 bg-red-500/30 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                </div>
                <span className="mt-1 bg-red-950/90 text-red-200 text-[10px] font-mono px-1.5 py-0.5 rounded shadow">MA #104 (p=0.96)</span>
              </div>
              <div className="absolute top-[32%] left-[62%] flex flex-col items-start pointer-events-none">
                <div className="w-14 h-10 border border-dashed border-amber-400 bg-amber-400/15 rounded flex items-start justify-end p-0.5">
                  <span className="material-symbols-outlined text-amber-300 text-xs">crop_free</span>
                </div>
                <span className="mt-0.5 bg-amber-950/90 text-amber-200 text-[10px] font-mono px-1.5 py-0.5 rounded shadow">Hard Exudate ROI</span>
              </div>
              <div className="absolute top-[28%] left-[16%] flex flex-col items-start pointer-events-none">
                <div className="w-16 h-16 rounded-full border border-sky-400/70 bg-sky-400/10 flex items-center justify-center">
                  <span className="text-[9px] text-sky-200 font-mono tracking-tighter">OPTIC DISC</span>
                </div>
              </div>
              <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-[11px] text-white/90">
                <span className="material-symbols-outlined text-xs text-cyan-400">layers</span>
                <span>Grad-CAM + Saliency Overlay Active</span>
              </div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white/90 uppercase tracking-wide">AI Triage Classification</span>
                <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 text-[11px] font-medium px-2 py-0.5 rounded">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  Review Recommended
                </span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-lg font-bold text-white">Referable Diabetic Retinopathy (Moderate)</span>
                <span className="font-mono text-cyan-300 font-bold text-sm">94.7% Conf</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-white/70">
                <span className="bg-black/30 px-2 py-0.5 rounded">Microaneurysms (Detected)</span>
                <span className="bg-black/30 px-2 py-0.5 rounded">Hemorrhages (Perimacular)</span>
                <span className="bg-black/30 px-2 py-0.5 rounded">Hard Exudates (Focal)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes scan {
          0%, 100% { top: 4%; }
          50% { top: 92%; }
        }
        .animate-scan {
          animation: scan 3.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
