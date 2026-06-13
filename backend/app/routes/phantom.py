import random

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class PhantomRequest(BaseModel):
    product_name: str
    category: str
    condition_description: str
    return_reason: str


class PhantomResponse(BaseModel):
    score: int
    condition_score: int
    demand_score: int
    resale_value: int
    repair_cost: int
    return_reason_score: int
    sustainability_score: int
    asset_class: str


def _get_grade(condition: str) -> str:
    condition = condition.lower()
    if "new" in condition or "perfect" in condition:
        return "A"
    elif "minor" in condition or "scratch" in condition:
        return "B"
    elif "moderate" in condition or "worn" in condition:
        return "C"
    elif "broken" in condition or "damaged" in condition:
        return "D"
    return "B"


@router.post("/phantom", response_model=PhantomResponse)
async def phantom(request: PhantomRequest):
    """Calculate PHANTOM score for a returned product."""
    grade = _get_grade(request.condition_description)
    category = request.category.lower()
    reason = request.return_reason.lower()

    # Condition score out of 30
    condition_scores = {"A": 28, "B": 22, "C": 15, "D": 8}
    condition_score = condition_scores.get(grade, 15)

    # Demand score out of 20
    if "electronic" in category:
        demand_score = 18
    elif "clothing" in category or "apparel" in category:
        demand_score = 15
    elif "book" in category:
        demand_score = 10
    else:
        demand_score = 12

    # Resale value out of 20
    resale_values = {"A": 19, "B": 15, "C": 10, "D": 5}
    resale_value = resale_values.get(grade, 10)

    # Repair cost out of 10 (higher = less repair needed)
    repair_costs = {"A": 10, "B": 8, "C": 5, "D": 2}
    repair_cost = repair_costs.get(grade, 5)

    # Return reason score out of 10
    if "color" in reason or "size" in reason:
        return_reason_score = 9
    elif "defect" in reason or "broken" in reason:
        return_reason_score = 3
    else:
        return_reason_score = 6

    # Sustainability score out of 10
    sustainability_score = random.randint(8, 10)

    # Total PHANTOM score
    score = (
        condition_score
        + demand_score
        + resale_value
        + repair_cost
        + return_reason_score
        + sustainability_score
    )

    # Asset classification
    if score > 80:
        asset_class = "HIGH VALUE ASSET"
    elif score >= 50:
        asset_class = "MEDIUM VALUE ASSET"
    else:
        asset_class = "LOW VALUE ASSET"

    return PhantomResponse(
        score=score,
        condition_score=condition_score,
        demand_score=demand_score,
        resale_value=resale_value,
        repair_cost=repair_cost,
        return_reason_score=return_reason_score,
        sustainability_score=sustainability_score,
        asset_class=asset_class,
    )
