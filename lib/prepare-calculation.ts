import { calculateEarnings, requiredOrderAmount } from "@/lib/calculator";
import { scaledToNumber, toScaled } from "@/lib/money";
import { parseExchangeRate, parseOrderAmount, parsePercent } from "@/lib/parse-amounts";
import type { CalculatorResult, Currency, Platform, TaxStatus, WithdrawalMethod } from "@/types/calculator";

export type FormValues = {
  amount: string;
  target: string;
  reverse: boolean;
  currency: Currency;
  platform: Platform;
  platformFee: string;
  withdrawalFee: string;
  taxFee: string;
  taxStatus: TaxStatus;
  method: WithdrawalMethod;
  early: boolean;
  earlyFee: string;
  bankFee: boolean;
  flatFee: string;
  hourly: boolean;
  hourlyRate: string;
  hours: string;
  rate: string;
  currencyPerUsd: number | null;
};

export type PreparedCalculation =
  | {
      ok: false;
      amountError?: string;
      rateError?: string;
      feeError?: string;
      targetError?: string;
    }
  | {
      ok: true;
      result: CalculatorResult;
      requiredAmount: number | null;
      impliedHourly: number | null;
    };

function roundCents(value: number): number {
  return scaledToNumber(toScaled(value.toFixed(8), 2), 2);
}

function readPercent(value: string, label: string): { error?: string; rate?: number } {
  const parsed = parsePercent(value);
  if (parsed.state === "empty" || parsed.state === "incomplete") {
    return { error: `Enter a ${label}.` };
  }
  if (parsed.state === "invalid") return { error: parsed.message };
  return { rate: parsed.rate };
}

export function prepareCalculation(values: FormValues): PreparedCalculation {
  const platform = readPercent(values.platformFee, "platform fee");
  const withdrawal = readPercent(values.withdrawalFee, "withdrawal fee");
  const tax = readPercent(values.taxFee, "tax percentage");
  const feeError = platform.error || withdrawal.error || tax.error;
  if (feeError || platform.rate === undefined || withdrawal.rate === undefined || tax.rate === undefined) {
    return { ok: false, feeError };
  }

  let earlyPayoutRate = 0;
  if (values.early) {
    const early = readPercent(values.earlyFee, "early payout percentage");
    if (early.error || early.rate === undefined) return { ok: false, feeError: early.error };
    earlyPayoutRate = early.rate;
  }

  let flatFeeUsd = 0;
  if (values.bankFee) {
    const flat = parseOrderAmount(values.flatFee);
    if (flat.state !== "ok") {
      return { ok: false, feeError: flat.state === "invalid" ? flat.message : "Enter the flat withdrawal fee in USD." };
    }
    flatFeeUsd = flat.amount;
  }

  const currencyPerUsd = values.currency === "USD" ? 1 : values.currencyPerUsd;
  if (flatFeeUsd > 0 && values.currency !== "USD" && (!currencyPerUsd || currencyPerUsd <= 0)) {
    return {
      ok: false,
      feeError: "A USD cross rate is needed to convert the flat dollar fee. Switch the order to USD, or turn the flat fee off and type a withdrawal percentage.",
    };
  }

  const rateState = parseExchangeRate(values.rate);
  if (rateState.state !== "ok") {
    return {
      ok: false,
      rateError: rateState.state === "invalid" ? rateState.message : undefined,
    };
  }

  let amount = 0;
  let impliedHourly: number | null = null;
  if (values.hourly && !values.reverse) {
    const hourly = parseOrderAmount(values.hourlyRate);
    const hours = parseOrderAmount(values.hours);
    if (hourly.state !== "ok") {
      return { ok: false, amountError: hourly.state === "invalid" ? hourly.message : undefined };
    }
    if (hours.state !== "ok") {
      return { ok: false, amountError: hours.state === "invalid" ? hours.message : undefined };
    }
    amount = roundCents(hourly.amount * hours.amount);
  }

  const shared = {
    platform: values.platform,
    taxStatus: values.taxStatus,
    usdToPkrRate: rateState.rate,
    platformFeeRate: platform.rate,
    withdrawalFeeRate: withdrawal.rate,
    taxRate: tax.rate,
    earlyPayoutRate,
    flatFeeUsd,
    currency: values.currency,
    currencyPerUsd: currencyPerUsd ?? 1,
    withdrawalMethod: values.method,
  };

  if (values.reverse) {
    const target = parseOrderAmount(values.target);
    if (target.state !== "ok") {
      return { ok: false, targetError: target.state === "invalid" ? target.message : undefined };
    }
    try {
      const requiredAmount = requiredOrderAmount({ ...shared, targetPkr: target.amount });
      const result = calculateEarnings({ ...shared, orderAmountUsd: requiredAmount });
      if (values.hourly) {
        const hours = parseOrderAmount(values.hours);
        if (hours.state === "ok" && hours.amount > 0) impliedHourly = roundCents(requiredAmount / hours.amount);
      }
      return { ok: true, result, requiredAmount, impliedHourly };
    } catch (error) {
      return { ok: false, targetError: error instanceof Error ? error.message : "The PKR target could not be reversed." };
    }
  }

  if (!values.hourly) {
    const parsedAmount = parseOrderAmount(values.amount);
    if (parsedAmount.state !== "ok") {
      return { ok: false, amountError: parsedAmount.state === "invalid" ? parsedAmount.message : undefined };
    }
    amount = parsedAmount.amount;
  }

  try {
    return { ok: true, result: calculateEarnings({ ...shared, orderAmountUsd: amount }), requiredAmount: null, impliedHourly };
  } catch (error) {
    return { ok: false, amountError: error instanceof Error ? error.message : "The estimate could not be calculated." };
  }
}
