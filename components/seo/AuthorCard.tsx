import { AppLink as Link } from "@/components/ui/AppLink";
import { site } from "@/config/site";

export function AuthorCard() {
  return (
    <aside className="surface rounded-3xl p-5">
      <p className="text-sm font-semibold text-ink">RealGigPay Editorial</p>
      <p className="mt-2 text-sm leading-6 text-muted">
        Prepared by the RealGigPay editorial desk. We are not a law firm, tax adviser, bank, or payment company, and we are not affiliated with Fiverr, Upwork, or Payoneer. Pages are checked against the sources listed on the page.
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-4">
        <Link href="/editorial-policy" className="inline-block text-sm font-semibold text-brand">
          Read the editorial policy
        </Link>
        {site.social.facebook ? (
          <a
            href={site.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-ink hover:text-brand"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4 text-[#1877F2]">
              <path d="M22 12.06C22 6.504 17.523 2 12 2S2 6.504 2 12.06c0 5.022 3.657 9.184 8.438 9.94v-7.03H7.898v-2.91h2.54V9.845c0-2.522 1.492-3.915 3.777-3.915 1.094 0 2.238.197 2.238.197v2.476h-1.26c-1.243 0-1.63.775-1.63 1.57v1.887h2.773l-.443 2.91h-2.33V22c4.78-.756 8.437-4.918 8.437-9.94Z" />
            </svg>
            Follow us on Facebook
          </a>
        ) : null}
      </div>
    </aside>
  );
}
