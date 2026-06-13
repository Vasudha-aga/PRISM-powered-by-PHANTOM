from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import analyze, phantom, decision, passport, impact, swap

app = FastAPI(
    title="PRISM powered by PHANTOM",
    description="Intelligence analysis and decision support API",
    version="0.1.0",
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(analyze.router, tags=["Analyze"])
app.include_router(phantom.router, tags=["Phantom"])
app.include_router(decision.router, tags=["Decision"])
app.include_router(passport.router, tags=["Passport"])
app.include_router(impact.router, tags=["Impact"])
app.include_router(swap.router, tags=["Swap"])


@app.get("/")
async def root():
    return {
        "app": "PRISM powered by PHANTOM",
        "status": "operational",
        "version": "0.1.0",
    }


@app.get("/health")
async def health_check():
    return {"status": "healthy"}
