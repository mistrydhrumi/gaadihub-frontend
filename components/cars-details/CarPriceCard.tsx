import type { Car } from "@/types/car";

export default function CarPriceCard({ car }: { car: Car | null }) {
  if (!car) return null;

  const discountPercent = car.original_price
    ? Math.round(
      ((car.original_price - car.discount_price) / car.original_price) * 100
    )
    : 0;

  return (
    <aside className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="p-5 sm:p-6">
        {/* Title */}
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          {car.registration_year} {car.brand} {car.model}
        </h1>

        {/* Variant */}
        <p className="mt-1 text-base text-slate-600 sm:text-lg">{car.variant}</p>

        {/* Specs */}
        <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-600 sm:text-base">
          <span>{car.transmission}</span>
          <span className="text-slate-300">•</span>
          <span>{car.fuel_type}</span>
          <span className="text-slate-300">•</span>
          <span>{car.ownership}</span>
          <span className="text-slate-300">•</span>
          <span>{car.km_driven?.toLocaleString() ?? "-"} km</span>
        </div>

        {/* Price Card */}
        <div className="mt-6 rounded-2xl bg-slate-900 p-5 text-white">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h2 className="text-3xl font-bold sm:text-4xl">
              ₹{car.discount_price.toLocaleString()}
            </h2>

            {car.original_price > car.discount_price && (
              <span className="text-base text-slate-400 line-through sm:text-lg">
                ₹{car.original_price.toLocaleString()}
              </span>
            )}
          </div>

          {discountPercent > 0 && (
            <div className="mt-3 inline-flex items-center rounded-lg bg-emerald-500/15 px-3 py-1.5 text-sm font-medium text-emerald-400">
              {discountPercent}% lower than original price
            </div>
          )}
        </div>

        {/* Location */}
        <div className="mt-6">
          <p className="text-sm text-slate-500">Location</p>
          <p className="font-medium text-slate-900">{car.registration_location}</p>
        </div>

        {/* Description */}
        {car.description && (
          <div className="mt-6">
            <h3 className="mb-2 text-lg font-semibold text-slate-900">Description</h3>
            <p className="text-sm leading-7 text-slate-600 sm:text-base">{car.description}</p>
          </div>
        )}

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button className="flex-1 rounded-xl bg-orange-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-700 sm:text-base">
            Contact Seller
          </button>
          <button className="flex-1 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:text-base">
            Schedule Test Drive
          </button>
        </div>
      </div>
    </aside>
  );
}