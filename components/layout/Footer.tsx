import { AppLink as Link } from "@/components/ui/AppLink";
import { Logo } from "@/components/layout/Logo";
import { footerCalculators, footerCompany, footerLearn } from "@/config/navigation";
import { site } from "@/config/site";

function Column({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-300">{title}</h2>
      <ul className="mt-4 grid gap-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="inline-flex min-h-8 items-center text-sm text-slate-200 transition-colors hover:text-white">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const socials = [
    ["X", site.social.x],
    ["LinkedIn", site.social.linkedin],
    ["Facebook", site.social.facebook],
  ].filter((entry): entry is [string, string] => Boolean(entry[1]));

  return (
    <footer className="mt-16 border-t border-white/10 bg-navy text-slate-200">
      <div className="shell grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo onDark />
          <p className="mt-4 max-w-xs text-sm leading-6 text-slate-300">
            {site.productName} estimates what is left after marketplace and withdrawal assumptions. It is not a bank quote or a tax filing.
          </p>
          {socials.length ? (
            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              {site.social.facebook ? (
                <a
                  href={site.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3.5 py-2 text-xs font-semibold text-white transition hover:border-white/30 hover:bg-white/20"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4 text-[#38BDF8]">
                    <path d="M22 12.06C22 6.504 17.523 2 12 2S2 6.504 2 12.06c0 5.022 3.657 9.184 8.438 9.94v-7.03H7.898v-2.91h2.54V9.845c0-2.522 1.492-3.915 3.777-3.915 1.094 0 2.238.197 2.238.197v2.476h-1.26c-1.243 0-1.63.775-1.63 1.57v1.887h2.773l-.443 2.91h-2.33V22c4.78-.756 8.437-4.918 8.437-9.94Z" />
                  </svg>
                  Facebook Page
                </a>
              ) : null}
              {site.social.x ? (
                <a
                  href={site.social.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:border-white/30 hover:bg-white/20 hover:text-white"
                >
                  X (Twitter)
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
        <Column title="Calculators" links={footerCalculators} />
        <Column title="Learn" links={footerLearn} />
        <Column title="Company" links={footerCompany} />
      </div>
      <div className="border-t border-white/10">
        <div className="shell flex flex-col gap-3 py-5 text-xs leading-5 text-slate-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. Estimates only. Confirm fees, rates, and tax with the relevant institution.
          </p>
          {socials.length ? (
            <ul className="flex gap-4">
              {socials.map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-slate-200 hover:text-white"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
