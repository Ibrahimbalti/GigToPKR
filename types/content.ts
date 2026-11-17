import type { Platform, TaxStatus } from "@/types/calculator";

export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "table"; caption: string; headers: string[]; rows: string[][] }
  | { type: "note"; text: string }
  | {
      type: "example";
      title: string;
      orderAmountUsd: number;
      platform: Platform;
      taxStatus: TaxStatus;
    };

export type ContentSection = {
  id: string;
  heading: string;
  level: 2 | 3;
  blocks: ContentBlock[];
};

export type Faq = { question: string; answer: string };
export type Source = { label: string; href: string };
export type RelatedLink = { href: string; label: string };

export type Article = {
  kind: "guide" | "tax" | "blog";
  slug: string;
  path: string;
  title: string;
  description: string;
  h1: string;
  excerpt: string;
  publishedAt: string;
  updatedAt: string;
  directAnswer: string;
  sections: ContentSection[];
  faqs: Faq[];
  sources: Source[];
  related: RelatedLink[];
};

export type ToolPage = {
  path: string;
  title: string;
  description: string;
  h1: string;
  eyebrow: string;
  directAnswer: string;
  defaultPlatform: Platform;
  defaultTax: TaxStatus;
  mode: "standard" | "converter" | "income";
  sections: ContentSection[];
  faqs: Faq[];
  sources: Source[];
  related: RelatedLink[];
  updatedAt: string;
};

export type EditorialIdea = {
  title: string;
  intent: string;
  status: "published" | "covered" | "planned";
  href?: string;
};
