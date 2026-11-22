"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "@/components/icons";
import { Logo } from "@/components/layout/Logo";
import { desktopNav, footerCalculators, mainNav } from "@/config/navigation";
import { site } from "@/config/site";

function FacebookIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M22 12.06C22 6.504 17.523 2 12 2S2 6.504 2 12.06c0 5.022 3.657 9.184 8.438 9.94v-7.03H7.898v-2.91h2.54V9.845c0-2.522 1.492-3.915 3.777-3.915 1.094 0 2.238.197 2.238.197v2.476h-1.26c-1.243 0-1.63.775-1.63 1.57v1.887h2.773l-.443 2.91h-2.33V22c4.78-.756 8.437-4.918 8.437-9.94Z" />
    </svg>
  );
}

function isCurrent(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 px-3 pt-3">
      <div className="shell relative flex h-[72px] items-center gap-3 rounded-2xl border border-line bg-white px-3 shadow-[var(--shadow)]">
        <Logo />
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 xl:flex" aria-label="Primary">
          {desktopNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              scroll
              aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
              className="inline-flex min-h-10 items-center whitespace-nowrap rounded-lg px-2.5 text-[13.5px] font-medium tracking-[-0.01em] text-navy-2 aria-[current=page]:bg-brand-50 aria-[current=page]:text-brand-ink hover:bg-canvas hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
          <details key={`calc-${pathname}`} className="group relative">
            <summary className="inline-flex min-h-10 cursor-pointer list-none items-center gap-1 whitespace-nowrap rounded-lg px-2.5 text-[13.5px] font-medium tracking-[-0.01em] text-navy-2 hover:bg-canvas hover:text-ink">
              More Calculators
              <span aria-hidden className="text-[10px] text-muted transition-transform group-open:rotate-180">▼</span>
            </summary>
            <div className="absolute left-0 z-50 mt-2 w-60 rounded-2xl border border-line bg-white p-2 shadow-[var(--shadow)]">
              {footerCalculators.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  scroll
                  aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
                  className="flex min-h-9 items-center rounded-xl px-3 text-sm font-medium text-ink aria-[current=page]:bg-brand-50 aria-[current=page]:text-brand-ink hover:bg-brand-50"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </details>
        </nav>
        <div className="ml-auto flex shrink-0 items-center gap-2">
          {site.social.facebook ? (
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit RealGigPay on Facebook"
              className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-line bg-[#f7f9fd] px-3 text-xs font-semibold text-brand-ink transition hover:border-brand/40 hover:bg-brand-50"
            >
              <FacebookIcon className="size-4 text-[#1877F2]" />
              <span className="hidden sm:inline">Facebook</span>
            </a>
          ) : null}
          <details key={pathname} className="group relative xl:hidden">
            <summary className="flex size-10 cursor-pointer items-center justify-center rounded-xl border border-line bg-white text-ink">
              <Menu aria-hidden className="size-5 group-open:hidden" />
              <X aria-hidden className="hidden size-5 group-open:block" />
              <span className="sr-only">Menu</span>
            </summary>
            <nav
              id="mobile-navigation"
              className="absolute right-0 z-50 mt-3 w-[min(20rem,calc(100vw-2rem))] rounded-2xl border border-line bg-white p-3 shadow-[var(--shadow)]"
              aria-label="Mobile"
            >
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  scroll
                  aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
                  className="flex min-h-11 items-center rounded-xl px-3 text-base font-medium text-ink aria-[current=page]:bg-brand-50 aria-[current=page]:text-brand-ink hover:bg-brand-50"
                >
                  {item.label}
                </Link>
              ))}
              {site.social.facebook ? (
                <a
                  href={site.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 flex min-h-11 items-center gap-2 rounded-xl border border-line bg-[#f7f9fd] px-3 text-base font-semibold text-brand-ink hover:bg-brand-50"
                >
                  <FacebookIcon className="size-5 text-[#1877F2]" />
                  <span>Follow on Facebook</span>
                </a>
              ) : null}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
