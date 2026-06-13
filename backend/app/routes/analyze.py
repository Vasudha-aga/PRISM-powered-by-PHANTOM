from typing import Optional

from fastapi import APIRouter, File, Form, UploadFile
from pydantic import BaseModel
from PIL import Image
import io

router = APIRouter()


class AnalyzeResponse(BaseModel):
    grade: str
    confidence: int
    damage: str
    summary: str


CONFIDENCE_MAP = {"A": 96, "B": 88, "C": 79, "D": 65}


@router.post("/analyze", response_model=AnalyzeResponse)
async def analyze(
    product_name: str = Form(...),
    category: str = Form(...),
    return_reason: str = Form(...),
    condition_description: str = Form(...),
    image: Optional[UploadFile] = File(None),
):
    """Analyze returned product condition and assign a grade."""
    condition = condition_description.lower()
    image_boost = 0

    # If image uploaded, add flat +3 boost
    if image:
        try:
            contents = await image.read()
            Image.open(io.BytesIO(contents))  # validate it's a real image
            image_boost = 3
        except Exception:
            image_boost = 0

    # Grade based on condition keywords
    if "new" in condition or "perfect" in condition:
        grade = "A"
        damage = "No visible damage"
    elif "minor" in condition or "scratch" in condition:
        grade = "B"
        damage = "Minor cosmetic wear"
    elif "moderate" in condition or "worn" in condition:
        grade = "C"
        damage = "Moderate wear and tear"
    elif "broken" in condition or "damaged" in condition:
        grade = "D"
        damage = "Significant damage detected"
    else:
        grade = "B"
        damage = "Minor wear assumed"

    # Deterministic confidence, cap at 99
    confidence = min(CONFIDENCE_MAP[grade] + image_boost, 99)

    summary = (
        f"{product_name} ({category}) graded as {grade}. "
        f"Return reason: {return_reason}. Condition: {damage}."
    )
    if image_boost > 0:
        summary += " Image analysis contributed to confidence."

    return AnalyzeResponse(
        grade=grade,
        confidence=confidence,
        damage=damage,
        summary=summary,
    )
