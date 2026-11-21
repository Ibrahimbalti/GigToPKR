"use client";

import Script from "next/script";
import { useSyncExternalStore } from "react";
import { analyticsId } from "@/lib/analytics";

const consentKey = "realgigpay-consent";
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return window.localStorage.getItem(consentKey);
}

export function ConsentAndAnalytics() {
  const measurementId = analyticsId();
  const adsClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const choice = useSyncExternalStore(subscribe, getSnapshot, () => null);

  if (!measurementId && !adsClient) return null;

  function choose(value: "accepted" | "declined") {
    window.localStorage.setItem(consentKey, value);
    listeners.forEach((listener) => listener());
  }

  return (
    <>
      {choice === "accepted" && measurementId && measurementId !== "G-LT24F7PE93" && !measurementId.startsWith("GTM-") ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${measurementId}',{anonymize_ip:true});`}
          </Script>
        </>
      ) : null}
      {choice === "accepted" && adsClient ? (
        <Script
          id="adsense"
          strategy="afterInteractive"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsClient}`}
          crossOrigin="anonymous"
        />
      ) : null}
      {choice === null ? (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white p-4 shadow-[var(--shadow)]">
          <div className="shell flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-6 text-muted">
              Analytics and advertising stay off until you allow them. The calculator does not need
              either. See the privacy policy for what a configured Google tag would receive.
            </p>
            <div className="flex gap-2">
              <button type="button" className="rounded-xl border border-line px-4 py-2 text-sm font-semibold" onClick={() => choose("declined")}>
                Decline
              </button>
              <button type="button" className="cta-gradient rounded-xl px-4 py-2 text-sm font-semibold text-white" onClick={() => choose("accepted")}>
                Allow
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
