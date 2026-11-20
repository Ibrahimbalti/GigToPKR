"use client";

import { useLayoutEffect, useRef, useSyncExternalStore } from "react";
import { ExchangeRateProvider } from "@/components/calculator/ExchangeRateProvider";
import { Calculator } from "@/components/calculator/Calculator";
import type { Platform, TaxStatus } from "@/types/calculator";

const emptySubscribe = () => () => {};

export function CalculatorGate({
  children,
  defaultPlatform,
  defaultTax,
  showMonthly,
  lockedPlatform,
}: {
  children: React.ReactNode;
  defaultPlatform?: Platform;
  defaultTax?: TaxStatus;
  showMonthly?: boolean;
  lockedPlatform?: Platform;
}) {
  const scrollY = useRef(0);
  const keepFocus = useRef(false);
  const captured = useRef(false);

  const live = useSyncExternalStore(
    emptySubscribe,
    () => {
      if (!captured.current && typeof window !== "undefined") {
        captured.current = true;
        scrollY.current = window.scrollY;
        const active = document.activeElement;
        keepFocus.current = active instanceof HTMLInputElement && active.id === "order-amount";
      }
      return true;
    },
    () => false,
  );

  useLayoutEffect(() => {
    if (!live) return;
    window.scrollTo(0, scrollY.current);
    if (!keepFocus.current) return;
    document.querySelector<HTMLInputElement>('input[name="orderAmount"]')?.focus({ preventScroll: true });
  }, [live]);

  if (!live) return children;

  return (
    <ExchangeRateProvider>
      <Calculator
        defaultPlatform={defaultPlatform}
        defaultTax={defaultTax}
        showMonthly={showMonthly}
        lockedPlatform={lockedPlatform}
      />
    </ExchangeRateProvider>
  );
}
