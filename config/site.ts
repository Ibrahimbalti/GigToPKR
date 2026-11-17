export const site = {
  name: "GigToPKR",
  productName: "Freelancer Fee Calculator Pakistan",
  description:
    "Estimate Pakistani freelancer earnings in PKR after assumed Fiverr or Upwork fees, a Payoneer withdrawal assumption, USD to PKR conversion, and an illustrative tax rate.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),
  locale: "en_PK",
  language: "en",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  published: "2026-11-17",
  updated: "2026-11-17",
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
