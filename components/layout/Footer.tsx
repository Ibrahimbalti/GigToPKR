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
            {site.productName} estimates PKR earnings from published assumptions. It is not a bank, a tax filing, or a payout quote.
          </p>
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
            <ul className="flex gap-3">
              {socials.map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="hover:text-white" rel="noopener noreferrer">
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
