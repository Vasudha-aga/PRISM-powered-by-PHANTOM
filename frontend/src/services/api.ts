import axios from "axios";
import {
  AnalyzeResponse,
  PhantomResponse,
  PhantomRequest,
  DecisionResponse,
  DecisionRequest,
  PassportResponse,
  ImpactResponse,
  SwapResponse,
} from "../types/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: API_URL,
});

export const apiService = {
  async analyze(formData: FormData): Promise<AnalyzeResponse> {
    const response = await api.post<AnalyzeResponse>("/analyze", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  async getPhantomScore(data: PhantomRequest): Promise<PhantomResponse> {
    const response = await api.post<PhantomResponse>("/phantom", data);
    return response.data;
  },

  async getDecision(data: DecisionRequest): Promise<DecisionResponse> {
    const response = await api.post<DecisionResponse>("/decision", data);
    return response.data;
  },

  async getPassport(params?: { decision?: string }): Promise<PassportResponse> {
    const response = await api.get<PassportResponse>("/passport", {
      params: params?.decision ? { decision: params.decision } : undefined,
    });
    return response.data;
  },

  async getImpact(params?: { phantom_score?: number; decision?: string; category?: string }): Promise<ImpactResponse> {
    const response = await api.get<ImpactResponse>("/impact", {
      params: {
        phantom_score: params?.phantom_score ?? 50,
        decision: params?.decision || "Resale",
        category: params?.category || "Other",
      },
    });
    return response.data;
  },

  async getSwap(params?: { product_name?: string; category?: string; condition_description?: string }): Promise<SwapResponse> {
    const response = await api.get<SwapResponse>("/swap", {
      params: {
        product_name: params?.product_name || "Unknown Product",
        category: params?.category || "Other",
        condition_description: params?.condition_description || undefined,
      },
    });
    return response.data;
  }
};
