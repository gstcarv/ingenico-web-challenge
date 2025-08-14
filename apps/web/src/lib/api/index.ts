import { env } from "../env";

export function getApiUrl(path: string, params?: Record<string, string>) {
    const url = new URL(`${env.CURRENCY_API_URL}${path}`);

    url.searchParams.set("apikey", env.CURRENCY_API_KEY);

    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.set(key, value);
        });
    }

    return url.toString();
}
