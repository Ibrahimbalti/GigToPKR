"use client";

import { useState } from "react";
import { Check, Copy, Download, RotateCcw } from "lucide-react";
import { formatBreakdownText, formatResultSummary } from "@/lib/calculator";
import { trackEvent } from "@/lib/analytics";
import { buildBreakdownPdf, downloadPdf } from "@/lib/pdf";
import { copyText } from "@/lib/utils";
import type { CalculatorResult } from "@/types/calculator";

const action =
  "inline-flex items-center gap-2 rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm font-semibold text-ink shadow-[var(--shadow)] hover:border-brand/30 disabled:opacity-50";

export function ResultActions({
  result,
  onReset,
}: {
  result: CalculatorResult | null;
  onReset: () => void;
}) {
  const [message, setMessage] = useState("");

  async function copy(kind: "result" | "breakdown") {
    if (!result) return;
    const text = kind === "result" ? formatResultSummary(result) : formatBreakdownText(result);
    const ok = await copyText(text);
    setMessage(ok ? "Copied." : "Copy failed. Select the breakdown and copy it manually.");
    if (ok) trackEvent("result_copied", { kind });
  }

  function download() {
    if (!result) return;
    downloadPdf("gigtopkr-earnings-breakdown.pdf", buildBreakdownPdf(result));
    setMessage("PDF downloaded to your device. It is a working paper, not a receipt.");
    trackEvent("pdf_downloaded");
  }

  return (
    <div className="grid gap-3">
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={onReset} className={action}>
          <RotateCcw aria-hidden className="size-4" /> Reset
        </button>
        <button type="button" disabled={!result} onClick={() => void copy("result")} className={action}>
          <Copy aria-hidden className="size-4" /> Copy result
        </button>
        <button type="button" disabled={!result} onClick={() => void copy("breakdown")} className={action}>
          <Copy aria-hidden className="size-4" /> Copy breakdown
        </button>
        <button type="button" disabled={!result} onClick={download} className={action}>
          <Download aria-hidden className="size-4" /> Download PDF
        </button>
      </div>
      <p className="min-h-5 text-sm text-navy-2" role="status">
        {message ? (
          <span className="inline-flex items-center gap-1">
            <Check aria-hidden className="size-4 text-success-ink" /> {message}
          </span>
        ) : (
          "Results stay on this device."
        )}
      </p>
    </div>
  );
}
