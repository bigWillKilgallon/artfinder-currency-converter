import { useState } from "react";
import "@/App.css";
import CurrencyConverter from "@/features/currency-converter/components/currency-converter";

function App() {
    // Simplified for the purpose of the tech task
    // this would usually have multiple providers, error boundaries and a router
    return (
        <main className="bg-slate-800 h-lvh flex items-center justify-center">
            <CurrencyConverter />
        </main>
    );
}

export default App;
