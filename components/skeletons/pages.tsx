import {
  AccordionSkeleton,
  ArticleHeaderSkeleton,
  AuthorCardSkeleton,
  BenefitCardSkeleton,
  BlogCardSkeleton,
  CalculatorSkeleton,
  CalendarCardSkeleton,
  ContactFormSkeleton,
  ConverterCardSkeleton,
  ExampleCardSkeleton,
  HeroSkeleton,
  PageHeaderSkeleton,
  PlatformCardSkeleton,
  RelatedCardSkeleton,
  StepCardSkeleton,
  TocCardSkeleton,
} from "@/components/skeletons/cards";
import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils";

function slots(count: number) {
  return Array.from({ length: count }, (_, index) => index);
}

function Region({
  label,
  className,
  children,
  busy = true,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
  busy?: boolean;
}) {
  return (
    <div className={className} aria-busy={busy ? true : undefined} aria-live={busy ? "polite" : undefined}>
      <p className="sr-only">{label}</p>
      {children}
    </div>
  );
}

export function HowItWorksSkeleton({ quiet = false }: { quiet?: boolean }) {
  return (
    <section className="cv-auto shell py-16 lg:py-20" aria-busy="true">
      {quiet ? null : <p className="sr-only">Loading how it works</p>}
      <Skeleton variant="text" className="h-8 w-[70%] max-w-xs" />
      <ol className="mt-6 grid gap-4 md:grid-cols-3">
        {slots(3).map((index) => (
          <StepCardSkeleton key={index} />
        ))}
      </ol>
    </section>
  );
}

export function PlatformComparisonSkeleton({ quiet = false }: { quiet?: boolean }) {
  return (
    <section className="cv-auto shell py-16 lg:py-20" aria-busy="true">
      {quiet ? null : <p className="sr-only">Loading platform comparison</p>}
      <Skeleton variant="text" className="h-8 w-[70%] max-w-sm" />
      <span className="mt-3 block max-w-3xl">
        <Skeleton variant="text" className="h-7 w-full" />
        <Skeleton variant="text" className="h-7 w-4/5" />
      </span>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <PlatformCardSkeleton />
        <PlatformCardSkeleton />
      </div>
    </section>
  );
}

export function BenefitsSkeleton({ quiet = false }: { quiet?: boolean }) {
  return (
    <section className="cv-auto shell py-16 lg:py-20" aria-busy="true">
      {quiet ? null : <p className="sr-only">Loading benefits</p>}
      <Skeleton variant="text" className="h-8 w-[70%] max-w-sm" />
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {slots(6).map((index) => (
          <BenefitCardSkeleton key={index} />
        ))}
      </ul>
    </section>
  );
}

export function FAQSkeleton({ quiet = false }: { quiet?: boolean }) {
  return (
    <section className="cv-auto shell py-16 lg:py-20" aria-busy="true">
      {quiet ? null : <p className="sr-only">Loading questions</p>}
      <Skeleton variant="text" className="h-8 w-[70%] max-w-md" />
      <div className="mt-6">
        <AccordionSkeleton />
      </div>
    </section>
  );
}

export function FinalCtaSkeleton({ quiet = false }: { quiet?: boolean }) {
  return (
    <section className="cv-auto shell py-6" aria-busy="true">
      {quiet ? null : <p className="sr-only">Loading call to action</p>}
      <div className="result-panel relative overflow-hidden rounded-[1.75rem] px-6 py-10 sm:px-10" aria-hidden="true">
        <Skeleton variant="text" className="h-8 w-[70%] max-w-xl" />
        <Skeleton variant="text" className="mt-3 h-5 w-full max-w-lg" />
        <Skeleton variant="text" className="mt-1 h-5 w-3/5 max-w-lg" />
        <Skeleton variant="rect" className="mt-6 h-12 w-52 !rounded-xl" />
      </div>
    </section>
  );
}

export function HomePageSkeleton() {
  return (
    <Region label="Loading page">
      <HeroSkeleton />
      <section className="shell scroll-mt-24 py-10 lg:py-14">
        <div className="mb-5 max-w-2xl" aria-hidden="true">
          <Skeleton variant="text" className="h-8 w-[70%]" />
          <Skeleton variant="text" className="mt-2 h-6 w-full" />
          <Skeleton variant="text" className="h-6 w-2/3" />
        </div>
        <CalculatorSkeleton />
      </section>
      <HowItWorksSkeleton quiet />
      <PlatformComparisonSkeleton quiet />
      <BenefitsSkeleton quiet />
      <FAQSkeleton quiet />
      <FinalCtaSkeleton quiet />
      <article className="shell grid gap-8 py-16 lg:py-20">
        <div aria-hidden="true" className="grid gap-4">
          <Skeleton variant="text" className="h-8 w-[70%] max-w-md" />
          <Skeleton variant="text" className="h-7 w-full" />
          <Skeleton variant="text" className="h-7 w-full" />
          <Skeleton variant="text" className="h-7 w-4/5" />
          <ExampleCardSkeleton />
        </div>
        <AuthorCardSkeleton />
      </article>
    </Region>
  );
}

export function ListingPageSkeleton({
  count = 6,
  gap = "gap-6",
  calendar = false,
  label = "Loading articles",
}: {
  count?: number;
  gap?: string;
  calendar?: boolean;
  label?: string;
}) {
  return (
    <Region label={label} className={cn("shell grid py-10", gap)}>
      <Skeleton variant="text" className="h-5 w-40" />
      <PageHeaderSkeleton />
      <div className="grid gap-4 md:grid-cols-2">
        {slots(count).map((index) => (
          <BlogCardSkeleton key={index} />
        ))}
      </div>
      {calendar ? <CalendarCardSkeleton rows={6} /> : null}
    </Region>
  );
}

export function ArticlePageSkeleton() {
  return (
    <Region label="Loading article" className="shell grid gap-8 py-10 lg:grid-cols-[16rem_minmax(0,1fr)]">
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <TocCardSkeleton />
      </aside>
      <div className="grid gap-8">
        <Skeleton variant="text" className="h-5 w-56" />
        <ArticleHeaderSkeleton />
        <div className="grid gap-4" aria-hidden="true">
          <Skeleton variant="text" className="h-8 w-[70%]" />
          <Skeleton variant="text" className="h-7 w-full" />
          <Skeleton variant="text" className="h-7 w-full" />
          <Skeleton variant="text" className="h-7 w-3/5" />
          <ExampleCardSkeleton />
        </div>
        <div className="grid gap-3">
          <Skeleton variant="text" className="h-8 w-40" />
          <AccordionSkeleton />
        </div>
        <div className="grid gap-3" aria-hidden="true">
          <Skeleton variant="text" className="h-7 w-72" />
          <Skeleton variant="text" className="h-5 w-full" />
          <Skeleton variant="text" className="h-5 w-4/5" />
          <Skeleton variant="text" className="h-5 w-2/3" />
        </div>
        <section className="grid gap-3">
          <Skeleton variant="text" className="h-7 w-48" />
          <ul className="grid gap-3 sm:grid-cols-2">
            {slots(4).map((index) => (
              <RelatedCardSkeleton key={index} />
            ))}
          </ul>
        </section>
        <AuthorCardSkeleton />
      </div>
    </Region>
  );
}

export function ToolPageSkeleton({ showConverter = false }: { showConverter?: boolean }) {
  return (
    <Region label="Loading calculator" className="shell grid gap-8 py-10">
      <Skeleton variant="text" className="h-5 w-48" />
      <PageHeaderSkeleton compact />
      {showConverter ? <ConverterCardSkeleton /> : null}
      <CalculatorSkeleton />
      <div className="grid gap-4" aria-hidden="true">
        <Skeleton variant="text" className="h-8 w-[70%] max-w-md" />
        <Skeleton variant="text" className="h-7 w-full" />
        <Skeleton variant="text" className="h-7 w-full" />
        <Skeleton variant="text" className="h-7 w-3/5" />
        <ExampleCardSkeleton />
      </div>
      <div className="grid gap-3">
        <Skeleton variant="text" className="h-8 w-80 max-w-full" />
        <AccordionSkeleton />
      </div>
      <section className="grid gap-3">
        <Skeleton variant="text" className="h-7 w-48" />
        <ul className="grid gap-3 sm:grid-cols-2">
          {slots(4).map((index) => (
            <RelatedCardSkeleton key={index} />
          ))}
        </ul>
      </section>
      <AuthorCardSkeleton />
    </Region>
  );
}

export function AboutPageSkeleton() {
  return (
    <div className="shell grid gap-8 py-10 lg:gap-10 lg:py-14" aria-busy="true" aria-live="polite">
      <Region label="Loading about page" className="grid gap-8 lg:gap-10">
        <Skeleton variant="text" className="h-5 w-36" />
        <div className="overflow-hidden rounded-3xl border border-white/80 bg-white shadow-[var(--shadow)]" aria-hidden="true">
          <div className="grid lg:grid-cols-[minmax(0,1.25fr)_minmax(16rem,0.75fr)]">
            <div className="px-6 py-7 sm:px-8 sm:py-8">
              <Skeleton variant="text" className="h-4 w-16" />
              <Skeleton variant="text" className="mt-3 h-10 w-[70%] max-w-md" />
              <Skeleton variant="text" className="mt-4 h-6 w-full max-w-xl" />
              <Skeleton variant="text" className="mt-2 h-6 w-4/5 max-w-lg" />
              <Skeleton variant="text" className="mt-5 h-5 w-64" />
            </div>
            <Skeleton className="m-3 h-40 !rounded-[1.35rem] lg:h-auto" />
          </div>
        </div>
        <div aria-hidden="true">
          <Skeleton variant="text" className="h-8 w-40" />
          <Skeleton variant="text" className="mt-3 h-6 w-full max-w-3xl" />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {slots(4).map((index) => (
              <div key={index} className="surface rounded-3xl p-5">
                <Skeleton variant="text" className="h-6 w-10 !rounded-full" />
                <Skeleton variant="text" className="mt-4 h-5 w-28" />
                <Skeleton variant="text" className="mt-2 h-4 w-full" />
                <Skeleton variant="text" className="mt-2 h-4 w-3/5" />
              </div>
            ))}
          </div>
        </div>
        <div aria-hidden="true">
          <Skeleton variant="text" className="h-8 w-72 max-w-full" />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {slots(4).map((index) => (
              <div key={index} className="surface rounded-3xl p-5">
                <Skeleton variant="text" className="h-9 w-20" />
                <Skeleton variant="text" className="mt-3 h-5 w-24" />
                <Skeleton variant="text" className="mt-2 h-4 w-full" />
                <Skeleton variant="text" className="mt-2 h-4 w-4/5" />
              </div>
            ))}
          </div>
        </div>
      </Region>
    </div>
  );
}

function InfoHeaderSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/80 bg-white shadow-[var(--shadow)]" aria-hidden="true">
      <div className="grid lg:grid-cols-[minmax(0,1.25fr)_minmax(16rem,0.75fr)]">
        <div className="px-6 py-7 sm:px-8 sm:py-8">
          <Skeleton variant="text" className="h-4 w-16" />
          <Skeleton variant="text" className="mt-3 h-10 w-[70%] max-w-md" />
          <Skeleton variant="text" className="mt-4 h-6 w-full max-w-xl" />
          <Skeleton variant="text" className="mt-2 h-6 w-4/5 max-w-lg" />
          <Skeleton variant="text" className="mt-5 h-5 w-64" />
        </div>
        <Skeleton className="m-3 h-40 !rounded-[1.35rem] lg:h-auto" />
      </div>
    </div>
  );
}

export function LegalPageSkeleton() {
  return (
    <div className="shell grid gap-8 py-10 lg:gap-10 lg:py-14" aria-busy="true" aria-live="polite">
      <Region label="Loading page" className="grid gap-8 lg:gap-10">
        <Skeleton variant="text" className="h-5 w-36" />
        <InfoHeaderSkeleton />
        <div className="grid gap-4 lg:grid-cols-2" aria-hidden="true">
          {slots(4).map((index) => (
            <div key={index} className="surface rounded-3xl p-6 sm:p-7">
              <Skeleton variant="text" className="h-7 w-40" />
              <Skeleton variant="text" className="mt-3 h-5 w-full" />
              <Skeleton variant="text" className="mt-2 h-5 w-full" />
              <Skeleton variant="text" className="mt-2 h-5 w-4/5" />
            </div>
          ))}
        </div>
      </Region>
    </div>
  );
}

export function ContactPageSkeleton() {
  return (
    <div className="shell grid gap-8 py-10 lg:gap-10 lg:py-14" aria-busy="true" aria-live="polite">
      <Region label="Loading contact page" className="grid gap-8 lg:gap-10">
        <Skeleton variant="text" className="h-5 w-36" />
        <InfoHeaderSkeleton />
        <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div className="grid gap-4" aria-hidden="true">
            {slots(2).map((index) => (
              <div key={index} className="surface rounded-3xl p-6">
                <Skeleton variant="text" className="h-7 w-48" />
                <Skeleton variant="text" className="mt-3 h-5 w-full" />
                <Skeleton variant="text" className="mt-2 h-5 w-4/5" />
              </div>
            ))}
          </div>
          <ContactFormSkeleton />
        </div>
      </Region>
    </div>
  );
}
