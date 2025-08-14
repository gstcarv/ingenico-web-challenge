import { create } from "zustand";
import type { ProcessedConversionResponse } from "../types/currency";

type ConversionCache = {
    [key: string]: {
        result: ProcessedConversionResponse;
        timestamp: number;
    };
};

type ConversionStore = {
    conversionResult: ProcessedConversionResponse | null;
    conversionCache: ConversionCache;
    setConversionResult: (result: ProcessedConversionResponse) => void;
    clearConversionResult: () => void;
    getCachedResult: (key: string) => ProcessedConversionResponse | null;
    setCachedResult: (key: string, result: ProcessedConversionResponse) => void;
    clearCache: () => void;
};

const CACHE_EXPIRY_TIME = 5 * 60 * 1000; // 5 minutes

export const useConversionStore = create<ConversionStore>((set, get) => ({
    conversionResult: null,
    conversionCache: {},
    setConversionResult: (result) => set({ conversionResult: result }),
    clearConversionResult: () => set({ conversionResult: null }),
    getCachedResult: (key: string) => {
        const { conversionCache } = get();
        const cached = conversionCache[key];

        if (cached && Date.now() - cached.timestamp < CACHE_EXPIRY_TIME) {
            return cached.result;
        }

        return null;
    },
    setCachedResult: (key: string, result: ProcessedConversionResponse) =>
        set((state) => ({
            conversionCache: {
                ...state.conversionCache,
                [key]: {
                    result,
                    timestamp: Date.now(),
                },
            },
        })),
    clearCache: () => set({ conversionCache: {} }),
}));
