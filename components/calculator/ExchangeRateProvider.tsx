"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { ExchangeRateQuote } from "@/types/calculator";

type QuoteState = ExchangeRateQuote & { status: "loading" | "ready" | "unavailable" };

const initial: QuoteState = {
  status: "loading",
  rate: null,
  origin: null,
  sourceLabel: "Checking for a reference rate",
  retrievedAt: null,
  frankfurterSupportsPkr: false,
  warning: null,
  error: null,
  fromCache: false,
  stale: false,
  crosses: null,
};

const ExchangeRateContext = createContext<{ quote: QuoteState; retry: () => void }>({
  quote: initial,
  retry: () => undefined,
});

export function ExchangeRateProvider({ children }: { children: React.ReactNode }) {
  const [quote, setQuote] = useState<QuoteState>(initial);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        const response = await fetch("/api/exchange-rate", {
          cache: "no-store",
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Rate request failed");
        const data = (await response.json()) as ExchangeRateQuote;
        setQuote({ ...data, status: data.rate ? "ready" : "unavailable" });
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return;
        setQuote({
          ...initial,
          status: "unavailable",
          sourceLabel: "No live rate available",
          stale: false,
          crosses: null,
          error:
            "A live rate could not be retrieved. Enter the PKR rate from your bank or Payoneer. No guessed rate will be filled in.",
        });
      }
    }
    void load();
    return () => controller.abort();
  }, [attempt]);

  return (
    <ExchangeRateContext.Provider
      value={{
        quote,
        retry: () => {
          setQuote((current) => ({ ...current, status: "loading", error: null }));
          setAttempt((value) => value + 1);
        },
      }}
    >
      {children}
    </ExchangeRateContext.Provider>
  );
}

export function useExchangeRate() {
  return useContext(ExchangeRateContext);
}
