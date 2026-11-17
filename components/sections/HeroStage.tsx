import { ArrowLeftRight, Banknote, Sparkles } from "@/components/icons";

export function HeroStage({
  finalPkr,
  platformFee,
  netUsd,
  converted,
  rate,
  note,
}: {
  finalPkr: string;
  platformFee: string;
  netUsd: string;
  converted: string;
  rate: string;
  note: string;
}) {
  return (
    <div aria-label="Illustrative earnings preview">
      <article className="surface rounded-3xl p-5 sm:hidden">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Estimate · not a live quote</p>
        <p className="mt-2 text-sm text-muted">$500 Fiverr · active filer · USD/PKR {rate}</p>
        <p className="mt-2 text-3xl font-semibold tracking-tight text-success-ink tabular">{finalPkr}</p>
        <p className="mt-2 text-sm text-muted">Platform fee {platformFee} · net {netUsd} · converted {converted}</p>
      </article>
      <div className="relative mx-auto hidden h-[460px] w-full max-w-[540px] sm:block">
        <div aria-hidden className="absolute left-6 top-10 size-28 rounded-full bg-brand/15" />
        <div aria-hidden className="absolute bottom-8 right-4 size-32 rounded-full bg-brand/10" />
        <div className="absolute inset-0 [perspective:1100px]">
          <div className="absolute inset-x-6 top-8 bottom-10 rounded-[1.75rem] border border-white/60 bg-white/70 shadow-[var(--shadow-premium)] [transform:rotateY(-16deg)_rotateX(8deg)]" />
          <div className="absolute inset-x-12 top-16 bottom-16 rounded-[1.5rem] border border-white/40 bg-white/50 [transform:rotateY(-16deg)_rotateX(8deg)_translateZ(24px)]" />
        </div>

        <article className="surface float-a absolute left-2 top-8 w-[78%] rounded-2xl p-4 sm:left-4 sm:p-5">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Earnings card</p>
            <span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-semibold text-brand-ink">Estimate</span>
          </div>
          <p className="mt-3 text-sm text-muted">$500 Fiverr · active filer</p>
          <p className="mt-1 text-[1.7rem] font-semibold tracking-tight text-ink tabular sm:text-3xl">{finalPkr}</p>
          <dl className="mt-3 grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-xl bg-canvas px-3 py-2">
              <dt className="text-muted">Platform fee</dt>
              <dd className="mt-0.5 font-semibold text-danger-ink tabular">{platformFee}</dd>
            </div>
            <div className="rounded-xl bg-canvas px-3 py-2">
              <dt className="text-muted">Net USD</dt>
              <dd className="mt-0.5 font-semibold tabular">{netUsd}</dd>
            </div>
          </dl>
        </article>

        <article className="float-b absolute right-1 bottom-16 w-[58%] rounded-2xl border border-white/70 bg-white p-4 shadow-[var(--shadow-lift)] sm:right-2">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <span className="flex size-8 items-center justify-center rounded-lg bg-brand-50 text-brand-ink">
              <ArrowLeftRight aria-hidden className="size-4" />
            </span>
            USD to PKR
          </div>
          <p className="mt-3 text-xs text-muted">Converted after fees</p>
          <p className="text-lg font-semibold tabular">{converted}</p>
        </article>

        <p className="float-c absolute right-3 top-4 inline-flex min-h-8 items-center gap-1.5 rounded-full border border-white/80 bg-white px-3 py-1.5 text-xs font-semibold text-navy shadow-[var(--shadow)]">
          <Banknote aria-hidden className="size-3.5 text-brand-ink" />
          USD/PKR {rate}
        </p>

        <p className="float-d absolute bottom-4 left-8 inline-flex min-h-8 items-center gap-2 rounded-full bg-success-ink px-3 py-2 text-xs font-semibold text-white shadow-[var(--shadow)]">
          <Sparkles aria-hidden className="size-3.5" />
          Final estimate {finalPkr}
        </p>
        <p className="sr-only">{note}</p>
      </div>
    </div>
  );
}
