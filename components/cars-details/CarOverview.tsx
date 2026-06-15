import { Calendar, Fuel, Gauge, UserCheck, Settings2, Users, MapPin } from "lucide-react";
import type { Car } from "@/types/car";

type Props = {
  car: Car | null;
};

export default function CarOverview({ car }: Props) {
  if (!car) return null;

  const overviewItems = [
    { label: "Registration Year", value: car.registration_year, icon: Calendar },
    { label: "Fuel Type", value: car.fuel_type, icon: Fuel },
    {
      label: "Km Driven",
      value: car.km_driven != null ? `${car.km_driven.toLocaleString()} km` : "-",
      icon: Gauge,
    },
    { label: "Ownership", value: car.ownership, icon: UserCheck },
    { label: "Transmission", value: car.transmission, icon: Settings2 },
    { label: "Seats", value: car.seats != null ? `${car.seats} seats` : "-", icon: Users },
    { label: "Location", value: car.registration_location, icon: MapPin },
  ];

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-slate-900">Overview</h2>
        <p className="text-sm text-slate-500">Key details from the selected car.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {overviewItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-3 sm:p-4"
            >
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                <Icon className="h-4 w-4" />
              </span>
              <div className="flex min-w-0 flex-col gap-0.5">
                <span className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                  {item.label}
                </span>
                <span className="truncate font-medium text-slate-900">
                  {item.value ?? "-"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}