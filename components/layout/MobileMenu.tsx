"use client";

import { useEffect, useId, useRef } from "react";
import Link from "next/link";
import { mainNav } from "@/config/navigation";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    const items = panel?.querySelectorAll<HTMLElement>("a, button") ?? [];
    items[0]?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={panelRef}
      id="mobile-navigation"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="shell mt-2 rounded-2xl border border-line bg-white shadow-[var(--shadow)] xl:hidden"
    >
      <p id={titleId} className="sr-only">
        Mobile navigation
      </p>
      <nav className="grid gap-1 px-3 py-3" aria-label="Mobile">
        {mainNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="inline-flex min-h-11 items-center rounded-xl px-3 text-base font-medium text-ink hover:bg-brand-50"
          >
            {item.label}
          </Link>
        ))}
        <Link
          href="/calculator"
          onClick={onClose}
          className="cta-gradient mt-2 inline-flex min-h-11 items-center justify-center rounded-xl px-3 text-base font-semibold text-white"
        >
          Calculate Earnings
        </Link>
      </nav>
    </div>
  );
}
