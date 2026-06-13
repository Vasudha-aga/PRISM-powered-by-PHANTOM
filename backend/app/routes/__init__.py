"""
PRISM API route modules.
Each module defines endpoints for a specific domain of the platform.
"""

from app.routes import analyze, phantom, decision, passport, impact, swap

__all__ = ["analyze", "phantom", "decision", "passport", "impact", "swap"]
