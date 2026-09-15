import React from 'react';
import { theme } from '../theme';

const Navbar = () => {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="h-20 w-full px-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <a className="flex items-center gap-2 group" href="#">
            <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center text-white font-bold">RX</div>
            <div className="flex flex-col">
              <span className="font-semibold text-lg text-slate-900 tracking-tight group-hover:text-primary transition-colors">RETINA-XAI</span>
              <span className="text-[10px] text-slate-500 bg-slate-100 px-1 py-0.5 rounded tracking-wider uppercase inline-block w-fit mt-0.5">Explainable Diabetic Retinopathy Screening</span>
            </div>
          </a>
        </div>
        <nav className="hidden xl:flex items-center gap-6">
          {['Home', 'Technology', 'Explainability', 'Validation', 'Demo', 'FAQ'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm text-slate-600 hover:text-primary transition-colors font-medium">
              {item}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <a className="hidden md:inline-flex text-sm text-slate-500 hover:text-slate-900 transition-colors px-2 py-1" href="#validation">
            Clinical Validation
          </a>
          <a className="inline-flex items-center justify-center text-sm font-semibold bg-primary text-white px-4 py-2 rounded-lg transition-all hover:bg-primary-container shadow-sm animate-pulse hover:animate-none" href="#demo">
            Run AI Demo
          </a>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white shadow-sm">
            <span className="material-symbols-outlined text-sm">person</span>
          </div>
        </div>
      </div>
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="w-full bg-slate-50 mt-20 border-t border-slate-200">
      <div className="w-full px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 flex flex-col items-start gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-xs">RX</div>
              <span className="font-bold text-lg text-slate-900 tracking-tight">RETINA-XAI</span>
            </div>
            <p className="text-sm text-slate-600 max-w-md leading-relaxed">
              Explainable AI for Diabetic Retinopathy Screening. AI-assisted lesion analysis, diabetic retinopathy classification, and Grad-CAM explainability for clinical screening support.
            </p>
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm border border-slate-100">
              <span className="material-symbols-outlined text-tertiary text-lg">memory</span>
              <span className="text-xs text-slate-500">Powered by MathWorks (MATLAB & Simulink)</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-slate-200 text-slate-700 px-3 py-1 rounded text-[11px] font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-tertiary"></span>
              Smart India Hackathon 2026 Project
            </div>
          </div>
          <div className="lg:col-span-3 flex flex-col gap-4">
            <span className="font-semibold text-slate-900">Quick Links</span>
            <ul className="flex flex-col gap-2 text-sm text-slate-500">
              <li><a className="hover:text-primary transition-colors" href="#">Technical Documentation</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Clinical Benchmarks</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Explainability Pipeline</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Simulink Model</a></li>
              <li><a className="hover:text-primary transition-colors" href="#demo">Interactive Demo</a></li>
            </ul>
          </div>
          <div className="lg:col-span-4 flex flex-col gap-4">
            <span className="font-semibold text-slate-900">Resources</span>
            <ul className="flex flex-col gap-2 text-sm text-slate-500">
              <li><a className="hover:text-primary transition-colors" href="#">GitHub Repository</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Research Paper Preprint</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">SIH 2026 Portal</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">MATLAB Medical Imaging Toolbox</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 p-4 rounded-lg bg-slate-100 flex items-start gap-3 text-slate-600">
          <span className="material-symbols-outlined text-slate-400 text-lg shrink-0">clinical_notes</span>
          <p className="text-xs leading-relaxed">
            <strong className="font-semibold text-slate-900">Clinical Disclaimer:</strong> This prototype is for research, demonstration, and screening-support purposes only.
            It is not a substitute for professional medical diagnosis or treatment. Model predictions must be correlated with certified ophthalmoscopy and clinical examinations.
          </p>
        </div>
        <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Team RETINA-XAI. Developed for Smart India Hackathon 2026.</p>
          <div className="flex items-center gap-6">
            <a className="hover:text-slate-900 transition-colors" href="#">Privacy Policy</a>
            <a className="hover:text-slate-900 transition-colors" href="#">Clinical Disclaimer</a>
            <a className="hover:text-slate-900 transition-colors" href="#">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased">
      <Navbar />
      <main className="pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
}
