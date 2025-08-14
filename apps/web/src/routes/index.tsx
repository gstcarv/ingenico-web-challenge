import { createFileRoute } from "@tanstack/react-router";
import { CurrencyConverter } from "../components/currency-converter/currency-converter";
import { getAvailableCurrenciesQuery } from "../queries/get-available-currencies";

const FIVE_HOURS = 1000 * 60 * 60 * 5;

export const Route = createFileRoute("/")({
    component: RouteComponent,
    loader: async ({ context }) => {
        await context.queryClient.ensureQueryData(getAvailableCurrenciesQuery());
    },
    staleTime: FIVE_HOURS,
    gcTime: FIVE_HOURS,
});

function RouteComponent() {
    return <CurrencyConverter />;
}
