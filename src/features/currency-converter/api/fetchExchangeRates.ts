import CurrencyRate from "../types/CurrencyRate";

export async function fetchExchangeRates(): Promise<CurrencyRate[]> {
    try {
        const response = await fetch(
            "https://cors-anywhere.herokuapp.com/https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml"
        );
        if (!response.ok) {
            throw new Error(
                `Failed to fetch exchange rates: ${response.statusText}`
            );
        }
        const xmlData = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlData, "text/xml");
        const cubeNodes = xmlDoc.getElementsByTagName("Cube");
        const rates = Array.from(cubeNodes[1].children).map((node) => ({
            currency: node.getAttribute("currency") || "",
            rate: parseFloat(node.getAttribute("rate") || "0"),
        }));
        return rates;
    } catch (error) {
        console.error("Error fetching exchange rates:", error);
        throw error;
    }
}
