import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, type Crumb } from "@/lib/seo/schema";

export function BreadcrumbJsonLd({ items }: { items: Crumb[] }) {
  return <JsonLd data={breadcrumbSchema(items)} />;
}
