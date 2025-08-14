import { describe, it, expect } from 'vitest'
import { createConversionCacheKey, areConversionParamsEqual } from '../cache-utils'
import type { HistoricalConversionParams } from '../currency-schema'

describe('cache-utils', () => {
    describe('createConversionCacheKey', () => {
        it('should create cache key with date', () => {
            const params: HistoricalConversionParams = {
                fromCurrency: 'USD',
                toCurrency: 'EUR',
                amount: 100,
                date: new Date('2024-01-15'),
            }

            const result = createConversionCacheKey(params)

            expect(result).toBe('USD-EUR-100-2024-01-15')
        })

        it('should create cache key without date', () => {
            const params: HistoricalConversionParams = {
                fromCurrency: 'USD',
                toCurrency: 'EUR',
                amount: 100,
                date: undefined,
            }

            const result = createConversionCacheKey(params)

            expect(result).toBe('USD-EUR-100-latest')
        })

        it('should handle zero amount', () => {
            const params: HistoricalConversionParams = {
                fromCurrency: 'USD',
                toCurrency: 'EUR',
                amount: 0,
                date: new Date('2024-01-15'),
            }

            const result = createConversionCacheKey(params)

            expect(result).toBe('USD-EUR-0-2024-01-15')
        })
    })

    describe('areConversionParamsEqual', () => {
        it('should return true for identical parameters', () => {
            const params1: HistoricalConversionParams = {
                fromCurrency: 'USD',
                toCurrency: 'EUR',
                amount: 100,
                date: new Date('2024-01-15'),
            }

            const params2: HistoricalConversionParams = {
                fromCurrency: 'USD',
                toCurrency: 'EUR',
                amount: 100,
                date: new Date('2024-01-15'),
            }

            const result = areConversionParamsEqual(params1, params2)

            expect(result).toBe(true)
        })

        it('should return false for different currencies', () => {
            const params1: HistoricalConversionParams = {
                fromCurrency: 'USD',
                toCurrency: 'EUR',
                amount: 100,
                date: new Date('2024-01-15'),
            }

            const params2: HistoricalConversionParams = {
                fromCurrency: 'USD',
                toCurrency: 'GBP',
                amount: 100,
                date: new Date('2024-01-15'),
            }

            const result = areConversionParamsEqual(params1, params2)

            expect(result).toBe(false)
        })

        it('should return false for different amounts', () => {
            const params1: HistoricalConversionParams = {
                fromCurrency: 'USD',
                toCurrency: 'EUR',
                amount: 100,
                date: new Date('2024-01-15'),
            }

            const params2: HistoricalConversionParams = {
                fromCurrency: 'USD',
                toCurrency: 'EUR',
                amount: 200,
                date: new Date('2024-01-15'),
            }

            const result = areConversionParamsEqual(params1, params2)

            expect(result).toBe(false)
        })

        it('should return false for different dates', () => {
            const params1: HistoricalConversionParams = {
                fromCurrency: 'USD',
                toCurrency: 'EUR',
                amount: 100,
                date: new Date('2024-01-15'),
            }

            const params2: HistoricalConversionParams = {
                fromCurrency: 'USD',
                toCurrency: 'EUR',
                amount: 100,
                date: new Date('2024-01-16'),
            }

            const result = areConversionParamsEqual(params1, params2)

            expect(result).toBe(false)
        })

        it('should return true when both dates are undefined', () => {
            const params1: HistoricalConversionParams = {
                fromCurrency: 'USD',
                toCurrency: 'EUR',
                amount: 100,
                date: undefined,
            }

            const params2: HistoricalConversionParams = {
                fromCurrency: 'USD',
                toCurrency: 'EUR',
                amount: 100,
                date: undefined,
            }

            const result = areConversionParamsEqual(params1, params2)

            expect(result).toBe(true)
        })
    })
})
