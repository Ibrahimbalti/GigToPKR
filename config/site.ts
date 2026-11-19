export const PRODUCTION_ORIGIN = "https://realgigpay.com";

/**
 * Public origin for canonical, Open Graph, and sitemap URLs.
 * Localhost, plain HTTP, and an empty value never become the public URL.
 * Netlify's URL env is ignored so a preview host cannot replace the canonical origin.
 */
export function resolveSiteUrl(configured = process.env.NEXT_PUBLIC_SITE_URL ?? ""): string {
  const value = configured.trim().replace(/\/$/, "");
  if (!value.startsWith("https://") || /localhost|127\.0\.0\.1/i.test(value)) {
    return PRODUCTION_ORIGIN;
  }
  try {
    const url = new URL(value);
    if (url.pathname !== "/" || url.search || url.hash) return PRODUCTION_ORIGIN;
  } catch {
    return PRODUCTION_ORIGIN;
  }
  return value;
}

/** Global pages use en_US. */
export function openGraphLocale(path = "/"): "en_US" {
  return "en_US";
}

export const site = {
  name: "RealGigPay",
  productName: "Freelancer Fee Calculator",
  description:
    "Estimate what you keep from a Fiverr or Upwork order after platform and withdrawal fees. Add your own currency rate if you want a local figure. Not a bank quote or tax advice.",
  url: resolveSiteUrl(),
  locale: "en_US" as const,
  language: "en",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  published: "2026-11-17",
  updated: "2026-11-19",
  social: {
    x: process.env.NEXT_PUBLIC_SOCIAL_X || "",
    linkedin: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN || "",
    facebook: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK || "",
  },
} as const;

export function absoluteUrl(path = "/"): string {
  if (path === "/") return site.url;
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}
