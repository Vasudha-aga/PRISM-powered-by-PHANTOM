"""Shared Pydantic response models for PRISM API."""

from pydantic import BaseModel


class AnalyzeResponse(BaseModel):
    grade: str
    confidence: int
    damage: str
    summary: str


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


class DecisionResponse(BaseModel):
    decision: str
    confidence: int
    reasons: list[str]
    carbon_saved: float
    green_credits: int
    reasoning: list[str]
