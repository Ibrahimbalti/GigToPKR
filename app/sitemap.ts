import type { MetadataRoute } from "next";
import { articles } from "@/content/registry";
import { toolPages } from "@/content/tools";
import { absoluteUrl } from "@/config/site";

const staticPages = [
  { path: "/", updatedAt: "2026-11-17", priority: 1 },
  { path: "/guides", updatedAt: "2026-11-17", priority: 0.7 },
  { path: "/tax-guide", updatedAt: "2026-11-17", priority: 0.7 },
  { path: "/blog", updatedAt: "2026-11-17", priority: 0.6 },
  { path: "/about", updatedAt: "2026-11-17", priority: 0.4 },
  { path: "/contact", updatedAt: "2026-11-17", priority: 0.4 },
  { path: "/privacy-policy", updatedAt: "2026-11-17", priority: 0.3 },
  { path: "/terms-and-conditions", updatedAt: "2026-11-17", priority: 0.3 },
  { path: "/disclaimer", updatedAt: "2026-11-17", priority: 0.3 },
  { path: "/editorial-policy", updatedAt: "2026-11-17", priority: 0.3 },
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
