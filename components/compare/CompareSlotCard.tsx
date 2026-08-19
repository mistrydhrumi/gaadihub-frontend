"use client";

import Link from "next/link";
import { Plus, X, ArrowLeftRight, Car as CarIcon, ExternalLink } from "lucide-react";
import type { Car } from "@/types/car";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CompareSlotCardProps {
  slotIndex: number;
  car: Car | null;
  onOpenPicker: (slotIndex: number) => void;
  onRemoveCar: (slotIndex: number) => void;
}

export default function CompareSlotCard({
  slotIndex,
  car,
  onOpenPicker,
  onRemoveCar,
}: CompareSlotCardProps) {
  if (!car) {
    return (
      <div className="flex h-full min-h-[340px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50/60 p-6 text-center transition-all hover:border-orange-300 hover:bg-orange-50/20">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-xs border border-slate-200 text-orange-600 mb-4">
          <CarIcon className="h-7 w-7 stroke-[1.5]" />
        </div>
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
          Slot {slotIndex + 1}
        </span>
        <h3 className="text-base font-bold text-slate-800 mb-1">
          Add Car to Compare
        </h3>
        <p className="text-xs text-slate-500 max-w-[200px] mb-5">
          Select a vehicle from our collection to compare full specs side by side.
        </p>
        <Button
          onClick={() => onOpenPicker(slotIndex)}
          className="rounded-xl bg-orange-500 text-white hover:bg-orange-600 shadow-sm cursor-pointer"
        >
          <Plus className="mr-1.5 h-4 w-4" /> Add Car
        </Button>
      </div>
    );
  }

  const discountPriceLakh = (car.discount_price / 100000).toFixed(2);
  const originalPriceLakh = (car.original_price / 100000).toFixed(2);
  const savings = Math.round((car.original_price - car.discount_price) / 1000);

  return (
    <div className="group relative flex h-full flex-col justify-between rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
      {/* Top Floating Actions */}
      <div className="absolute right-3 top-3 z-10 flex items-center gap-1.5">
        <button
          onClick={() => onOpenPicker(slotIndex)}
          title="Change / Swap Car"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-600 shadow-sm backdrop-blur-xs hover:bg-orange-50 hover:text-orange-600 transition cursor-pointer"
        >
          <ArrowLeftRight className="h-4 w-4" />
        </button>
        <button
          onClick={() => onRemoveCar(slotIndex)}
          title="Remove Car"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-600 shadow-sm backdrop-blur-xs hover:bg-red-50 hover:text-red-600 transition cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div>
        {/* Car Image with Badge */}
        <div className="relative h-44 w-full overflow-hidden rounded-2xl bg-slate-100 mb-3.5">
          {car.images?.[0] ? (
            <img
              src={car.images[0]}
              alt={`${car.brand} ${car.model}`}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-slate-400">
              <CarIcon className="h-10 w-10" />
            </div>
          )}
          {car.badge && (
            <Badge className="absolute bottom-2.5 left-2.5 rounded-full bg-orange-500/90 text-white font-medium text-xs backdrop-blur-xs border-0">
              {car.badge}
            </Badge>
          )}
          <span className="absolute top-2.5 left-2.5 rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-xs">
            Slot {slotIndex + 1}
          </span>
        </div>

        {/* Title & Variant */}
        <div className="mb-2.5">
          <h3 className="line-clamp-1 text-lg font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
            {car.brand} {car.model}
          </h3>
          <p className="line-clamp-1 text-xs text-slate-500">
            {car.variant || car.registration_location || "Standard Edition"}
          </p>
        </div>

        {/* Price & Savings */}
        <div className="mb-4 rounded-2xl bg-slate-50 p-3 border border-slate-100">
          <div className="flex items-baseline justify-between">
            <span className="text-xl font-extrabold text-slate-900">
              ₹{discountPriceLakh} Lakh
            </span>
            {savings > 0 && (
              <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                Save ₹{savings}k
              </span>
            )}
          </div>
          {car.original_price > car.discount_price && (
            <p className="mt-0.5 text-xs text-slate-400 line-through">
              Original ₹{originalPriceLakh} Lakh
            </p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <Link href={`/cars/${car.slug}`} target="_blank" className="w-full">
          <Button
            variant="outline"
            className="w-full rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer h-9"
          >
            <ExternalLink className="mr-1.5 h-3.5 w-3.5" /> View Details
          </Button>
        </Link>
      </div>
    </div>
  );
}
