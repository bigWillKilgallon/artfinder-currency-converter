import { useEffect, useState } from "react";
import CurrencyRate from "../types/CurrencyRate";
import { fetchExchangeRates } from "../api/fetchExchangeRates";
import { currencyMap } from "../utils/currencyMap";
import { ConversionResult } from "../types/ConversionResult";

function useCurrencyConverter() {
    const [currencyRates, setCurrencyRates] = useState<CurrencyRate[]>([]);
    const [currencyFrom, setCurrencyFrom] = useState<string>("");
    const [currencyTo, setCurrencyTo] = useState<string>("");
    const [amountTo, setAmountTo] = useState<number>(1);
    const [amountFrom, setAmountFrom] = useState<number>(1);
    const [convertedAmounts, setConvertedAmounts] = useState<
        ConversionResult[] | null
    >(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchRates = async () => {
        try {
            const exchangeRates = await fetchExchangeRates();
            const combinedRates = exchangeRates.map((rateItem) => {
                const currencyMapItem = currencyMap.find(
                    (currencyMapItem) =>
                        currencyMapItem.currency === rateItem.currency
                );
                return {
                    currency: rateItem.currency,
                    rate: rateItem.rate,
                    label: currencyMapItem
                        ? currencyMapItem.label
                        : "Unknown Label",
                };
            });
            setCurrencyRates(combinedRates);
        } catch (err) {
            console.error("Error fetching rates:", err);
            setError("Error fetching exchange rates");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchRates();
    }, []);

    useEffect(() => {
        if (currencyFrom && currencyTo && amountTo) {
            const fromRate = currencyRates.find(
                (r) => r.currency === currencyFrom
            )?.rate;
            const toRate = currencyRates.find(
                (r) => r.currency === currencyTo
            )?.rate;

            if (fromRate && toRate) {
                const toAmount = parseFloat(
                    ((amountTo / fromRate) * toRate).toFixed(2)
                );
                const fromAmount = parseFloat(
                    ((amountTo / toRate) * fromRate).toFixed(2)
                );

                setConvertedAmounts([
                    {
                        currency: currencyFrom,
                        amount: fromAmount,
                        correspondingCurrency: currencyTo,
                    },
                    {
                        currency: currencyTo,
                        amount: toAmount,
                        correspondingCurrency: currencyFrom,
                    },
                ]);
            }
        } else {
            setConvertedAmounts(null);
        }
    }, [amountTo, currencyFrom, currencyTo, currencyRates]);

    return {
        currencyRates,
        currencyFrom,
        setCurrencyFrom,
        currencyTo,
        setCurrencyTo,
        amountTo,
        setAmountTo,
        convertedAmounts,
        isLoading,
        error,
    };
}

export default useCurrencyConverter;
