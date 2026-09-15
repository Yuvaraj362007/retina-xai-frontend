# RETINA-XAI: Explainable AI for Diabetic Retinopathy Screening

## 🏥 Project Overview
**RETINA-XAI** is a medical imaging prototype developed for the **Smart India Hackathon 2026**. The project aims to solve the critical shortage of ophthalmologists in rural India by providing an AI-assisted screening tool that doesn't just predict a result, but provides **visual evidence** (via Grad-CAM) to the clinician.

The goal is to create a "transparent" AI pipeline that identifies Referable Diabetic Retinopathy (DR) and highlights the morphological features (Microaneurysms, Hemorrhages, Exudates) driving the diagnosis.

## 🚀 Frontend Technology Stack
- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Icons:** Google Material Symbols Outlined
- **Typography:** Inter (Google Fonts)

## 🛠️ Installation & Local Setup
1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd retina-xai-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to `http://localhost:5173` (or the port shown in your terminal).

## 🧪 Demo Functionality
The frontend currently implements a full simulation of the clinical pipeline:
- **Fundus Image Upload:** Support for JPG, JPEG, and PNG.
- **Quality Guard:** Simulated AI check for blur and illumination.
- **Processing Pipeline:** Visual simulation of CLAHE enhancement and Lesion Analysis.
- **Result Dashboard:** Displays ICDR severity, confidence score, and morphological findings.
- **Explainability Viewer:** Toggle between Raw Fundus, Grad-CAM Heatmaps, and Lesion ROI boxes.
- **Clinical Report:** Generates a professional triage dossier for physician review.
- **Pilot Inquiry:** A validated form for government/clinical partners.

## 📂 Architecture & Backend Integration
To maintain strict separation of concerns, the frontend is designed to be backend-agnostic:

- **Mock Data:** All simulated clinical results are centralized in `src/data/mockData.js`.
- **API Service Layer:** All communication is handled via `src/services/api.js`. 

**To connect a real backend:** 
Replace the simulated promises in `api.js` with real `fetch` or `axios` calls to the AI inference server (MATLAB/Python).

## ⚠️ Medical Disclaimer
*This project is a research and demonstration prototype for the Smart India Hackathon 2026. It is NOT a medical device and should NOT be used for actual clinical diagnosis. All predictions must be verified by a certified ophthalmologist.*
