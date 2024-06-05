"use client";

import * as React from "react";
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

const dummyCurrencies = [
    {
        value: "USD",
        label: "United States Dollar",
    },
    {
        value: "GBP",
        label: "Pound Sterling",
    },
    {
        value: "EUR",
        label: "Euro",
    },
];

export function CurrencyComboBox() {
    const [open, setOpen] = useState<boolean>(false);
    const [value, setValue] = useState<string>("");

    return (
        <div>
            <span className="text-white text-left block mb-4 text-xs">
                [1 USD = 0.8110 EUR]
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
                                ? dummyCurrencies.find(
                                      (currency) => currency.value === value
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
                                    {dummyCurrencies.map((currency) => (
                                        <CommandItem
                                            key={currency.value}
                                            value={currency.value}
                                            onSelect={(currentValue) => {
                                                setValue(
                                                    currentValue === value
                                                        ? ""
                                                        : currentValue
                                                );
                                                setOpen(false);
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    value === currency.value
                                                        ? "opacity-100"
                                                        : "opacity-0"
                                                )}
                                            />
                                            {currency.label}
                                        </CommandItem>
                                    ))}
                                </CommandList>
                            </CommandGroup>
                        </Command>
                    </PopoverContent>
                </Popover>
                <div className="h-32 flex items-center p-6">
                    {value && (
                        <>
                            <span className="text-muted-foreground mr-2">
                                [$]
                            </span>
                            <span className="text-2xl text-white">[2.47]</span>
                        </>
                    )}
                </div>
            </Card>
        </div>
    );
}
