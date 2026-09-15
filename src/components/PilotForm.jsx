import React, { useState } from 'react';
import { api } from '../services/api';

const PilotForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    location: '',
    hardware: 'Digital Desktop Fundus Camera (Zeiss, Topcon, etc.)',
    patients: '',
    role: 'Public Health Official / District Admin',
    needs: ''
  });
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await api.submitPilotRequest(formData);
      setStatus('success');
    } catch (error) {
      console.error("Form submission failed", error);
      setStatus('idle');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-emerald-50 text-emerald-900 border border-emerald-300 p-8 rounded-2xl flex items-start gap-4 my-12 max-w-4xl mx-auto">
        <span className="material-symbols-outlined text-emerald-600 text-3xl">task_alt</span>
        <div className="flex flex-col">
          <strong className="text-lg font-bold">Inquiry Registered Successfully!</strong>
          <p className="text-sm text-emerald-800 leading-relaxed">
            Thank you for reaching out. A Smart India Hackathon team member will connect with your district health team with the MATLAB simulation bundle and hardware requirement documentation within 24 hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="w-full px-8 py-24 bg-[#213145] text-white" id="pilot">
      <div className="max-w-4xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col gap-4 text-center items-center">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">Government & Clinical Trials</span>
          <h2 className="text-4xl font-bold text-white">Bring This Technology to Your District.</h2>
          <p className="text-lg text-white/70 max-w-2xl">
            Interested in evaluating RETINA-XAI for district screening camps, state telemedicine networks,
            or academic validation? Submit a pilot deployment inquiry.
          </p>
        </div>
        <div className="bg-white text-slate-900 rounded-3xl p-8 lg:p-12 shadow-2xl">
          <form className="grid grid-cols-1 sm:grid-cols-2 gap-6" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Your Name & Designation *</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="p-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-primary transition-all"
                placeholder="Dr. A. Sharma, Chief Medical Officer"
                required
                type="text"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Organization / Health Department *</label>
              <input
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                className="p-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-primary transition-all"
                placeholder="District Health Society, J&K"
                required
                type="text"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Location / District / State *</label>
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="p-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-primary transition-all"
                placeholder="Ganderbal, Jammu & Kashmir"
                required
                type="text"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Current Screening Hardware</label>
              <select
                name="hardware"
                value={formData.hardware}
                onChange={handleChange}
                className="p-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-primary transition-all"
              >
                <option>Digital Desktop Fundus Camera (Zeiss, Topcon, etc.)</option>
                <option>Portable Handheld Retinal Camera (Forus, Remidio, etc.)</option>
                <option>Smartphone-based Ophthalmoscope adaptor</option>
                <option>No retinal hardware yet (Planning procurement)</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Estimated Monthly Diabetic Patients</label>
              <input
                name="patients"
                value={formData.patients}
                onChange={handleChange}
                className="p-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-primary transition-all"
                placeholder="e.g. 500 - 2,000 patients/month"
                type="text"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Inquiry Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="p-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-primary transition-all"
              >
                <option>Public Health Official / District Admin</option>
                <option>Ophthalmologist / Vitreoretinal Specialist</option>
                <option>Academic / Medical University Researcher</option>
                <option>NGO / Rural Healthcare Foundation</option>
              </select>
            </div>
            <div className="sm:col-span-2 flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Specific Clinical or Infrastructure Needs</label>
              <textarea
                name="needs"
                value={formData.needs}
                onChange={handleChange}
                className="p-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-primary transition-all"
                placeholder="Tell us about offline edge constraints, local doctor review availability, or desired data integration..."
                rows="3"
              />
            </div>
            <div className="sm:col-span-2 pt-4">
              <button
                disabled={status === 'submitting'}
                className={`w-full py-4 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 shadow-lg ${
                  status === 'submitting' ? 'bg-slate-400 cursor-not-allowed' : 'bg-primary hover:bg-primary-container'
                }`}
                type="submit"
              >
                <span>{status === 'submitting' ? 'Processing Request...' : 'Request Pilot Deployment & MATLAB Code Bundle'}</span>
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default PilotForm;
