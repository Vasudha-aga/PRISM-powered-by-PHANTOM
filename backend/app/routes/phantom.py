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
    reasoning: list[str]


# Score maps
RESALE_VALUES = {"A": 19, "B": 15, "C": 10, "D": 5}
REPAIR_COSTS = {"A": 10, "B": 8, "C": 5, "D": 2}

DEMAND_SCORES = {
    "electronics": 18,
    "clothing": 15,
    "apparel": 15,
    "footwear": 16,
    "books": 10,
}

SUSTAINABILITY_SCORES = {
    "electronics": 8,
    "clothing": 10,
    "apparel": 10,
    "footwear": 9,
    "books": 9,
}


def _get_grade_and_condition_score(condition: str) -> tuple[str, int]:
    """Determine grade and condition_score from condition_description keywords."""
    condition = condition.lower()

    if any(kw in condition for kw in ["new", "unused", "perfect", "tags"]):
        return "A", 28
    elif any(kw in condition for kw in ["minor", "scratch", "small", "light"]):
        return "B", 22
    elif any(kw in condition for kw in ["moderate", "worn", "stain", "used"]):
        return "C", 15
    elif any(kw in condition for kw in ["broken", "damaged", "defective", "not working"]):
        return "D", 8
    return "B", 22


def _get_demand_score(category: str) -> int:
    category = category.lower()
    for key, value in DEMAND_SCORES.items():
        if key in category:
            return value
    return 12


def _get_sustainability_score(category: str) -> int:
    category = category.lower()
    for key, value in SUSTAINABILITY_SCORES.items():
        if key in category:
            return value
    return 9


def _get_return_reason_score(reason: str) -> int:
    reason = reason.lower()
    if "color" in reason or "size" in reason or "fit" in reason:
        return 9
    elif "defect" in reason or "broken" in reason:
        return 3
    return 6


@router.post("/phantom", response_model=PhantomResponse)
async def phantom(request: PhantomRequest):
    """Calculate PHANTOM score for a returned product."""
    grade, condition_score = _get_grade_and_condition_score(request.condition_description)
    reason = request.return_reason.lower()

    demand_score = _get_demand_score(request.category)
    resale_value = RESALE_VALUES[grade]
    repair_cost = REPAIR_COSTS[grade]
    return_reason_score = _get_return_reason_score(request.return_reason)
    sustainability_score = _get_sustainability_score(request.category)

    score = (
        condition_score
        + demand_score
        + resale_value
        + repair_cost
        + return_reason_score
        + sustainability_score
    )

    # Clamp Grade B to 65-75 range
    if grade == "B":
        score = max(65, min(score, 75))

    # Ensure Grade D stays below 45
    if grade == "D" and score >= 45:
        score = 44

    # Asset classification
    if score > 80:
        asset_class = "HIGH VALUE ASSET"
    elif score >= 50:
        asset_class = "MEDIUM VALUE ASSET"
    else:
        asset_class = "LOW VALUE ASSET"

    # Build reasoning
    reasoning = []
    if demand_score >= 15:
        reasoning.append("High market demand in this category")
    if "color" in reason or "size" in reason or "fit" in reason:
        reasoning.append("Return reason unrelated to product defect")
    if grade in ("A", "B"):
        reasoning.append("Excellent product condition detected")
    if grade == "C":
        reasoning.append("Moderate wear detected, refurbishment potential")
    if grade == "D":
        reasoning.append("Severe product damage limits recovery options")
    if sustainability_score > 8:
        reasoning.append("Strong sustainability recovery potential")

    return PhantomResponse(
        score=score,
        condition_score=condition_score,
        demand_score=demand_score,
        resale_value=resale_value,
        repair_cost=repair_cost,
        return_reason_score=return_reason_score,
        sustainability_score=sustainability_score,
        asset_class=asset_class,
        reasoning=reasoning,
    )
