import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Car } from "@/types/car";

export default function CarFeatures({ car }: { car: Car | null }) {
  if (!car) return null;

  const features = Array.isArray(car.features) && car.features.length > 0
    ? car.features
    : ["Brand", "Fuel", "Transmission", "Ownership"];

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Features</h2>
          <p className="text-sm text-slate-500">Highlights pulled from the car data.</p>
        </div>
        {car.badge && (
          <Badge className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700 ring-1 ring-emerald-200">
            {car.badge}
          </Badge>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {features.map((feature) => (
            <Badge
              key={feature}
              variant="outline"
              className="rounded-full border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-700"
            >
              {feature}
            </Badge>
          ))}
        </div>


      </div>
    </section>
  );
}