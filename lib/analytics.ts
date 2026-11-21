export type AnalyticsEventName =
  | "calculator_started"
  | "calculation_completed"
  | "platform_selected"
  | "result_copied"
  | "pdf_downloaded"
  | "cta_clicked"
  | "article_opened";

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: Gtag;
    dataLayer?: unknown[];
  }
}

export function analyticsId(): string | undefined {
  return process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-LT24F7PE93";
}

export function trackEvent(
  name: AnalyticsEventName,
  params?: Record<string, string | number | boolean>,
): void {
  if (typeof window === "undefined" || !analyticsId() || !window.gtag) return;
  if (window.localStorage.getItem("realgigpay-consent") === "declined") return;
  window.gtag("event", name, params);
}
