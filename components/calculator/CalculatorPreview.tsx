import { HomeCalculatorBoot } from "@/components/calculator/HomeCalculatorBoot";

const action =
  "inline-flex min-h-11 items-center rounded-xl border border-line bg-white px-3.5 text-sm font-semibold text-ink shadow-[var(--shadow)] disabled:opacity-50";

export function CalculatorPreview({
  enhance = false,
  lockedPlatform,
}: {
  enhance?: boolean;
  lockedPlatform?: "fiverr" | "upwork";
}) {
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
            {lockedPlatform === "fiverr"
              ? "Fiverr only. The fee starts at 20% and stays editable. This page does not estimate Upwork."
              : lockedPlatform === "upwork"
                ? "Upwork only. The fee starts at 10% inside the published 0% to 15% range. This page does not estimate Fiverr."
                : "Fees start from published defaults and stay editable. Nothing here is a deduction schedule from Fiverr, Upwork, Payoneer, Wise, or a tax authority."}
          </p>
        </div>
        <div className="grid gap-2">
          <label htmlFor="order-currency" className="text-sm font-medium text-ink">
            Order currency
          </label>
          <select id="order-currency" data-currency={enhance ? "" : undefined} className="field" defaultValue="USD">
            <option value="USD">USD — US dollar</option>
            <option value="EUR">EUR — Euro</option>
            <option value="GBP">GBP — British pound</option>
            <option value="AED">AED — UAE dirham</option>
          </select>
        </div>
        {lockedPlatform ? null : (
        <div className="grid grid-cols-2 gap-2 rounded-2xl bg-[#f7f9fd] p-1">
          <button type="button" data-mode="forward" aria-pressed="true" className="rounded-xl bg-white px-3 py-2.5 text-left text-sm font-semibold">
            I know the order amount
          </button>
          <button type="button" data-mode="reverse" aria-pressed="false" className="rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-muted">
            I want a local amount
          </button>
        </div>
        )}
        <div data-forward-fields={enhance ? "" : undefined} className="grid gap-2">
          <label htmlFor="order-amount" className="text-sm font-medium text-ink">
            Order amount
          </label>
          <input
            id="order-amount"
            data-amount={enhance ? "" : undefined}
            className="field tabular"
            inputMode="decimal"
            autoComplete="off"
            placeholder="500.00"
            aria-describedby="order-amount-hint order-amount-error"
          />
          <p id="order-amount-hint" className="text-sm leading-5 text-muted">
            Zero is allowed. Negative amounts are not.
          </p>
          <p id="order-amount-error" data-amount-error={enhance ? "" : undefined} className="text-sm font-medium text-danger-ink" role="alert" />
        </div>
        {lockedPlatform ? null : (
        <div data-reverse-fields={enhance ? "" : undefined} className="grid gap-2" hidden>
          <label htmlFor="target-pkr" className="text-sm font-medium text-ink">
            Amount you want to receive
          </label>
          <input id="target-pkr" data-target={enhance ? "" : undefined} className="field tabular" inputMode="decimal" placeholder="100000.00" />
          <p className="text-sm leading-5 text-muted">The calculator solves for the order amount that reaches this deposit.</p>
          <p data-target-error={enhance ? "" : undefined} className="text-sm font-medium text-danger-ink" role="alert" />
        </div>
        )}
        <label className="flex items-start gap-2 text-sm text-ink">
          <input type="checkbox" data-hourly={enhance ? "" : undefined} className="mt-1" />
          <span>
            <span className="font-medium">Hourly contract</span>
            <span className="mt-0.5 block text-muted">Multiply an hourly rate by hours to get the order total.</span>
          </span>
        </label>
        <div data-hourly-fields={enhance ? "" : undefined} className="grid gap-4 sm:grid-cols-2" hidden>
          <div className="grid gap-2">
            <label htmlFor="hourly-rate" className="text-sm font-medium text-ink">Hourly rate</label>
            <input id="hourly-rate" data-hourly-rate={enhance ? "" : undefined} className="field tabular" inputMode="decimal" />
          </div>
          <div className="grid gap-2">
            <label htmlFor="hours" className="text-sm font-medium text-ink">Hours</label>
            <input id="hours" data-hours={enhance ? "" : undefined} className="field tabular" inputMode="decimal" />
          </div>
        </div>
        {lockedPlatform ? null : (
        <fieldset className="grid gap-2">
          <legend className="text-sm font-medium text-ink">Platform</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            <button type="button" data-platform="fiverr" aria-pressed="true" className="rounded-2xl border border-line bg-[#f7f9fd] px-4 py-3 text-left">
              <span className="block text-base font-semibold">Fiverr</span>
              <span className="mt-1 block text-xs leading-5 text-muted">Default platform fee 20%, from the published 80% share.</span>
            </button>
            <button type="button" data-platform="upwork" aria-pressed="false" className="rounded-2xl border border-line bg-[#f7f9fd] px-4 py-3 text-left">
              <span className="block text-base font-semibold">Upwork</span>
              <span className="mt-1 block text-xs leading-5 text-muted">Published range 0% to 15%. Default in this form is 10%.</span>
            </button>
          </div>
        </fieldset>
        )}
        {lockedPlatform === "fiverr" ? null : (
        <div data-upwork-fees={enhance ? "" : undefined} className="grid gap-2" hidden={lockedPlatform !== "upwork"}>
          <p className="text-sm font-medium text-ink">Upwork fee</p>
          <div className="flex flex-wrap gap-2">
            {["0", "5", "10", "15"].map((value) => (
              <button key={value} type="button" data-upwork-fee={value} aria-pressed={value === "10"} className="rounded-full border border-line bg-white px-3 py-1.5 text-sm font-semibold">
                {value}%
              </button>
            ))}
          </div>
        </div>
        )}
        <div className="grid gap-2">
          <label htmlFor="platform-fee" className="text-sm font-medium text-ink">Platform fee %</label>
          <input id="platform-fee" data-platform-fee={enhance ? "" : undefined} className="field tabular" inputMode="decimal" defaultValue={lockedPlatform === "upwork" ? "10" : "20"} />
          <p className="text-sm leading-5 text-muted">Change this if the percentage on your offer is different.</p>
        </div>
        <div className="grid gap-2">
          <label htmlFor="withdrawal-method" className="text-sm font-medium text-ink">Withdrawal method</label>
          <select id="withdrawal-method" data-method={enhance ? "" : undefined} className="field" defaultValue="payoneer">
            <option value="payoneer">Payoneer</option>
            {lockedPlatform === "fiverr" ? null : <option value="directBank">Direct to local bank</option>}
            <option value="wise">Wise</option>
            <option value="bankTransfer">Other bank transfer</option>
          </select>
          <p className="text-sm leading-5 text-muted">
            Payoneer defaults to 2% (typically 1.2%–4%). Wise charges no fixed receiving fee, but typically applies ~0.4%–1% currency conversion fee depending on corridor — adjust if converting to local currency.
          </p>
        </div>
        <div className="grid gap-2">
          <label htmlFor="withdrawal-fee" className="text-sm font-medium text-ink">Withdrawal fee %</label>
          <input id="withdrawal-fee" data-withdrawal-fee={enhance ? "" : undefined} className="field tabular" inputMode="decimal" defaultValue="2" />
        </div>
        {lockedPlatform === "fiverr" ? null : (
        <>
        <label className="flex items-start gap-2 text-sm text-ink">
          <input type="checkbox" data-bank-fee={enhance ? "" : undefined} className="mt-1" />
          <span>
            <span className="font-medium">Add the Upwork $0.99 direct-to-bank fee</span>
            <span className="mt-0.5 block text-muted">Flat USD amount. Edit it if your account shows a different figure.</span>
          </span>
        </label>
        <div data-flat-fields={enhance ? "" : undefined} className="grid gap-2" hidden>
          <label htmlFor="flat-fee" className="text-sm font-medium text-ink">Flat fee (USD)</label>
          <input id="flat-fee" data-flat={enhance ? "" : undefined} className="field tabular" inputMode="decimal" defaultValue="0.99" />
        </div>
        </>
        )}
        {lockedPlatform === "upwork" ? null : (
        <>
        <label className="flex items-start gap-2 text-sm text-ink">
          <input type="checkbox" data-early={enhance ? "" : undefined} className="mt-1" />
          <span>
            <span className="font-medium">Fiverr early payout</span>
            <span className="mt-0.5 block text-muted">No rate is assumed. Type the percentage Fiverr shows, or leave 0.</span>
          </span>
        </label>
        <div data-early-fields={enhance ? "" : undefined} className="grid gap-2" hidden>
          <label htmlFor="early-fee" className="text-sm font-medium text-ink">Early payout fee %</label>
          <input id="early-fee" data-early-fee={enhance ? "" : undefined} className="field tabular" inputMode="decimal" defaultValue="0" />
        </div>
        </>
        )}
        <fieldset className="grid gap-2">
          <legend className="text-sm font-medium text-ink">Tax percentage</legend>
          <div className="grid grid-cols-2 rounded-2xl bg-[#f7f9fd] p-1">
            <button type="button" data-tax="filer" aria-pressed={lockedPlatform ? false : true} className="rounded-xl px-3 py-2.5 text-left text-sm font-semibold">
              1% illustration
            </button>
            <button type="button" data-tax="nonFiler" aria-pressed="false" className="rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-muted">
              2% illustration
            </button>
          </div>
          <label htmlFor="tax-fee" className="text-sm font-medium text-ink">Tax %</label>
          <input id="tax-fee" data-tax-rate={enhance ? "" : undefined} className="field tabular" inputMode="decimal" defaultValue={lockedPlatform ? "0" : "1"} />
          <p className="text-sm leading-5 text-muted">
            {lockedPlatform
              ? "Optional. Not tax advice and not a country tax rate. Leave 0 to skip it."
              : "1% and 2% are illustrations, not a tax authority's rates. Type the percentage you want to set aside."}
          </p>
        </fieldset>
        <p data-fee-error={enhance ? "" : undefined} className="text-sm font-medium text-danger-ink" role="alert" />
        <div className="grid gap-2">
          <div className="flex items-end justify-between gap-3">
            <label htmlFor="usd-pkr-rate" data-rate-label={enhance ? "" : undefined} className="text-sm font-medium text-ink">
              {lockedPlatform ? "Your currency per 1 USD" : "USD to PKR rate"}
            </label>
            <span data-rate-status={enhance ? "" : undefined} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-navy-2">
              {lockedPlatform ? "Optional" : "Rate needed"}
            </span>
          </div>
          <div className="flex gap-2">
            <input
              id="usd-pkr-rate"
              data-rate={enhance ? "" : undefined}
              className="field tabular"
              inputMode="decimal"
              autoComplete="off"
              placeholder={lockedPlatform ? "Leave blank to skip" : "Enter a rate"}
              aria-describedby="rate-help"
            />
            {lockedPlatform ? null : (
            <button type="button" data-retry={enhance ? "" : undefined} className="inline-flex h-[3.25rem] min-h-11 items-center rounded-[0.9rem] border border-line bg-white px-3 text-sm font-semibold text-navy">
              Retry
            </button>
            )}
          </div>
          <div id="rate-help" className="grid gap-1 text-sm text-muted">
            <p data-rate-updated={enhance ? "" : undefined}>
              {lockedPlatform ? (
                "Optional. Leave this blank to keep the result in the order currency. A typed rate is yours, not a bank quote."
              ) : (
                <>
                  <span className="font-semibold text-ink">Rates last updated: </span>
                  unavailable until the reference rate loads. If the rate service fails, type the rate from your bank or Payoneer. No guessed rate is filled in.
                </>
              )}
            </p>
            {lockedPlatform ? null : (
            <p data-rate-help={enhance ? "" : undefined}>Enter a rate from your bank or Payoneer, or use the reference rate when it loads.</p>
            )}
            <p data-rate-alert={enhance ? "" : undefined} className="font-medium text-danger-ink" role="alert" />
            <p data-rate-error={enhance ? "" : undefined} className="font-medium text-danger-ink" role="alert" />
          </div>
        </div>
        <button type={enhance ? "submit" : "button"} className="cta-gradient h-12 rounded-xl text-sm font-semibold text-white">
          Calculate earnings
        </button>
        <div data-reverse-result={enhance ? "" : undefined} />
      </div>
      <div className="grid min-w-0 gap-4">
        <div id="home-calc-output" tabIndex={-1} className="outline-none">
          <div className="result-panel flex min-h-80 flex-col justify-center rounded-3xl p-4 text-white sm:p-5">
            <h2 className="text-lg font-semibold">{lockedPlatform ? "Your estimated earnings" : "Your Estimated Bank Deposit"}</h2>
            <p className="mt-2 max-w-sm text-sm leading-6 text-white">
              {lockedPlatform
                ? "Enter an order amount. The estimate stays in that currency unless you add your own rate."
                : "Enter an order amount and a PKR rate. The estimate appears here and stays in step with the inputs."}
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
            <button type="button" data-share={enhance ? "" : undefined} data-needs-result={enhance ? "" : undefined} className={action} disabled>
              Copy link
            </button>
            <button type="button" data-pdf={enhance ? "" : undefined} data-needs-result={enhance ? "" : undefined} className={action} disabled>
              Download PDF
            </button>
          </div>
          <p data-status={enhance ? "" : undefined} className="min-h-5 text-sm text-navy-2" role="status">
            Results stay on this device until you copy a link.
          </p>
        </div>
      </div>
      {enhance ? <HomeCalculatorBoot /> : null}
    </form>
  );
}
