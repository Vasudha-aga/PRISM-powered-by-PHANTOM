# PRISM powered by PHANTOM

An AI-driven reverse logistics platform that intelligently grades returned products, scores their recovery potential, and routes them toward the most sustainable outcome — resale, refurbishment, or recycling.

**🟢 Live Demo:** [https://prism-powered-by-phantom.vercel.app](https://prism-powered-by-phantom.vercel.app)

## What It Does

1. **AI Inspection** — Accepts product details and optional image upload, grades condition (A/B/C/D) with confidence scoring.
2. **PHANTOM Scoring** — Computes a composite score (out of 100) based on condition, market demand, resale value, repair cost, return reason, and sustainability.
3. **Decision Engine** — Routes the product to RESALE, REFURBISH, or RECYCLE based on the PHANTOM score.
4. **Product Passport** — Generates a lifecycle timeline (DNA) tracking the product from purchase to recovery.
5. **SWAP Network** — Matches returned products directly with local buyers, bypassing centralized warehouses.
6. **Impact Dashboard** — Tracks sustainability metrics like carbon saved, waste diverted, and green credits.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion, Zustand |
| Backend | FastAPI, Python, Pydantic, Pillow |
| State Management | Zustand |
| HTTP Client | Axios |

## How to Run

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Backend runs at: `http://localhost:8000`
API docs (Swagger): `http://localhost:8000/docs`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: `http://localhost:3000`

### Environment Variables

Copy the example env file in the backend:
```bash
cp backend/.env.example backend/.env
```

For the frontend, create `frontend/.env.local`:
```
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/analyze` | Grade a returned product (multipart form-data with optional image) |
| POST | `/phantom` | Calculate PHANTOM composite score |
| POST | `/decision` | Get routing decision (RESALE / REFURBISH / RECYCLE) |
| GET | `/passport?decision=` | Product lifecycle timeline |
| GET | `/impact` | Sustainability metrics |
| GET | `/swap?product_name=&category=&condition_description=` | Find direct swap match |
| GET | `/health` | Health check |

## Project Structure

```
├── backend/
│   ├── app/
│   │   ├── main.py           # FastAPI app entry point
│   │   ├── routes/           # API route handlers
│   │   ├── models/           # Pydantic schemas
│   │   ├── services/         # Business logic (scoring)
│   │   └── utils/            # Shared helpers
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── app/              # Next.js pages
│   │   ├── components/       # UI components
│   │   ├── services/         # API client
│   │   ├── store/            # Zustand state
│   │   └── types/            # TypeScript types
│   └── package.json
└── README.md
```

## Team

| Name | Role |
|------|------|
| **Vasudha** | Frontend Development |
| **Ekta** | Backend Development |
