import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleView } from "@/components/content/ArticleView";
import { articlesByKind, getArticle } from "@/content/registry";
import { buildMetadata } from "@/lib/seo/metadata";

export function generateStaticParams() {
  return articlesByKind("blog").map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(`/blog/${slug}`);
  if (!article) return {};
  return buildMetadata({
    title: article.title,
    description: article.description,
    path: article.path,
    type: "article",
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(`/blog/${slug}`);
  if (!article || article.kind !== "blog") notFound();
  return (
    <ArticleView
      article={article}
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
        { name: article.h1, path: article.path },
      ]}
    />
  );
}
