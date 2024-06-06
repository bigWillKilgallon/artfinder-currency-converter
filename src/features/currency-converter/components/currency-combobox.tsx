"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { CommandList } from "cmdk";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import CurrencyRate from "../types/CurrencyRate";
import { ConversionResult } from "../types/ConversionResult";

type CurrencyComboBoxProps = {
    onChangeCurrency(currency: string): void;
    currencyRates: CurrencyRate[];
    convertedAmounts: ConversionResult[] | null;
};

const CurrencyComboBox = ({
    onChangeCurrency,
    currencyRates,
    convertedAmounts,
}: CurrencyComboBoxProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const [value, setValue] = useState<string>("");

    console.log(convertedAmounts);
    const convertedAmount = convertedAmounts?.find(
        (amount) => amount.currency === value
    );

    console.log(convertedAmount);

    return (
        <div>
            <span className="text-white text-left block mb-4 text-xs">
                1 {value} = {convertedAmount?.amount}{" "}
                {convertedAmount?.correspondingCurrency}
            </span>
            <Card className="rounded-none border-0 bg-slate-600">
                <Popover
                    open={open}
                    onOpenChange={() => {
                        setOpen(true);
                    }}
                >
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-[200px] justify-between bg-slate-500 border-0 text-white rounded-none"
                        >
                            {value
                                ? currencyRates.find(
                                      (currencyRate) =>
                                          currencyRate.currency === value
                                  )?.label
                                : "Select currency..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                        <Command>
                            <CommandInput placeholder="Search currency..." />
                            <CommandEmpty>No currency found.</CommandEmpty>
                            <CommandGroup>
                                <CommandList>
                                    {currencyRates.map((currencyRate) => (
                                        <CommandItem
                                            key={currencyRate.currency}
                                            value={currencyRate.currency}
                                            className="flex justify-between"
                                            onSelect={(currentValue) => {
                                                setValue(
                                                    currentValue === value
                                                        ? ""
                                                        : currentValue
                                                );
                                                setOpen(false);
                                                onChangeCurrency(
                                                    currencyRate.currency
                                                );
                                            }}
                                        >
                                            <span className="text-xs font-bold mr-2">
                                                {currencyRate.currency}
                                            </span>
                                            {currencyRate.label}
                                        </CommandItem>
                                    ))}
                                </CommandList>
                            </CommandGroup>
                        </Command>
                    </PopoverContent>
                </Popover>
                <div className="h-32 flex items-center p-6">
                    {convertedAmounts && (
                        <>
                            <span className="text-muted-foreground mr-2">
                                [$]
                            </span>
                            <span className="text-2xl text-white">
                                {/* {convertedAmount?.[value].test} */}
                            </span>
                        </>
                    )}
                </div>
            </Card>
        </div>
    );
};

export default CurrencyComboBox;
