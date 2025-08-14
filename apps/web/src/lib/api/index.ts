import { env } from "../env";

export function getApiUrl(path: string, params?: Record<string, string | undefined>) {
    const url = new URL(`${env.CURRENCY_API_URL}${path}`);

    url.searchParams.set("apikey", env.CURRENCY_API_KEY);

    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            if (value) {
                url.searchParams.set(key, value);
            }
        });
    }

    return url.toString();
}

// Typed fetch function for currency API calls
export async function fetchCurrency<T>(path: string, params?: Record<string, string | undefined>): Promise<T> {
    const url = getApiUrl(path, params);

    const response = await fetch(url, {
        headers: {
            apikey: env.CURRENCY_API_KEY,
        },
    });

    if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return response.json() as Promise<T>;
}
