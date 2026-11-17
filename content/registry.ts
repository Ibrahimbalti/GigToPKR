import { posts } from "@/content/blog";
import { guides } from "@/content/guides";
import { taxGuides } from "@/content/tax-guides";
import { readingMinutes } from "@/lib/utils";
import type { Article, ContentBlock } from "@/types/content";

export const articles: Article[] = [...guides, ...taxGuides, ...posts];

function blockText(block: ContentBlock): string {
  switch (block.type) {
    case "p":
    case "note":
      return block.text;
    case "ul":
    case "ol":
      return block.items.join(" ");
    case "table":
      return [block.caption, ...block.headers, ...block.rows.flat()].join(" ");
    case "example":
      return block.title;
    default:
      return "";
  }
}

export function articleText(article: Article): string {
  return [
    article.h1,
    article.directAnswer,
    ...article.sections.flatMap((section) => [
      section.heading,
      ...section.blocks.map(blockText),
    ]),
    ...article.faqs.flatMap((faq) => [faq.question, faq.answer]),
  ].join(" ");
}

export function articleReadingTime(article: Article): string {
  return readingMinutes(articleText(article));
}

export function getArticle(path: string): Article | undefined {
  return articles.find((article) => article.path === path);
}

export function articlesByKind(kind: Article["kind"]): Article[] {
  return articles.filter((article) => article.kind === kind);
}
