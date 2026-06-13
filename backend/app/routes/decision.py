import random

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


@router.post("/decision", response_model=DecisionResponse)
async def decision(request: DecisionRequest):
    """Generate a routing decision based on PHANTOM score and grade."""
    score = request.phantom_score
    grade = request.grade.upper()
    category = request.category.lower()

    if score > 80:
        decision = "RESELL AS NEW"
        confidence = random.randint(90, 98)
        reasons = [
            "High PHANTOM score indicates excellent resale potential",
            "Product condition supports premium listing",
            "Strong market demand in this category",
        ]
        carbon_saved = round(random.uniform(3.0, 5.0), 2)
        green_credits = random.randint(8, 12)

    elif score >= 50:
        if grade in ("A", "B"):
            decision = "REFURBISH AND RESELL"
            confidence = random.randint(78, 88)
            reasons = [
                "Moderate score with good base condition",
                "Refurbishment can restore product value",
                "Category has active secondary market",
            ]
            carbon_saved = round(random.uniform(2.0, 3.5), 2)
            green_credits = random.randint(5, 8)
        else:
            decision = "RECYCLE COMPONENTS"
            confidence = random.randint(70, 82)
            reasons = [
                "Product condition limits resale viability",
                "Valuable components can be recovered",
                "Recycling maximizes material recovery",
            ]
            carbon_saved = round(random.uniform(1.5, 2.5), 2)
            green_credits = random.randint(4, 6)

    else:
        decision = "DISPOSE RESPONSIBLY"
        confidence = random.randint(60, 72)
        reasons = [
            "Low PHANTOM score indicates limited recovery value",
            "Repair costs exceed potential resale value",
            "Responsible disposal minimizes environmental impact",
        ]
        carbon_saved = round(random.uniform(0.5, 1.5), 2)
        green_credits = random.randint(1, 3)

    return DecisionResponse(
        decision=decision,
        confidence=confidence,
        reasons=reasons,
        carbon_saved=carbon_saved,
        green_credits=green_credits,
    )
