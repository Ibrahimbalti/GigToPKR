import type { Currency, Platform, TaxStatus, WithdrawalMethod } from "@/types/calculator";

/** Illustrative platform-fee assumptions. Confirm the live fee in your account. */
export const PLATFORM_FEE_RATES: Record<Platform, number> = {
  fiverr: 0.2,
  upwork: 0.1,
};

export const DEFAULT_PLATFORM_FEE_PERCENT: Record<Platform, string> = {
  fiverr: "20",
  upwork: "10",
};

export const UPWORK_FEE_PERCENTS = ["0", "5", "10", "15"] as const;

/** Illustrative withdrawal assumption applied after the platform fee. */
export const PAYONEER_FEE_RATE = 0.02;

export const DIRECT_BANK_FEE_USD = 0.99;

export const CURRENCY_LABELS: Record<Currency, string> = {
  USD: "US dollar",
  EUR: "Euro",
  GBP: "British pound",
  AED: "UAE dirham",
};

export const WITHDRAWAL_METHODS: { id: WithdrawalMethod; label: string; defaultPercent: string }[] = [
  { id: "payoneer", label: "Payoneer", defaultPercent: "2" },
  { id: "directBank", label: "Direct to local bank", defaultPercent: "0" },
  { id: "wise", label: "Wise", defaultPercent: "0" },
  { id: "bankTransfer", label: "Other bank transfer", defaultPercent: "0" },
];

export const WITHDRAWAL_LABELS: Record<WithdrawalMethod, string> = {
  payoneer: "Payoneer",
  directBank: "Direct to local bank",
  wise: "Wise",
  bankTransfer: "Bank transfer",
};

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

export const DEFAULT_TAX_PERCENT: Record<TaxStatus, string> = {
  filer: "1",
  nonFiler: "2",
};

export const FRANKFURTER_URL = "https://api.frankfurter.app/latest?from=USD&to=PKR,EUR,GBP";
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
