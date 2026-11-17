import {
  PAYONEER_FEE_RATE,
  PLATFORM_FEE_RATES,
  TAX_RATES,
} from "@/lib/constants";
import { formatScaled, multiplyRate, scaledToNumber, toScaled } from "@/lib/money";
import type { CalculatorInput, CalculatorResult } from "@/types/calculator";

function money(amount: number): bigint {
  if (!Number.isFinite(amount) || amount < 0) {
    throw new Error("Order amount must be a finite number of zero or more.");
  }
  return toScaled(amount.toFixed(2), 2);
}

function asMoney(value: bigint): number {
  return scaledToNumber(value, 2);
}

/**
 * Estimate a freelancer's bank deposit in PKR.
 *
 * Order is fixed:
 * 1. Gross order amount
 * 2. Platform fee
 * 3. Payoneer withdrawal fee on the amount after the platform fee
 * 4. Convert the net USD amount at the supplied USD/PKR rate
 * 5. Illustrative tax on the converted PKR amount
 * 6. Final bank deposit
 *
 * Each currency step is rounded half-up to two decimal places so the
 * displayed lines reconcile. The rate itself is not forced to two decimals.
 */
export function calculateEarnings(input: CalculatorInput): CalculatorResult {
  if (!Number.isFinite(input.usdToPkrRate) || input.usdToPkrRate <= 0) {
    throw new Error("Enter a USD to PKR rate greater than zero.");
  }

  const platformFeeRate = PLATFORM_FEE_RATES[input.platform];
  const taxRate = TAX_RATES[input.taxStatus];
  const gross = money(input.orderAmountUsd);
  const platformFee = multiplyRate(gross, platformFeeRate);
  const afterPlatform = gross - platformFee;
  const payoneerFee = multiplyRate(afterPlatform, PAYONEER_FEE_RATE);
  const net = afterPlatform - payoneerFee;
  const converted = multiplyRate(net, input.usdToPkrRate);
  const tax = multiplyRate(converted, taxRate);
  const finalAmount = converted - tax;

  return {
    grossUsd: asMoney(gross),
    platform: input.platform,
    platformFeeRate,
    platformFeeUsd: asMoney(platformFee),
    afterPlatformUsd: asMoney(afterPlatform),
    payoneerFeeRate: PAYONEER_FEE_RATE,
    payoneerFeeUsd: asMoney(payoneerFee),
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

export function formatResultSummary(result: CalculatorResult): string {
  return `Estimated final bank deposit: PKR ${result.finalPkr.toFixed(2)} from a USD ${result.grossUsd.toFixed(2)} ${result.platform} order at ${result.usdToPkrRate} PKR per USD. This is an assumption-based estimate, not a guaranteed payout.`;
}

export function formatBreakdownText(result: CalculatorResult): string {
  const lines = [
    "GigToPKR earnings estimate",
    `Gross order amount: USD ${result.grossUsd.toFixed(2)}`,
    `Platform fee (${(result.platformFeeRate * 100).toFixed(0)}% ${result.platform} assumption): USD ${result.platformFeeUsd.toFixed(2)}`,
    `Amount after platform fee: USD ${result.afterPlatformUsd.toFixed(2)}`,
    `Payoneer withdrawal fee (${(result.payoneerFeeRate * 100).toFixed(0)}% assumption): USD ${result.payoneerFeeUsd.toFixed(2)}`,
    `Net withdrawable amount: USD ${result.netUsd.toFixed(2)}`,
    `USD to PKR rate used: ${result.usdToPkrRate}`,
    `Converted amount: PKR ${result.convertedPkr.toFixed(2)}`,
    `Estimated FBR tax (${(result.taxRate * 100).toFixed(0)}% ${result.taxStatus} assumption): PKR ${result.taxPkr.toFixed(2)}`,
    `Final bank deposit: PKR ${result.finalPkr.toFixed(2)}`,
    "",
    "Assumptions are not a quote from Fiverr, Upwork, Payoneer, a bank, or FBR.",
  ];
  return lines.join("\n");
}

export function exactMoney(amount: number): string {
  return formatScaled(toScaled(amount.toFixed(2), 2), 2);
}
