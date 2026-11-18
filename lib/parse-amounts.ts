const moneyPattern = /^\d{1,10}(\.\d{1,2})?$/;
const ratePattern = /^\d{1,6}(\.\d{1,6})?$/;

export function parseOrderAmount(value: string):
  | { state: "empty" }
  | { state: "incomplete" }
  | { state: "invalid"; message: string }
  | { state: "ok"; amount: number } {
  const trimmed = value.trim().replace(/,/g, "");
  if (!trimmed) return { state: "empty" };
  if (trimmed.endsWith(".")) return { state: "incomplete" };
  if (trimmed.startsWith("-")) {
    return { state: "invalid", message: "Order amount cannot be negative." };
  }
  if (!moneyPattern.test(trimmed)) {
    return {
      state: "invalid",
      message: "Use a number with up to two decimal places, such as 500.00.",
    };
  }
  const amount = Number(trimmed);
  if (!Number.isFinite(amount) || amount > 10_000_000) {
    return { state: "invalid", message: "Enter an amount up to 10,000,000 USD." };
  }
  return { state: "ok", amount };
}

const percentPattern = /^\d{1,3}(\.\d{1,2})?$/;

export function parsePercent(value: string):
  | { state: "empty" }
  | { state: "incomplete" }
  | { state: "invalid"; message: string }
  | { state: "ok"; rate: number } {
  const trimmed = value.trim().replace(/%/g, "").replace(/,/g, "");
  if (!trimmed) return { state: "empty" };
  if (trimmed.endsWith(".")) return { state: "incomplete" };
  if (trimmed.startsWith("-") || !percentPattern.test(trimmed)) {
    return { state: "invalid", message: "Use a percentage from 0 to 100, such as 2 or 1.20." };
  }
  const percent = Number(trimmed);
  if (!Number.isFinite(percent) || percent < 0 || percent > 100) {
    return { state: "invalid", message: "Enter a percentage from 0 to 100." };
  }
  return { state: "ok", rate: Number((percent / 100).toFixed(6)) };
}

export function parseExchangeRate(value: string):
  | { state: "empty" }
  | { state: "incomplete" }
  | { state: "invalid"; message: string }
  | { state: "ok"; rate: number } {
  const trimmed = value.trim().replace(/,/g, "");
  if (!trimmed) return { state: "empty" };
  if (trimmed.endsWith(".")) return { state: "incomplete" };
  if (trimmed.startsWith("-")) {
    return { state: "invalid", message: "Exchange rate must be greater than zero." };
  }
  if (!ratePattern.test(trimmed)) {
    return {
      state: "invalid",
      message: "Use a positive rate with up to six decimal places.",
    };
  }
  const rate = Number(trimmed);
  if (!Number.isFinite(rate) || rate <= 0 || rate > 100_000) {
    return { state: "invalid", message: "Enter a realistic USD to PKR rate." };
  }
  return { state: "ok", rate };
}
