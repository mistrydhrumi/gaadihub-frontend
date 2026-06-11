import { Separator } from "@/components/ui/separator";

export default function CarOverview({ car }) {
  if (!car) return null;

  const overviewItems = [
    { label: "Registration Year", value: car.registration_year },
    { label: "Fuel Type", value: car.fuel_type },
    { label: "Km Driven", value: `${car.km_driven.toLocaleString()} km` },
    { label: "Ownership", value: car.ownership },
    { label: "Transmission", value: car.transmission },
    { label: "Seats", value: `${car.seats} seats` },
    { label: "Location", value: car.registration_location },
  ];

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-slate-900">Overview</h2>
        <p className="text-sm text-slate-500">Key details from the selected car.</p>
      </div>

      <div className="flex flex-wrap items-start gap-3 text-sm text-slate-700 md:gap-4">
        {overviewItems.map((item, index) => (
          <div key={item.label} className="flex items-start gap-3">
            <div className="flex min-w-[120px] flex-col gap-1">
              <span className="text-xs uppercase tracking-[0.18em] text-slate-400">
                {item.label}
              </span>
              <span className="font-medium text-slate-900">{item.value}</span>
            </div>

            {index < overviewItems.length - 1 && (
              <Separator orientation="vertical" className="hidden h-10 md:block" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}