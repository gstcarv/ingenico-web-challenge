import { createFileRoute } from "@tanstack/react-router";
import { CurrencyConverter } from "../components/currency-converter/currency-converter";

export const Route = createFileRoute("/")({
    component: RouteComponent,
});

function RouteComponent() {
    return <CurrencyConverter />;
}
