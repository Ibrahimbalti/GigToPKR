import assert from "node:assert/strict";
import test from "node:test";
import { contentClusters } from "../config/content-clusters";
import { keywordMap } from "../config/seo-keywords";
import { editorialCalendar } from "../content/editorial-calendar";
import { articles, articleText } from "../content/registry";
import { toolPages } from "../content/tools";

const reserved = new Set([
  "/",
  "/guides",
  "/tax-guide",
  "/blog",
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms-and-conditions",
  "/disclaimer",
  "/editorial-policy",
  ...toolPages.map((page) => page.path),
  ...articles.map((article) => article.path),
]);

test("published pages have unique titles, descriptions, and addresses", () => {
  const titles = new Set<string>();
  const descriptions = new Set<string>();
  const paths = new Set<string>();
  const pages = [
    ...toolPages.map((page) => ({ title: page.title, description: page.description, path: page.path, h1: page.h1 })),
    ...articles.map((article) => ({
      title: article.title,
      description: article.description,
      path: article.path,
      h1: article.h1,
    })),
  ];

  for (const page of pages) {
    assert.equal(titles.has(page.title), false, `duplicate title ${page.title}`);
    assert.equal(descriptions.has(page.description), false, `duplicate description ${page.path}`);
    assert.equal(paths.has(page.path), false, `duplicate path ${page.path}`);
    titles.add(page.title);
    descriptions.add(page.description);
    paths.add(page.path);
    assert.ok(page.title.length >= 15 && page.title.length <= 70, page.title);
    assert.ok(page.description.length >= 50 && page.description.length <= 170, `${page.path} ${page.description.length}`);
    assert.ok(page.h1.length > 8, page.path);
  }
});

test("internal links and keyword targets point at published pages", () => {
  for (const article of articles) {
    for (const link of article.related) assert.ok(reserved.has(link.href), link.href);
    for (const source of article.sources) assert.ok(source.href.startsWith("https://"), source.href);
    assert.ok(article.publishedAt <= "2026-11-17");
    assert.ok(articleText(article).split(/\s+/).length > 180, article.path);
  }
  for (const tool of toolPages) {
    for (const link of tool.related) assert.ok(reserved.has(link.href), link.href);
  }
  for (const keyword of keywordMap) {
    assert.equal(keyword.metrics, "unverified");
    assert.ok(reserved.has(keyword.path), keyword.path);
    for (const link of keyword.internalLinks) assert.ok(reserved.has(link), link);
  }
  for (const cluster of contentClusters) {
    for (const path of cluster.paths) assert.ok(reserved.has(path), path);
  }
});

test("the editorial calendar does not pretend planned titles are published", () => {
  const planned = editorialCalendar.filter((idea) => idea.status === "planned");
  assert.ok(planned.length >= 10);
  for (const idea of planned) assert.equal(idea.href, undefined);
  assert.equal(articles.filter((article) => article.kind === "blog").length, 4);
});
