import useCurrencyConverter from "../hooks/useCurrencyConverter";
import CurrencyComboBox from "./currency-combobox";
import { ArrowLeftRight } from "lucide-react";

type CurrencyConverterProps = {};

const CurrencyConverter = (props: CurrencyConverterProps) => {
    const { currencyRates, setCurrencyFrom, setCurrencyTo, convertedAmounts } =
        useCurrencyConverter();

    return (
        <section id="feature-currency-converter">
            <h1 className="text-left mb-6 text-2xl text-white">
                Currency Converter
            </h1>
            <div className="flex items-center gap-4">
                <CurrencyComboBox
                    onChangeCurrency={(currency: string) =>
                        setCurrencyFrom(currency)
                    }
                    currencyRates={currencyRates}
                    convertedAmounts={convertedAmounts}
                />
                <ArrowLeftRight className="text-green-600" />
                <CurrencyComboBox
                    onChangeCurrency={(currency: string) =>
                        setCurrencyTo(currency)
                    }
                    currencyRates={currencyRates}
                    convertedAmounts={convertedAmounts}
                />
            </div>

            {!currencyRates.length && (
                <a
                    href="https://cors-anywhere.herokuapp.com/https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml"
                    target="_blank"
                    className="bg-red-500 text-white mt-8 inline-block py-2 px-8"
                >
                    Currency rates not loading? Click here
                </a>
            )}
        </section>
    );
};

export default CurrencyConverter;
