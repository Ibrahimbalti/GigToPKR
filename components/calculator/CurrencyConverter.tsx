"use client";

import { useState } from "react";
import { useExchangeRate } from "@/components/calculator/ExchangeRateProvider";
import { Skeleton } from "@/components/ui/Skeleton";
import { formatPkr, formatRate } from "@/lib/money";
import { parseExchangeRate, parseOrderAmount } from "@/lib/validation";

export function CurrencyConverter() {
  const { quote } = useExchangeRate();
  const [amount, setAmount] = useState("100");
  const [rate, setRate] = useState("");
  const [manual, setManual] = useState(false);
  const isLoading = quote.status === "loading" && !manual;
  const shownRate = manual ? rate : quote.rate ? formatRate(quote.rate) : rate;
  const amountState = parseOrderAmount(amount);
  const rateState = parseExchangeRate(shownRate);
  const converted =
    amountState.state === "ok" && rateState.state === "ok"
      ? amountState.amount * rateState.rate
      : null;

  return (
    <section aria-labelledby="converter-heading" className="surface rounded-3xl p-5 sm:p-6">
      <h2 id="converter-heading" className="text-lg font-semibold">Convert USD to PKR</h2>
      <p className="mt-1 text-sm leading-6 text-muted">
        This converter does not remove marketplace or Payoneer fees. Use the earnings form below
        when you need those assumptions.
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm font-medium">
          US dollars
          <input
            value={amount}
            inputMode="decimal"
            onChange={(event) => setAmount(event.target.value)}
            className="field tabular"
          />
        </label>
        <label className="grid gap-1.5 text-sm font-medium">
          PKR per USD {manual || !quote.rate ? "(manual)" : "(reference)"}
          <input
            value={shownRate}
            inputMode="decimal"
            placeholder={quote.status === "loading" ? "Fetching" : "Enter a rate"}
            onChange={(event) => {
              setManual(true);
              setRate(event.target.value);
            }}
            className="field tabular"
          />
        </label>
      </div>
      <p className="mt-4 text-3xl font-semibold tabular text-ink" aria-busy={isLoading || undefined}>
        {isLoading ? (
          <>
            <span className="sr-only">Loading converted amount</span>
            <Skeleton variant="text" className="h-9 w-40" />
          </>
        ) : converted === null ? (
          "PKR —"
        ) : (
          formatPkr(Number(converted.toFixed(2)))
        )}
      </p>
      {amountState.state === "invalid" || rateState.state === "invalid" ? (
        <p className="mt-2 text-sm text-danger-ink" role="alert">
          {amountState.state === "invalid" ? amountState.message : rateState.state === "invalid" ? rateState.message : ""}
        </p>
      ) : null}
    </section>
  );
}
