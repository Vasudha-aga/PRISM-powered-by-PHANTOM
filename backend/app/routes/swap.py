from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class SwapResponse(BaseModel):
    match_found: bool
    match_confidence: int
    product: str
    buyer_city: str
    seller_city: str
    logistics_saved: int
    carbon_saved: float
    status: str


@router.get("/swap", response_model=SwapResponse)
async def swap():
    """Returns a simulated SWAP match."""
    return SwapResponse(
        match_found=True,
        match_confidence=92,
        product="Red Kurta - Size M",
        buyer_city="Mumbai",
        seller_city="Mumbai",
        logistics_saved=120,
        carbon_saved=2.4,
        status="Warehouse Bypassed",
    )
