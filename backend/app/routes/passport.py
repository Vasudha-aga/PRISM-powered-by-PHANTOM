from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class TimelineStage(BaseModel):
    stage: str
    status: str


class PassportResponse(BaseModel):
    timeline: list[TimelineStage]


@router.get("/passport", response_model=PassportResponse)
async def passport():
    """Returns the product lifecycle timeline."""
    return PassportResponse(
        timeline=[
            TimelineStage(stage="Purchased", status="completed"),
            TimelineStage(stage="Delivered", status="completed"),
            TimelineStage(stage="Returned", status="completed"),
            TimelineStage(stage="AI Inspected", status="completed"),
            TimelineStage(stage="PHANTOM Analyzed", status="completed"),
            TimelineStage(stage="Approved for Resale", status="active"),
            TimelineStage(stage="Second Life Achieved", status="pending"),
        ]
    )
