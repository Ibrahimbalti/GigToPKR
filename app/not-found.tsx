import { AppLink as Link } from "@/components/ui/AppLink";

export default function NotFound() {
  return (
    <div className="mx-auto grid min-h-[50vh] max-w-xl place-content-center gap-4 px-4 py-20 text-center">
      <p className="text-sm font-semibold text-brand">404</p>
      <h1 className="text-4xl font-semibold tracking-tight">This page is not on RealGigPay</h1>
      <p className="text-muted">
        The address may be mistyped, or it may be a planned article that has not been published.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link href="/" className="cta-gradient rounded-xl px-4 py-2.5 text-sm font-semibold text-white">
          Home
        </Link>
        <Link href="/calculator" className="rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-semibold">
          Calculator
        </Link>
        <Link href="/guides" className="rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-semibold">
          Guides
        </Link>
      </div>
    </div>
  );
}
