import {
  PAYONEER_FEE_RATE,
  PLATFORM_FEE_RATES,
  TAX_RATES,
  WITHDRAWAL_LABELS,
} from "@/lib/constants";
import { formatScaled, multiplyRate, scaledToNumber, toScaled } from "@/lib/money";
import type { CalculatorInput, CalculatorResult, Currency, WithdrawalMethod } from "@/types/calculator";

function money(amount: number): bigint {
  if (!Number.isFinite(amount) || amount < 0) {
    throw new Error("Order amount must be a finite number of zero or more.");
  }
  return toScaled(amount.toFixed(2), 2);
}

function asMoney(value: bigint): number {
  return scaledToNumber(value, 2);
}

function rateOr(value: number | undefined, fallback: number, label: string): number {
  const rate = value ?? fallback;
  if (!Number.isFinite(rate) || rate < 0 || rate > 1) {
    throw new Error(`${label} must be between 0% and 100%.`);
  }
  return rate;
}

function formatPercent(rate: number): string {
  const text = (rate * 100).toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
  return `${text}%`;
}

/**
 * Estimate a freelancer's bank deposit in PKR.
 *
 * Order is fixed:
 * 1. Gross order amount, in the selected currency
 * 2. Platform fee
 * 3. Optional early-payout percentage on the remainder
 * 4. Withdrawal percentage, then an optional flat USD fee converted into that currency
 * 5. Convert the net amount at the PKR rate for that currency
 * 6. Tax percentage the visitor entered, on the converted PKR amount
 * 7. Final bank deposit
 *
 * Omitted fee fields keep the original assumptions: 20% Fiverr or 10% Upwork,
 * 2% withdrawal, and 1% or 2% tax illustrations.
 */
export function calculateEarnings(input: CalculatorInput): CalculatorResult {
  if (!Number.isFinite(input.usdToPkrRate) || input.usdToPkrRate <= 0) {
    throw new Error("Enter a PKR rate greater than zero.");
  }

  const currency: Currency = input.currency ?? "USD";
  const currencyPerUsd = input.currencyPerUsd ?? 1;
  if (!Number.isFinite(currencyPerUsd) || currencyPerUsd <= 0) {
    throw new Error("Enter how many units of the order currency equal 1 USD.");
  }

  const platformFeeRate = rateOr(input.platformFeeRate, PLATFORM_FEE_RATES[input.platform], "Platform fee");
  const taxRate = rateOr(input.taxRate, TAX_RATES[input.taxStatus], "Tax percentage");
  const withdrawalFeeRate = rateOr(input.withdrawalFeeRate, PAYONEER_FEE_RATE, "Withdrawal fee");
  const earlyPayoutRate = rateOr(input.earlyPayoutRate, 0, "Early payout fee");
  const flatFeeUsd = input.flatFeeUsd ?? 0;
  if (!Number.isFinite(flatFeeUsd) || flatFeeUsd < 0) {
    throw new Error("Flat withdrawal fee cannot be negative.");
  }
  const withdrawalMethod: WithdrawalMethod = input.withdrawalMethod ?? "payoneer";

  const gross = money(input.orderAmountUsd);
  const platformFee = multiplyRate(gross, platformFeeRate);
  const afterPlatform = gross - platformFee;
  const earlyPayoutFee = multiplyRate(afterPlatform, earlyPayoutRate);
  const afterEarly = afterPlatform - earlyPayoutFee;
  const percentWithdrawal = multiplyRate(afterEarly, withdrawalFeeRate);
  const flatFee = multiplyRate(money(flatFeeUsd), currencyPerUsd);
  const net = afterEarly - percentWithdrawal - flatFee;
  const converted = multiplyRate(net, input.usdToPkrRate);
  const tax = multiplyRate(converted, taxRate);
  const finalAmount = converted - tax;

  return {
    grossUsd: asMoney(gross),
    currency,
    platform: input.platform,
    platformFeeRate,
    platformFeeUsd: asMoney(platformFee),
    afterPlatformUsd: asMoney(afterPlatform),
    earlyPayoutRate,
    earlyPayoutFee: asMoney(earlyPayoutFee),
    withdrawalMethod,
    withdrawalLabel: WITHDRAWAL_LABELS[withdrawalMethod],
    payoneerFeeRate: withdrawalFeeRate,
    payoneerFeeUsd: asMoney(percentWithdrawal),
    flatFeeUsd,
    flatFeeInOrderCurrency: asMoney(flatFee),
    netUsd: asMoney(net),
    usdToPkrRate: Number(input.usdToPkrRate.toFixed(6)),
    convertedPkr: asMoney(converted),
    taxStatus: input.taxStatus,
    taxRate,
    taxPkr: asMoney(tax),
    finalPkr: asMoney(finalAmount),
  };
}

export function projectMonthly(result: CalculatorResult, orders: number): number {
  if (!Number.isInteger(orders) || orders < 0 || orders > 1000) {
    throw new Error("Monthly orders must be a whole number from 0 to 1,000.");
  }
  const once = toScaled(result.finalPkr.toFixed(2), 2);
  return scaledToNumber(once * BigInt(orders), 2);
}

/** Smallest order amount, in cents, whose forward result reaches `targetPkr`. */
export function requiredOrderAmount(input: Omit<CalculatorInput, "orderAmountUsd"> & { targetPkr: number }): number {
  if (!Number.isFinite(input.targetPkr) || input.targetPkr < 0) {
    throw new Error("Enter a PKR target of zero or more.");
  }
  if (input.targetPkr === 0) return 0;

  const probe = (amount: number) => calculateEarnings({ ...input, orderAmountUsd: amount }).finalPkr;
  let high = 1;
  while (probe(high) < input.targetPkr) {
    if (high >= 10_000_000) {
      throw new Error("Those fees leave nothing that can reach the PKR target. Lower a percentage and try again.");
    }
    high = Math.min(10_000_000, high * 2);
  }

  let lo = 0;
  let hi = Math.round(high * 100);
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (probe(mid / 100) >= input.targetPkr) hi = mid;
    else lo = mid + 1;
  }
  return lo / 100;
}

export function formatResultSummary(result: CalculatorResult): string {
  return `Estimated final bank deposit: PKR ${result.finalPkr.toFixed(2)} from a ${result.currency} ${result.grossUsd.toFixed(2)} ${result.platform} order at ${result.usdToPkrRate} PKR per ${result.currency}. This is an assumption-based estimate, not a guaranteed payout.`;
}

export function formatBreakdownText(result: CalculatorResult): string {
  const lines = [
    "RealGigPay earnings estimate",
    `Gross order amount: ${result.currency} ${result.grossUsd.toFixed(2)}`,
    `Platform fee (${formatPercent(result.platformFeeRate)} ${result.platform}): ${result.currency} ${result.platformFeeUsd.toFixed(2)}`,
    `Amount after platform fee: ${result.currency} ${result.afterPlatformUsd.toFixed(2)}`,
  ];
  if (result.earlyPayoutRate > 0) {
    lines.push(
      `Early payout fee (${formatPercent(result.earlyPayoutRate)}): ${result.currency} ${result.earlyPayoutFee.toFixed(2)}`,
    );
  }
  lines.push(
    `Withdrawal fee (${formatPercent(result.payoneerFeeRate)} ${result.withdrawalLabel}): ${result.currency} ${result.payoneerFeeUsd.toFixed(2)}`,
  );
  if (result.flatFeeUsd > 0) {
    lines.push(
      `Flat withdrawal fee: USD ${result.flatFeeUsd.toFixed(2)} (${result.currency} ${result.flatFeeInOrderCurrency.toFixed(2)})`,
    );
  }
  lines.push(
    `Net amount: ${result.currency} ${result.netUsd.toFixed(2)}`,
    `${result.currency} to PKR rate used: ${result.usdToPkrRate}`,
    `Converted amount: PKR ${result.convertedPkr.toFixed(2)}`,
    `Tax set-aside (${formatPercent(result.taxRate)}): PKR ${result.taxPkr.toFixed(2)}`,
    `Final bank deposit: PKR ${result.finalPkr.toFixed(2)}`,
    "",
    "Percentages are the ones entered in the calculator. They are not a quote from Fiverr, Upwork, Payoneer, a bank, or FBR.",
  );
  return lines.join("\n");
}

export function exactMoney(amount: number): string {
  return formatScaled(toScaled(amount.toFixed(2), 2), 2);
}

export function formatFeePercent(rate: number): string {
  return formatPercent(rate);
}
