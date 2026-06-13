from fastapi import APIRouter, Query
from pydantic import BaseModel

router = APIRouter()


class ImpactResponse(BaseModel):
    carbon_saved: float
    waste_diverted: int
    products_reused: int
    green_credits: int
    trees_equivalent: float


@router.get("/impact", response_model=ImpactResponse)
async def impact(
    phantom_score: int = Query(default=50),
    decision: str = Query(default="Resale"),
    category: str = Query(default="Other"),
):
    """Returns dynamic sustainability metrics based on PHANTOM score and decision."""
    carbon_saved = round(phantom_score * 0.035, 1)
    trees_equivalent = round(carbon_saved * 0.05, 2)
    green_credits = phantom_score // 2
    waste_diverted = 1
    products_reused = 1 if decision.lower() != "recycle" else 0

    return ImpactResponse(
        carbon_saved=carbon_saved,
        waste_diverted=waste_diverted,
        products_reused=products_reused,
        green_credits=green_credits,
        trees_equivalent=trees_equivalent,
    )
