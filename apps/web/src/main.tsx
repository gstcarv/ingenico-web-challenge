import { createRoot } from "react-dom/client";
import "./style.css";
import { PageContainer } from "./components/page-container";
import { CurrencyConverter } from "./components/currency-converter/currency-converter";

const App = () => (
    <PageContainer>
        <CurrencyConverter></CurrencyConverter>
    </PageContainer>
);

createRoot(document.getElementById("app")!).render(<App />);
