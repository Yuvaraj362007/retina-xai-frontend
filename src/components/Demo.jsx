import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { demoScreeningResults } from '../data/mockData';
import Report from './Report';

const Demo = () => {
  const [step, setStep] = useState('upload'); // 'upload' | 'quality' | 'processing' | 'result'
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSampleId, setSelectedSampleId] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [viewMode, setViewMode] = useState('fundus'); // 'fundus' | 'gradcam' | 'lesion'
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [processStage, setProcessStage] = useState(0);
  const [showReport, setShowReport] = useState(false);

  const stages = [
    "Image Quality Assessment",
    "CLAHE Enhancement",
    "Lesion Analysis",
    "DR Classification",
    "Grad-CAM Generation",
    "Report Preparation"
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setSelectedSampleId(null);
      setPreviewUrl(URL.createObjectURL(file));
      setAnalysisResult(null);
      setStep('upload');
      setViewMode('fundus');
    }
  };

  const handleUseSample = async (sampleId) => {
    const sample = demoScreeningResults[sampleId.toUpperCase()];
    if (!sample) return;

    try {
    const response = await fetch(sample.image);

    if (!response.ok) {
      throw new Error(`Failed to load sample image: ${response.status}`);
    }

    const blob = await response.blob();

    const sampleFile = new File(
      [blob],
      `${sampleId}.jpg`,
      { type: blob.type || "image/jpeg" }
    );

    setSelectedImage(sampleFile);
    setSelectedSampleId(sampleId);
    setPreviewUrl(URL.createObjectURL(sampleFile));
    setAnalysisResult(null);
    setStep('upload');
    setViewMode('fundus');

  } catch (error) {
    console.error("Failed to load sample image:", error);
  }
};
  const startAnalysis = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    setStep('processing');
    setProcessStage(0);

    for (let i = 0; i < stages.length; i++) {
      setProcessStage(i);
      await new Promise(resolve => setTimeout(resolve, 600));
    }

    try {
      const result = await api.analyzeFundusImage(selectedImage);
      setAnalysisResult(result);

      if (result?.imageQuality?.status === 'fail') {
        setStep('quality');
      } else {
        setStep('result');
      }
    } catch (error) {
      console.error("Analysis failed", error);
      setStep('upload');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <section className="w-full px-8 py-24 bg-slate-100" id="demo">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="flex flex-col gap-4 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Interactive Screening Lab</span>
            <h2 className="text-4xl font-bold text-slate-900">See the “Explainability” for Yourself.</h2>
            <p className="text-lg text-slate-600">
              Select a sample retinal scan or upload your own to observe how the prototype highlights retinal regions associated with the model prediction and renders an interpretable Grad-CAM heatmap.
                          </p>
          </div>
          <div className="bg-amber-100 text-amber-900 border border-amber-300 px-4 py-2 rounded-lg text-xs font-bold uppercase flex items-center gap-2 h-fit">
            <span className="material-symbols-outlined text-lg">science</span>
            Demo Only • Research Prototype • Non-Diagnostic
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Panel: Controls */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <span className="font-semibold text-slate-900">1. Select Screening Case</span>

              <div className="flex flex-col gap-3">
                <label className="w-full cursor-pointer group">
                  <div className="w-full p-4 rounded-xl border-2 border-dashed border-slate-200 group-hover:border-primary transition-all flex items-center justify-center gap-3 bg-slate-50 hover:bg-primary/5">
                    <span className="material-symbols-outlined text-slate-400 group-hover:text-primary">upload_file</span>
                    <span className="text-sm font-medium text-slate-600 group-hover:text-primary">Upload Fundus Image</span>
                    <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                  </div>
                </label>

                <div className="grid grid-cols-1 gap-3">
                  {Object.entries(demoScreeningResults).map(([id, sample]) => (
                    <button
                      key={id}
                      onClick={() => handleUseSample(id)}
                      className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between border ${
                        selectedSampleId === id ? 'border-primary bg-primary/5' : 'border-slate-100 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-slate-200 overflow-hidden">
                          <img src={sample.image} alt="thumb" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-sm font-medium text-slate-700">{sample.title}</span>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${sample.badgeColor}`}>{sample.badge}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-col gap-4">
              <button
                disabled={!selectedImage || isAnalyzing}
                onClick={startAnalysis}
                className={`w-full py-4 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 shadow-lg ${
                  !selectedImage || isAnalyzing ? 'bg-slate-300 cursor-not-allowed' : 'bg-primary hover:bg-primary-container'
                }`}
              >
                <span className="material-symbols-outlined">{isAnalyzing ? 'hourglass_top' : 'play_arrow'}</span>
                {isAnalyzing ? 'Processing Pipeline...' : 'Run Diagnostic Inference'}
              </button>
              <span className="text-center text-[10px] font-mono text-slate-400">Execution Target: BACKEND AI ENGINE <br /> </span>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl flex flex-col gap-3 border border-slate-200">
              <span className="text-xs font-bold uppercase text-slate-500">Diagnostic View Mode</span>
              <div className="grid grid-cols-3 gap-2 p-1 bg-slate-200 rounded-lg">
                {['fundus', 'gradcam', 'lesion'].map(mode => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`py-1.5 rounded text-xs font-semibold capitalize transition-all ${
                      viewMode === mode ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel: Visualizer */}
          <div className="lg:col-span-8 flex flex-col md:flex-row gap-8 items-stretch">
            <div className="w-full md:w-3/5 bg-[#213145] rounded-3xl overflow-hidden relative flex items-center justify-center min-h-[400px] shadow-2xl">
              {previewUrl ? (
                <>
                  {(() => {
                    let displayUrl = previewUrl;
                    if (viewMode === 'gradcam' && analysisResult?.explainability?.gradcamUrl) {
                      displayUrl = analysisResult.explainability.gradcamUrl;
                    } else if (viewMode === 'lesion' && analysisResult?.explainability?.lesionUrl) {
                      displayUrl = analysisResult.explainability.lesionUrl;
                    }
                    return <img src={displayUrl} alt="Retinal Scan" className="w-full h-full object-cover transition-all duration-500" />;
                  })()}

                  

                  


                  {viewMode === 'gradcam' && !analysisResult?.explainability?.gradcamUrl && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm text-white text-xs font-medium">
                      Run analysis to generate Grad-CAM
                    </div>
                  )}

                  {viewMode === 'lesion' && !analysisResult?.explainability?.lesionUrl && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm text-white text-xs font-medium">
                      Lesion Mapping Unavailable
                    </div>
                  )}

                  {step === 'processing' && (
                    <div className="absolute inset-x-0 h-1 bg-cyan-400 shadow-[0_0_15px_#22d3ee] animate-scan" />
                  )}
                  {step === 'quality' && (
                    <div className="absolute inset-0 bg-black/85 backdrop-blur-sm p-8 flex flex-col items-center justify-center text-center gap-4 text-white">
                      <div className="w-16 h-16 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center">
                        <span className="material-symbols-outlined text-4xl">cancel</span>
                      </div>
                      <span className="text-2xl font-bold">Image Quality Insufficient</span>
                      <p className="text-white/70 max-w-xs text-sm">
                        {analysisResult?.imageQuality?.metrics?.sharpness || 'Low quality'} detected. Please recapture the fundus image.
                      </p>
                      <button onClick={() => setStep('upload')} className="bg-red-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-600 transition-all">
                        Recapture Image
                      </button>
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-black/70 backdrop-blur px-3 py-1 rounded text-white text-[10px] font-mono flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                    <span className="capitalize">Mode: {viewMode}</span>
                  </div>
                </>
              ) : (
                <div className="text-white/30 flex flex-col items-center gap-2">
                  <span className="material-symbols-outlined text-5xl">image</span>
                  <span className="text-sm font-medium">Upload an image to start analysis</span>
                </div>
              )}
            </div>

            <div className="w-full md:w-2/5 flex flex-col gap-6">
              {step === 'processing' ? (
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex flex-col gap-6">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <span className="text-xs font-bold uppercase text-slate-400">Analysis Pipeline</span>
                    <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-[10px] font-bold">Processing...</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    {stages.map((stage, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm">
                        <span className={`material-symbols-outlined text-lg ${i <= processStage ? 'text-emerald-500' : 'text-slate-300'}`}>
                          {i < processStage ? 'check_circle' : i === processStage ? 'sync' : 'radio_button_unchecked'}
                        </span>
                        <span className={`${i <= processStage ? 'text-slate-900 font-medium' : 'text-slate-400'}`}>{stage}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : step === 'result' && analysisResult ? (
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex flex-col gap-6">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <span className="text-xs font-bold uppercase text-slate-400">Analysis Output</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      analysisResult.prediction?.classification === 'Referable DR' ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-900'
                    }`}>
                      {analysisResult.prediction?.classification === 'Referable DR' ? 'REFERRAL RECOMMENDED' : 'MONITORING ADVISED'}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-slate-500">Predicted Severity:</span>
                    <h3 className="text-xl font-bold text-slate-900">{analysisResult.prediction?.severity || 'N/A'}</h3>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-500">Model Confidence</span>
                      <span className="text-primary font-bold">{( (analysisResult.prediction?.confidence || 0) * 100).toFixed(2)}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-primary h-full transition-all duration-1000"
                        style={{ width: `${(analysisResult.prediction?.confidence || 0) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold uppercase text-slate-400">Morphological Findings</span>
                    <div className="flex flex-col gap-2">
                      {analysisResult.evidence && Object.entries(analysisResult.evidence).map(([key, val]) => (
                        <div key={key} className="flex items-center gap-2 text-xs text-slate-700">
                          <span className={`material-symbols-outlined text-sm ${val.detected ? 'text-emerald-500' : 'text-slate-300'}`}>
                            {val.detected ? 'check_circle' : 'cancel'}
                          </span>
                          <span>{val.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 flex flex-col gap-2 border border-slate-100">
                    <span className="font-semibold text-slate-900 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm text-primary">psychology</span>
                      Grad-CAM Attribution:
                    </span>
                    <p className="leading-relaxed">{analysisResult.explainability?.reasoning || 'No reasoning available'}</p>
                  </div>
                  <div className="flex flex-col gap-2 pt-2">
                    <button
                      className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2"
                      onClick={() => setShowReport(true)}
                    >
                      <span className="material-symbols-outlined text-sm">description</span>
                      View Clinical Report
                    </button>
                    <button className="w-full py-2 bg-primary hover:bg-primary-container text-white text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-md">
                      <span className="material-symbols-outlined text-sm">forward_to_inbox</span>
                      Route to Ophthalmologist
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-50 p-8 rounded-3xl border border-dashed border-slate-300 flex flex-col items-center justify-center text-center gap-4 text-slate-400">
                  <span className="material-symbols-outlined text-4xl">analytics</span>
                  <span className="text-sm font-medium">
                    {selectedImage ? "Sample selected — Ready for Analysis" : "Awaiting Image Upload..."}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showReport && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => setShowReport(false)}
              className="absolute -top-12 right-0 text-white hover:text-primary transition-colors flex items-center gap-2 font-bold"
            >
              <span className="material-symbols-outlined">close</span> Close Report
            </button>
            <Report data={analysisResult} />
          </div>
        </div>
      )}

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

export default Demo;
