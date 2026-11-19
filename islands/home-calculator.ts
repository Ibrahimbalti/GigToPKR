import { RESULT_DISCLAIMER } from "../lib/constants";
import { formatBreakdownText, formatFeePercent, formatResultSummary } from "../lib/calculator";
import { formatPkr, formatMoney, formatRateInput } from "../lib/money";
import { prepareCalculation, type FormValues } from "../lib/prepare-calculation";
import { buildBreakdownPdf, downloadPdf } from "../lib/pdf";
import { pkrPerOrderUnitInput, unitsPerUsd } from "../lib/quote-math";
import { queryToShare, sharePath, type CalculatorShare } from "../lib/share-result";
import { copyText, formatTimestamp } from "../lib/utils";
import type { CalculatorResult, Currency, ExchangeRateQuote, Platform, TaxStatus, WithdrawalMethod } from "../types/calculator";

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
        <p class="mt-2 max-w-sm text-sm leading-6 text-white">Enter an order amount and a PKR rate. The estimate appears here and stays in step with the inputs.</p>
        <p class="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-white">Estimate, not a transfer</p>
      </div>`;
    return;
  }

  const kept = result.grossUsd === 0 ? 0 : Math.max(0, Math.min(100, (result.netUsd / result.grossUsd) * 100));
  const money = (amount: number) => formatMoney(amount, result.currency);
  const rows: Array<[string, string, string, boolean]> = [
    ["Gross order amount", `The ${result.currency} amount in the form.`, money(result.grossUsd), false],
    ["Platform fee", `${formatFeePercent(result.platformFeeRate)} fee you entered.`, `− ${money(result.platformFeeUsd)}`, true],
    ["Amount after platform fee", "Gross minus the platform fee.", money(result.afterPlatformUsd), false],
  ];
  if (result.earlyPayoutRate > 0) {
    rows.push(["Early payout fee", `${formatFeePercent(result.earlyPayoutRate)} from the field.`, `− ${money(result.earlyPayoutFee)}`, true]);
  }
  rows.push([
    `${result.withdrawalLabel} fee`,
    `${formatFeePercent(result.payoneerFeeRate)} withdrawal fee.`,
    `− ${money(result.payoneerFeeUsd)}`,
    true,
  ]);
  if (result.flatFeeUsd > 0) {
    rows.push(["Flat withdrawal fee", `USD ${result.flatFeeUsd.toFixed(2)}.`, `− ${money(result.flatFeeInOrderCurrency)}`, true]);
  }
  rows.push(
    ["Net amount", "Left before conversion.", money(result.netUsd), false],
    [`${result.currency} to PKR rate`, "The rate currently in the form.", String(result.usdToPkrRate), false],
    ["Converted amount", "Net amount multiplied by the rate.", formatPkr(result.convertedPkr), false],
    ["Tax set-aside", `${formatFeePercent(result.taxRate)}. Not a statutory tax assessment.`, `− ${formatPkr(result.taxPkr)}`, true],
  );

  output.innerHTML = `
    <div class="grid min-w-0 gap-4" aria-live="polite">
      <div class="result-panel rounded-3xl p-6 text-white">
        <div class="flex items-center justify-between gap-3">
          <p class="text-sm font-medium text-white">Your Estimated Bank Deposit</p>
          <span class="rounded-full bg-white/15 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white">Estimate</span>
        </div>
        <p class="mt-3 text-[clamp(2rem,4vw,2.8rem)] font-semibold leading-none tracking-[-0.04em] text-success-soft tabular">${escapeHtml(formatPkr(result.finalPkr))}</p>
        <p class="mt-3 text-sm text-white">After the percentages in the form. This is an estimated credit, not a guaranteed transfer.</p>
        <div class="mt-5">
          <div class="flex justify-between text-xs text-white">
            <span>${escapeHtml(result.currency)} left after fees</span>
            <span class="tabular">${kept.toFixed(0)}%</span>
          </div>
          <div class="mt-2 h-2 overflow-hidden rounded-full bg-white/15">
            <div class="h-full rounded-full bg-white" style="width:${kept.toFixed(2)}%"></div>
          </div>
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

function readValue(root: ParentNode, selector: string): string {
  return root.querySelector<HTMLInputElement>(selector)?.value ?? "";
}

function start() {
  const rootQuery = document.querySelector<HTMLFormElement>("[data-home-calc]");
  if (!rootQuery || rootQuery.dataset.ready === "1") return;
  const root: HTMLFormElement = rootQuery;
  root.dataset.ready = "1";

  const amountQuery = root.querySelector<HTMLInputElement>("[data-amount]");
  const rateQuery = root.querySelector<HTMLInputElement>("[data-rate]");
  const amountErrorQuery = root.querySelector<HTMLElement>("[data-amount-error]");
  const rateErrorQuery = root.querySelector<HTMLElement>("[data-rate-error]");
  const rateStatusQuery = root.querySelector<HTMLElement>("[data-rate-status]");
  const rateHelpQuery = root.querySelector<HTMLElement>("[data-rate-help]");
  const rateUpdated = root.querySelector<HTMLElement>("[data-rate-updated]");
  const rateLabel = root.querySelector<HTMLElement>("[data-rate-label]");
  const status = root.querySelector<HTMLElement>("[data-status]");
  const feeError = root.querySelector<HTMLElement>("[data-fee-error]");
  const targetError = root.querySelector<HTMLElement>("[data-target-error]");
  const reverseResult = root.querySelector<HTMLElement>("[data-reverse-result]");
  const actions = root.querySelectorAll<HTMLButtonElement>("[data-needs-result]");
  if (!amountQuery || !rateQuery || !amountErrorQuery || !rateErrorQuery || !rateStatusQuery || !rateHelpQuery || !status) return;
  const amountEl: HTMLInputElement = amountQuery;
  const rateEl: HTMLInputElement = rateQuery;
  const amountError: HTMLElement = amountErrorQuery;
  const rateError: HTMLElement = rateErrorQuery;
  const rateStatus: HTMLElement = rateStatusQuery;
  const rateHelp: HTMLElement = rateHelpQuery;

  let platform: Platform = "fiverr";
  let taxStatus: TaxStatus = "filer";
  let manual = false;
  let reverse = false;
  let result: CalculatorResult | null = null;
  let quote: Quote = {
    status: "loading",
    rate: null,
    origin: null,
    sourceLabel: "Checking for a reference rate",
    retrievedAt: null,
    frankfurterSupportsPkr: false,
    warning: null,
    error: null,
    fromCache: false,
    stale: false,
    crosses: null,
  };

  const shared = queryToShare(window.location.search);
  if (shared) {
    if (shared.amount) amountEl.value = shared.amount;
    if (shared.target) {
      const target = root.querySelector<HTMLInputElement>("[data-target]");
      if (target) target.value = shared.target;
    }
    if (shared.platform) platform = shared.platform;
    if (shared.platformFee) {
      const field = root.querySelector<HTMLInputElement>("[data-platform-fee]");
      if (field) field.value = shared.platformFee;
    }
    if (shared.withdrawalFee) {
      const field = root.querySelector<HTMLInputElement>("[data-withdrawal-fee]");
      if (field) field.value = shared.withdrawalFee;
    }
    if (shared.taxFee) {
      const field = root.querySelector<HTMLInputElement>("[data-tax-rate]");
      if (field) field.value = shared.taxFee;
    }
    if (shared.method) {
      const field = root.querySelector<HTMLSelectElement>("[data-method]");
      if (field) field.value = shared.method;
    }
    if (shared.currency) {
      const field = root.querySelector<HTMLSelectElement>("[data-currency]");
      if (field) field.value = shared.currency;
    }
    if (shared.early) {
      const box = root.querySelector<HTMLInputElement>("[data-early]");
      const field = root.querySelector<HTMLInputElement>("[data-early-fee]");
      if (box) box.checked = true;
      if (field && shared.earlyFee) field.value = shared.earlyFee;
    }
    if (shared.bankFee) {
      const box = root.querySelector<HTMLInputElement>("[data-bank-fee]");
      const field = root.querySelector<HTMLInputElement>("[data-flat]");
      if (box) box.checked = true;
      if (field && shared.flatFee) field.value = shared.flatFee;
    }
    if (shared.hourly) {
      const box = root.querySelector<HTMLInputElement>("[data-hourly]");
      if (box) box.checked = true;
      const hourly = root.querySelector<HTMLInputElement>("[data-hourly-rate]");
      const hours = root.querySelector<HTMLInputElement>("[data-hours]");
      if (hourly && shared.hourlyRate) hourly.value = shared.hourlyRate;
      if (hours && shared.hours) hours.value = shared.hours;
    }
    if (shared.reverse) reverse = true;
    if (shared.rate) {
      manual = true;
      rateEl.value = shared.rate;
    }
  }

  function currency(): Currency {
    const value = root?.querySelector<HTMLSelectElement>("[data-currency]")?.value;
    if (value === "EUR" || value === "GBP" || value === "AED") return value;
    return "USD";
  }

  function formValues(): FormValues {
    const methodValue = root?.querySelector<HTMLSelectElement>("[data-method]")?.value;
    const method: WithdrawalMethod =
      methodValue === "directBank" || methodValue === "wise" || methodValue === "bankTransfer" ? methodValue : "payoneer";
    return {
      amount: amountEl?.value ?? "",
      target: readValue(root as ParentNode, "[data-target]"),
      reverse,
      currency: currency(),
      platform,
      platformFee: readValue(root as ParentNode, "[data-platform-fee]") || (platform === "upwork" ? "10" : "20"),
      withdrawalFee: readValue(root as ParentNode, "[data-withdrawal-fee]") || "2",
      taxFee: readValue(root as ParentNode, "[data-tax-rate]") || (taxStatus === "filer" ? "1" : "2"),
      taxStatus,
      method,
      early: Boolean(root?.querySelector<HTMLInputElement>("[data-early]")?.checked),
      earlyFee: readValue(root as ParentNode, "[data-early-fee]") || "0",
      bankFee: Boolean(root?.querySelector<HTMLInputElement>("[data-bank-fee]")?.checked),
      flatFee: readValue(root as ParentNode, "[data-flat]") || "0.99",
      hourly: Boolean(root?.querySelector<HTMLInputElement>("[data-hourly]")?.checked),
      hourlyRate: readValue(root as ParentNode, "[data-hourly-rate]"),
      hours: readValue(root as ParentNode, "[data-hours]"),
      rate: rateEl?.value ?? "",
      currencyPerUsd: unitsPerUsd(currency(), quote),
    };
  }

  function currentShare(): CalculatorShare {
    const values = formValues();
    return {
      amount: values.amount,
      target: values.target,
      reverse: values.reverse,
      currency: values.currency,
      platform: values.platform,
      platformFee: values.platformFee,
      withdrawalFee: values.withdrawalFee,
      taxFee: values.taxFee,
      method: values.method,
      early: values.early,
      earlyFee: values.earlyFee,
      bankFee: values.bankFee,
      flatFee: values.flatFee,
      hourly: values.hourly,
      hourlyRate: values.hourlyRate,
      hours: values.hours,
      rate: values.rate,
    };
  }

  function syncVisibility() {
    const hourlyOn = Boolean(root?.querySelector<HTMLInputElement>("[data-hourly]")?.checked);
    const earlyOn = Boolean(root?.querySelector<HTMLInputElement>("[data-early]")?.checked);
    const bankOn = Boolean(root?.querySelector<HTMLInputElement>("[data-bank-fee]")?.checked);
    root?.querySelector<HTMLElement>("[data-forward-fields]")?.toggleAttribute("hidden", reverse);
    root?.querySelector<HTMLElement>("[data-reverse-fields]")?.toggleAttribute("hidden", !reverse);
    root?.querySelector<HTMLElement>("[data-hourly-fields]")?.toggleAttribute("hidden", !hourlyOn);
    root?.querySelector<HTMLElement>("[data-early-fields]")?.toggleAttribute("hidden", !earlyOn);
    root?.querySelector<HTMLElement>("[data-flat-fields]")?.toggleAttribute("hidden", !bankOn);
    root?.querySelector<HTMLElement>("[data-upwork-fees]")?.toggleAttribute("hidden", platform !== "upwork");
    selectedButton(root as ParentNode, "data-mode", reverse ? "reverse" : "forward");
    root.querySelectorAll<HTMLButtonElement>("[data-mode]").forEach((button) => {
      const on = button.getAttribute("aria-pressed") === "true";
      button.classList.toggle("bg-white", on);
      button.classList.toggle("text-muted", !on);
    });
    selectedButton(root as ParentNode, "data-platform", platform);
    selectedButton(root as ParentNode, "data-tax", taxStatus);
    const fee = readValue(root as ParentNode, "[data-platform-fee]");
    selectedButton(root as ParentNode, "data-upwork-fee", fee);
    if (rateLabel) rateLabel.textContent = `${currency()} to PKR rate`;
  }

  function paintQuote() {
    rateStatus.textContent = manual ? "Manual rate" : quote.rate ? (quote.stale ? "Last successful rate" : "Reference rate") : "Rate needed";
    const when = quote.retrievedAt ? formatTimestamp(quote.retrievedAt) : "unavailable";
    if (rateUpdated) {
      rateUpdated.innerHTML = `<span class="font-semibold text-ink">Rates last updated: </span>${escapeHtml(when)}${quote.stale ? " (last successful quote — the live lookup failed)" : ""}. ${escapeHtml(quote.sourceLabel)}.`;
    }
    rateHelp.textContent = quote.warning ?? "";
    const alert = root?.querySelector<HTMLElement>("[data-rate-alert]");
    if (alert) alert.textContent = quote.error ?? "";
  }

  function paint() {
    syncVisibility();
    const prepared = prepareCalculation(formValues());
    amountError.textContent = prepared.ok ? "" : prepared.amountError ?? "";
    rateError.textContent = prepared.ok ? "" : prepared.rateError ?? "";
    if (feeError) feeError.textContent = prepared.ok ? "" : prepared.feeError ?? "";
    if (targetError) targetError.textContent = prepared.ok ? "" : prepared.targetError ?? "";
    result = prepared.ok ? prepared.result : null;
    renderOutput(result);
    actions.forEach((button) => {
      button.disabled = !result;
    });
    if (reverseResult) {
      if (prepared.ok && prepared.requiredAmount !== null) {
        const hourlyNote =
          prepared.impliedHourly !== null
            ? `<p class="mt-1 text-sm text-muted">About ${escapeHtml(currency())} ${escapeHtml(formatRateInput(prepared.impliedHourly))} per hour.</p>`
            : "";
        reverseResult.innerHTML = `<div class="rounded-2xl border border-line bg-brand-50 p-4"><p class="text-sm font-semibold text-navy">Charge at least</p><p class="mt-1 text-2xl font-semibold tabular text-ink">${escapeHtml(currency())} ${escapeHtml(formatRateInput(prepared.requiredAmount))}</p>${hourlyNote}</div>`;
      } else {
        reverseResult.innerHTML = "";
      }
    }
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
      if (!manual) rateEl.value = pkrPerOrderUnitInput(currency(), quote);
    } catch {
      quote = {
        ...quote,
        status: "unavailable",
        sourceLabel: "No live rate available",
        stale: false,
        error:
          "A live rate could not be retrieved. Enter a rate from your bank or Payoneer. No guessed rate will be filled in.",
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
  root.querySelectorAll<HTMLInputElement>("[data-platform-fee],[data-withdrawal-fee],[data-tax-rate],[data-early-fee],[data-flat],[data-hourly-rate],[data-hours],[data-target]").forEach((input) => {
    input.addEventListener("input", () => {
      input.value = input.value.replace(/-/g, "");
      paint();
    });
  });
  root.querySelector("[data-currency]")?.addEventListener("change", () => {
    manual = false;
    rateEl.value = pkrPerOrderUnitInput(currency(), quote);
    paint();
  });
  root.querySelector("[data-method]")?.addEventListener("change", () => {
    const method = root.querySelector<HTMLSelectElement>("[data-method]")?.value;
    const withdrawal = root.querySelector<HTMLInputElement>("[data-withdrawal-fee]");
    const bank = root.querySelector<HTMLInputElement>("[data-bank-fee]");
    if (method === "directBank") {
      if (withdrawal) withdrawal.value = "0";
      if (bank) bank.checked = true;
    } else if (method === "payoneer") {
      if (withdrawal) withdrawal.value = "2";
      if (bank) bank.checked = false;
    } else if (withdrawal) {
      withdrawal.value = "0";
      if (bank) bank.checked = false;
    }
    paint();
  });
  root.querySelectorAll<HTMLButtonElement>("[data-platform]").forEach((button) => {
    button.addEventListener("click", () => {
      const next = button.dataset.platform;
      if (next !== "fiverr" && next !== "upwork") return;
      platform = next;
      const fee = root.querySelector<HTMLInputElement>("[data-platform-fee]");
      if (fee && next === "upwork" && fee.value === "20") fee.value = "10";
      if (fee && next === "fiverr" && ["0", "5", "10", "15"].includes(fee.value)) fee.value = "20";
      paint();
    });
  });
  root.querySelectorAll<HTMLButtonElement>("[data-upwork-fee]").forEach((button) => {
    button.addEventListener("click", () => {
      const fee = root.querySelector<HTMLInputElement>("[data-platform-fee]");
      if (fee && button.dataset.upworkFee) fee.value = button.dataset.upworkFee;
      paint();
    });
  });
  root.querySelectorAll<HTMLButtonElement>("[data-tax]").forEach((button) => {
    button.addEventListener("click", () => {
      const next = button.dataset.tax;
      if (next !== "filer" && next !== "nonFiler") return;
      taxStatus = next;
      const fee = root.querySelector<HTMLInputElement>("[data-tax-rate]");
      if (fee) fee.value = next === "filer" ? "1" : "2";
      paint();
    });
  });
  root.querySelectorAll<HTMLButtonElement>("[data-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      reverse = button.dataset.mode === "reverse";
      const submit = root.querySelector<HTMLButtonElement>('button[type="submit"]');
      if (submit) submit.textContent = reverse ? "Find the order amount" : "Calculate earnings";
      paint();
    });
  });
  root.querySelector("[data-hourly]")?.addEventListener("change", () => paint());
  root.querySelector("[data-early]")?.addEventListener("change", () => paint());
  root.querySelector("[data-bank-fee]")?.addEventListener("change", () => {
    const on = root.querySelector<HTMLInputElement>("[data-bank-fee]")?.checked;
    const method = root.querySelector<HTMLSelectElement>("[data-method]");
    const withdrawal = root.querySelector<HTMLInputElement>("[data-withdrawal-fee]");
    if (on) {
      if (method) method.value = "directBank";
      if (withdrawal) withdrawal.value = "0";
    } else if (method?.value === "directBank") {
      method.value = "payoneer";
      if (withdrawal) withdrawal.value = "2";
    }
    paint();
  });
  root.querySelector("[data-retry]")?.addEventListener("click", () => {
    manual = false;
    void loadRate();
  });
  root.querySelector("[data-reset]")?.addEventListener("click", () => {
    amountEl.value = "";
    platform = "fiverr";
    taxStatus = "filer";
    reverse = false;
    manual = false;
    const resetValue = (selector: string, value: string) => {
      const field = root.querySelector<HTMLInputElement>(selector);
      if (field) field.value = value;
    };
    resetValue("[data-target]", "");
    resetValue("[data-platform-fee]", "20");
    resetValue("[data-withdrawal-fee]", "2");
    resetValue("[data-tax-rate]", "1");
    resetValue("[data-early-fee]", "0");
    resetValue("[data-flat]", "0.99");
    resetValue("[data-hourly-rate]", "");
    resetValue("[data-hours]", "");
    const currencyField = root.querySelector<HTMLSelectElement>("[data-currency]");
    const methodField = root.querySelector<HTMLSelectElement>("[data-method]");
    if (currencyField) currencyField.value = "USD";
    if (methodField) methodField.value = "payoneer";
    for (const selector of ["[data-hourly]", "[data-early]", "[data-bank-fee]"]) {
      const box = root.querySelector<HTMLInputElement>(selector);
      if (box) box.checked = false;
    }
    rateEl.value = quote.rate ? formatRateInput(quote.rate) : "";
    status.textContent = "Results stay on this device until you copy a link.";
    paint();
  });
  root.querySelector("[data-copy-result]")?.addEventListener("click", async () => {
    if (!result) return;
    const ok = await copyText(formatResultSummary(result));
    status.textContent = ok ? "Copied." : "Copy failed. Select the breakdown and copy it manually.";
  });
  root.querySelector("[data-copy-breakdown]")?.addEventListener("click", async () => {
    if (!result) return;
    const ok = await copyText(formatBreakdownText(result));
    status.textContent = ok ? "Copied." : "Copy failed. Select the breakdown and copy it manually.";
  });
  root.querySelector("[data-share]")?.addEventListener("click", async () => {
    if (!result) return;
    const href = sharePath(window.location.pathname, currentShare());
    window.history.replaceState(null, "", href);
    const ok = await copyText(`${window.location.origin}${href}`);
    status.textContent = ok ? "Link copied." : "Copy failed. The address bar has the shareable link.";
  });
  root.querySelector("[data-pdf]")?.addEventListener("click", () => {
    if (!result) return;
    downloadPdf("realgigpay-earnings-breakdown.pdf", buildBreakdownPdf(result));
    status.textContent = "PDF downloaded to your device. It is a working paper, not a receipt.";
  });
  root.addEventListener("submit", (event) => {
    event.preventDefault();
    document.getElementById("home-calc-output")?.focus();
  });

  paint();
  void loadRate();
}

start();
