"use client";

import React, { useState } from "react";
import { CircleDollarSign, ArrowRightLeft, Clock, ShieldCheck } from "lucide-react";

export type FromCurrency = "USD" | "GBP" | "EUR" | "AED" | "CAD" | "AUD";
export type ToCurrency = "PKR" | "INR" | "BDT" | "NPR" | "LKR" | "PHP";
export type TransferType = "bank" | "card";

interface FeeRule {
  percentFee: number;
  fixedFee: number;
  label: string;
}

const CURRENCY_SYMBOLS: Record<FromCurrency | ToCurrency, string> = {
  USD: "$",
  GBP: "£",
  EUR: "€",
  AED: "AED ",
  CAD: "CA$",
  AUD: "A$",
  PKR: "PKR",
  INR: "INR",
  BDT: "BDT",
  NPR: "NPR",
  LKR: "LKR",
  PHP: "PHP",
};

const FROM_CURRENCIES: { code: FromCurrency; name: string }[] = [
  { code: "USD", name: "US Dollar" },
  { code: "GBP", name: "British Pound" },
  { code: "EUR", name: "Euro" },
  { code: "AED", name: "UAE Dirham" },
  { code: "CAD", name: "Canadian Dollar" },
  { code: "AUD", name: "Australian Dollar" },
];

const TO_CURRENCIES: { code: ToCurrency; name: string }[] = [
  { code: "PKR", name: "Pakistani Rupee" },
  { code: "INR", name: "Indian Rupee" },
  { code: "BDT", name: "Bangladeshi Taka" },
  { code: "NPR", name: "Nepalese Rupee" },
  { code: "LKR", name: "Sri Lankan Rupee" },
  { code: "PHP", name: "Philippine Peso" },
];

// Static approximate exchange rates (labeled clearly as estimates — not live rates)
const APPROX_EXCHANGE_RATES: Record<FromCurrency, Record<ToCurrency, number>> = {
  USD: {
    PKR: 278.5,
    INR: 84.4,
    BDT: 119.5,
    NPR: 135.0,
    LKR: 293.0,
    PHP: 58.6,
  },
  GBP: {
    PKR: 353.2,
    INR: 107.1,
    BDT: 151.6,
    NPR: 171.3,
    LKR: 371.7,
    PHP: 74.3,
  },
  EUR: {
    PKR: 294.8,
    INR: 89.3,
    BDT: 126.5,
    NPR: 142.9,
    LKR: 310.1,
    PHP: 62.0,
  },
  AED: {
    PKR: 75.83,
    INR: 22.98,
    BDT: 32.54,
    NPR: 36.76,
    LKR: 79.78,
    PHP: 15.96,
  },
  CAD: {
    PKR: 199.4,
    INR: 60.4,
    BDT: 85.6,
    NPR: 96.7,
    LKR: 209.8,
    PHP: 42.0,
  },
  AUD: {
    PKR: 181.2,
    INR: 54.9,
    BDT: 77.8,
    NPR: 87.9,
    LKR: 190.7,
    PHP: 38.1,
  },
};

const PAIR_FEE_RULES: Record<string, FeeRule> = {
  "USD->PKR": {
    percentFee: 0.59,
    fixedFee: 0.54,
    label: "0.59% + $0.54 fixed (estimate)",
  },
  "USD->INR": {
    percentFee: 0.44,
    fixedFee: 0.54,
    label: "0.44% + $0.54 fixed (estimate)",
  },
  "EUR->PKR": {
    percentFee: 0.59,
    fixedFee: 0.54,
    label: "0.59% + €0.54 fixed (estimate)",
  },
  "GBP->PKR": {
    percentFee: 0.55,
    fixedFee: 0.44,
    label: "0.55% + £0.44 fixed (estimate)",
  },
};

function getFeeRule(from: FromCurrency, to: ToCurrency): FeeRule {
  const key = `${from}->${to}`;
  if (PAIR_FEE_RULES[key]) {
    return PAIR_FEE_RULES[key];
  }
  const symbol = CURRENCY_SYMBOLS[from];
  return {
    percentFee: 0.6,
    fixedFee: 0.54,
    label: `0.60% + ${symbol}0.54 fixed (default estimate)`,
  };
}

function formatFromAmount(amount: number, currency: FromCurrency): string {
  const symbol = CURRENCY_SYMBOLS[currency];
  return `${symbol}${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

const QUICK_AMOUNTS = ["100", "500", "1000", "2500"];

export default function WiseCalculator() {
  const [sendAmountInput, setSendAmountInput] = useState<string>("500");
  const [fromCurrency, setFromCurrency] = useState<FromCurrency>("USD");
  const [toCurrency, setToCurrency] = useState<ToCurrency>("PKR");
  const [transferType, setTransferType] = useState<TransferType>("bank");
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  const parsedAmount = parseFloat(sendAmountInput);
  const sendAmount = Number.isFinite(parsedAmount) && parsedAmount > 0 ? parsedAmount : 0;

  const baseRule = getFeeRule(fromCurrency, toCurrency);
  const cardExtraPercent = transferType === "card" ? 1.5 : 0;
  const totalPercentFee = baseRule.percentFee + cardExtraPercent;

  const variableFee = sendAmount * (totalPercentFee / 100);
  const totalWiseFee = sendAmount > 0 ? Math.min(sendAmount, variableFee + baseRule.fixedFee) : 0;
  const amountAfterFee = Math.max(0, sendAmount - totalWiseFee);
  const keptPercent = sendAmount > 0 ? Math.max(0, Math.min(100, (amountAfterFee / sendAmount) * 100)) : 0;

  const exchangeRate = APPROX_EXCHANGE_RATES[fromCurrency][toCurrency];
  const recipientGets = amountAfterFee * exchangeRate;
  const deliveryTime =
    transferType === "bank" ? "1–2 business days" : "Instant (within minutes)";

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleCalculate}
      className="grid min-w-0 items-start gap-4 lg:grid-cols-2"
    >
      {/* Left Column: Calculator Inputs (matches Calculator.tsx surface card) */}
      <div className="surface grid min-w-0 gap-5 rounded-3xl p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h2 className="text-xl font-semibold tracking-[-0.02em] text-ink">
              Calculate Wise Transfer
            </h2>
            <p className="mt-1 text-sm leading-6 text-muted">
              Enter your transfer amount, currency corridor, and payment method to see estimated Wise fees.
            </p>
          </div>
        </div>

        {/* Send Amount Input */}
        <div className="grid gap-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="wise-send-amount"
              className="text-sm font-medium text-ink"
            >
              You send ({fromCurrency})
            </label>
            <div className="flex items-center gap-1.5">
              {QUICK_AMOUNTS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setSendAmountInput(preset)}
                  className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold transition ${
                    sendAmountInput === preset
                      ? "border-brand bg-brand-50 text-brand-ink"
                      : "border-line bg-white text-muted hover:border-brand/40 hover:text-ink"
                  }`}
                >
                  {CURRENCY_SYMBOLS[fromCurrency]}
                  {preset}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-sm font-semibold text-muted">
              {CURRENCY_SYMBOLS[fromCurrency]}
            </span>
            <input
              id="wise-send-amount"
              type="number"
              min="0"
              step="any"
              value={sendAmountInput}
              onChange={(e) => setSendAmountInput(e.target.value)}
              placeholder="500.00"
              className="field field-prefix pr-16 tabular"
              required
            />
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-xs font-bold tracking-wider text-muted">
              {fromCurrency}
            </span>
          </div>
          <span className="text-xs text-muted">
            Enter the gross amount you or your client is sending via Wise.
          </span>
        </div>

        {/* From Currency & To Currency */}
        <div className="grid gap-4 sm:grid-cols-2">
          <label htmlFor="wise-from-currency" className="grid gap-1.5 text-sm font-medium text-ink">
            <span>From Currency</span>
            <select
              id="wise-from-currency"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value as FromCurrency)}
              className="field"
            >
              {FROM_CURRENCIES.map((curr) => (
                <option key={curr.code} value={curr.code}>
                  {curr.code} — {curr.name}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="wise-to-currency" className="grid gap-1.5 text-sm font-medium text-ink">
            <span>To Currency</span>
            <select
              id="wise-to-currency"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value as ToCurrency)}
              className="field"
            >
              {TO_CURRENCIES.map((curr) => (
                <option key={curr.code} value={curr.code}>
                  {curr.code} — {curr.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Transfer Type */}
        <fieldset className="grid gap-2">
          <div className="flex items-center justify-between">
            <legend className="text-sm font-medium text-ink">
              Transfer Type
            </legend>

            {/* Info icon (ℹ️) with tooltip */}
            <div className="relative inline-block">
              <button
                type="button"
                onClick={() => setShowTooltip((prev) => !prev)}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                aria-label="Fee assumption details"
                className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-ink transition hover:bg-brand/15"
              >
                <span aria-hidden="true">ℹ️</span>
                <span>Fee assumptions</span>
              </button>
              {showTooltip && (
                <div
                  role="tooltip"
                  className="absolute right-0 bottom-full z-30 mb-2 w-72 rounded-2xl border border-line bg-navy p-3.5 text-xs leading-5 text-white shadow-xl"
                >
                  <p className="font-semibold text-cyan">
                    Estimated Wise Fee Assumptions:
                  </p>
                  <ul className="mt-1.5 space-y-1 text-slate-200">
                    <li>• USD → PKR: 0.59% + $0.54 fixed</li>
                    <li>• USD → INR: 0.44% + $0.54 fixed</li>
                    <li>• EUR → PKR: 0.59% + €0.54 fixed</li>
                    <li>• GBP → PKR: 0.55% + £0.44 fixed</li>
                    <li>• Default fallback: 0.60% + 0.54 fixed</li>
                    <li>• Card payment adds +1.50% on top</li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              aria-pressed={transferType === "bank"}
              onClick={() => setTransferType("bank")}
              className={`rounded-2xl border px-4 py-3.5 text-left transition ${
                transferType === "bank"
                  ? "border-brand bg-brand-50 shadow-[0_0_0_4px_rgba(49,91,255,0.12)]"
                  : "border-line bg-[#f7f9fd] hover:border-brand/40"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-base font-semibold tracking-[-0.02em] text-ink">
                  Bank Transfer
                </span>
                <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-semibold text-brand-ink shadow-2xs">
                  Low fee
                </span>
              </div>
              <span className="mt-1 block text-xs leading-5 text-muted">
                ~{baseRule.percentFee}% + {CURRENCY_SYMBOLS[fromCurrency]}
                {baseRule.fixedFee.toFixed(2)} fixed • Arrives in 1–2 business days
              </span>
            </button>

            <button
              type="button"
              aria-pressed={transferType === "card"}
              onClick={() => setTransferType("card")}
              className={`rounded-2xl border px-4 py-3.5 text-left transition ${
                transferType === "card"
                  ? "border-brand bg-brand-50 shadow-[0_0_0_4px_rgba(49,91,255,0.12)]"
                  : "border-line bg-[#f7f9fd] hover:border-brand/40"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-base font-semibold tracking-[-0.02em] text-ink">
                  Card Payment
                </span>
                <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-semibold text-navy shadow-2xs">
                  Instant
                </span>
              </div>
              <span className="mt-1 block text-xs leading-5 text-muted">
                ~{totalPercentFee.toFixed(2)}% + {CURRENCY_SYMBOLS[fromCurrency]}
                {baseRule.fixedFee.toFixed(2)} fixed (+1.5% card) • Instant delivery
              </span>
            </button>
          </div>
        </fieldset>

        {/* Corridor Fee Pill */}
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-line bg-[#f7f9fd] px-4 py-3 text-xs text-muted">
          <span className="inline-flex items-center gap-1.5 font-medium text-ink">
            <ArrowRightLeft className="size-3.5 text-brand" aria-hidden />
            Active corridor rule ({fromCurrency} → {toCurrency}):
          </span>
          <span className="font-semibold text-brand-ink">
            {totalPercentFee.toFixed(2)}% + {CURRENCY_SYMBOLS[fromCurrency]}
            {baseRule.fixedFee.toFixed(2)} fixed (estimate)
          </span>
        </div>

        <button
          type="submit"
          className="cta-gradient h-12 cursor-pointer rounded-xl text-sm font-semibold text-white transition"
        >
          Calculate Wise Payout
        </button>
      </div>

      {/* Right Column: Results & Breakdown Table (matches EarningsBreakdown.tsx) */}
      <div className="grid min-w-0 gap-4" aria-live="polite">
        {/* Blue Hero Result Panel */}
        <div className="result-panel rounded-3xl p-5 text-white sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-white">
              Recipient gets (in {toCurrency})
            </p>
            <span className="rounded-full bg-white/15 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white">
              Estimate
            </span>
          </div>

          <div className="mt-3 flex items-end gap-3">
            <CircleDollarSign aria-hidden className="mb-1 size-7 shrink-0 text-success-soft" />
            <p className="text-[clamp(2rem,4vw,2.75rem)] font-semibold leading-none tracking-[-0.04em] text-success-soft tabular">
              {Math.round(recipientGets).toLocaleString("en-US")} {toCurrency}
            </p>
          </div>

          <p className="mt-3 text-sm text-white/90">
            Exact converted figure:{" "}
            <span className="font-semibold tabular text-white">
              {recipientGets.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              {toCurrency}
            </span>{" "}
            at 1 {fromCurrency} = {exchangeRate.toFixed(2)} {toCurrency} (estimate — not a live rate).
          </p>

          <div className="mt-5">
            <div className="flex justify-between text-xs text-slate-200">
              <span>{fromCurrency} converted after Wise fee</span>
              <span className="tabular font-semibold">{keptPercent.toFixed(2)}%</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/15">
              <div
                className="h-full rounded-full bg-white transition-all duration-300"
                style={{ width: `${keptPercent}%` }}
              />
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-200">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-3.5" aria-hidden />
                Estimated delivery: <strong className="text-white">{deliveryTime}</strong>
              </span>
              <span className="inline-flex items-center gap-1">
                <ShieldCheck className="size-3.5" aria-hidden />
                Mid-market rate assumption
              </span>
            </div>
          </div>
        </div>

        {/* Clean Breakdown Table Card */}
        <div className="surface overflow-hidden rounded-3xl">
          <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
            <h2 className="text-lg font-semibold text-ink">Transfer breakdown</h2>
            <span className="text-xs font-medium text-muted">
              {transferType === "bank" ? "Bank transfer" : "Card payment"}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-line bg-[#f7f9fd] text-xs font-semibold uppercase tracking-[0.08em] text-muted">
                <tr>
                  <th className="px-5 py-3">Label</th>
                  <th className="px-5 py-3 text-right">Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                <tr>
                  <td className="px-5 py-3.5">
                    <span className="block font-medium text-ink">You send</span>
                    <span className="block text-xs text-muted">
                      Gross transfer amount in {fromCurrency}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right font-semibold text-ink tabular">
                    {formatFromAmount(sendAmount, fromCurrency)} {fromCurrency}
                  </td>
                </tr>

                <tr>
                  <td className="px-5 py-3.5">
                    <span className="inline-flex items-center gap-1.5 font-medium text-ink">
                      Wise fee
                      <span
                        title={`Estimated assumption: ${totalPercentFee.toFixed(2)}% + ${CURRENCY_SYMBOLS[fromCurrency]}${baseRule.fixedFee.toFixed(2)} fixed fee`}
                        className="cursor-help text-xs"
                      >
                        ℹ️
                      </span>
                    </span>
                    <span className="block text-xs text-muted">
                      {totalPercentFee.toFixed(2)}% ({formatFromAmount(variableFee, fromCurrency)}) +{" "}
                      {CURRENCY_SYMBOLS[fromCurrency]}
                      {baseRule.fixedFee.toFixed(2)} fixed (estimate)
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right font-semibold text-danger-ink tabular">
                    − {formatFromAmount(totalWiseFee, fromCurrency)}
                  </td>
                </tr>

                <tr>
                  <td className="px-5 py-3.5">
                    <span className="block font-medium text-ink">Amount converted</span>
                    <span className="block text-xs text-muted">
                      Net {fromCurrency} after Wise fee deduction
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right font-semibold text-ink tabular">
                    {formatFromAmount(amountAfterFee, fromCurrency)}
                  </td>
                </tr>

                <tr>
                  <td className="px-5 py-3.5">
                    <span className="block font-medium text-ink">Exchange rate</span>
                    <span className="block text-xs text-muted">
                      Static mid-market reference (estimate — not a live rate)
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right font-semibold text-ink tabular">
                    1 {fromCurrency} = {exchangeRate.toFixed(2)} {toCurrency}{" "}
                    <span className="block text-xs font-normal text-muted">
                      (estimate — not a live rate)
                    </span>
                  </td>
                </tr>

                <tr className="bg-brand-50/40">
                  <td className="px-5 py-3.5">
                    <span className="block font-semibold text-ink">Recipient gets</span>
                    <span className="block text-xs text-muted">
                      Estimated payout in {toCurrency}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right text-base font-bold text-brand-ink tabular">
                    {Math.round(recipientGets).toLocaleString("en-US")} {toCurrency}
                  </td>
                </tr>

                <tr>
                  <td className="px-5 py-3.5">
                    <span className="block font-medium text-ink">Delivery time</span>
                    <span className="block text-xs text-muted">
                      Typical Wise processing window
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right font-semibold text-ink">
                    {deliveryTime}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-sm leading-6 text-muted">
          Estimates only. Actual fees and rates may vary. Check Wise.com for live rates.
        </p>
      </div>
    </form>
  );
}
