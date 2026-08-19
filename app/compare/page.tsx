"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import CompareSlotCard from "@/components/compare/CompareSlotCard";
import CarPickerModal from "@/components/compare/CarPickerModal";
import CompareSpecRow from "@/components/compare/CompareSpecRow";
import CompareFeatureMatrix from "@/components/compare/CompareFeatureMatrix";
import CompareSummaryVerdict from "@/components/compare/CompareSummaryVerdict";
import { getCarsBySlugs } from "@/services/car.service";
import type { Car } from "@/types/car";
import {
  SlidersHorizontal,
  Trash2,
  Calendar,
  Fuel,
  Gauge,
  UserCheck,
  MapPin,
  Users,
  Cog,
  Zap,
  DollarSign,
  Sparkles,
  ShieldCheck,
  Loader2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ComparePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
        </div>
      }
    >
      <CompareContent />
    </Suspense>
  );
}

function CompareContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [slots, setSlots] = useState<(Car | null)[]>([null, null, null]);
  const [loading, setLoading] = useState(true);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [activeSlotIndex, setActiveSlotIndex] = useState(0);
  const [showOnlyDifferences, setShowOnlyDifferences] = useState(false);

  // Sync selected cars to URL query params
  const updateUrl = useCallback(
    (newSlots: (Car | null)[]) => {
      const activeSlugs = newSlots
        .filter((c): c is Car => Boolean(c))
        .map((c) => c.slug);

      if (activeSlugs.length > 0) {
        router.replace(`/compare?cars=${activeSlugs.join(",")}`, { scroll: false });
      } else {
        router.replace("/compare", { scroll: false });
      }
    },
    [router]
  );

  // Load cars on initial page load from ?cars=slug1,slug2,slug3
  useEffect(() => {
    async function loadInitialCars() {
      const carsParam = searchParams.get("cars");
      if (!carsParam) {
        setLoading(false);
        return;
      }

      const slugs = carsParam
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .slice(0, 3);

      if (slugs.length === 0) {
        setLoading(false);
        return;
      }

      try {
        const fetchedCars = await getCarsBySlugs(slugs);
        const newSlots: (Car | null)[] = [null, null, null];

        // Match order of requested slugs
        slugs.forEach((slug, idx) => {
          const match = fetchedCars.find(
            (c) => c.slug.toLowerCase() === slug.toLowerCase()
          );
          if (match && idx < 3) {
            newSlots[idx] = match;
          }
        });

        setSlots(newSlots);
      } catch (err) {
        console.error("Failed to load compare cars:", err);
      } finally {
        setLoading(false);
      }
    }

    loadInitialCars();
  }, [searchParams]);

  // Handler to open picker modal for a specific slot
  const handleOpenPicker = (slotIndex: number) => {
    setActiveSlotIndex(slotIndex);
    setPickerOpen(true);
  };

  // Handler when car is selected in modal
  const handleSelectCar = (car: Car) => {
    const updated = [...slots];
    updated[activeSlotIndex] = car;
    setSlots(updated);
    updateUrl(updated);
  };

  // Handler to remove a car from a slot
  const handleRemoveCar = (slotIndex: number) => {
    const updated = [...slots];
    updated[slotIndex] = null;
    setSlots(updated);
    updateUrl(updated);
  };

  // Clear all slots
  const handleClearAll = () => {
    setSlots([null, null, null]);
    router.replace("/compare", { scroll: false });
  };

  const activeCars = slots.filter(Boolean) as Car[];
  const carsPresent = slots.map((c) => Boolean(c));
  const excludeSlugs = activeCars.map((c) => c.slug);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Page Hero Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-orange-700">
                Vehicle Matchup
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {activeCars.length} of 3 cars selected
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Compare Cars
            </h1>
            <p className="mt-1.5 text-sm sm:text-base text-slate-500 max-w-xl">
              Compare specs, performance, prices, and features side by side to choose your ideal vehicle.
            </p>
          </div>

          {/* Controls: Difference Toggle & Clear */}
          <div className="flex flex-wrap items-center gap-3">
            {activeCars.length >= 2 && (
              <button
                onClick={() => setShowOnlyDifferences(!showOnlyDifferences)}
                className={`flex items-center gap-2 rounded-2xl border px-4 py-2.5 text-xs font-semibold transition cursor-pointer ${
                  showOnlyDifferences
                    ? "border-orange-500 bg-orange-500 text-white shadow-xs"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                }`}
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                {showOnlyDifferences ? "Showing Differences" : "Highlight Differences"}
              </button>
            )}

            {activeCars.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearAll}
                className="h-10 rounded-2xl border-slate-200 bg-white px-3.5 text-xs font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 cursor-pointer"
              >
                <Trash2 className="mr-1.5 h-3.5 w-3.5" /> Clear All
              </Button>
            )}
          </div>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <Loader2 className="h-10 w-10 animate-spin text-orange-500 mb-4" />
            <p className="text-sm font-medium text-slate-500">
              Loading vehicle specifications...
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Top Row: 3 Comparison Slot Cards */}
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {slots.map((car, idx) => (
                <CompareSlotCard
                  key={idx}
                  slotIndex={idx}
                  car={car}
                  onOpenPicker={handleOpenPicker}
                  onRemoveCar={handleRemoveCar}
                />
              ))}
            </section>

            {/* If no cars are selected, show a quick helper card */}
            {activeCars.length === 0 && (
              <div className="flex flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-xs">
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-orange-50 text-orange-500 mb-4">
                  <Sparkles className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  No Cars Selected Yet
                </h3>
                <p className="max-w-md text-sm text-slate-500 mb-6">
                  Click on the <strong>&quot;+ Add Car&quot;</strong> buttons above or browse our car inventory to select up to 3 cars to compare.
                </p>
                <Link href="/cars">
                  <Button className="rounded-xl bg-orange-500 px-6 font-semibold text-white hover:bg-orange-600 cursor-pointer">
                    Browse All Cars <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            )}

            {/* If 1 or more cars are selected, render full side-by-side spec tables */}
            {activeCars.length > 0 && (
              <div className="space-y-6">
                {/* ─── SECTION 1: Pricing & Financials ─── */}
                <div className="rounded-3xl border border-slate-200 bg-white shadow-xs overflow-hidden">
                  <div className="border-b border-slate-100 bg-slate-50/70 px-6 py-4">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-100 text-orange-700">
                        <DollarSign className="h-4 w-4" />
                      </span>
                      <div>
                        <h2 className="text-base font-bold text-slate-900">
                          Price & Savings Breakdown
                        </h2>
                        <p className="text-xs text-slate-500">
                          Compare discounted upfront costs and estimated values
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="divide-y divide-slate-100">
                    <CompareSpecRow
                      label="Discounted Price"
                      icon={DollarSign}
                      values={slots.map((c) => (c ? c.discount_price : null))}
                      carsPresent={carsPresent}
                      highlightBest="min"
                      formatter={(val) => `₹${(Number(val) / 100000).toFixed(2)} Lakh`}
                      showOnlyDifferences={showOnlyDifferences}
                    />

                    <CompareSpecRow
                      label="Original Ex-Showroom"
                      values={slots.map((c) => (c ? c.original_price : null))}
                      carsPresent={carsPresent}
                      formatter={(val) => `₹${(Number(val) / 100000).toFixed(2)} Lakh`}
                      showOnlyDifferences={showOnlyDifferences}
                    />

                    <CompareSpecRow
                      label="Direct Savings"
                      values={slots.map((c) =>
                        c ? c.original_price - c.discount_price : null
                      )}
                      carsPresent={carsPresent}
                      highlightBest="max"
                      formatter={(val) =>
                        Number(val) > 0
                          ? `₹${Math.round(Number(val) / 1000)}k Discount`
                          : "No Discount"
                      }
                      showOnlyDifferences={showOnlyDifferences}
                    />

                    <CompareSpecRow
                      label="Est. Monthly EMI (approx)"
                      values={slots.map((c) =>
                        c ? Math.round((c.discount_price * 0.8 * 0.022)) : null
                      )}
                      carsPresent={carsPresent}
                      highlightBest="min"
                      formatter={(val) => `~₹${Number(val).toLocaleString()} /mo`}
                      showOnlyDifferences={showOnlyDifferences}
                    />
                  </div>
                </div>

                {/* ─── SECTION 2: Key Specifications & Performance ─── */}
                <div className="rounded-3xl border border-slate-200 bg-white shadow-xs overflow-hidden">
                  <div className="border-b border-slate-100 bg-slate-50/70 px-6 py-4">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-100 text-orange-700">
                        <Zap className="h-4 w-4" />
                      </span>
                      <div>
                        <h2 className="text-base font-bold text-slate-900">
                          Engine & Performance
                        </h2>
                        <p className="text-xs text-slate-500">
                          Power output, displacement, fuel type, and transmission
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="divide-y divide-slate-100">
                    <CompareSpecRow
                      label="Engine Displacement"
                      icon={Cog}
                      values={slots.map((c) => (c ? c.engine_cc : null))}
                      carsPresent={carsPresent}
                      highlightBest="max"
                      unit="cc"
                      showOnlyDifferences={showOnlyDifferences}
                    />

                    <CompareSpecRow
                      label="Max Power"
                      icon={Zap}
                      values={slots.map((c) => (c ? c.power : null))}
                      carsPresent={carsPresent}
                      highlightBest="max"
                      unit="bhp"
                      showOnlyDifferences={showOnlyDifferences}
                    />

                    <CompareSpecRow
                      label="Mileage / Efficiency"
                      icon={Gauge}
                      values={slots.map((c) => (c ? c.mileage : null))}
                      carsPresent={carsPresent}
                      highlightBest="max"
                      unit="km/l"
                      showOnlyDifferences={showOnlyDifferences}
                    />

                    <CompareSpecRow
                      label="Fuel Type"
                      icon={Fuel}
                      values={slots.map((c) => (c ? c.fuel_type : null))}
                      carsPresent={carsPresent}
                      showOnlyDifferences={showOnlyDifferences}
                    />

                    <CompareSpecRow
                      label="Transmission"
                      icon={Cog}
                      values={slots.map((c) => (c ? c.transmission : null))}
                      carsPresent={carsPresent}
                      showOnlyDifferences={showOnlyDifferences}
                    />
                  </div>
                </div>

                {/* ─── SECTION 3: Overview & Vehicle History ─── */}
                <div className="rounded-3xl border border-slate-200 bg-white shadow-xs overflow-hidden">
                  <div className="border-b border-slate-100 bg-slate-50/70 px-6 py-4">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-100 text-orange-700">
                        <Calendar className="h-4 w-4" />
                      </span>
                      <div>
                        <h2 className="text-base font-bold text-slate-900">
                          Overview & Usage History
                        </h2>
                        <p className="text-xs text-slate-500">
                          Registration year, driven distance, and ownership details
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="divide-y divide-slate-100">
                    <CompareSpecRow
                      label="Registration Year"
                      icon={Calendar}
                      values={slots.map((c) => (c ? c.registration_year : null))}
                      carsPresent={carsPresent}
                      highlightBest="max"
                      showOnlyDifferences={showOnlyDifferences}
                    />

                    <CompareSpecRow
                      label="Kilometers Driven"
                      icon={Gauge}
                      values={slots.map((c) => (c ? c.km_driven : null))}
                      carsPresent={carsPresent}
                      highlightBest="min"
                      formatter={(val) => `${Number(val).toLocaleString()} km`}
                      showOnlyDifferences={showOnlyDifferences}
                    />

                    <CompareSpecRow
                      label="Ownership"
                      icon={UserCheck}
                      values={slots.map((c) => (c ? c.ownership : null))}
                      carsPresent={carsPresent}
                      showOnlyDifferences={showOnlyDifferences}
                    />

                    <CompareSpecRow
                      label="Registration City / RTO"
                      icon={MapPin}
                      values={slots.map((c) => (c ? c.registration_location : null))}
                      carsPresent={carsPresent}
                      showOnlyDifferences={showOnlyDifferences}
                    />

                    <CompareSpecRow
                      label="Seating Capacity"
                      icon={Users}
                      values={slots.map((c) => (c ? c.seats : null))}
                      carsPresent={carsPresent}
                      unit="Seats"
                      showOnlyDifferences={showOnlyDifferences}
                    />

                    <CompareSpecRow
                      label="Quality Badge"
                      icon={ShieldCheck}
                      values={slots.map((c) => (c ? c.badge || "Verified" : null))}
                      carsPresent={carsPresent}
                      showOnlyDifferences={showOnlyDifferences}
                    />
                  </div>
                </div>

                {/* ─── SECTION 4: Features Checklist Matrix ─── */}
                <div className="rounded-3xl border border-slate-200 bg-white shadow-xs overflow-hidden">
                  <div className="border-b border-slate-100 bg-slate-50/70 px-6 py-4">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-100 text-orange-700">
                        <Sparkles className="h-4 w-4" />
                      </span>
                      <div>
                        <h2 className="text-base font-bold text-slate-900">
                          Features & Equipment Checklist
                        </h2>
                        <p className="text-xs text-slate-500">
                          Side-by-side verification of comfort, safety, and tech features
                        </p>
                      </div>
                    </div>
                  </div>

                  <CompareFeatureMatrix
                    cars={slots}
                    showOnlyDifferences={showOnlyDifferences}
                  />
                </div>

                {/* ─── SECTION 5: Summary Verdict ─── */}
                <CompareSummaryVerdict cars={slots} />
              </div>
            )}
          </div>
        )}
      </main>

      {/* Car Selection Modal Dialog */}
      <CarPickerModal
        isOpen={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelectCar={handleSelectCar}
        excludeSlugs={excludeSlugs}
        slotNumber={activeSlotIndex + 1}
      />

      <Footer />
    </div>
  );
}