"""Utility helpers shared across PRISM routes."""

from PIL import Image
import io


def get_grade_from_condition(condition: str) -> tuple[str, str]:
    """Determine product grade and damage description from condition text.

    Returns:
        Tuple of (grade, damage_description)
    """
    condition = condition.lower()

    if "new" in condition or "perfect" in condition:
        return "A", "No visible damage"
    elif "minor" in condition or "scratch" in condition:
        return "B", "Minor cosmetic wear"
    elif "moderate" in condition or "worn" in condition:
        return "C", "Moderate wear and tear"
    elif "broken" in condition or "damaged" in condition:
        return "D", "Significant damage detected"
    return "B", "Minor wear assumed"


def calculate_image_boost(image_bytes: bytes) -> int:
    """Analyze uploaded image and return a deterministic confidence boost.

    Args:
        image_bytes: Raw bytes of the uploaded image.

    Returns:
        Integer confidence boost value (3 or 5).
    """
    try:
        img = Image.open(io.BytesIO(image_bytes))
        width, height = img.size
        mode = img.mode

        if width >= 800 and height >= 800 and mode == "RGB":
            return 5
        return 3
    except Exception:
        return 0
