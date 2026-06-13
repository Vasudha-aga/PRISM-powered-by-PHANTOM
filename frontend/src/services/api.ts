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

  async getPassport(): Promise<PassportResponse> {
    const response = await api.get<PassportResponse>("/passport");
    return response.data;
  },

  async getImpact(): Promise<ImpactResponse> {
    const response = await api.get<ImpactResponse>("/impact");
    return response.data;
  },

  async getSwap(): Promise<SwapResponse> {
    const response = await api.get<SwapResponse>("/swap");
    return response.data;
  }
};
