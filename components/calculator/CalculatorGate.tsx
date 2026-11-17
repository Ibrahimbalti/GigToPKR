"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ExchangeRateProvider } from "@/components/calculator/ExchangeRateProvider";
import { Calculator } from "@/components/calculator/Calculator";
import type { Platform, TaxStatus } from "@/types/calculator";

export function CalculatorGate({
  children,
  defaultPlatform,
  defaultTax,
  showMonthly,
}: {
  children: React.ReactNode;
  defaultPlatform?: Platform;
  defaultTax?: TaxStatus;
  showMonthly?: boolean;
}) {
  const [live, setLive] = useState(false);
  const scrollY = useRef(0);
  const keepFocus = useRef(false);

  useEffect(() => {
    scrollY.current = window.scrollY;
    const active = document.activeElement;
    keepFocus.current = active instanceof HTMLInputElement && active.id === "order-amount";
    setLive(true);
  }, []);

  useLayoutEffect(() => {
    if (!live) return;
    window.scrollTo(0, scrollY.current);
    if (!keepFocus.current) return;
    document.querySelector<HTMLInputElement>('input[name="orderAmount"]')?.focus({ preventScroll: true });
  }, [live]);

  if (!live) return children;

  return (
    <ExchangeRateProvider>
      <Calculator defaultPlatform={defaultPlatform} defaultTax={defaultTax} showMonthly={showMonthly} />
    </ExchangeRateProvider>
  );
}
