import { ArticleContent } from "@/components/blog/ArticleContent";
import { ArticleHeader } from "@/components/blog/ArticleHeader";
import { AuthorCard } from "@/components/seo/AuthorCard";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { RelatedArticles } from "@/components/seo/RelatedArticles";
import { TableOfContents } from "@/components/seo/TableOfContents";
import { SourceList } from "@/components/content/ContentBlocks";
import { Accordion } from "@/components/ui/Accordion";
import { articleReadingTime } from "@/content/registry";
import { articleSchema, type Crumb } from "@/lib/seo/schema";
import type { Article } from "@/types/content";

export function ArticleView({ article, crumbs }: { article: Article; crumbs: Crumb[] }) {
  return (
    <div className="shell grid gap-8 py-10 lg:grid-cols-[16rem_minmax(0,1fr)]">
      <BreadcrumbJsonLd items={crumbs} />
      <JsonLd
        data={articleSchema({
          path: article.path,
          headline: article.h1,
          description: article.description,
          publishedAt: article.publishedAt,
          updatedAt: article.updatedAt,
          kind: article.kind === "blog" ? "BlogPosting" : "Article",
        })}
      />
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <TableOfContents items={article.sections} />
      </aside>
      <article className="grid gap-8">
        <Breadcrumbs items={crumbs} />
        <ArticleHeader
          eyebrow={article.kind === "blog" ? "Article" : article.kind === "tax" ? "Tax guide" : "Guide"}
          h1={article.h1}
          directAnswer={article.directAnswer}
          publishedAt={article.publishedAt}
          updatedAt={article.updatedAt}
          readingTime={articleReadingTime(article)}
        />
        <ArticleContent sections={article.sections} />
        <section className="grid gap-3">
          <h2 className="text-2xl font-semibold">Questions</h2>
          <Accordion items={article.faqs} />
        </section>
        <SourceList sources={article.sources} />
        <RelatedArticles links={article.related} />
        <AuthorCard />
      </article>
    </div>
  );
}
