"use client";

import { useState } from "react";
import { youtubeConfig, YOUTUBE_DISCLAIMER, DISPLAY_CONVERSION_LABEL } from "@/data/youtube";
import { ScenarioChart } from "@/components/creators/ScenarioChart";
import {
  defaultYouTubeForm,
  estimateYouTube,
  formToQuery,
  formatConverted,
  type RateOffer,
  type YouTubeForm,
} from "@/components/creators/youtubeModel";
import { buildTextPdf, downloadPdf } from "@/lib/pdf";
import { formatRate, formatUsd } from "@/lib/money";
import { checkYppEligibility, viewsNeeded } from "@/lib/youtubeCalc";
import { copyText, formatTimestamp } from "@/lib/utils";

const field = "field";
const action =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm font-semibold text-ink shadow-[var(--shadow)] hover:border-brand/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-50";

const exampleHint = "Example value, replace with your YouTube Analytics number.";

function Field({
  id,
  label,
  hint,
  value,
  onChange,
  suffix,
}: {
  id: string;
  label: string;
  hint?: string;
  value: string;
  onChange: (value: string) => void;
  suffix?: string;
}) {
  return (
    <label htmlFor={id} className="grid gap-1.5 text-sm font-medium text-ink">
      {label}
      <input
        id={id}
        inputMode="decimal"
        autoComplete="off"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-describedby={hint ? `${id}-hint` : undefined}
        className={field}
      />
      {suffix ? <span className="text-xs font-normal text-muted">{suffix}</span> : null}
      {hint ? (
        <span id={`${id}-hint`} className="text-xs font-normal text-muted">
          {hint}
        </span>
      ) : null}
    </label>
  );
}

export function YouTubeCalculator({
  initial,
  today,
  offers,
  rateSource,
  rateUpdatedAt,
}: {
  initial: YouTubeForm;
  today: string;
  offers: RateOffer[];
  rateSource: string | null;
  rateUpdatedAt: string | null;
}) {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState("Results stay on this device.");

  const availableCurrency = offers.some((offer) => offer.code === form.currency) ? form.currency : "";
  const activeForm = availableCurrency === form.currency ? form : { ...form, currency: availableCurrency };
  const estimate = estimateYouTube(activeForm, today, offers);
  const eligibility = checkYppEligibility(
    { subscribers: form.subscribers, watchHours12m: form.watchHours, shortsViews90d: form.shortsViews90 },
    today,
  );
  const needed = viewsNeeded(form.target, form.targetRpm);
  const eligibilityStarted = Boolean(form.subscribers || form.watchHours || form.shortsViews90);

  function patch(partial: Partial<YouTubeForm>) {
    setForm((current) => ({ ...current, ...partial }));
  }

  function breakdownText(): string {
    const lines = [
      "RealGigPay YouTube earnings estimate",
      YOUTUBE_DISCLAIMER,
      ...estimate.scenarios.map((scenario) => `${scenario.label} monthly ${formatUsd(scenario.monthlyUsd)}; yearly ${formatUsd(scenario.yearlyUsd)}`),
      ...estimate.steps.map((step) => `${step.label}: ${step.detail}`),
    ];
    if (estimate.payoutMonths !== null) lines.push(`Months to the payout threshold: ${estimate.payoutMonths}`);
    if (estimate.payoutUnreachable) lines.push("The payout threshold is not reachable at this monthly estimate.");
    return lines.join("\n");
  }

  async function copy(kind: "result" | "breakdown" | "link") {
    if (kind === "link") {
      const href = `/creators/youtube-earnings-calculator${formToQuery(activeForm)}`;
      window.history.replaceState(null, "", href);
      const ok = await copyText(`${window.location.origin}${href}`);
      setStatus(ok ? "Link copied." : "Copy failed. The address bar has the shareable link.");
      return;
    }
    if (!estimate.ready) return;
    const expected = estimate.scenarios.find((scenario) => scenario.key === "expected");
    const text = kind === "result" && expected ? `Expected monthly estimate ${formatUsd(expected.monthlyUsd)}. ${YOUTUBE_DISCLAIMER}` : breakdownText();
    const ok = await copyText(text);
    setStatus(ok ? "Copied." : "Copy failed. Select the breakdown and copy it manually.");
  }

  function download() {
    if (!estimate.ready) return;
    downloadPdf("realgigpay-youtube-estimate.pdf", buildTextPdf(breakdownText().split("\n")));
    setStatus("PDF downloaded to your device. It is a working paper, not a receipt.");
  }

  const showLong = form.mode !== "shorts";
  const showShorts = form.mode !== "long";

  return (
    <div className="grid gap-6">
      <form className="surface grid gap-5 rounded-3xl p-4 sm:p-6" onSubmit={(event) => event.preventDefault()}>
        <div role="group" aria-label="What to estimate" className="grid grid-cols-3 gap-2 rounded-2xl bg-[#f7f9fd] p-1">
          {(
            [
              ["long", "Long-form"],
              ["shorts", "Shorts"],
              ["both", "Both"],
            ] as const
          ).map(([mode, label]) => (
            <button
              key={mode}
              type="button"
              aria-pressed={form.mode === mode}
              onClick={() => patch({ mode })}
              className={`min-h-11 rounded-xl px-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${form.mode === mode ? "bg-white text-ink shadow-[var(--shadow)]" : "text-muted"}`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="yt-views" label="Monthly views" value={form.views} onChange={(views) => patch({ views })} hint="Public views for the month you want to estimate." />
          <Field id="yt-videos" label="Videos per month (optional)" value={form.videos} onChange={(videos) => patch({ videos })} hint="Used only to show an estimate per video." />
        </div>

        {showLong ? (
          <fieldset className="grid gap-4">
            <legend className="text-sm font-semibold text-ink">Long-form rate</legend>
            <div className="grid grid-cols-2 gap-2 rounded-2xl bg-[#f7f9fd] p-1">
              <button type="button" aria-pressed={form.method === "rpm"} onClick={() => patch({ method: "rpm" })} className={`min-h-11 rounded-xl text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${form.method === "rpm" ? "bg-white text-ink shadow-[var(--shadow)]" : "text-muted"}`}>
                RPM
              </button>
              <button type="button" aria-pressed={form.method === "cpm"} onClick={() => patch({ method: "cpm" })} className={`min-h-11 rounded-xl text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${form.method === "cpm" ? "bg-white text-ink shadow-[var(--shadow)]" : "text-muted"}`}>
                CPM
              </button>
            </div>
            {form.method === "cpm" ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <Field id="yt-playback" label="Monetized playbacks (%)" value={form.playback} onChange={(playback) => patch({ playback })} hint="The percent of views that YouTube Analytics counts as monetized playbacks." />
                <Field id="yt-share" label="Long-form revenue share (%)" value={form.share} onChange={(share) => patch({ share })} hint={`Prefilled from the config at ${youtubeConfig.revenueShare.longFormPercent}%. Edit it if your agreement differs.`} />
              </div>
            ) : null}
            <div className="grid gap-4 sm:grid-cols-3">
              <Field id="yt-low" label={form.method === "cpm" ? "Low CPM" : "Low RPM"} value={form.low} onChange={(low) => patch({ low })} hint={exampleHint} />
              <Field id="yt-expected" label={form.method === "cpm" ? "Expected CPM" : "Expected RPM"} value={form.expected} onChange={(expected) => patch({ expected })} hint={exampleHint} />
              <Field id="yt-high" label={form.method === "cpm" ? "High CPM" : "High RPM"} value={form.high} onChange={(high) => patch({ high })} hint={exampleHint} />
            </div>
          </fieldset>
        ) : null}

        {showShorts ? (
          <fieldset className="grid gap-4">
            <legend className="text-sm font-semibold text-ink">Shorts RPM</legend>
            <p className="text-sm leading-6 text-muted">Shorts use RPM only. The 90-day view check multiplies this month&apos;s Shorts views by 3.</p>
            <div className="grid gap-4 sm:grid-cols-3">
              <Field id="yt-slow" label="Low Shorts RPM" value={form.shortsLow} onChange={(shortsLow) => patch({ shortsLow })} hint={exampleHint} />
              <Field id="yt-sexp" label="Expected Shorts RPM" value={form.shortsExpected} onChange={(shortsExpected) => patch({ shortsExpected })} hint={exampleHint} />
              <Field id="yt-shigh" label="High Shorts RPM" value={form.shortsHigh} onChange={(shortsHigh) => patch({ shortsHigh })} hint={exampleHint} />
            </div>
          </fieldset>
        ) : null}

        <Field id="yt-premium" label="Premium revenue per 1,000 views" value={form.premium} onChange={(premium) => patch({ premium })} hint="Your figure. The default is 0. Premium pool percentages are not applied here." />

        <fieldset className="grid gap-3">
          <legend className="text-sm font-semibold text-ink">Audience mix (optional)</legend>
          <label className="flex min-h-11 items-center gap-2 text-sm text-ink">
            <input type="checkbox" checked={form.mixOn} onChange={(event) => patch({ mixOn: event.target.checked })} />
            Weight the expected long-form result by country RPM
          </label>
          {form.mixOn ? (
            <div className="grid gap-3">
              <p className="text-sm leading-6 text-muted">Shares must add up to 100%. Name a row US, USA, or United States if you want US withholding. This mix is used only in RPM mode.</p>
              {form.rows.map((row, index) => (
                <div key={index} className="grid gap-2 sm:grid-cols-[1fr_7rem_7rem_auto]">
                  <label className="grid gap-1 text-sm font-medium" htmlFor={`yt-country-${index}`}>
                    Country
                    <input id={`yt-country-${index}`} value={row.country} onChange={(event) => patch({ rows: form.rows.map((item, itemIndex) => itemIndex === index ? { ...item, country: event.target.value } : item) })} className={field} />
                  </label>
                  <label className="grid gap-1 text-sm font-medium" htmlFor={`yt-share-${index}`}>
                    Share %
                    <input id={`yt-share-${index}`} inputMode="decimal" value={row.share} onChange={(event) => patch({ rows: form.rows.map((item, itemIndex) => itemIndex === index ? { ...item, share: event.target.value } : item) })} className={field} />
                  </label>
                  <label className="grid gap-1 text-sm font-medium" htmlFor={`yt-row-rpm-${index}`}>
                    RPM
                    <input id={`yt-row-rpm-${index}`} inputMode="decimal" value={row.rpm} onChange={(event) => patch({ rows: form.rows.map((item, itemIndex) => itemIndex === index ? { ...item, rpm: event.target.value } : item) })} className={field} />
                  </label>
                  <button type="button" className={`${action} self-end`} onClick={() => patch({ rows: form.rows.filter((_, itemIndex) => itemIndex !== index) })} disabled={form.rows.length === 1}>
                    Remove
                  </button>
                </div>
              ))}
              <button type="button" className={action} disabled={form.rows.length >= 6} onClick={() => patch({ rows: [...form.rows, { country: "", share: "", rpm: "" }] })}>
                Add country
              </button>
            </div>
          ) : null}
        </fieldset>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="yt-withholding" label="US withholding (%)" value={form.withholding} onChange={(withholding) => patch({ withholding })} hint={youtubeConfig.usWithholding.note} />
          <Field id="yt-threshold" label="Payout threshold (USD)" value={form.threshold} onChange={(threshold) => patch({ threshold })} hint="Standard threshold for USD AdSense accounts. It can vary by reporting currency and some creators have a lower threshold in AdSense." />
        </div>

        {offers.length ? (
          <fieldset className="grid gap-3">
            <legend className="text-sm font-semibold text-ink">Display conversion</legend>
            <label htmlFor="yt-currency" className="grid gap-1.5 text-sm font-medium">
              Show the final USD figures in
              <select id="yt-currency" value={availableCurrency} onChange={(event) => patch({ currency: event.target.value as YouTubeForm["currency"] })} className={field}>
                <option value="">USD only</option>
                {offers.map((offer) => (
                  <option key={offer.code} value={offer.code}>{offer.code}</option>
                ))}
              </select>
            </label>
            {availableCurrency ? (
              <Field id="yt-manual-rate" label={`${availableCurrency} per 1 USD`} value={form.manualRate} onChange={(manualRate) => patch({ manualRate })} hint="Leave blank to use the reference rate, or type the rate you were quoted." />
            ) : null}
            <p className="text-sm leading-6 text-muted">{DISPLAY_CONVERSION_LABEL}</p>
            {availableCurrency && rateSource ? (
              <p className="text-sm leading-6 text-muted">
                Reference source: {rateSource}. Updated {formatTimestamp(rateUpdatedAt)}.
              </p>
            ) : null}
          </fieldset>
        ) : null}
      </form>

      <section aria-live="polite" className="result-panel grid gap-4 rounded-3xl p-4 text-white sm:p-6">
        <h2 className="text-lg font-semibold">Estimated earnings</h2>
        <p className="text-sm leading-6">{YOUTUBE_DISCLAIMER}</p>
        {estimate.notice ? <p className="text-sm leading-6">{estimate.notice}</p> : null}
        {estimate.ready ? (
          <>
            <div className="grid gap-3 sm:grid-cols-3">
              {estimate.scenarios.map((scenario) => (
                <article key={scenario.key} className="rounded-2xl bg-white/10 p-4">
                  <h3 className="text-sm font-semibold">{scenario.label}</h3>
                  <p className="mt-2 text-2xl font-semibold tabular">{formatUsd(scenario.monthlyUsd)}</p>
                  <p className="text-sm">per month</p>
                  <p className="mt-2 text-sm tabular">{formatUsd(scenario.yearlyUsd)} per year</p>
                  {scenario.perVideoUsd !== null ? <p className="mt-1 text-sm tabular">{formatUsd(scenario.perVideoUsd)} per video</p> : null}
                  {scenario.convertedMonthly !== null && estimate.currency ? (
                    <p className="mt-2 text-sm tabular">{formatConverted(scenario.convertedMonthly, estimate.currency)} display</p>
                  ) : null}
                </article>
              ))}
            </div>
            {estimate.shortsMessage ? <p className="text-sm leading-6">{estimate.shortsMessage}</p> : null}
            <div>
              <h3 className="text-sm font-semibold">Expected breakdown</h3>
              <dl className="mt-2 grid gap-2">
                {estimate.steps.map((step) => (
                  <div key={step.label} className="grid gap-1 border-t border-white/15 pt-2 sm:grid-cols-[12rem_1fr]">
                    <dt className="text-sm font-medium">{step.label}</dt>
                    <dd className="text-sm leading-6">{step.detail}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <p className="text-sm leading-6">
              {estimate.payoutUnreachable
                ? "At this monthly estimate the payout threshold is not reachable."
                : `About ${estimate.payoutMonths} month${estimate.payoutMonths === 1 ? "" : "s"} until the USD balance first reaches the threshold you entered.`}
            </p>
            {estimate.currency && estimate.rateUsed ? (
              <p className="text-sm leading-6">
                {DISPLAY_CONVERSION_LABEL} {estimate.manualRate ? "Using the rate you typed" : "Using the reference rate"}: {formatRate(estimate.rateUsed)} {estimate.currency} per USD. The USD amounts above do not change.
              </p>
            ) : null}
          </>
        ) : null}
      </section>
      {estimate.ready ? (
        <section className="surface rounded-3xl p-4 sm:p-6">
          <ScenarioChart rows={estimate.scenarios.map((scenario) => ({ label: scenario.label, monthlyUsd: scenario.monthlyUsd }))} />
        </section>
      ) : null}

      <div className="flex flex-wrap gap-2">
        <button type="button" className={action} onClick={() => { setForm(defaultYouTubeForm()); setStatus("Results stay on this device."); window.history.replaceState(null, "", "/creators/youtube-earnings-calculator"); }}>
          Reset
        </button>
        <button type="button" className={action} disabled={!estimate.ready} onClick={() => void copy("result")}>Copy result</button>
        <button type="button" className={action} disabled={!estimate.ready} onClick={() => void copy("breakdown")}>Copy breakdown</button>
        <button type="button" className={action} onClick={() => void copy("link")}>Copy link</button>
        <button type="button" className={action} disabled={!estimate.ready} onClick={download}>Download PDF</button>
      </div>
      <p className="min-h-5 text-sm text-navy-2" role="status">{status}</p>

      <section className="surface grid gap-4 rounded-3xl p-4 sm:p-6">
        <h2 className="text-lg font-semibold text-ink">Views needed</h2>
        <p className="text-sm leading-6 text-muted">Enter a monthly take-home target and the RPM you expect. The result is the views that RPM would need.</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="yt-target" label="Target per month (USD)" value={form.target} onChange={(target) => patch({ target })} />
          <Field id="yt-target-rpm" label="RPM" value={form.targetRpm} onChange={(targetRpm) => patch({ targetRpm })} hint={exampleHint} />
        </div>
        <p className="text-sm font-medium text-ink" aria-live="polite">
          {!form.target && !form.targetRpm
            ? "Enter a target and an RPM."
            : needed.ok
              ? `${needed.views.toLocaleString("en-US")} views.`
              : needed.message}
        </p>
      </section>

      <section className="surface grid gap-4 rounded-3xl p-4 sm:p-6">
        <h2 className="text-lg font-semibold text-ink">YPP eligibility check</h2>
        <p className="text-sm leading-6 text-muted">
          Compares what you type with the thresholds stored in the config. It does not look at your channel.{" "}
          <a className="font-semibold text-brand" href={youtubeConfig.eligibility.current.sourceUrl}>Verify the current thresholds on YouTube Help</a>
          {" "}and{" "}
          <a className="font-semibold text-brand" href={youtubeConfig.eligibility.from2027.sourceUrl}>the February 2027 changes</a>.
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field id="yt-subs" label="Subscribers" value={form.subscribers} onChange={(subscribers) => patch({ subscribers })} />
          <Field id="yt-hours" label="Qualified watch hours in 12 months" value={form.watchHours} onChange={(watchHours) => patch({ watchHours })} />
          <Field id="yt-sviews" label="Qualified Shorts views in 90 days" value={form.shortsViews90} onChange={(shortsViews90) => patch({ shortsViews90 })} />
        </div>
        {eligibility.ok ? (
          <div className="grid gap-4 lg:grid-cols-2" aria-live="polite">
            <ThresholdList title={eligibility.current.effectiveLabel} checks={eligibility.current.checks} />
            <ThresholdList
              title={eligibility.from2027.appliesNow ? `In effect since ${eligibility.from2027.effectiveFrom}` : `Scheduled from ${eligibility.from2027.effectiveFrom}`}
              checks={eligibility.from2027.checks}
            />
          </div>
        ) : (
          <p className="text-sm text-muted">
            {eligibilityStarted
              ? eligibility.message
              : "Enter subscribers, watch hours, and Shorts views to compare them with both threshold sets."}
          </p>
        )}
        <p className="text-sm leading-6 text-muted">{youtubeConfig.eligibility.activityRule}</p>
      </section>
    </div>
  );
}

function ThresholdList({
  title,
  checks,
}: {
  title: string;
  checks: { label: string; actual: number; threshold: number; pass: boolean }[];
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-ink">{title}</h3>
      <ul className="mt-2 grid gap-2">
        {checks.map((check) => (
          <li key={check.label} className="rounded-2xl border border-line px-3 py-2 text-sm">
            <span className="font-medium text-ink">{check.pass ? "Meets" : "Below"}: </span>
            {check.label}. You entered {check.actual.toLocaleString("en-US")}. The config threshold is {check.threshold.toLocaleString("en-US")}.
          </li>
        ))}
      </ul>
    </div>
  );
}
