import { createFileRoute } from "@tanstack/react-router";
import { CurrencyConverter } from "../components/currency-converter/currency-converter";
import { getAvailableCurrenciesQuery } from "../queries/get-available-currencies";

const STALE_TIME = 1000 * 60 * 60 * 24; // 24 hours

export const Route = createFileRoute("/")({
    component: RouteComponent,
    loader: async ({ context }) => {
        await context.queryClient.ensureQueryData(getAvailableCurrenciesQuery());
    },
    staleTime: STALE_TIME,
    gcTime: STALE_TIME,
    ssr: true,
});

function RouteComponent() {
    return <CurrencyConverter />;
}
