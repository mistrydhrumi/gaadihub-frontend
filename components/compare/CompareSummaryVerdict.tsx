"use client";

import { Award, Zap, Fuel, DollarSign, Gauge, CheckCircle2 } from "lucide-react";
import type { Car } from "@/types/car";

interface CompareSummaryVerdictProps {
  cars: (Car | null)[];
}

export default function CompareSummaryVerdict({ cars }: CompareSummaryVerdictProps) {
  const activeCars = cars.filter(Boolean) as Car[];

  if (activeCars.length < 2) return null;

  // Compute highlights
  const minPrice = Math.min(...activeCars.map((c) => c.discount_price));
  const maxPower = Math.max(...activeCars.map((c) => c.power || 0));
  const maxMileage = Math.max(...activeCars.map((c) => c.mileage || 0));
  const minKm = Math.min(...activeCars.map((c) => c.km_driven || Infinity));
  const maxYear = Math.max(...activeCars.map((c) => c.registration_year || 0));

  return (
    <div className="rounded-3xl border border-orange-200/80 bg-gradient-to-br from-orange-50/60 via-white to-amber-50/40 p-6 shadow-xs sm:p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-sm">
          <Award className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            GaadiHub Comparison Verdict
          </h2>
          <p className="text-xs text-slate-500">
            Quick takeaway on which car stands out in each category
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {cars.map((car, idx) => {
          if (!car) {
            return (
              <div
                key={idx}
                className="flex items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white/50 p-6 text-center text-xs text-slate-400"
              >
                Slot {idx + 1} is empty
              </div>
            );
          }

          const tags: { text: string; icon: any }[] = [];

          if (car.discount_price === minPrice) {
            tags.push({ text: "Most Affordable", icon: DollarSign });
          }
          if (car.power && car.power === maxPower && maxPower > 0) {
            tags.push({ text: "Maximum Power", icon: Zap });
          }
          if (car.mileage && car.mileage === maxMileage && maxMileage > 0) {
            tags.push({ text: "Best Mileage", icon: Fuel });
          }
          if (car.km_driven && car.km_driven === minKm) {
            tags.push({ text: "Lowest Odometer", icon: Gauge });
          }
          if (car.registration_year && car.registration_year === maxYear) {
            tags.push({ text: "Newest Model Year", icon: CheckCircle2 });
          }

          return (
            <div
              key={car.slug || idx}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition hover:shadow-md"
            >
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-orange-600">
                  Slot {idx + 1}
                </span>
                <h4 className="text-base font-bold text-slate-900 mt-0.5">
                  {car.brand} {car.model}
                </h4>
                <p className="text-xs text-slate-500 mb-3">
                  ₹{(car.discount_price / 100000).toFixed(2)} Lakh • {car.fuel_type} • {car.transmission}
                </p>

                <div className="space-y-2 mt-4">
                  {tags.length > 0 ? (
                    tags.map((t, tIdx) => {
                      const TagIcon = t.icon;
                      return (
                        <div
                          key={tIdx}
                          className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800"
                        >
                          <TagIcon className="h-4 w-4 text-orange-500 shrink-0" />
                          <span>{t.text}</span>
                        </div>
                      );
                    })
                  ) : (
                    <div className="rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-600 font-medium">
                      Balanced all-rounder in this comparison
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
