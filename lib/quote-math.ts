import { formatRateInput } from "@/lib/money";
import type { CrossRates, Currency, PayoutCurrency } from "@/types/calculator";

type QuoteSlice = { rate: number | null; crosses: CrossRates | null };

/** How many units of `currency` equal 1 USD. USD is 1. */
export function unitsPerUsd(currency: Currency | PayoutCurrency, quote: QuoteSlice): number | null {
  if (currency === "USD") return 1;
  if (currency === "PKR") return quote.rate && quote.rate > 0 ? quote.rate : null;
  const cross = quote.crosses?.[currency];
  if (!cross || cross <= 0) return null;
  return cross;
}

/** Units of `payoutCurrency` for one unit of the order `currency`. */
export function payoutPerOrderUnit(
  currency: Currency,
  payoutCurrency: PayoutCurrency,
  quote: QuoteSlice,
): number | null {
  if (currency === payoutCurrency) return 1;
  const payoutPerUsd = unitsPerUsd(payoutCurrency, quote);
  const orderPerUsd = unitsPerUsd(currency, quote);
  if (!payoutPerUsd || !orderPerUsd) return null;
  return Number((payoutPerUsd / orderPerUsd).toFixed(6));
}

export function payoutPerOrderUnitInput(
  currency: Currency,
  payoutCurrency: PayoutCurrency,
  quote: QuoteSlice,
): string {
  const rate = payoutPerOrderUnit(currency, payoutCurrency, quote);
  return rate ? formatRateInput(rate) : "";
}

/** PKR for one unit of the order currency, from the USD/PKR quote and the cross rate. */
export function pkrPerOrderUnit(currency: Currency, quote: QuoteSlice): number | null {
  return payoutPerOrderUnit(currency, "PKR", quote);
}

export function pkrPerOrderUnitInput(currency: Currency, quote: QuoteSlice): string {
  return payoutPerOrderUnitInput(currency, "PKR", quote);
}
