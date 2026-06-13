from fastapi import APIRouter, Query
from pydantic import BaseModel
from typing import Optional

router = APIRouter()


class TimelineStage(BaseModel):
    stage: str
    status: str


class PassportResponse(BaseModel):
    timeline: list[TimelineStage]


@router.get("/passport", response_model=PassportResponse)
async def passport(
    decision: Optional[str] = Query(default=None),
):
    """Returns the product lifecycle timeline based on decision."""
    # First 5 stages are always the same
    timeline = [
        TimelineStage(stage="Purchased", status="completed"),
        TimelineStage(stage="Delivered", status="completed"),
        TimelineStage(stage="Returned", status="completed"),
        TimelineStage(stage="AI Inspected", status="completed"),
        TimelineStage(stage="PHANTOM Analyzed", status="completed"),
    ]

    # 6th stage depends on decision
    if decision:
        decision_lower = decision.lower()
        if "resale" in decision_lower or "resell" in decision_lower:
            timeline.append(TimelineStage(stage="Approved for Resale", status="active"))
            timeline.append(TimelineStage(stage="Second Life Achieved", status="pending"))
        elif "refurbish" in decision_lower:
            timeline.append(TimelineStage(stage="Sent for Refurbishment", status="active"))
            timeline.append(TimelineStage(stage="Second Life Achieved", status="pending"))
        elif "recycle" in decision_lower:
            timeline.append(TimelineStage(stage="Sent for Recycling", status="active"))
            timeline.append(TimelineStage(stage="Materials Recovered", status="pending"))
        else:
            timeline.append(TimelineStage(stage="Approved for Resale", status="active"))
            timeline.append(TimelineStage(stage="Second Life Achieved", status="pending"))
    else:
        timeline.append(TimelineStage(stage="Approved for Resale", status="active"))
        timeline.append(TimelineStage(stage="Second Life Achieved", status="pending"))

    return PassportResponse(timeline=timeline)
