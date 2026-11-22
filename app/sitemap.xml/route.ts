import type { MetadataRoute } from "next";
import { articles } from "@/content/registry";
import { toolPages } from "@/content/tools";
import { absoluteUrl } from "@/config/site";

export const dynamic = "force-static";

const staticPages = [
  { path: "/", updatedAt: "2026-11-17", priority: 1.0 },
  { path: "/guides", updatedAt: "2026-11-17", priority: 0.7 },
  { path: "/tax-guide", updatedAt: "2026-11-17", priority: 0.7 },
  { path: "/blog", updatedAt: "2026-11-17", priority: 0.6 },
  { path: "/about", updatedAt: "2026-11-17", priority: 0.4 },
  { path: "/contact", updatedAt: "2026-11-17", priority: 0.4 },
  { path: "/privacy-policy", updatedAt: "2026-11-17", priority: 0.3 },
  { path: "/terms-and-conditions", updatedAt: "2026-11-17", priority: 0.3 },
  { path: "/disclaimer", updatedAt: "2026-11-17", priority: 0.3 },
  { path: "/editorial-policy", updatedAt: "2026-11-17", priority: 0.3 },
  { path: "/creators/youtube-earnings-calculator", updatedAt: "2026-11-19", priority: 0.8 },
  { path: "/wise-fee-calculator", updatedAt: "2026-11-22", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    ...staticPages,
    ...toolPages
      .filter((page) => page.path !== "/")
      .map((page) => ({ path: page.path, updatedAt: page.updatedAt, priority: 0.8 })),
    ...articles.map((article) => ({
      path: article.path,
      updatedAt: article.updatedAt,
      priority: article.kind === "blog" ? 0.6 : 0.7,
    })),
  ];

  return pages.map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: page.updatedAt,
    changeFrequency: page.path === "/" ? "weekly" : "monthly",
    priority: page.priority,
  }));
}

export function renderSitemapXml(): string {
  const entries = sitemap();
  const items = entries
    .map((entry) => {
      const priority = typeof entry.priority === "number" ? entry.priority.toFixed(1) : "0.5";
      const lastMod =
        entry.lastModified instanceof Date
          ? entry.lastModified.toISOString().slice(0, 10)
          : String(entry.lastModified ?? "");
      return [
        "<url>",
        `<loc>${entry.url}</loc>`,
        `<lastmod>${lastMod}</lastmod>`,
        `<changefreq>${entry.changeFrequency ?? "monthly"}</changefreq>`,
        `<priority>${priority}</priority>`,
        "</url>",
      ].join("\n");
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</urlset>\n`;
}

export function GET() {
  return new Response(renderSitemapXml(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
