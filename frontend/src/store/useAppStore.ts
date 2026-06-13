import { create } from "zustand";
import { AnalyzeResponse, PhantomResponse, DecisionResponse } from "../types/api";

interface ProductData {
  product_name: string;
  category: string;
  return_reason: string;
  condition_description: string;
}

interface AppState {
  productData: ProductData | null;
  setProductData: (data: ProductData) => void;

  analyzeData: AnalyzeResponse | null;
  setAnalyzeData: (data: AnalyzeResponse) => void;

  phantomData: PhantomResponse | null;
  setPhantomData: (data: PhantomResponse) => void;

  decisionData: DecisionResponse | null;
  setDecisionData: (data: DecisionResponse) => void;

  resetState: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  productData: null,
  setProductData: (data) => set({ productData: data }),

  analyzeData: null,
  setAnalyzeData: (data) => set({ analyzeData: data }),

  phantomData: null,
  setPhantomData: (data) => set({ phantomData: data }),

  decisionData: null,
  setDecisionData: (data) => set({ decisionData: data }),

  resetState: () => set({
    productData: null,
    analyzeData: null,
    phantomData: null,
    decisionData: null,
  }),
}));
