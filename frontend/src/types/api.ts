export interface AnalyzeRequest {
  product_name: string;
  category: string;
  return_reason: string;
  condition_description: string;
  image?: File;
}

export interface AnalyzeResponse {
  grade: string;
  confidence: number;
  damage: string;
  summary: string;
}

export interface PhantomRequest {
  product_name: string;
  category: string;
  return_reason: string;
  condition_description: string;
  grade: string;
  damage: string;
}

export interface PhantomResponse {
  score: number;
  condition_score: number;
  demand_score: number;
  resale_value: number;
  repair_cost: number;
  return_reason_score: number;
  sustainability_score: number;
  asset_class: string;
}

export interface DecisionRequest {
  phantom_score: number;
  grade: string;
  category: string;
}

export interface DecisionResponse {
  decision: string;
  confidence: number;
  reasons: string[];
  carbon_saved: number;
  green_credits: number;
}

export interface TimelineStage {
  stage: string;
  status: "completed" | "active" | "pending";
}

export interface PassportResponse {
  timeline: TimelineStage[];
}

export interface ImpactResponse {
  carbon_saved: number;
  waste_diverted: number;
  products_reused: number;
  green_credits: number;
  trees_equivalent: number;
}

export interface SwapResponse {
  match_found: boolean;
  match_confidence: number;
  product: string;
  buyer_city: string;
  seller_city: string;
  logistics_saved: number;
  carbon_saved: number;
  status: string;
}
