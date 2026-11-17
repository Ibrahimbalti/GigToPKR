export function TableOfContents({
  items,
}: {
  items: { id: string; heading: string; level: 2 | 3 }[];
}) {
  const headings = items.filter((item) => item.level === 2);
  if (headings.length < 2) return null;
  return (
    <nav aria-label="On this page" className="surface rounded-2xl p-5">
      <p className="text-sm font-semibold text-ink">On this page</p>
      <ol className="mt-3 grid gap-2 text-sm">
        {headings.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} className="text-navy-2 hover:text-brand">
              {item.heading}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
