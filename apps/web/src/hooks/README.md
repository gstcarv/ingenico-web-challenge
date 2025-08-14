# Currency Conversion Hooks

## Overview

This directory contains hooks for managing currency conversion with optimizations to prevent unnecessary API calls.

## Hooks

### `useCurrencyConversion`

A hook that manages currency conversion with the following optimizations:

- **Debouncing**: Prevents rapid-fire API calls by waiting 500ms after the last change
- **Request Deduplication**: Prevents duplicate requests for the same parameters
- **Caching**: Caches results for 5 minutes to avoid redundant API calls
- **Submission Prevention**: Prevents new requests while one is already in progress

#### Usage

```typescript
const { convertCurrency, isSubmitting, error } = useCurrencyConversion({
    debounceMs: 500, // Optional: customize debounce delay
});

// Convert currency
await convertCurrency({
    fromCurrency: "USD",
    toCurrency: "EUR",
    amount: 100,
    date: new Date(),
});
```

### `useCurrencyForm`

A hook that manages the currency conversion form with auto-submit functionality.

#### Features

- Form validation using Zod schema
- Auto-submit when currency or date changes (after first manual submission)
- Currency swap functionality
- Integration with `useCurrencyConversion` for optimized API calls

## Cache Implementation

The conversion store includes a cache system that:

- Stores results for 5 minutes
- Uses consistent cache keys based on conversion parameters
- Automatically expires old entries
- Prevents duplicate API calls for identical requests

## Debug Logging

The system includes console logging to help track:

- 🚫 Skipped duplicate requests
- ✅ Cache hits
- 🌐 API calls made
- 💾 Results cached

To disable logging in production, remove the console.log statements from `useCurrencyConversion.ts`.
