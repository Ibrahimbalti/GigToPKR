import { ContentBlocks } from "@/components/content/ContentBlocks";
import type { ContentSection } from "@/types/content";

export function ArticleContent({ sections }: { sections: ContentSection[] }) {
  return <ContentBlocks sections={sections} />;
}
