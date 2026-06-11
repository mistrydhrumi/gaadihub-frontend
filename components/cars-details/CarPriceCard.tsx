import type { Car } from "@/types/car";

export default function CarPriceCard({ car }: { car: Car | null }) {
  if (!car) return null;


  return (
    <aside className="overflow-hidden rounded-3xl border bg-white shadow-sm">
  

  <div className="p-6">
    {/* Title */}
    <h1 className="text-3xl font-bold text-slate-900">
      {car.registration_year} {car.brand} {car.model}
    </h1>

    {/* Variant */}
    <p className="mt-1 text-lg text-slate-600">
      {car.variant}
    </p>

    {/* Specs */}
    <div className="mt-4 flex flex-wrap items-center gap-2 text-base text-slate-600">
      <span>{car.transmission}</span>
      <span>•</span>
      <span>{car.fuel_type}</span>
      <span>•</span>
      <span>{car.ownership}</span>
      <span>•</span>
      <span>{car.km_driven.toLocaleString()} km</span>
    </div>

    {/* Price Card */}
    <div className="mt-6 rounded-2xl bg-slate-200 p-5">
      <div className="flex items-center gap-3">
        <h2 className="text-4xl font-bold">
          ₹{car.discount_price.toLocaleString()}
        </h2>

        <span className="text-lg text-slate-400 line-through">
          ₹{car.original_price.toLocaleString()}
        </span>
      </div>

      <div className="mt-3 inline-flex rounded-lg bg-white px-3 py-2 text-sm text-green-700">
        {Math.round(
          ((car.original_price - car.discount_price) /
            car.original_price) *
            100
        )}
        % lower than original price
      </div>
    </div>

    {/* Location */}
    <div className="mt-6">
      <p className="text-sm text-slate-500">Location</p>
      <p className="font-medium text-slate-900">
        {car.registration_location}
      </p>
    </div>

    {/* Description */}
    {car.description && (
      <div className="mt-6">
        <h3 className="mb-2 text-lg font-semibold">
          Description
        </h3>
        <p className="leading-7 text-slate-600">
          {car.description}
        </p>
      </div>
    )}
  </div>
</aside>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex justify-between border-b border-slate-100 pb-3">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium text-slate-900">{value}</span>
    </div>
  );
}