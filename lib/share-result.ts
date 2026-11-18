import type { Currency, Platform, WithdrawalMethod } from "@/types/calculator";

export type CalculatorShare = {
  amount: string;
  target: string;
  reverse: boolean;
  currency: Currency;
  platform: Platform;
  platformFee: string;
  withdrawalFee: string;
  taxFee: string;
  method: WithdrawalMethod;
  early: boolean;
  earlyFee: string;
  bankFee: boolean;
  flatFee: string;
  hourly: boolean;
  hourlyRate: string;
  hours: string;
  rate: string;
};

const currencies = new Set<Currency>(["USD", "EUR", "GBP", "AED"]);
const platforms = new Set<Platform>(["fiverr", "upwork"]);
const methods = new Set<WithdrawalMethod>(["payoneer", "directBank", "wise", "bankTransfer"]);

function isCurrency(value: string | null): value is Currency {
  return value !== null && currencies.has(value as Currency);
}

function isPlatform(value: string | null): value is Platform {
  return value !== null && platforms.has(value as Platform);
}

function isMethod(value: string | null): value is WithdrawalMethod {
  return value !== null && methods.has(value as WithdrawalMethod);
}

export function shareToQuery(share: CalculatorShare): string {
  const params = new URLSearchParams();
  if (share.reverse) params.set("want", share.target);
  else if (share.amount) params.set("amount", share.amount);
  params.set("cur", share.currency);
  params.set("platform", share.platform);
  params.set("fee", share.platformFee);
  params.set("withdraw", share.withdrawalFee);
  params.set("tax", share.taxFee);
  params.set("method", share.method);
  if (share.early) params.set("early", share.earlyFee || "0");
  if (share.bankFee) params.set("bank", share.flatFee || "0.99");
  if (share.hourly) {
    params.set("hourly", share.hourlyRate);
    params.set("hours", share.hours);
  }
  if (share.rate) params.set("rate", share.rate);
  return params.toString();
}

export function queryToShare(search: string): Partial<CalculatorShare> | null {
  const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  const known = ["amount", "want", "fee", "platform", "tax", "withdraw", "rate"].some((key) => params.has(key));
  if (!known) return null;

  const partial: Partial<CalculatorShare> = {};
  if (params.has("want")) {
    partial.reverse = true;
    partial.target = params.get("want") ?? "";
  }
  if (params.has("amount")) partial.amount = params.get("amount") ?? "";
  const currency = params.get("cur");
  const platform = params.get("platform");
  const method = params.get("method");
  if (isCurrency(currency)) partial.currency = currency;
  if (isPlatform(platform)) partial.platform = platform;
  if (params.has("fee")) partial.platformFee = params.get("fee") ?? "";
  if (params.has("withdraw")) partial.withdrawalFee = params.get("withdraw") ?? "";
  if (params.has("tax")) partial.taxFee = params.get("tax") ?? "";
  if (isMethod(method)) partial.method = method;
  if (params.has("early")) {
    partial.early = true;
    partial.earlyFee = params.get("early") ?? "0";
  }
  if (params.has("bank")) {
    partial.bankFee = true;
    partial.flatFee = params.get("bank") ?? "0.99";
  }
  if (params.has("hourly")) {
    partial.hourly = true;
    partial.hourlyRate = params.get("hourly") ?? "";
    partial.hours = params.get("hours") ?? "";
  }
  if (params.has("rate")) partial.rate = params.get("rate") ?? "";
  return partial;
}

export function sharePath(pathname: string, share: CalculatorShare): string {
  const query = shareToQuery(share);
  return query ? `${pathname}?${query}` : pathname;
}
