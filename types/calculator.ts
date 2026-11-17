export const platforms = ["fiverr", "upwork"] as const;
export const taxStatuses = ["filer", "nonFiler"] as const;

export type Platform = (typeof platforms)[number];
export type TaxStatus = (typeof taxStatuses)[number];

export type CalculatorInput = {
  orderAmountUsd: number;
  platform: Platform;
  taxStatus: TaxStatus;
  usdToPkrRate: number;
};

export type CalculatorResult = {
  grossUsd: number;
  platform: Platform;
  platformFeeRate: number;
  platformFeeUsd: number;
  afterPlatformUsd: number;
  payoneerFeeRate: number;
  payoneerFeeUsd: number;
  netUsd: number;
  usdToPkrRate: number;
  convertedPkr: number;
  taxStatus: TaxStatus;
  taxRate: number;
  taxPkr: number;
  finalPkr: number;
};

export type RateOrigin = "frankfurter" | "exchangerate-api" | "manual";

export type ExchangeRateQuote = {
  rate: number | null;
  origin: RateOrigin | null;
  sourceLabel: string;
  retrievedAt: string | null;
  frankfurterSupportsPkr: boolean;
  warning: string | null;
  error: string | null;
  fromCache: boolean;
};
