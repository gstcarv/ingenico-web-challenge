import { create } from 'zustand'
import type { ProcessedConversionResponse } from '../types/currency'

type ConversionStore = {
    conversionResult: ProcessedConversionResponse | null
    setConversionResult: (result: ProcessedConversionResponse) => void
    clearConversionResult: () => void
}

export const useConversionStore = create<ConversionStore>((set) => ({
    conversionResult: null,
    setConversionResult: (result) => set({ conversionResult: result }),
    clearConversionResult: () => set({ conversionResult: null }),
}))
