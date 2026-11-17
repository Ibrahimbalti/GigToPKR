import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils";

function slots(count: number) {
  return Array.from({ length: count }, (_, index) => index);
}

function Lines({
  count,
  className,
  lineClassName = "h-6",
  lastClassName = "w-3/5",
}: {
  count: number;
  className?: string;
  lineClassName?: string;
  lastClassName?: string;
}) {
  return (
    <span className={className}>
      {slots(count).map((index) => (
        <Skeleton
          key={index}
          variant="text"
          className={cn(lineClassName, index === count - 1 ? lastClassName : "w-full")}
        />
      ))}
    </span>
  );
}

export function BlogCardSkeleton() {
  return (
    <article className="surface lift rounded-3xl p-5" aria-hidden="true">
      <Skeleton variant="text" className="h-4 w-16" />
      <Skeleton variant="text" className="mt-2 h-7 w-[70%]" />
      <Lines count={3} className="mt-2" />
      <Skeleton variant="text" className="mt-3 h-4 w-24" />
    </article>
  );
}

export function AuthorCardSkeleton() {
  return (
    <aside className="surface rounded-3xl p-5" aria-hidden="true">
      <Skeleton variant="text" className="h-5 w-[70%] max-w-xs" />
      <Lines count={3} className="mt-2" />
      <Skeleton variant="text" className="mt-3 h-5 w-44" />
    </aside>
  );
}

export function BenefitCardSkeleton() {
  return (
    <li className="surface lift rounded-3xl p-5" aria-hidden="true">
      <Skeleton variant="rect" className="size-10 !rounded-xl" />
      <Skeleton variant="text" className="mt-4 h-6 w-[70%]" />
      <Lines count={2} className="mt-2" />
    </li>
  );
}

export function StepCardSkeleton() {
  return (
    <li className="surface-lift lift rounded-3xl p-5 sm:p-6" aria-hidden="true">
      <span className="flex items-center justify-between">
        <Skeleton variant="rect" className="size-11 !rounded-2xl" />
        <Skeleton variant="rect" className="h-6 w-10 !rounded-full" />
      </span>
      <Skeleton variant="text" className="mt-4 h-7 w-[70%]" />
      <Lines count={3} className="mt-2" />
    </li>
  );
}

export function PlatformCardSkeleton() {
  return (
    <article className="surface lift rounded-3xl p-6" aria-hidden="true">
      <span className="flex items-center justify-between gap-3">
        <Skeleton variant="text" className="h-7 w-28" />
        <Skeleton variant="rect" className="h-6 w-24 !rounded-full" />
      </span>
      <Lines count={3} className="mt-3" />
      <Skeleton variant="text" className="mt-4 h-5 w-48" />
    </article>
  );
}

export function RelatedCardSkeleton() {
  return (
    <li aria-hidden="true">
      <span className="surface lift block rounded-2xl px-4 py-3">
        <Skeleton variant="text" className="h-5 w-[70%]" />
      </span>
    </li>
  );
}

export function ExampleCardSkeleton() {
  return (
    <figure className="rounded-2xl border border-line bg-brand-50 p-4 shadow-[var(--shadow)]" aria-hidden="true">
      <Skeleton variant="text" className="h-5 w-[70%]" />
      <Skeleton variant="text" className="mt-1 h-5 w-56" />
      <span className="mt-3 grid gap-1">
        {slots(7).map((index) => (
          <span key={index} className="flex justify-between gap-4">
            <Skeleton variant="text" className="h-5 w-36" />
            <Skeleton variant="text" className="h-5 w-16" />
          </span>
        ))}
      </span>
      <Lines count={2} className="mt-3" lineClassName="h-5" lastClassName="w-4/5" />
    </figure>
  );
}

export function PageHeaderSkeleton({ compact = false }: { compact?: boolean }) {
  return (
    <header
      className={
        compact
          ? "relative overflow-hidden rounded-2xl border border-white/80 bg-white px-4 py-4 shadow-[var(--shadow)] sm:px-5"
          : "relative overflow-hidden rounded-3xl border border-white/80 bg-white px-6 py-6 shadow-[var(--shadow)] sm:px-8 sm:py-7"
      }
      aria-hidden="true"
    >
      <Skeleton variant="text" className="mt-2 h-9 w-[70%]" />
      <Lines count={2} className="mt-3 max-w-2xl" lineClassName="h-7" lastClassName="w-3/5" />
    </header>
  );
}

export function ArticleHeaderSkeleton() {
  return (
    <header
      className="relative max-w-3xl overflow-hidden rounded-3xl border border-white/80 bg-white px-6 py-6 shadow-[var(--shadow)] sm:px-7"
      aria-hidden="true"
    >
      <Skeleton variant="text" className="h-4 w-20" />
      <Skeleton variant="text" className="mt-2 h-9 w-[70%]" />
      <Lines count={2} className="mt-3" lineClassName="h-7" lastClassName="w-4/5" />
      <Skeleton variant="text" className="mt-3 h-5 w-72" />
    </header>
  );
}

export function TocCardSkeleton() {
  return (
    <nav className="surface rounded-2xl p-5" aria-hidden="true">
      <Skeleton variant="text" className="h-5 w-28" />
      <span className="mt-3 grid gap-2">
        {slots(6).map((index) => (
          <Skeleton key={index} variant="text" className={cn("h-5", index === 5 ? "w-3/5" : "w-full")} />
        ))}
      </span>
    </nav>
  );
}

export function AccordionSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="surface overflow-hidden rounded-3xl" aria-hidden="true">
      {slots(rows).map((index) => (
        <div key={index} className="border-b border-line px-5 py-4 last:border-b-0">
          <Skeleton variant="text" className="h-6 w-[70%]" />
          {index === 0 ? <Lines count={2} className="mt-3 max-w-3xl" /> : null}
        </div>
      ))}
    </div>
  );
}

export function CalendarCardSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <section className="grid gap-3" aria-hidden="true">
      <Skeleton variant="text" className="h-8 w-56" />
      <ul className="surface divide-y divide-line overflow-hidden rounded-3xl">
        {slots(rows).map((index) => (
          <li key={index} className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="min-w-0 flex-1">
              <Skeleton variant="text" className="h-6 w-[70%]" />
              <Skeleton variant="text" className="mt-1 h-5 w-1/2" />
            </span>
            <Skeleton variant="text" className="h-5 w-28" />
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ContactFormSkeleton() {
  return (
    <div className="surface grid gap-4 rounded-3xl p-5 sm:p-6" aria-hidden="true">
      {["name", "email", "topic"].map((field) => (
        <span key={field} className="grid gap-1.5">
          <Skeleton variant="text" className="h-5 w-16" />
          <Skeleton variant="rect" className="h-[3.25rem] w-full !rounded-[0.9rem]" />
        </span>
      ))}
      <span className="grid gap-1.5">
        <Skeleton variant="text" className="h-5 w-20" />
        <Skeleton variant="rect" className="h-48 w-full !rounded-[0.9rem]" />
      </span>
      <Skeleton variant="rect" className="h-12 w-full !rounded-xl" />
    </div>
  );
}

export function ConverterCardSkeleton() {
  return (
    <section className="surface rounded-3xl p-5 sm:p-6" aria-hidden="true">
      <Skeleton variant="text" className="h-7 w-[70%]" />
      <Lines count={2} className="mt-1" />
      <span className="mt-4 grid gap-4 sm:grid-cols-2">
        {slots(2).map((index) => (
          <span key={index} className="grid gap-1.5">
            <Skeleton variant="text" className="h-5 w-28" />
            <Skeleton variant="rect" className="h-[3.25rem] w-full !rounded-[0.9rem]" />
          </span>
        ))}
      </span>
      <Skeleton variant="text" className="mt-4 h-9 w-40" />
    </section>
  );
}

function FieldBlock({ label }: { label: string }) {
  return (
    <span className="grid gap-2">
      <Skeleton variant="text" className={cn("h-5", label)} />
      <Skeleton variant="rect" className="h-[3.25rem] w-full !rounded-[0.9rem]" />
    </span>
  );
}

export function CalculatorSkeleton() {
  return (
    <div className="grid min-w-0 items-start gap-3 lg:grid-cols-2" aria-hidden="true">
      <div className="surface grid min-w-0 gap-4 rounded-3xl p-4 sm:p-5">
        <span>
          <Skeleton variant="text" className="h-7 w-[70%]" />
          <Lines count={2} className="mt-1" />
        </span>
        <FieldBlock label="w-40" />
        <span className="grid gap-2">
          <Skeleton variant="text" className="h-5 w-20" />
          <span className="grid gap-3 sm:grid-cols-2">
            {slots(2).map((index) => (
              <Skeleton key={index} variant="rect" className="h-24 w-full !rounded-2xl" />
            ))}
          </span>
        </span>
        <span className="grid gap-2">
          <Skeleton variant="text" className="h-5 w-24" />
          <Skeleton variant="rect" className="h-16 w-full !rounded-2xl" />
        </span>
        <span className="grid gap-2">
          <span className="flex items-end justify-between gap-3">
            <Skeleton variant="text" className="h-5 w-32" />
            <Skeleton variant="rect" className="h-6 w-24 !rounded-full" />
          </span>
          <span className="flex gap-2">
            <Skeleton variant="rect" className="h-[3.25rem] flex-1 !rounded-[0.9rem]" />
            <Skeleton variant="rect" className="h-[3.25rem] w-24 !rounded-[0.9rem]" />
          </span>
        </span>
        <Skeleton variant="rect" className="h-12 w-full !rounded-xl" />
      </div>
      <div className="grid min-w-0 gap-4">
        <div className="result-panel min-h-80 rounded-3xl p-4 sm:p-5">
          <Skeleton variant="text" className="h-6 w-56" />
          <Lines count={3} className="mt-2 max-w-sm" />
          <Skeleton variant="text" className="mt-4 h-4 w-40" />
        </div>
        <span className="flex flex-wrap gap-2">
          <Skeleton variant="rect" className="h-10 w-24 !rounded-xl" />
          <Skeleton variant="rect" className="h-10 w-32 !rounded-xl" />
          <Skeleton variant="rect" className="h-10 w-40 !rounded-xl" />
          <Skeleton variant="rect" className="h-10 w-36 !rounded-xl" />
        </span>
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <section className="shell grid items-center gap-8 py-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-6 lg:py-16">
      <div aria-hidden="true">
        <Skeleton variant="rect" className="h-8 w-64 !rounded-full" />
        <Skeleton variant="text" className="mt-5 h-12 w-full max-w-[12em]" />
        <Skeleton variant="text" className="mt-2 h-12 w-[70%] max-w-[12em]" />
        <Skeleton variant="text" className="mt-3 h-7 w-[70%]" />
        <Lines count={3} className="mt-4 max-w-xl" lineClassName="h-7" />
        <span className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Skeleton variant="rect" className="h-12 w-52 !rounded-xl" />
          <Skeleton variant="rect" className="h-12 w-48 !rounded-xl" />
        </span>
        <span className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
          <Skeleton variant="text" className="h-5 w-24" />
          <Skeleton variant="text" className="h-5 w-44" />
          <Skeleton variant="text" className="h-5 w-40" />
        </span>
      </div>
      <div>
        <article className="surface rounded-3xl p-5 sm:hidden" aria-hidden="true">
          <Skeleton variant="text" className="h-4 w-40" />
          <Skeleton variant="text" className="mt-2 h-5 w-56" />
          <Skeleton variant="text" className="mt-2 h-9 w-[70%]" />
          <Skeleton variant="text" className="mt-2 h-5 w-full" />
        </article>
        <div className="relative mx-auto hidden h-[460px] w-full max-w-[540px] sm:block" aria-hidden="true">
          <article className="surface float-a absolute left-2 top-8 w-[78%] rounded-2xl p-4 sm:left-4 sm:p-5">
            <span className="flex items-center justify-between gap-2">
              <Skeleton variant="text" className="h-4 w-24" />
              <Skeleton variant="rect" className="h-5 w-16 !rounded-full" />
            </span>
            <Skeleton variant="text" className="mt-3 h-5 w-40" />
            <Skeleton variant="text" className="mt-1 h-9 w-[70%]" />
            <span className="mt-3 grid grid-cols-2 gap-2">
              <Skeleton variant="rect" className="h-12 !rounded-xl" />
              <Skeleton variant="rect" className="h-12 !rounded-xl" />
            </span>
          </article>
          <article className="float-b absolute right-1 bottom-16 w-[58%] rounded-2xl border border-white/70 bg-white p-4 shadow-[var(--shadow-lift)] sm:right-2">
            <span className="flex items-center gap-2">
              <Skeleton variant="rect" className="size-8 !rounded-lg" />
              <Skeleton variant="text" className="h-5 w-24" />
            </span>
            <Skeleton variant="text" className="mt-3 h-4 w-28" />
            <Skeleton variant="text" className="mt-1 h-7 w-[70%]" />
          </article>
          <Skeleton variant="rect" className="float-c absolute right-3 top-4 h-8 w-32 !rounded-full" />
          <Skeleton variant="rect" className="float-d absolute bottom-4 left-8 h-8 w-40 !rounded-full" />
        </div>
      </div>
    </section>
  );
}
