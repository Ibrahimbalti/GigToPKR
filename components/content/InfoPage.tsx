import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { LastUpdated } from "@/components/seo/LastUpdated";
import type { Crumb } from "@/lib/seo/schema";
import { cn } from "@/lib/utils";

export function InfoPage({
  crumbs,
  eyebrow,
  title,
  lede,
  asideLabel,
  asideTitle,
  asideText,
  children,
}: {
  crumbs: Crumb[];
  eyebrow: string;
  title: string;
  lede: string;
  asideLabel: string;
  asideTitle: string;
  asideText: string;
  children: React.ReactNode;
}) {
  return (
    <div className="shell grid gap-8 py-10 lg:gap-10 lg:py-14">
      <BreadcrumbJsonLd items={crumbs} />
      <Breadcrumbs items={crumbs} />
      <header className="relative overflow-hidden rounded-3xl border border-white/80 bg-white shadow-[var(--shadow)]">
        <div className="grid lg:grid-cols-[minmax(0,1.25fr)_minmax(16rem,0.75fr)]">
          <div className="px-6 py-7 sm:px-8 sm:py-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">{eyebrow}</p>
            <h1 className="mt-2 max-w-xl text-[clamp(1.85rem,3.2vw,2.6rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-ink">
              {title}
            </h1>
            <p className="mt-3 max-w-xl text-base leading-7 text-muted">{lede}</p>
            <div className="mt-5">
              <LastUpdated publishedAt="2026-11-17" updatedAt="2026-11-17" />
            </div>
          </div>
          <div className="result-panel m-3 flex flex-col justify-between rounded-[1.35rem] px-6 py-6 text-white lg:my-3 lg:mr-3 lg:ml-0">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/80">{asideLabel}</p>
            <p className="mt-3 text-xl font-semibold leading-snug tracking-[-0.02em]">{asideTitle}</p>
            <p className="mt-3 text-sm leading-6 text-white/90">{asideText}</p>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}

export function InfoGrid({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("grid gap-4 lg:grid-cols-2", className)}>{children}</div>;
}

export function InfoCard({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("surface rounded-3xl p-6 sm:p-7", className)}>
      <h2 className="text-xl font-semibold tracking-[-0.02em] text-ink">{title}</h2>
      <div className="mt-3 grid gap-3 text-sm leading-6 text-navy-2">{children}</div>
    </section>
  );
}
