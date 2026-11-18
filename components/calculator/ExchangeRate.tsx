"use client";

import { RefreshCw } from "lucide-react";
import { useExchangeRate } from "@/components/calculator/ExchangeRateProvider";
import { Skeleton } from "@/components/ui/Skeleton";
import { formatRate } from "@/lib/money";
import { formatTimestamp } from "@/lib/utils";

export function LiveRate({ compact = false }: { compact?: boolean }) {
  const { quote } = useExchangeRate();
  const isLoading = quote.status === "loading";
  const value = quote.rate ? `USD/PKR ${formatRate(quote.rate)}` : "Rate unavailable";

  return (
    <p
      className="inline-flex min-h-8 min-w-[9.75rem] items-center justify-center whitespace-nowrap rounded-full border border-line bg-white px-3 text-xs font-semibold text-navy shadow-[var(--shadow)]"
      title={quote.sourceLabel}
      aria-busy={isLoading}
    >
      <span className="sr-only">Reference exchange rate. </span>
      {isLoading ? (
        <>
          <span className="sr-only">Fetching rate</span>
          <Skeleton variant="text" className="h-3 w-24" />
        </>
      ) : compact ? (
        value
      ) : (
        value
      )}
    </p>
  );
}

export function ExchangeRateField({
  value,
  onChange,
  manual,
  error,
  currency = "USD",
  optional = false,
}: {
  value: string;
  onChange: (value: string) => void;
  manual: boolean;
  error?: string;
  currency?: string;
  /** User-typed local rate. No country reference rate is filled in. */
  optional?: boolean;
}) {
  const { quote, retry } = useExchangeRate();
  const isLoading = !optional && !manual && quote.status === "loading";
  const status = optional ? (value.trim() ? "Your rate" : "Optional") : manual ? "Manual rate" : quote.rate ? "Reference rate" : "Rate needed";

  return (
    <div className="grid gap-2">
      <div className="flex items-end justify-between gap-3">
        <label htmlFor="usd-pkr-rate" className="text-sm font-medium text-ink">
          {optional ? `Your currency per 1 ${currency}` : `${currency} to PKR rate`}
        </label>
        {isLoading ? (
          <Skeleton variant="rect" className="h-6 w-28 !rounded-full" />
        ) : (
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-navy-2">
            {status}
          </span>
        )}
      </div>
      <div className="flex gap-2">
        <input
          id="usd-pkr-rate"
          inputMode="decimal"
          autoComplete="off"
          placeholder={optional ? "Leave blank to skip" : "Enter a rate"}
          value={value}
          aria-invalid={error ? true : undefined}
          aria-describedby="rate-help"
          onChange={(event) => onChange(event.target.value.replace(/-/g, ""))}
          className="field tabular"
        />
        {optional ? null : (
        <button
          type="button"
          onClick={retry}
          className="inline-flex h-[3.25rem] items-center gap-2 rounded-[0.9rem] border border-line bg-white px-3 text-sm font-semibold text-navy shadow-[var(--shadow)] hover:border-brand/30"
        >
          <RefreshCw aria-hidden className="size-4" />
          Retry
        </button>
        )}
      </div>
      <div id="rate-help" className="grid gap-1 text-sm text-muted">
        {isLoading ? (
          <p>
            <span className="sr-only">Looking up a reference rate. Frankfurter is checked first.</span>
            <Skeleton variant="text" className="h-5 w-full max-w-md" />
          </p>
        ) : optional ? (
          <p>Optional. Leave this blank to keep the result in {currency}. A typed rate is your figure, not a bank quote.</p>
        ) : (
          <p>
            <span className="font-semibold text-ink">Rates last updated: </span>
            {quote.retrievedAt ? formatTimestamp(quote.retrievedAt) : "unavailable"}
            {quote.stale ? " (last successful quote — the live lookup failed)" : ""}
            {quote.retrievedAt ? `. ${quote.sourceLabel}.` : ". Type the rate from your bank or Payoneer. No guessed rate is filled in."}
          </p>
        )}
        {!optional && quote.warning ? <p>{quote.warning}</p> : null}
        {!optional && quote.error ? (
          <p className="font-medium text-danger-ink" role="alert">
            {quote.error}
          </p>
        ) : null}
        {error ? (
          <p className="font-medium text-danger-ink" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    </div>
  );
}
