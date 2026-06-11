import { Separator } from "@/components/ui/separator";
import type { Car } from "@/types/car";

export default function CarSpecifications({ car }: { car: Car | null }) {
  if (!car) return null;

  const specifications = [
    { label: "Engine CC", value: `${car.engine_cc ?? "-"} cc` },
    { label: "Power", value: `${car.power ?? "-"} bhp` },
    { label: "Mileage", value: `${car.mileage ?? "-"} km/l` },
    { label: "Seats", value: `${car.seats ?? "-"} seats` },
    { label: "Fuel Type", value: car.fuel_type ?? "-" },
  ];

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-slate-900">Specifications</h2>
        <p className="text-sm text-slate-500">Details fetched from the car record.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {specifications.map((item, index) => (
          <div
            key={item.label}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
          >
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{item.label}</p>
            <p className="mt-1 text-base font-semibold text-slate-900">{item.value}</p>
            {index < specifications.length - 1 && (
              <Separator orientation="horizontal" className="mt-3 block sm:hidden" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}   