import { formatRateInput } from "@/lib/money";
import type { CrossRates, Currency } from "@/types/calculator";

type QuoteSlice = { rate: number | null; crosses: CrossRates | null };

/** How many units of `currency` equal 1 USD. USD is 1. */
export function unitsPerUsd(currency: Currency, quote: QuoteSlice): number | null {
  if (currency === "USD") return 1;
  const cross = quote.crosses?.[currency];
  if (!cross || cross <= 0) return null;
  return cross;
}

/** PKR for one unit of the order currency, from the USD/PKR quote and the cross rate. */
export function pkrPerOrderUnit(currency: Currency, quote: QuoteSlice): number | null {
  if (!quote.rate) return null;
  const perUsd = unitsPerUsd(currency, quote);
  if (!perUsd) return null;
  return Number((quote.rate / perUsd).toFixed(6));
}

export function pkrPerOrderUnitInput(currency: Currency, quote: QuoteSlice): string {
  const rate = pkrPerOrderUnit(currency, quote);
  return rate ? formatRateInput(rate) : "";
}
