import Link from "next/link";

export function Logo({ onDark = false }: { onDark?: boolean }) {
  return (
    <Link href="/" scroll aria-label="GigToPKR" className="block h-10 w-36 shrink-0">
      <img
        src={onDark ? "/brand-mark-on-dark.png" : "/brand-mark.png"}
        alt=""
        width={144}
        height={40}
        decoding="sync"
        draggable={false}
        className="block h-10 w-36"
      />
    </Link>
  );
}
