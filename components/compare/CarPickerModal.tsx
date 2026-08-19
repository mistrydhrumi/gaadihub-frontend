"use client";

import { useState, useEffect, useCallback } from "react";
import { X, Search, Car as CarIcon, Loader2, Plus, Fuel, Settings2, Calendar, Gauge } from "lucide-react";
import { searchCarsForCompare } from "@/services/car.service";
import type { Car } from "@/types/car";
import { Button } from "@/components/ui/button";

interface CarPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCar: (car: Car) => void;
  excludeSlugs: string[];
  slotNumber: number;
}

export default function CarPickerModal({
  isOpen,
  onClose,
  onSelectCar,
  excludeSlugs,
  slotNumber,
}: CarPickerModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAvailableCars = useCallback(
    async (query: string) => {
      setLoading(true);
      try {
        const data = await searchCarsForCompare(query, excludeSlugs, 12);
        setCars(data);
      } catch (err) {
        console.error("Failed to search cars:", err);
      } finally {
        setLoading(false);
      }
    },
    [excludeSlugs]
  );

  useEffect(() => {
    if (isOpen) {
      setSearchTerm("");
      fetchAvailableCars("");
    }
  }, [isOpen, fetchAvailableCars]);

  useEffect(() => {
    if (!isOpen) return;
    const timeoutId = setTimeout(() => {
      fetchAvailableCars(searchTerm);
    }, 250);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, isOpen, fetchAvailableCars]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative z-10 flex flex-col w-full max-w-3xl max-h-[85vh] rounded-3xl bg-white shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
              <CarIcon className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Select Car for Slot {slotNumber}
              </h2>
              <p className="text-xs text-slate-500">
                Choose a vehicle to compare with side-by-side specifications
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition cursor-pointer"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="border-b border-slate-100 bg-slate-50/70 p-4 px-6">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by brand, model, or variant (e.g. Creta, Swift, Nexon)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-10 pr-10 text-sm placeholder:text-slate-400 focus:border-orange-500 focus:outline-hidden focus:ring-2 focus:ring-orange-100 transition"
              autoFocus
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Cars List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 text-slate-400">
              <Loader2 className="h-8 w-8 animate-spin text-orange-500 mb-3" />
              <p className="text-sm font-medium">Fetching available vehicles...</p>
            </div>
          ) : cars.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center text-slate-400">
              <CarIcon className="h-12 w-12 text-slate-300 mb-3 stroke-[1.5]" />
              <p className="text-base font-semibold text-slate-700">No cars found</p>
              <p className="text-xs text-slate-400 mt-1 max-w-sm">
                {searchTerm
                  ? `No vehicles matched "${searchTerm}". Try a different model or brand.`
                  : "All available cars are already added to the comparison."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {cars.map((car) => {
                const formattedPrice = (car.discount_price / 100000).toFixed(2);
                return (
                  <div
                    key={car.id || car.slug}
                    onClick={() => {
                      onSelectCar(car);
                      onClose();
                    }}
                    className="group relative flex cursor-pointer flex-col rounded-2xl border border-slate-200 bg-white p-3.5 transition-all duration-200 hover:border-orange-400 hover:bg-orange-50/20 hover:shadow-md"
                  >
                    <div className="flex gap-3">
                      <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                        {car.images?.[0] ? (
                          <img
                            src={car.images[0]}
                            alt={car.model}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-slate-400">
                            <CarIcon className="h-6 w-6" />
                          </div>
                        )}
                        {car.badge && (
                          <span className="absolute bottom-1 left-1 rounded-md bg-black/70 px-1.5 py-0.5 text-[10px] font-medium text-white backdrop-blur-xs">
                            {car.badge}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <h4 className="line-clamp-1 text-sm font-semibold text-slate-900 group-hover:text-orange-600 transition-colors">
                            {car.brand} {car.model}
                          </h4>
                          <p className="line-clamp-1 text-xs text-slate-500">
                            {car.variant || car.registration_location || "Standard"}
                          </p>
                        </div>

                        <div className="flex items-baseline gap-1.5 mt-1">
                          <span className="text-base font-bold text-slate-900">
                            ₹{formattedPrice}L
                          </span>
                          {car.original_price > car.discount_price && (
                            <span className="text-xs text-slate-400 line-through">
                              ₹{(car.original_price / 100000).toFixed(2)}L
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Mini Spec Tags */}
                    <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-2.5 text-[11px] text-slate-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-slate-400" />
                        {car.registration_year}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Fuel className="h-3 w-3 text-slate-400" />
                        {car.fuel_type}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Settings2 className="h-3 w-3 text-slate-400" />
                        {car.transmission}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Gauge className="h-3 w-3 text-slate-400" />
                        {car.km_driven?.toLocaleString()} km
                      </span>
                    </div>

                    <div className="mt-2.5 flex items-center justify-end">
                      <Button
                        size="sm"
                        className="h-7 rounded-xl bg-orange-500 px-3 text-xs font-medium text-white group-hover:bg-orange-600 cursor-pointer"
                      >
                        <Plus className="mr-1 h-3.5 w-3.5" /> Select
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
