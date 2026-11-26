import { absoluteUrl, site } from "@/config/site";

export type Crumb = { name: string; path: string };

function organization() {
  const sameAs = [site.social.x, site.social.linkedin, site.social.facebook].filter(Boolean);
  return {
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    url: site.url,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/realgigpay-logo.png"),
    },
    description: site.description,
    email: site.contactEmail || undefined,
    sameAs: sameAs.length > 0 ? sameAs : undefined,
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    ...organization(),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.productName,
    url: site.url,
    description: site.description,
    inLanguage: "en",
    publisher: organization(),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function softwareSchema(path: string, name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    url: absoluteUrl(path),
    description,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    provider: organization(),
  };
}

export function webApplicationSchema(path: string, name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    browserRequirements: "Requires a modern web browser",
    url: absoluteUrl(path),
    description,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    provider: organization(),
  };
}

export function articleSchema(input: {
  path: string;
  headline: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  kind?: "Article" | "BlogPosting";
}) {
  return {
    "@context": "https://schema.org",
    "@type": input.kind ?? "Article",
    headline: input.headline,
    description: input.description,
    image: [absoluteUrl("/og-image.jpg")],
    datePublished: input.publishedAt,
    dateModified: input.updatedAt,
    inLanguage: "en-US",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(input.path),
    },
    url: absoluteUrl(input.path),
    author: {
      "@type": "Organization",
      name: "RealGigPay Editorial",
      url: absoluteUrl("/about"),
    },
    publisher: organization(),
  };
}

export function aboutPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About RealGigPay",
    url: absoluteUrl("/about"),
    description: "What RealGigPay estimates, who it is for, and what it does not do.",
    mainEntity: organization(),
    isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
  };
}

export function contactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact RealGigPay",
    url: absoluteUrl("/contact"),
    description: "Contact the RealGigPay editorial desk about corrections and the calculator.",
  };
}
