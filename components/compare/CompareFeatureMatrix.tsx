"use client";

import { Check, X, Sparkles } from "lucide-react";
import type { Car } from "@/types/car";

interface CompareFeatureMatrixProps {
  cars: (Car | null)[];
  showOnlyDifferences?: boolean;
}

export default function CompareFeatureMatrix({
  cars,
  showOnlyDifferences = false,
}: CompareFeatureMatrixProps) {
  // Collect union of all features
  const allFeaturesSet = new Set<string>();
  cars.forEach((car) => {
    if (car && Array.isArray(car.features)) {
      car.features.forEach((f) => {
        if (f && typeof f === "string" && f.trim()) {
          allFeaturesSet.add(f.trim());
        }
      });
    }
  });

  const allFeatures = Array.from(allFeaturesSet).sort();

  if (allFeatures.length === 0) {
    return (
      <div className="py-8 text-center text-sm text-slate-400">
        No specific feature checklists listed for the selected vehicles.
      </div>
    );
  }

  const carsPresent = cars.map((c) => Boolean(c));
  const activeCount = carsPresent.filter(Boolean).length;

  return (
    <div className="divide-y divide-slate-100">
      {allFeatures.map((feature) => {
        const statuses = cars.map((car) => {
          if (!car) return null;
          const has = car.features?.some(
            (f) => f.toLowerCase() === feature.toLowerCase()
          );
          return Boolean(has);
        });

        const activeStatuses = statuses.filter((s) => s !== null) as boolean[];

        // Check if all active cars have the exact same status for this feature
        const isSame =
          activeCount > 1 &&
          activeStatuses.length > 1 &&
          activeStatuses.every((s) => s === activeStatuses[0]);

        if (showOnlyDifferences && isSame) {
          return null;
        }

        return (
          <div
            key={feature}
            className="grid grid-cols-1 md:grid-cols-4 items-center py-3 px-4 transition-colors hover:bg-slate-50/70"
          >
            {/* Feature Name */}
            <div className="flex items-center gap-2.5 pb-2 md:pb-0 text-sm font-medium text-slate-800">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
                <Sparkles className="h-3 w-3" />
              </span>
              <span>{feature}</span>
            </div>

            {/* Statuses for Car 1, 2, 3 */}
            <div className="col-span-3 grid grid-cols-3 gap-3 md:gap-4">
              {statuses.map((status, idx) => {
                if (status === null) {
                  return (
                    <div
                      key={idx}
                      className="flex items-center justify-center py-1.5 text-center text-xs text-slate-300"
                    >
                      —
                    </div>
                  );
                }

                return (
                  <div key={idx} className="flex items-center gap-2 px-2 py-1">
                    {status ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
                        <Check className="h-3.5 w-3.5 stroke-[2.5]" /> Yes
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-400">
                        <X className="h-3.5 w-3.5 text-slate-400" /> No
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
