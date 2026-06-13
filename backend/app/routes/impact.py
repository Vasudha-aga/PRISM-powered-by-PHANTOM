from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class ImpactResponse(BaseModel):
    carbon_saved: float
    waste_diverted: int
    products_reused: int
    green_credits: int
    trees_equivalent: float


@router.get("/impact", response_model=ImpactResponse)
async def impact():
    """Returns sustainability metrics."""
    return ImpactResponse(
        carbon_saved=3.2,
        waste_diverted=1,
        products_reused=1,
        green_credits=50,
        trees_equivalent=0.15,
    )
