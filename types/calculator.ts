export const platforms = ["fiverr", "upwork"] as const;
export const taxStatuses = ["filer", "nonFiler"] as const;
export const currencies = ["USD", "EUR", "GBP", "AED"] as const;
export const withdrawalMethods = ["payoneer", "directBank", "wise", "bankTransfer"] as const;

export type Platform = (typeof platforms)[number];
export type TaxStatus = (typeof taxStatuses)[number];
export type Currency = (typeof currencies)[number];
export type WithdrawalMethod = (typeof withdrawalMethods)[number];

export type CalculatorInput = {
  /** Gross amount in `currency`. USD when currency is omitted. */
  orderAmountUsd: number;
  platform: Platform;
  taxStatus: TaxStatus;
  /** PKR received for one unit of `currency`. */
  usdToPkrRate: number;
  platformFeeRate?: number;
  withdrawalFeeRate?: number;
  taxRate?: number;
  /** Extra percentage taken before the withdrawal fee. Zero unless the visitor enters one. */
  earlyPayoutRate?: number;
  /** Flat fee in USD, such as Upwork's $0.99 direct-to-bank charge. */
  flatFeeUsd?: number;
  currency?: Currency;
  /** Units of `currency` per 1 USD. 1 for USD. Used to convert a USD flat fee. */
  currencyPerUsd?: number;
  withdrawalMethod?: WithdrawalMethod;
};

export type CalculatorResult = {
  grossUsd: number;
  currency: Currency;
  platform: Platform;
  platformFeeRate: number;
  platformFeeUsd: number;
  afterPlatformUsd: number;
  earlyPayoutRate: number;
  earlyPayoutFee: number;
  withdrawalMethod: WithdrawalMethod;
  withdrawalLabel: string;
  payoneerFeeRate: number;
  payoneerFeeUsd: number;
  flatFeeUsd: number;
  flatFeeInOrderCurrency: number;
  netUsd: number;
  usdToPkrRate: number;
  convertedPkr: number;
  taxStatus: TaxStatus;
  taxRate: number;
  taxPkr: number;
  finalPkr: number;
};

export type RateOrigin = "frankfurter" | "exchangerate-api" | "manual";

export type CrossRates = {
  /** Units of that currency per 1 USD. */
  EUR: number | null;
  GBP: number | null;
  AED: number | null;
};

export type ExchangeRateQuote = {
  rate: number | null;
  origin: RateOrigin | null;
  sourceLabel: string;
  retrievedAt: string | null;
  frankfurterSupportsPkr: boolean;
  warning: string | null;
  error: string | null;
  fromCache: boolean;
  /** True when a live lookup failed and the previous successful quote is shown. */
  stale: boolean;
  crosses: CrossRates | null;
};
