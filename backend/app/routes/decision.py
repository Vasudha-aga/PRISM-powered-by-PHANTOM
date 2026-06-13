from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class DecisionRequest(BaseModel):
    phantom_score: int
    grade: str
    category: str


class DecisionResponse(BaseModel):
    decision: str
    confidence: int
    reasons: list[str]
    carbon_saved: float
    green_credits: int
    reasoning: list[str]


@router.post("/decision", response_model=DecisionResponse)
async def decision(request: DecisionRequest):
    """Generate a routing decision based on PHANTOM score and grade."""
    score = request.phantom_score

    if score > 80:
        decision_val = "RESALE"
        confidence = 95
        reasons = [
            "High PHANTOM score indicates excellent resale potential",
            "Product condition supports premium listing",
            "Strong market demand in this category",
        ]
        carbon_saved = 4.2
        green_credits = 10
        reasoning = [
            "PHANTOM score exceeds resale threshold",
            "Condition supports premium listing",
            "High market demand confirmed",
        ]

    elif score >= 60:
        decision_val = "REFURBISH"
        confidence = 85
        reasons = [
            "Moderate score with recoverable condition",
            "Refurbishment can restore product value",
            "Category has active secondary market",
        ]
        carbon_saved = 2.8
        green_credits = 7
        reasoning = [
            "Moderate PHANTOM score",
            "Minor refurbishment recommended",
            "Good recovery potential",
        ]

    elif score >= 40:
        decision_val = "RECYCLE"
        confidence = 78
        reasons = [
            "Low commercial value",
            "Recycling recovers raw material value",
            "Components can be repurposed",
        ]
        carbon_saved = 1.5
        green_credits = 4
        reasoning = [
            "Low commercial value",
            "Recycling recovers raw material value",
        ]

    else:
        decision_val = "RECYCLE"
        confidence = 70
        reasons = [
            "Product beyond economical repair",
            "Recycling recovers raw material value",
            "Responsible disposal minimizes environmental impact",
        ]
        carbon_saved = 0.9
        green_credits = 2
        reasoning = [
            "Product beyond economical repair",
            "Recycling recovers raw material value",
        ]

    return DecisionResponse(
        decision=decision_val,
        confidence=confidence,
        reasons=reasons,
        carbon_saved=carbon_saved,
        green_credits=green_credits,
        reasoning=reasoning,
    )
