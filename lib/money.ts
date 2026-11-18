const CALC_SCALE = 6;

function assertDecimal(raw: string): void {
  if (!/^[+-]?\d+(\.\d+)?$/.test(raw)) {
    throw new Error(`Invalid decimal: ${raw}`);
  }
}

/** Convert a decimal string or number into an integer scaled by 10^scale, half-up. */
export function toScaled(value: string | number, scale = CALC_SCALE): bigint {
  const raw = typeof value === "number" ? value.toFixed(scale + 2) : value.trim();
  assertDecimal(raw);
  const negative = raw.startsWith("-");
  const unsigned = raw.replace(/^[+-]/, "");
  const [whole, fraction = ""] = unsigned.split(".");
  const kept = fraction.slice(0, scale);
  const roundDigit = fraction.length > scale ? Number(fraction[scale]) : 0;
  const padded = `${kept}${"0".repeat(scale)}`.slice(0, scale);
  let minor = BigInt(whole || "0") * BigInt(10) ** BigInt(scale) + BigInt(padded || "0");
  if (roundDigit >= 5) minor += BigInt(1);
  return negative ? -minor : minor;
}

export function roundScaled(value: bigint, fromScale: number, toScale: number): bigint {
  if (toScale > fromScale) return value * BigInt(10) ** BigInt(toScale - fromScale);
  if (toScale === fromScale) return value;
  const divisor = BigInt(10) ** BigInt(fromScale - toScale);
  const negative = value < BigInt(0);
  const absolute = negative ? -value : value;
  const quotient = absolute / divisor;
  const remainder = absolute % divisor;
  const rounded = remainder * BigInt(2) >= divisor ? quotient + BigInt(1) : quotient;
  return negative ? -rounded : rounded;
}

export function formatScaled(value: bigint, scale = 2): string {
  const negative = value < BigInt(0);
  const absolute = negative ? -value : value;
  const factor = BigInt(10) ** BigInt(scale);
  const whole = absolute / factor;
  const fraction = (absolute % factor).toString().padStart(scale, "0");
  return `${negative ? "-" : ""}${whole.toString()}.${fraction}`;
}

/** Multiply a scale-2 amount by a decimal rate and round half-up to scale 2. */
export function multiplyRate(amountScale2: bigint, rate: number): bigint {
  const amountScale6 = amountScale2 * BigInt(10000);
  const rateScale6 = toScaled(rate.toFixed(6), CALC_SCALE);
  const productScale12 = amountScale6 * rateScale6;
  return roundScaled(productScale12, 12, 2);
}

export function scaledToNumber(value: bigint, scale = 2): number {
  return Number(formatScaled(value, scale));
}

function groupWestern(digits: string): string {
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/** Pakistani grouping: last three digits, then groups of two. */
export function groupRupees(digits: string): string {
  if (digits.length <= 3) return digits;
  const head = digits.slice(0, -3);
  const tail = digits.slice(-3);
  return `${head.replace(/\B(?=(\d{2})+(?!\d))/g, ",")},${tail}`;
}

export function formatMoney(amount: number, currency: string): string {
  const negative = amount < 0;
  const [whole, fraction] = Math.abs(amount).toFixed(2).split(".");
  return `${negative ? "-" : ""}${currency} ${groupWestern(whole ?? "0")}.${fraction}`;
}

export function formatUsd(amount: number): string {
  return formatMoney(amount, "USD");
}

export function formatPkr(amount: number): string {
  const negative = amount < 0;
  const [whole, fraction] = Math.abs(amount).toFixed(2).split(".");
  return `${negative ? "-" : ""}PKR ${groupRupees(whole ?? "0")}.${fraction}`;
}

export function formatRate(rate: number): string {
  const rounded = rate.toFixed(4).replace(/0+$/, "").replace(/\.$/, "");
  return rounded.includes(".") ? rounded : `${rounded}.00`;
}

/** Keep up to six decimals so a reference rate is not quietly rounded before use. */
export function formatRateInput(rate: number): string {
  const rounded = rate.toFixed(6).replace(/0+$/, "").replace(/\.$/, "");
  return rounded.includes(".") ? rounded : `${rounded}.00`;
}
