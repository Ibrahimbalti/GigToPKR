import { AppLink as Link } from "@/components/ui/AppLink";

export function AuthorCard() {
  return (
    <aside className="surface rounded-3xl p-5">
      <p className="text-sm font-semibold text-ink">RealGigPay Editorial</p>
      <p className="mt-2 text-sm leading-6 text-muted">
        Prepared by the RealGigPay editorial desk. We are not a law firm, tax adviser, bank, or payment company, and we are not affiliated with Fiverr, Upwork, or Payoneer. Pages are checked against the sources listed on the page.
      </p>
      <Link href="/editorial-policy" className="mt-3 inline-block text-sm font-semibold text-brand">
        Read the editorial policy
      </Link>
    </aside>
  );
}
