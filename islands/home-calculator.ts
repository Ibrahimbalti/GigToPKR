import { RESULT_DISCLAIMER } from "../lib/constants";
import {
  calculateEarnings,
  formatBreakdownText,
  formatResultSummary,
} from "../lib/calculator";
import { formatPkr, formatRateInput, formatUsd } from "../lib/money";
import { buildBreakdownPdf, downloadPdf } from "../lib/pdf";
import { copyText, formatTimestamp } from "../lib/utils";
import { parseExchangeRate, parseOrderAmount } from "../lib/parse-amounts";
import type { CalculatorResult, ExchangeRateQuote, Platform, TaxStatus } from "../types/calculator";

type Quote = ExchangeRateQuote & { status: "loading" | "ready" | "unavailable" };

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const map: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return map[character] ?? character;
  });
}

function selectedButton(root: ParentNode, attribute: string, value: string) {
  root.querySelectorAll<HTMLButtonElement>(`[${attribute}]`).forEach((button) => {
    button.setAttribute("aria-pressed", button.getAttribute(attribute) === value ? "true" : "false");
  });
}

function renderOutput(result: CalculatorResult | null) {
  const output = document.getElementById("home-calc-output");
  if (!output) return;
  if (!result) {
    output.innerHTML = `
      <div class="result-panel flex min-h-80 flex-col justify-center rounded-3xl p-6 text-white">
        <h2 class="text-lg font-semibold">Your Estimated Bank Deposit</h2>
        <p class="mt-2 max-w-sm text-sm leading-6 text-white">Enter an order amount and a USD to PKR rate. The estimate appears here and stays in step with the inputs.</p>
        <p class="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-white">Estimate, not a transfer</p>
      </div>`;
    return;
  }

  const kept = result.grossUsd === 0 ? 0 : Math.max(0, Math.min(100, (result.netUsd / result.grossUsd) * 100));
  const rows: Array<[string, string, string, boolean]> = [
    ["Gross order amount", "The USD amount you typed.", formatUsd(result.grossUsd), false],
    [
      "Platform fee",
      `${(result.platformFeeRate * 100).toFixed(0)}% ${result.platform === "fiverr" ? "Fiverr" : "Upwork"} assumption.`,
      `− ${formatUsd(result.platformFeeUsd)}`,
      true,
    ],
    ["Amount after platform fee", "Gross minus the platform assumption.", formatUsd(result.afterPlatformUsd), false],
    ["Payoneer fee", "2% of the post-platform amount. Not a Payoneer quote.", `− ${formatUsd(result.payoneerFeeUsd)}`, true],
    ["Net withdrawable amount", "Dollars left before conversion.", formatUsd(result.netUsd), false],
    ["USD to PKR exchange rate", "The rate currently in the form.", String(result.usdToPkrRate), false],
    ["Converted amount", "Net dollars multiplied by the rate.", formatPkr(result.convertedPkr), false],
    [
      "Estimated FBR tax",
      `${(result.taxRate * 100).toFixed(0)}% ${result.taxStatus === "filer" ? "active filer" : "non-filer"} illustration. Not an assessment.`,
      `− ${formatPkr(result.taxPkr)}`,
      true,
    ],
  ];

  output.innerHTML = `
    <div class="grid min-w-0 gap-4" aria-live="polite">
      <div class="result-panel rounded-3xl p-6 text-white">
        <div class="flex items-center justify-between gap-3">
          <p class="text-sm font-medium text-white">Your Estimated Bank Deposit</p>
          <span class="rounded-full bg-white/15 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white">Estimate</span>
        </div>
        <p class="mt-3 text-[clamp(2rem,4vw,2.8rem)] font-semibold leading-none tracking-[-0.04em] text-success-soft tabular">${escapeHtml(formatPkr(result.finalPkr))}</p>
        <p class="mt-3 text-sm text-white">After the assumptions below. This is an estimated credit, not a guaranteed transfer.</p>
        <div class="mt-5">
          <div class="flex justify-between text-xs text-white">
            <span>USD left after fees</span>
            <span class="tabular">${kept.toFixed(0)}%</span>
          </div>
          <div class="mt-2 h-2 overflow-hidden rounded-full bg-white/15">
            <div class="h-full rounded-full bg-white" style="width:${kept.toFixed(2)}%"></div>
          </div>
          <p class="mt-2 text-xs text-white">Bar shows net USD against the order. Tax is in PKR and is not mixed into this bar.</p>
        </div>
      </div>
      <div class="surface overflow-hidden rounded-3xl">
        <h2 class="border-b border-line px-5 py-4 text-lg font-semibold">Earnings breakdown</h2>
        <dl>
          ${rows
            .map(
              ([label, detail, value, deduction]) => `
            <div class="grid gap-1 border-b border-line px-5 py-3 last:border-b-0 sm:grid-cols-[1fr_auto] sm:items-center">
              <dt>
                <span class="block text-sm font-medium text-ink">${escapeHtml(label)}</span>
                <span class="block text-xs leading-5 text-muted">${escapeHtml(detail)}</span>
              </dt>
              <dd class="${deduction ? "text-sm font-semibold text-danger-ink tabular" : "text-sm font-semibold text-ink tabular"}">${escapeHtml(value)}</dd>
            </div>`,
            )
            .join("")}
        </dl>
      </div>
      <p class="text-sm leading-6 text-muted">${escapeHtml(RESULT_DISCLAIMER)}</p>
    </div>`;
}

function start() {
  const root = document.querySelector<HTMLFormElement>("[data-home-calc]");
  if (!root || root.dataset.ready === "1") return;
  root.dataset.ready = "1";

  const amountInput = root.querySelector<HTMLInputElement>("[data-amount]");
  const rateInput = root.querySelector<HTMLInputElement>("[data-rate]");
  const amountError = root.querySelector<HTMLElement>("[data-amount-error]");
  const rateError = root.querySelector<HTMLElement>("[data-rate-error]");
  const rateStatus = root.querySelector<HTMLElement>("[data-rate-status]");
  const rateHelp = root.querySelector<HTMLElement>("[data-rate-help]");
  const status = root.querySelector<HTMLElement>("[data-status]");
  const actions = root.querySelectorAll<HTMLButtonElement>("[data-needs-result]");
  if (!amountInput || !rateInput || !amountError || !rateError || !rateStatus || !rateHelp || !status) return;
  const amountEl: HTMLInputElement = amountInput;
  const rateEl: HTMLInputElement = rateInput;
  const amountErrorEl: HTMLElement = amountError;
  const rateErrorEl: HTMLElement = rateError;
  const rateStatusEl: HTMLElement = rateStatus;
  const rateHelpEl: HTMLElement = rateHelp;
  const statusEl: HTMLElement = status;

  let platform: Platform = "fiverr";
  let taxStatus: TaxStatus = "filer";
  let manual = false;
  let result: CalculatorResult | null = null;
  let quote: Quote = {
    status: "loading",
    rate: null,
    origin: null,
    sourceLabel: "Checking for a USD/PKR reference rate",
    retrievedAt: null,
    frankfurterSupportsPkr: false,
    warning: null,
    error: null,
    fromCache: false,
  };

  function paintQuote() {
    rateStatusEl.textContent = manual ? "Manual rate" : quote.rate ? "Reference rate" : "Rate needed";
    const when = quote.retrievedAt ? ` · ${formatTimestamp(quote.retrievedAt)}` : "";
    const parts = [
      `${quote.status === "loading" ? "Looking up a reference rate. Frankfurter is checked first." : quote.sourceLabel}${when}`,
    ];
    if (quote.warning) parts.push(quote.warning);
    rateHelpEl.textContent = parts.join(" ");
    const alert = root?.querySelector<HTMLElement>("[data-rate-alert]");
    if (alert) alert.textContent = quote.error ?? "";
  }

  function paint() {
    const amountState = parseOrderAmount(amountEl.value);
    const rateState = parseExchangeRate(rateEl.value);
    amountErrorEl.textContent = amountState.state === "invalid" ? amountState.message : "";
    rateErrorEl.textContent = rateState.state === "invalid" ? rateState.message : "";
    amountEl.setAttribute("aria-invalid", amountState.state === "invalid" ? "true" : "false");
    rateEl.setAttribute("aria-invalid", rateState.state === "invalid" ? "true" : "false");
    result =
      amountState.state === "ok" && rateState.state === "ok"
        ? calculateEarnings({
            orderAmountUsd: amountState.amount,
            platform,
            taxStatus,
            usdToPkrRate: rateState.rate,
          })
        : null;
    renderOutput(result);
    actions.forEach((button) => {
      button.disabled = !result;
    });
    paintQuote();
  }

  async function loadRate() {
    quote = { ...quote, status: "loading", error: null };
    paintQuote();
    try {
      const response = await fetch("/api/exchange-rate", { cache: "no-store" });
      if (!response.ok) throw new Error("Rate request failed");
      const data = (await response.json()) as ExchangeRateQuote;
      quote = { ...data, status: data.rate ? "ready" : "unavailable" };
      if (!manual && data.rate) rateEl.value = formatRateInput(data.rate);
    } catch {
      quote = {
        ...quote,
        status: "unavailable",
        sourceLabel: "No live rate available",
        error:
          "A live USD to PKR rate could not be retrieved. Enter a rate from your bank or Payoneer. No guessed rate will be filled in.",
      };
    }
    paint();
  }

  amountEl.addEventListener("input", () => {
    amountEl.value = amountEl.value.replace(/-/g, "");
    paint();
  });
  rateEl.addEventListener("input", () => {
    manual = true;
    rateEl.value = rateEl.value.replace(/-/g, "");
    paint();
  });
  root.querySelectorAll<HTMLButtonElement>("[data-platform]").forEach((button) => {
    button.addEventListener("click", () => {
      const next = button.dataset.platform;
      if (next !== "fiverr" && next !== "upwork") return;
      platform = next;
      selectedButton(root, "data-platform", platform);
      paint();
    });
  });
  root.querySelectorAll<HTMLButtonElement>("[data-tax]").forEach((button) => {
    button.addEventListener("click", () => {
      const next = button.dataset.tax;
      if (next !== "filer" && next !== "nonFiler") return;
      taxStatus = next;
      selectedButton(root, "data-tax", taxStatus);
      paint();
    });
  });
  root.querySelector("[data-retry]")?.addEventListener("click", () => {
    void loadRate();
  });
  root.querySelector("[data-reset]")?.addEventListener("click", () => {
    amountEl.value = "";
    platform = "fiverr";
    taxStatus = "filer";
    manual = false;
    selectedButton(root, "data-platform", platform);
    selectedButton(root, "data-tax", taxStatus);
    if (quote.rate) rateEl.value = formatRateInput(quote.rate);
    else rateEl.value = "";
    statusEl.textContent = "Results stay on this device.";
    paint();
  });
  root.querySelector("[data-copy-result]")?.addEventListener("click", async () => {
    if (!result) return;
    const ok = await copyText(formatResultSummary(result));
    statusEl.textContent = ok ? "Copied." : "Copy failed. Select the breakdown and copy it manually.";
  });
  root.querySelector("[data-copy-breakdown]")?.addEventListener("click", async () => {
    if (!result) return;
    const ok = await copyText(formatBreakdownText(result));
    statusEl.textContent = ok ? "Copied." : "Copy failed. Select the breakdown and copy it manually.";
  });
  root.querySelector("[data-pdf]")?.addEventListener("click", () => {
    if (!result) return;
    downloadPdf("gigtopkr-earnings-breakdown.pdf", buildBreakdownPdf(result));
    statusEl.textContent = "PDF downloaded to your device. It is a working paper, not a receipt.";
  });
  root.addEventListener("submit", (event) => {
    event.preventDefault();
    document.getElementById("home-calc-output")?.focus();
  });

  paint();
  void loadRate();
}

start();
