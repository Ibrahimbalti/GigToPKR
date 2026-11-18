import Link from "next/link";

export function Logo({ onDark = false }: { onDark?: boolean }) {
  return (
    <Link
      href="/"
      scroll
      aria-label="RealGigPay"
      className={`inline-flex h-10 items-center gap-2 ${onDark ? "text-white" : "text-ink"}`}
    >
      <img
        src={onDark ? "/realgigpay-mark-on-dark.png" : "/realgigpay-mark.png"}
        alt=""
        width={1159}
        height={677}
        decoding="sync"
        draggable={false}
        className="h-9 w-auto"
      />
      <span className="text-[1.15rem] font-semibold tracking-[-0.04em]">RealGigPay</span>
    </Link>
  );
}
