import React from "react";
import { CurrencyComboBox } from "./currency-combobox";
import { ArrowLeftRight } from "lucide-react";

type CurrencyConverterProps = {};

const CurrencyConverter = (props: CurrencyConverterProps) => {
    return (
        <section id="feature-currency-converter">
            <h1 className="text-left mb-6 text-2xl text-white">
                Currency Converter
            </h1>
            <div className="flex items-center gap-4">
                <CurrencyComboBox />
                <ArrowLeftRight className="text-green-600" />
                <CurrencyComboBox />
            </div>
        </section>
    );
};

export default CurrencyConverter;
