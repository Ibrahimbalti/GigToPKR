import type { Platform, TaxStatus } from "@/types/calculator";

/** Illustrative platform-fee assumptions. Confirm the live fee in your account. */
export const PLATFORM_FEE_RATES: Record<Platform, number> = {
  fiverr: 0.2,
  upwork: 0.1,
};

/** Illustrative withdrawal assumption applied after the platform fee. */
export const PAYONEER_FEE_RATE = 0.02;

/**
 * Illustrative tax assumptions for comparison only.
 * These are not statutory FBR rates.
 */
export const TAX_RATES: Record<TaxStatus, number> = {
  filer: 0.01,
  nonFiler: 0.02,
};

export const PLATFORM_LABELS: Record<Platform, string> = {
  fiverr: "Fiverr",
  upwork: "Upwork",
};

export const TAX_LABELS: Record<TaxStatus, string> = {
  filer: "Active filer",
  nonFiler: "Non-filer",
};

export const FRANKFURTER_URL = "https://api.frankfurter.app/latest?from=USD&to=PKR";
export const FRANKFURTER_CURRENCIES_URL = "https://api.frankfurter.app/currencies";
export const EXCHANGE_RATE_API_URL = "https://open.er-api.com/v6/latest/USD";

export const FRANKFURTER_PKR_NOTE =
  "Frankfurter publishes European Central Bank reference rates. PKR is not in that list, so this site does not invent a Frankfurter USD/PKR rate.";

export function exampleRateNote(rate: number | null) {
  if (!rate) {
    return "A current USD to PKR reference rate could not be loaded, so this example has no rupee figure.";
  }
  return `Converted at the current reference rate of ${rate} PKR per USD. This is not a Payoneer, bank, or State Bank rate.`;
}

export const RESULT_DISCLAIMER =
  "This is an estimate from the assumptions shown above. Fiverr, Upwork, Payoneer, your bank, and the Federal Board of Revenue can apply different fees, rates, and taxes. Nothing on this page is financial, tax, or legal advice.";
