"use client";

import { useEffect, useRef, useState, useCallback, Suspense } from "react";
import { ArrowUp } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/common/header";
import Filters from "@/components/filters/Filters";
import { SortDropdown } from "@/components/sorting/SortDropdown";
import CarList from "@/components/cars/CarList";
import { supabase } from "@/lib/supabase";
import CarListSkeleton from "@/components/skeleton/cars/CarListSkeleton";

const PAGE_SIZE = 10;

export default function Cars() {
  return (
    <Suspense fallback={<CarListSkeleton />}>
      <CarsContent />
    </Suspense>
  );
}

function CarsContent() {
  const searchParams = useSearchParams();
  const [cars, setCars] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const loaderRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);
  const pageRef = useRef(0);

  // ─── Build Supabase query 
  const buildQuery = useCallback(
    (pageIndex: number) => {
      const from = pageIndex * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      let query = supabase.from("cars").select("*");

      const q = searchParams.get("q")?.trim();
      if (q) {
        query = query.or(
          `brand.ilike.%${q}%,model.ilike.%${q}%,variant.ilike.%${q}%`
        );
      }
      const minPrice = searchParams.get("minPrice");
      const maxPrice = searchParams.get("maxPrice");
      if (minPrice) query = query.gte("original_price", Number(minPrice));
      if (maxPrice) query = query.lte("original_price", Number(maxPrice));

      const brands = searchParams.getAll("brand");
      if (brands.length) query = query.in("brand", brands);

      const fuelTypes = searchParams.getAll("fuelType");
      if (fuelTypes.length) query = query.in("fuel_type", fuelTypes);

      const transmissions = searchParams.getAll("transmission");
      if (transmissions.length) query = query.in("transmission", transmissions);

      const bodyTypes = searchParams.getAll("bodyType");
      if (bodyTypes.length) query = query.in("body_type", bodyTypes);

      const ownerships = searchParams.getAll("ownership");
      if (ownerships.length) query = query.in("ownership", ownerships);

      const yearMin = searchParams.get("registrationYearMin");
      const yearMax = searchParams.get("registrationYearMax");
      if (yearMin) query = query.gte("registration_year", Number(yearMin));
      if (yearMax) query = query.lte("registration_year", Number(yearMax));

      const kmMin = searchParams.get("kmMin");
      const kmMax = searchParams.get("kmMax");
      if (kmMin) query = query.gte("km_driven", Number(kmMin));
      if (kmMax) query = query.lte("km_driven", Number(kmMax));

      const sort = searchParams.get("sort");
      if (sort === "price_asc") query = query.order("original_price", { ascending: true });
      else if (sort === "price_desc") query = query.order("original_price", { ascending: false });
      else if (sort === "year_desc") query = query.order("registration_year", { ascending: false });
      else if (sort === "km_asc") query = query.order("km_driven", { ascending: true });
      else query = query.order("created_at", { ascending: false });

      return query.range(from, to);
    },
    [searchParams]
  );

  // ─── Fetch page data safely
  const fetchCars = useCallback(
    async (pageIndex: number, isInitialLoad = false) => {
      if (loadingRef.current) return;
      loadingRef.current = true;
      setLoading(true);

      try {
        const { data, error } = await buildQuery(pageIndex);

        if (error) {
          console.error("Failed to fetch cars:", error);
          return;
        }

        const fetchedData = data ?? [];

        if (fetchedData.length < PAGE_SIZE) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }

        setCars((prev) => (isInitialLoad ? fetchedData : [...prev, ...fetchedData]));
        pageRef.current = pageIndex;

      } catch (err) {
        console.error("Network or parsing error occurred:", err);
      } finally {
        loadingRef.current = false;
        setLoading(false);
      }
    },
    [buildQuery]
  );

  // ─── Triggered whenever user updates filters/search/sorting
  useEffect(() => {
    pageRef.current = 0;
    fetchCars(0, true);
  }, [searchParams, fetchCars]);

  // ─── Infinite Scroll Observer (Fixed dependencies to stop re-trigger loops)
  useEffect(() => {
    const el = loaderRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingRef.current) {
          fetchCars(pageRef.current + 1, false);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, fetchCars]);

  // ─── Back to top handler
  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <Header />

      <main className="container mx-auto px-4 py-6">
        {/* Added items-start to allow the sticky sidebar to move freely inside its parent */}
        <div className="flex items-start gap-6">

          {/* Desktop Sticky Sidebar (FIXED CLASSES) */}
          <aside className="hidden lg:block w-[280px] shrink-0 sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2">
            <Filters />
          </aside>

          <section className="min-w-0 flex-1">
            {/* Top bar */}
            <div className="mb-6 flex flex-wrap items-center gap-3">
              {/* Mobile Filter Button */}
              <div className="lg:hidden shrink-0">
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent("open-filter-drawer"))}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50 active:scale-95"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="4" y1="6" x2="20" y2="6" />
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <line x1="4" y1="18" x2="20" y2="18" />
                    <circle cx="8" cy="6" r="2" fill="white" />
                    <circle cx="16" cy="12" r="2" fill="white" />
                    <circle cx="10" cy="18" r="2" fill="white" />
                  </svg>
                  Filters
                </button>
              </div>

              <div className="flex-1 min-w-0 rounded-xl bg-slate-900 px-4 py-2.5 text-center text-xs font-medium text-white sm:text-sm">
                💳 Used Car Loans Starting at
                <span className="mx-1 font-bold text-green-400">8.5%</span>
                Interest
                <span className="hidden sm:inline mx-2 text-slate-400">|</span>
                <span className="hidden sm:inline">⚡ Instant Approval Available</span>
                <span className="hidden md:inline mx-2 text-slate-400">|</span>
                <span className="hidden md:inline">🛡️ Trusted Dealers</span>
              </div>

              <div className="shrink-0">
                <SortDropdown />
              </div>
            </div>

            {/* Car grid */}
            {loading && cars.length === 0 ? (
              <CarListSkeleton />
            ) : cars.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <p className="text-4xl mb-3">🔍</p>
                <p className="text-lg font-semibold text-slate-700">No cars found</p>
                <p className="text-sm text-slate-500 mt-1">
                  Try adjusting your search or filters
                </p>
              </div>
            ) : (
              <CarList cars={cars} />
            )}

            {/* Infinite scroll sentinel */}
            <div ref={loaderRef} className="mt-8 flex justify-center min-h-[40px]">
              {loading && cars.length > 0 && (
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-slate-600" />
                  Loading more cars…
                </div>
              )}
              {!hasMore && cars.length > 0 && (
                <p className="text-sm text-slate-400">
                  You've seen all {cars.length} cars
                </p>
              )}
            </div>
          </section>
        </div>
      </main>

      {/* Mobile view backdrop/drawer container fallback */}
      <div className="lg:hidden">
        <Filters />
      </div>

      {/* Back to top */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-700 active:scale-95"
          aria-label="Back to top"
        >
          <ArrowUp className="h-4 w-4" />
          Back to top
        </button>
      )}
    </>
  );
} 