"use client";

import type { LucideIcon } from "lucide-react";
import { Award } from "lucide-react";

interface CompareSpecRowProps {
  label: string;
  icon?: LucideIcon;
  values: (string | number | null | undefined)[];
  carsPresent: boolean[];
  highlightBest?: "max" | "min" | "none";
  unit?: string;
  formatter?: (val: any) => string;
  showOnlyDifferences?: boolean;
}

export default function CompareSpecRow({
  label,
  icon: Icon,
  values,
  carsPresent,
  highlightBest = "none",
  unit = "",
  formatter,
  showOnlyDifferences = false,
}: CompareSpecRowProps) {
  // Extract active values
  const activeValues = values.filter((_, idx) => carsPresent[idx]);

  // Check if all active values are identical
  const isSame =
    activeValues.length > 1 &&
    activeValues.every(
      (v) =>
        String(v ?? "").trim().toLowerCase() ===
        String(activeValues[0] ?? "").trim().toLowerCase()
    );

  // If difference filter is on and values are identical, do not render row
  if (showOnlyDifferences && isSame) {
    return null;
  }

  // Calculate best value index for highlights if requested
  let bestIndex = -1;
  if (highlightBest !== "none" && activeValues.length > 1) {
    const numericEntries = values
      .map((val, idx) => ({ idx, num: typeof val === "number" ? val : parseFloat(String(val)) }))
      .filter((entry) => carsPresent[entry.idx] && !isNaN(entry.num));

    if (numericEntries.length > 0) {
      if (highlightBest === "max") {
        const maxVal = Math.max(...numericEntries.map((e) => e.num));
        const winners = numericEntries.filter((e) => e.num === maxVal);
        if (winners.length === 1) bestIndex = winners[0].idx;
      } else if (highlightBest === "min") {
        const minVal = Math.min(...numericEntries.map((e) => e.num));
        const winners = numericEntries.filter((e) => e.num === minVal);
        if (winners.length === 1) bestIndex = winners[0].idx;
      }
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 items-center border-b border-slate-100 py-3.5 px-4 transition-colors hover:bg-slate-50/70">
      {/* Spec Label (Desktop: Col 1, Mobile: Full Header) */}
      <div className="flex items-center gap-2.5 pb-2 md:pb-0 font-medium text-slate-700">
        {Icon && (
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
            <Icon className="h-3.5 w-3.5" />
          </span>
        )}
        <span className="text-sm font-medium text-slate-800">{label}</span>
      </div>

      {/* Car Values (Cols 2, 3, 4) */}
      <div className="col-span-3 grid grid-cols-3 gap-3 md:gap-4">
        {values.map((val, idx) => {
          const isPresent = carsPresent[idx];
          if (!isPresent) {
            return (
              <div
                key={idx}
                className="flex items-center justify-center rounded-xl bg-slate-50/50 py-2 text-center text-xs text-slate-300 italic"
              >
                —
              </div>
            );
          }

          const isWinner = bestIndex === idx;
          const displayVal =
            val == null || val === ""
              ? "-"
              : formatter
              ? formatter(val)
              : `${val}${unit ? ` ${unit}` : ""}`;

          return (
            <div
              key={idx}
              className={`relative flex items-center justify-between rounded-xl px-3 py-2 text-sm transition-all ${
                isWinner
                  ? "bg-emerald-50/80 border border-emerald-200 text-emerald-950 font-semibold shadow-xs"
                  : "bg-white md:bg-transparent text-slate-800 font-medium"
              }`}
            >
              <span className="truncate">{displayVal}</span>
              {isWinner && (
                <span
                  title="Best in comparison"
                  className="flex shrink-0 items-center gap-1 rounded-md bg-emerald-600 px-1.5 py-0.5 text-[10px] font-bold text-white shadow-xs"
                >
                  <Award className="h-3 w-3" /> Best
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
