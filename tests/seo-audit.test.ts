import assert from "node:assert/strict";
import test from "node:test";
import { openGraphLocale, resolveSiteUrl } from "../config/site";
import { buildMetadata } from "../lib/seo/metadata";
import robots from "../app/robots";
import sitemap, { renderSitemapXml } from "../app/sitemap.xml/route";
import { contentClusters } from "../config/content-clusters";
import { keywordMap } from "../config/seo-keywords";
import { editorialCalendar } from "../content/editorial-calendar";
import { articles, articleText } from "../content/registry";
import { toolPages } from "../content/tools";

const reserved = new Set([
  "/",
  "/creators/youtube-earnings-calculator",
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
    assert.ok(article.publishedAt <= "2026-11-19");
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
  assert.equal(articles.filter((article) => article.kind === "blog").length, 7);
});

test("canonical origin is the public HTTPS site", () => {
  assert.equal(resolveSiteUrl(""), "https://realgigpay.com");
  assert.equal(resolveSiteUrl("http://localhost:3000"), "https://realgigpay.com");
  assert.equal(resolveSiteUrl("https://localhost:3000"), "https://realgigpay.com");
  assert.equal(resolveSiteUrl("https://realgigpay.com/"), "https://realgigpay.com");
  assert.equal(resolveSiteUrl("https://www.realgigpay.com"), "https://www.realgigpay.com");
});

test("every canonical is absolute and uses the site's default locale", () => {
  assert.equal(openGraphLocale("/"), "en_US");
  assert.equal(openGraphLocale("/fiverr-fee-calculator"), "en_US");
  assert.equal(openGraphLocale("/tax-guide"), "en_US");

  const home = buildMetadata({
    title: "Home title for the test",
    description: "A description long enough to stand in for the homepage summary.",
    path: "/",
  });
  assert.equal(home.alternates?.canonical, "https://realgigpay.com");
  assert.equal(home.openGraph && "locale" in home.openGraph ? home.openGraph.locale : "", "en_US");
  assert.equal(home.openGraph && "url" in home.openGraph ? home.openGraph.url : "", "https://realgigpay.com");

  const taxGuide = buildMetadata({
    title: "Freelancer tax illustration",
    description: "A description long enough to stand in for the freelancer tax guide.",
    path: "/tax-guide",
  });
  assert.equal(taxGuide.alternates?.canonical, "https://realgigpay.com/tax-guide");
  assert.equal(taxGuide.openGraph && "locale" in taxGuide.openGraph ? taxGuide.openGraph.locale : "", "en_US");
  const homeImages = home.openGraph?.images;
  const taxImages = taxGuide.openGraph?.images;
  const homeImgUrl = Array.isArray(homeImages) && typeof homeImages[0] === "object" && "url" in homeImages[0] ? String(homeImages[0].url) : "";
  const taxImgUrl = Array.isArray(taxImages) && typeof taxImages[0] === "object" && "url" in taxImages[0] ? String(taxImages[0].url) : "";
  assert.notEqual(homeImgUrl, taxImgUrl);
  assert.ok(homeImgUrl.includes("/og?path=%2F"));
  assert.ok(taxImgUrl.includes("/og?path=%2Ftax-guide"));

  const entries = sitemap();
  const urls = entries.map((entry) => entry.url);
  assert.ok(urls.every((url) => url.startsWith("https://realgigpay.com")));
  assert.equal(urls[0], "https://realgigpay.com");
  assert.equal(new Set(urls).size, urls.length);
  assert.ok(renderSitemapXml().includes("<priority>1.0</priority>"));
  assert.equal(robots().sitemap, "https://realgigpay.com/sitemap.xml");
  assert.equal(robots().host, undefined);
});
