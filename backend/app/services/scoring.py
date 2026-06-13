"""PHANTOM scoring service — deterministic scoring logic."""


class PhantomScorer:
    """Calculates the composite PHANTOM score for a returned product."""

    CONDITION_SCORES = {"A": 28, "B": 22, "C": 15, "D": 8}
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

    def __init__(self, grade: str, category: str, return_reason: str):
        self.grade = grade.upper()
        self.category = category.lower()
        self.reason = return_reason.lower()

    def condition_score(self) -> int:
        """Score out of 30 based on product grade."""
        return self.CONDITION_SCORES.get(self.grade, 15)

    def demand_score(self) -> int:
        """Score out of 20 based on category demand."""
        for key, value in self.DEMAND_SCORES.items():
            if key in self.category:
                return value
        return 12

    def resale_value(self) -> int:
        """Score out of 20 based on resale potential."""
        return self.RESALE_VALUES.get(self.grade, 10)

    def repair_cost(self) -> int:
        """Score out of 10 (higher = less repair needed)."""
        return self.REPAIR_COSTS.get(self.grade, 5)

    def return_reason_score(self) -> int:
        """Score out of 10 based on return reason."""
        if "color" in self.reason or "size" in self.reason or "fit" in self.reason:
            return 9
        elif "defect" in self.reason or "broken" in self.reason:
            return 3
        return 6

    def sustainability_score(self) -> int:
        """Score out of 10 promoting green recovery."""
        for key, value in self.SUSTAINABILITY_SCORES.items():
            if key in self.category:
                return value
        return 9

    def total_score(self) -> int:
        """Composite PHANTOM score out of 100."""
        return (
            self.condition_score()
            + self.demand_score()
            + self.resale_value()
            + self.repair_cost()
            + self.return_reason_score()
            + self.sustainability_score()
        )

    def asset_class(self) -> str:
        """Classify asset based on total score."""
        score = self.total_score()
        if score > 80:
            return "HIGH VALUE ASSET"
        elif score >= 50:
            return "MEDIUM VALUE ASSET"
        return "LOW VALUE ASSET"
