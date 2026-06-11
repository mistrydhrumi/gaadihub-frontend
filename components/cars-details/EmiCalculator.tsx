"use client";

import { useMemo, useState } from "react";
import { Slider } from "@/components/ui/slider";
import type { Car } from "@/types/car";

export default function EmiCalculator({ car }: { car: Car | null }) {
  const [tenureMonths, setTenureMonths] = useState(36);

  const emiDetails = useMemo(() => {
    if (!car) return null;

    const principal = Number(car.original_price || 0);
    const annualRate = 9.5;
    const monthlyRate = annualRate / 12 / 100;
    const months = tenureMonths;

    if (!principal || !months || monthlyRate <= 0) {
      return { emi: 0, totalPayable: 0, totalInterest: 0 };
    }

    const factor = Math.pow(1 + monthlyRate, months);
    const emi = (principal * monthlyRate * factor) / (factor - 1);
    const totalPayable = emi * months;
    const totalInterest = totalPayable - principal;

    return {
      emi,
      totalPayable,
      totalInterest,
    };
  }, [car, tenureMonths]);

  if (!car) return null;

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-slate-900">EMI Calculator</h2>
        <p className="text-sm text-slate-500">
          Estimated monthly EMI based on the car’s original price.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl bg-slate-50 p-5">
          <p className="text-sm text-slate-500">Loan amount</p>
          <p className="mt-1 text-3xl font-semibold text-slate-900">
            ₹{Number(car.original_price || 0).toLocaleString()}
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Interest rate: 9.5% per annum
          </p>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="text-sm text-slate-500">Tenure</p>
                <p className="text-xl font-semibold text-slate-900">{tenureMonths} months</p>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm text-emerald-700 ring-1 ring-emerald-200">
                {Math.round(tenureMonths / 12)} years
              </span>
            </div>

            <div className="mt-4">
              <Slider
                min={12}
                max={60}
                step={1}
                value={[tenureMonths]}
                onValueChange={(value) => setTenureMonths(Array.isArray(value) ? value[0] ?? 12 : value)}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-slate-900 p-5 text-white">
          <p className="text-sm text-slate-300">EMI per month</p>
          <p className="mt-2 text-4xl font-semibold">
            ₹{emiDetails?.emi ? Math.round(emiDetails.emi).toLocaleString() : "0"}
          </p>

          <div className="mt-6 space-y-3 text-sm text-slate-200">
            <div className="flex items-center justify-between rounded-2xl bg-white/8 px-4 py-3">
              <span>Total payable</span>
              <strong className="text-white">
                ₹{emiDetails?.totalPayable ? Math.round(emiDetails.totalPayable).toLocaleString() : "0"}
              </strong>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-white/8 px-4 py-3">
              <span>Total interest</span>
              <strong className="text-white">
                ₹{emiDetails?.totalInterest ? Math.round(emiDetails.totalInterest).toLocaleString() : "0"}
              </strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}