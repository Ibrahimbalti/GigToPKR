import type { SVGProps } from "react";

function Glyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    />
  );
}

export function Menu(props: SVGProps<SVGSVGElement>) {
  return (
    <Glyph {...props}>
      <path d="M4 5h16" />
      <path d="M4 12h16" />
      <path d="M4 19h16" />
    </Glyph>
  );
}

export function X(props: SVGProps<SVGSVGElement>) {
  return (
    <Glyph {...props}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </Glyph>
  );
}

export function Calculator(props: SVGProps<SVGSVGElement>) {
  return (
    <Glyph {...props}>
      <rect width="16" height="20" x="4" y="2" rx="2" />
      <path d="M8 6h8" />
      <path d="M16 14v4" />
      <path d="M16 10h.01" />
      <path d="M12 10h.01" />
      <path d="M8 10h.01" />
      <path d="M12 14h.01" />
      <path d="M8 14h.01" />
      <path d="M12 18h.01" />
      <path d="M8 18h.01" />
    </Glyph>
  );
}

export function ChevronDown(props: SVGProps<SVGSVGElement>) {
  return (
    <Glyph {...props}>
      <path d="m6 9 6 6 6-6" />
    </Glyph>
  );
}

export function Check(props: SVGProps<SVGSVGElement>) {
  return (
    <Glyph {...props}>
      <path d="M20 6 9 17l-5-5" />
    </Glyph>
  );
}

export function ArrowRight(props: SVGProps<SVGSVGElement>) {
  return (
    <Glyph {...props}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </Glyph>
  );
}

export function BadgeCheck(props: SVGProps<SVGSVGElement>) {
  return (
    <Glyph {...props}>
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
      <path d="m16 9-5.5 5.5L8 12" />
    </Glyph>
  );
}

export function ListChecks(props: SVGProps<SVGSVGElement>) {
  return (
    <Glyph {...props}>
      <path d="M13 5h8" />
      <path d="M13 12h8" />
      <path d="M13 19h8" />
      <path d="m3 17 2 2 4-4" />
      <path d="m3 7 2 2 4-4" />
    </Glyph>
  );
}

export function SlidersHorizontal(props: SVGProps<SVGSVGElement>) {
  return (
    <Glyph {...props}>
      <path d="M10 5H3" />
      <path d="M12 19H3" />
      <path d="M14 3v4" />
      <path d="M16 17v4" />
      <path d="M21 12h-9" />
      <path d="M21 19h-5" />
      <path d="M21 5h-7" />
      <path d="M8 10v4" />
      <path d="M8 12H3" />
    </Glyph>
  );
}

export function Wallet(props: SVGProps<SVGSVGElement>) {
  return (
    <Glyph {...props}>
      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
    </Glyph>
  );
}

export function BadgePercent(props: SVGProps<SVGSVGElement>) {
  return (
    <Glyph {...props}>
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
      <path d="m15 9-6 6" />
      <path d="M9 9h.01" />
      <path d="M15 15h.01" />
    </Glyph>
  );
}

export function Landmark(props: SVGProps<SVGSVGElement>) {
  return (
    <Glyph {...props}>
      <path d="M10 18v-7" />
      <path d="M11.119 2.205a2 2 0 0 1 1.762 0l7.84 3.846A.5.5 0 0 1 20.5 7h-17a.5.5 0 0 1-.22-.949z" />
      <path d="M14 18v-7" />
      <path d="M18 18v-7" />
      <path d="M3 22h18" />
      <path d="M6 18v-7" />
    </Glyph>
  );
}

export function ReceiptText(props: SVGProps<SVGSVGElement>) {
  return (
    <Glyph {...props}>
      <path d="M13 16H8" />
      <path d="M14 8H8" />
      <path d="M16 12H8" />
      <path d="M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z" />
    </Glyph>
  );
}

export function Smartphone(props: SVGProps<SVGSVGElement>) {
  return (
    <Glyph {...props}>
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </Glyph>
  );
}

export function Unlock(props: SVGProps<SVGSVGElement>) {
  return (
    <Glyph {...props}>
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 9.9-1" />
    </Glyph>
  );
}

export function WalletCards(props: SVGProps<SVGSVGElement>) {
  return (
    <Glyph {...props}>
      <path d="M3 11h3.75a2 2 0 0 1 1.6.8l.45.6a4 4 0 0 0 6.4 0l.45-.6a2 2 0 0 1 1.6-.8H21" />
      <path d="M3 7h18" />
      <rect x="3" y="3" width="18" height="18" rx="2" />
    </Glyph>
  );
}

export function ArrowLeftRight(props: SVGProps<SVGSVGElement>) {
  return (
    <Glyph {...props}>
      <path d="M8 3 4 7l4 4" />
      <path d="M4 7h16" />
      <path d="m16 21 4-4-4-4" />
      <path d="M20 17H4" />
    </Glyph>
  );
}

export function Banknote(props: SVGProps<SVGSVGElement>) {
  return (
    <Glyph {...props}>
      <rect width="20" height="12" x="2" y="6" rx="2" />
      <circle cx="12" cy="12" r="2" />
      <path d="M6 12h.01M18 12h.01" />
    </Glyph>
  );
}

export function Sparkles(props: SVGProps<SVGSVGElement>) {
  return (
    <Glyph {...props}>
      <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
      <path d="M20 2v4" />
      <path d="M22 4h-4" />
      <circle cx="4" cy="20" r="2" />
    </Glyph>
  );
}
