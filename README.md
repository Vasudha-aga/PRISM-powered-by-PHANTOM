# PRISM Powered by PHANTOM

**PRISM** (Product Recovery Intelligence & Sustainability Mechanism) powered by **PHANTOM** (Predictive Heuristic Asset Navigation & Transition Optimization Matrix) is an intelligent, AI-driven platform designed to solve the global problem of product returns and e-waste.

By leveraging advanced heuristics, PRISM inspects, scores, and optimally routes returned products to their most sustainable and economically viable next lifecycle phase—whether that be Resale, Refurbishment, Donation, or Recycling.

<br/>

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=nextdotjs" alt="Next.js" />
  <img src="https://img.shields.io/badge/FastAPI-0.109-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Python-3.10-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" />
  <img src="https://img.shields.io/badge/Framer_Motion-11.0-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Zustand-4.5-black?style=for-the-badge&logo=react" alt="Zustand" />
</div>

---

## 🌟 Key Features

1. **AI Product Inspection** (`/inspection`)
   - Upload product images and details.
   - Automatically determine product condition and grade.
2. **PHANTOM Score Analysis** (`/analysis`)
   - Calculates a proprietary PHANTOM score based on condition, market demand, repairability, and environmental impact.
   - Beautiful, mathematical UI visualizations of heuristic data.
3. **Decision Engine** (`/decision`)
   - Intelligently routes products to the optimal recovery path (e.g., "RESELL AS NEW", "DIRECT SWAP", "RECYCLE").
   - Computes confidence intervals and carbon savings per decision.
4. **Product DNA Passport** (`/passport`)
   - An immutable timeline tracking the product's journey from initial purchase to its sustainable recovery.
5. **Direct Swap Network** (`/swap`)
   - Bypasses centralized warehouses by matching return origins directly with local demand (Peer-to-Peer).
6. **Sustainability Impact** (`/impact`)
   - Quantifies the environmental effect of PRISM decisions.
   - Tracks total carbon prevented, waste diverted, and green credits earned.

---

## 🏗️ Architecture & Tech Stack

PRISM is built on a modern, decoupled architecture ensuring extreme performance, beautiful UX, and a robust data pipeline.

### Frontend (User Interface)
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Custom CSS Variables (Glassmorphism)
- **Animations:** Framer Motion & GSAP
- **State Management:** Zustand
- **Icons:** Lucide React

### Backend (API & Decision Engine)
- **Framework:** FastAPI (Python 3.10+)
- **Server:** Uvicorn
- **Validation:** Pydantic
- **CORS Management:** Built-in FastAPI CORSMiddleware
- **API Documentation:** Auto-generated Swagger UI (`/docs`)

---

## 🚀 Getting Started

Follow these instructions to get the PRISM ecosystem running on your local machine.

### 1. Clone the Repository
```bash
git clone <repository-url>
cd prism-powered-by-phantom
```

### 2. Backend Setup
The FastAPI backend runs on `localhost:8000`.

```bash
cd backend

# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the server
uvicorn app.main:app --reload
```
*The API will be available at http://127.0.0.1:8000*
*Swagger Documentation available at http://127.0.0.1:8000/docs*

### 3. Frontend Setup
The Next.js frontend runs on `localhost:3000`.

```bash
cd frontend

# Install dependencies
npm install

# Set up environment variables
# Create a .env.local file in the frontend directory
echo "NEXT_PUBLIC_API_URL=http://127.0.0.1:8000" > .env.local

# Run the development server
npm run dev
```
*The application will be available at http://localhost:3000*

---

## 📂 Project Structure

```
prism-powered-by-phantom/
│
├── backend/                  # FastAPI Application
│   ├── app/
│   │   ├── main.py           # Application entry point
│   │   ├── routes/           # API Endpoints (analyze, phantom, etc.)
│   │   ├── models/           # Pydantic schemas
│   │   └── services/         # Core business logic & ML mocks
│   ├── requirements.txt
│   └── .env.example
│
├── frontend/                 # Next.js Application
│   ├── src/
│   │   ├── app/              # Next.js App Router pages
│   │   ├── components/       # Reusable UI & Layout components
│   │   ├── store/            # Zustand global state
│   │   ├── services/         # Axios API clients
│   │   └── types/            # TypeScript interfaces
│   ├── tailwind.config.ts
│   └── package.json
│
├── .gitignore
└── README.md
```

