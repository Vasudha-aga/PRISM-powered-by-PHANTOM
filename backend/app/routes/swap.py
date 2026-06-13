from fastapi import APIRouter, Query
from pydantic import BaseModel
from typing import Optional

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


CITY_MAP = {
    "electronics": "Bangalore",
    "clothing": "Mumbai",
    "apparel": "Mumbai",
    "footwear": "Delhi",
}

NO_MATCH_KEYWORDS = ["broken", "damaged", "not working"]


@router.get("/swap", response_model=SwapResponse)
async def swap(
    product_name: str = Query(default="Unknown Product"),
    category: str = Query(default="Other"),
    condition_description: Optional[str] = Query(default=None),
):
    """Returns a SWAP match based on product, category, and condition."""
    category_lower = category.lower()

    # Determine city based on category
    city = "Hyderabad"
    for key, value in CITY_MAP.items():
        if key in category_lower:
            city = value
            break

    # Check if condition is too poor for a match
    if condition_description:
        condition_lower = condition_description.lower()
        if any(keyword in condition_lower for keyword in NO_MATCH_KEYWORDS):
            return SwapResponse(
                match_found=False,
                match_confidence=0,
                product=product_name,
                buyer_city=city,
                seller_city=city,
                logistics_saved=0,
                carbon_saved=0.0,
                status="No Match Available - Product Condition Too Poor",
            )

    return SwapResponse(
        match_found=True,
        match_confidence=92,
        product=product_name,
        buyer_city=city,
        seller_city=city,
        logistics_saved=120,
        carbon_saved=2.4,
        status="Warehouse Bypassed",
    )
