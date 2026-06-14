import type { Car } from "@/types/car";
import { Gauge, Zap, Fuel, Users, Cog } from "lucide-react";

export default function CarSpecifications({ car }: { car: Car | null }) {
  if (!car) return null;

  const specifications = [
    { label: "Engine", value: car.engine_cc ? `${car.engine_cc} cc` : "-", icon: Cog },
    { label: "Power", value: car.power ? `${car.power} bhp` : "-", icon: Zap },
    { label: "Mileage", value: car.mileage ? `${car.mileage} km/l` : "-", icon: Gauge },
    { label: "Seats", value: car.seats ? `${car.seats} seats` : "-", icon: Users },
    { label: "Fuel Type", value: car.fuel_type ?? "-", icon: Fuel },
  ];

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-slate-900">Specifications</h2>
        <p className="text-sm text-slate-500">Details fetched from the car record.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {specifications.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                <Icon className="h-4 w-4" />
              </span>
              <p className="mt-3 text-xs uppercase tracking-[0.18em] text-slate-400">
                {item.label}
              </p>
              <p className="mt-1 text-base font-semibold text-slate-900">{item.value}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}