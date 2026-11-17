import { HomeCalculatorBoot } from "@/components/calculator/HomeCalculatorBoot";

const action =
  "inline-flex min-h-11 items-center rounded-xl border border-line bg-white px-3.5 text-sm font-semibold text-ink shadow-[var(--shadow)] disabled:opacity-50";

export function CalculatorPreview({ enhance = false }: { enhance?: boolean }) {
  return (
    <form
      id={enhance ? "home-calc" : undefined}
      data-home-calc={enhance ? "" : undefined}
      action={enhance ? "#calculator" : undefined}
      className="grid min-w-0 items-start gap-3 lg:grid-cols-2"
    >
      <div className="surface grid min-w-0 gap-4 rounded-3xl p-4 sm:p-5">
        <div>
          <h2 className="text-xl font-semibold tracking-[-0.02em] text-ink">Calculate Your Earnings</h2>
          <p className="mt-1 text-sm leading-6 text-muted">
            Enter your project details to see your estimated take-home amount. Fees below are planning assumptions, not a deduction schedule from Fiverr, Upwork, Payoneer, or FBR.
          </p>
        </div>
        <div className="grid gap-2">
          <label htmlFor="order-amount" className="text-sm font-medium text-ink">
            Order Amount (USD)
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted">$</span>
            <input
              id="order-amount"
              data-amount={enhance ? "" : undefined}
              className="field field-prefix tabular"
              inputMode="decimal"
              autoComplete="off"
              placeholder="500.00"
              aria-describedby="order-amount-hint order-amount-error"
            />
          </div>
          <p id="order-amount-hint" className="text-sm leading-5 text-muted">
            Zero is allowed. Negative amounts are not.
          </p>
          <p id="order-amount-error" data-amount-error={enhance ? "" : undefined} className="text-sm font-medium text-danger-ink" role="alert" />
        </div>
        <fieldset className="grid gap-2">
          <legend className="text-sm font-medium text-ink">Platform</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            <button type="button" data-platform="fiverr" aria-pressed="true" className="rounded-2xl border border-line bg-[#f7f9fd] px-4 py-3 text-left">
              <span className="block text-base font-semibold">Fiverr</span>
              <span className="mt-0.5 block text-sm font-medium text-brand-ink">20% assumed fee</span>
              <span className="mt-1 block text-xs leading-5 text-muted">Freelancers earn 80% on the published earnings page.</span>
            </button>
            <button type="button" data-platform="upwork" aria-pressed="false" className="rounded-2xl border border-line bg-[#f7f9fd] px-4 py-3 text-left">
              <span className="block text-base font-semibold">Upwork</span>
              <span className="mt-0.5 block text-sm font-medium text-brand-ink">10% assumed fee</span>
              <span className="mt-1 block text-xs leading-5 text-muted">Published fee is 0% to 15% per contract.</span>
            </button>
          </div>
        </fieldset>
        <fieldset className="grid gap-2">
          <legend className="text-sm font-medium text-ink">Tax status</legend>
          <div className="grid grid-cols-2 rounded-2xl bg-[#f7f9fd] p-1">
            <button type="button" data-tax="filer" aria-pressed="true" className="rounded-xl px-3 py-2.5 text-left text-muted">
              <span className="block text-sm font-semibold">Active Filer</span>
              <span className="block text-xs">1% illustration</span>
            </button>
            <button type="button" data-tax="nonFiler" aria-pressed="false" className="rounded-xl px-3 py-2.5 text-left text-muted">
              <span className="block text-sm font-semibold">Non-Filer</span>
              <span className="block text-xs">2% illustration</span>
            </button>
          </div>
          <p className="text-sm leading-5 text-muted">Illustrative only. These are not current FBR rates.</p>
        </fieldset>
        <div className="grid gap-2">
          <div className="flex items-end justify-between gap-3">
            <label htmlFor="usd-pkr-rate" className="text-sm font-medium text-ink">
              USD to PKR rate
            </label>
            <span data-rate-status={enhance ? "" : undefined} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-navy-2">
              Rate needed
            </span>
          </div>
          <div className="flex gap-2">
            <input
              id="usd-pkr-rate"
              data-rate={enhance ? "" : undefined}
              className="field tabular"
              inputMode="decimal"
              autoComplete="off"
              placeholder="Enter a rate"
              aria-describedby="rate-help"
            />
            <button type="button" data-retry={enhance ? "" : undefined} className="inline-flex h-[3.25rem] min-h-11 items-center rounded-[0.9rem] border border-line bg-white px-3 text-sm font-semibold text-navy">
              Retry
            </button>
          </div>
          <div id="rate-help" className="grid gap-1 text-sm text-muted">
            <p data-rate-help={enhance ? "" : undefined}>Enter a rate from your bank or Payoneer, or use the reference rate when it loads.</p>
            <p data-rate-alert={enhance ? "" : undefined} className="font-medium text-danger-ink" role="alert" />
            <p data-rate-error={enhance ? "" : undefined} className="font-medium text-danger-ink" role="alert" />
          </div>
        </div>
        <button type={enhance ? "submit" : "button"} className="cta-gradient h-12 rounded-xl text-sm font-semibold text-white">
          Calculate earnings
        </button>
      </div>
      <div className="grid min-w-0 gap-4">
        <div id="home-calc-output" tabIndex={-1} className="outline-none">
          <div className="result-panel flex min-h-80 flex-col justify-center rounded-3xl p-4 text-white sm:p-5">
            <h2 className="text-lg font-semibold">Your Estimated Bank Deposit</h2>
            <p className="mt-2 max-w-sm text-sm leading-6 text-white">
              Enter an order amount and a USD to PKR rate. The estimate appears here and stays in step with the inputs.
            </p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-white">Estimate, not a transfer</p>
          </div>
        </div>
        <div className="grid gap-3">
          <div className="flex flex-wrap gap-2">
            <button type="button" data-reset={enhance ? "" : undefined} className={action}>
              Reset
            </button>
            <button type="button" data-copy-result={enhance ? "" : undefined} data-needs-result={enhance ? "" : undefined} className={action} disabled>
              Copy result
            </button>
            <button type="button" data-copy-breakdown={enhance ? "" : undefined} data-needs-result={enhance ? "" : undefined} className={action} disabled>
              Copy breakdown
            </button>
            <button type="button" data-pdf={enhance ? "" : undefined} data-needs-result={enhance ? "" : undefined} className={action} disabled>
              Download PDF
            </button>
          </div>
          <p data-status={enhance ? "" : undefined} className="min-h-5 text-sm text-navy-2" role="status">
            Results stay on this device.
          </p>
        </div>
      </div>
      {enhance ? <HomeCalculatorBoot /> : null}
    </form>
  );
}
