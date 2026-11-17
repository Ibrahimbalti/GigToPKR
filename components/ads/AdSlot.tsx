export function AdSlot({
  placement,
}: {
  placement: "hero" | "sidebar" | "in-content" | "footer";
}) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const preview = process.env.NEXT_PUBLIC_ADS_PREVIEW === "true";
  const slots = {
    hero: process.env.NEXT_PUBLIC_ADSENSE_SLOT_HERO,
    sidebar: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR,
    "in-content": process.env.NEXT_PUBLIC_ADSENSE_SLOT_IN_CONTENT,
    footer: process.env.NEXT_PUBLIC_ADSENSE_SLOT_FOOTER,
  } as const;
  const slot = slots[placement];
  if (!client && !preview) return null;

  const minHeight = placement === "sidebar" || placement === "in-content" ? "min-h-64" : "min-h-24";

  return (
    <aside aria-label="Advertisement" className={`shell ${minHeight}`}>
      <div className={`flex ${minHeight} flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-white text-center`}>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">Advertisement</p>
        {client && slot ? (
          <ins
            className="adsbygoogle mt-2 block w-full"
            data-ad-client={client}
            data-ad-slot={slot}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        ) : (
          <p className="mt-2 max-w-md px-4 text-sm text-muted">
            Reserved advertising space. It is not a link, and no ad is loaded until a real AdSense
            client and slot are configured.
          </p>
        )}
      </div>
    </aside>
  );
}
