import { formatLongDate } from "@/lib/utils";

export function LastUpdated({
  publishedAt,
  updatedAt,
  readingTime,
}: {
  publishedAt: string;
  updatedAt: string;
  readingTime?: string;
}) {
  return (
    <p className="text-sm text-muted">
      Published {formatLongDate(publishedAt)}
      {updatedAt !== publishedAt ? ` · Updated ${formatLongDate(updatedAt)}` : " · Reviewed the same day"}
      {readingTime ? ` · ${readingTime}` : null}
    </p>
  );
}
