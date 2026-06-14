"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import { supabase } from "@/lib/supabase";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CheckboxFilter from "./CheckboxFilter";
import RangeFilter from "./RangeFilter";


const PRICE_RANGES = [
  { label: "Under ₹2 Lakh", min: 0, max: 200000 },
  { label: "₹2 – ₹3 Lakh", min: 200000, max: 300000 },
  { label: "₹3 – ₹5 Lakh", min: 300000, max: 500000 },
  { label: "₹5 – ₹8 Lakh", min: 500000, max: 800000 },
  { label: "₹8 – ₹10 Lakh", min: 800000, max: 1000000 },
  { label: "Above ₹10 Lakh", min: 1000000, max: 5000000 },
];

const ALL_ACCORDION_ITEMS = [
  "price-range",
  "brand",
  "fuel-type",
  "transmission",
  "body-type",
  "ownership",
  "registration-year",
  "kilometer-driven",
];


interface FilterOptions {
  brand: string[];
  fuelType: string[];
  transmission: string[];
  bodyType: string[];
  ownership: string[];
}

const EMPTY_OPTIONS: FilterOptions = {
  brand: [],
  fuelType: [],
  transmission: [],
  bodyType: [],
  ownership: [],
};


function getSelectedValues(params: URLSearchParams, key: string): string[] {
  return params.getAll(key);
}

function getRangeValue(
  params: URLSearchParams,
  minKey: string,
  maxKey: string,
  minDefault: number,
  maxDefault: number
): [number, number] {
  const min = Number(params.get(minKey));
  const max = Number(params.get(maxKey));
  return [
    Number.isFinite(min) && min !== 0 ? min : minDefault,
    Number.isFinite(max) && max !== 0 ? max : maxDefault,
  ];
}

function formatPrice(value: number) {
  if (value >= 100000)
    return `₹${(value / 100000).toFixed(1).replace(".0", "")}L`;
  return `₹${value.toLocaleString("en-IN")}`;
}


function FilterSection({
  value,
  label,
  children,
}: {
  value: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <AccordionItem
      value={value}
      className="rounded-xl border border-slate-200 bg-white px-4 py-1 shadow-sm"
    >
      <AccordionTrigger className="border-none p-0 py-3 text-base font-semibold text-slate-900 hover:no-underline">
        {label}
      </AccordionTrigger>
      <AccordionContent className="pb-4 pt-1">{children}</AccordionContent>
    </AccordionItem>
  );
}

/** Title bar with "Clear all" button */
function FilterHeader({
  hasActiveFilters,
  onClear,
}: {
  hasActiveFilters: boolean;
  onClear: () => void;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">
            Find your  car
          </p>
          <h2 className="text-lg font-semibold text-slate-900">Filters</h2>
        </div>
        <button
          type="button"
          onClick={onClear}
          disabled={!hasActiveFilters}
          className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Clear all
        </button>
      </div>
    </div>
  );
}

function PriceRangeFilter({
  selectedLabels,
  sliderValue,
  onSliderChange,
  onCheckboxChange,
}: {
  selectedLabels: string[];
  sliderValue: number[];
  onSliderChange: (value: number[]) => void;
  onCheckboxChange: (
    label: string,
    checked: boolean,
    min: number,
    max: number
  ) => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <div className="mb-1 flex justify-between text-xs text-slate-500">
          <span>{formatPrice(sliderValue[0])}</span>
          <span>{formatPrice(sliderValue[1])}</span>
        </div>
        <RangeFilter
          min={100000}
          max={5000000}
          value={sliderValue}
          onValueChange={onSliderChange}
        />
      </div>

      <div>
        <p className="mb-3 text-sm font-medium text-slate-700">Quick select</p>
        <div className="space-y-2.5">
          {PRICE_RANGES.map((range) => (
            <label
              key={range.label}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-1 py-0.5 transition hover:bg-slate-50"
            >
              <input
                type="checkbox"
                checked={selectedLabels.includes(range.label)}
                onChange={(e) =>
                  onCheckboxChange(
                    range.label,
                    e.target.checked,
                    range.min,
                    range.max
                  )
                }
                className="h-4 w-4 rounded border-slate-300 accent-slate-900"
              />
              <span className="text-sm text-slate-700">{range.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileFilterDrawer({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="absolute bottom-0 left-0 right-0 top-0 flex max-h-full flex-col bg-slate-50 sm:right-auto sm:w-[380px]">
        {/* Drawer header */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
          <h2 className="text-base font-semibold text-slate-900">Filters</h2>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-slate-500 transition hover:bg-slate-100"
            aria-label="Close filters"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable filter content */}
        <div className="flex-1 overflow-y-auto p-4">{children}</div>

        {/* Footer CTA */}
        <div className="shrink-0 border-t border-slate-200 bg-white p-4">
          <button
            onClick={onClose}
            className="w-full rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 active:scale-[0.98]"
          >
            Show Results
          </button>
        </div>
      </div>
    </div>
  );
}

//  Main Component 

export default function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filterOptions, setFilterOptions] =
    useState<FilterOptions>(EMPTY_OPTIONS);

  // Clear stale params on hard reload
  useEffect(() => {
    const nav = performance.getEntriesByType(
      "navigation"
    )[0] as PerformanceNavigationTiming;
    if (nav?.type === "reload") router.replace("/cars");
    fetchFilterOptions();
  }, [router]);

  // Allow the inline mobile trigger button to open this drawer
  useEffect(() => {
    const handler = () => setDrawerOpen(true);
    window.addEventListener("open-filter-drawer", handler);
    return () => window.removeEventListener("open-filter-drawer", handler);
  }, []);

  async function fetchFilterOptions() {
    const { data, error } = await supabase
      .from("cars")
      .select("brand, fuel_type, transmission, body_type, ownership");

    if (error) {
      console.error("Failed to load filters:", error);
      return;
    }

    const unique = (values: (string | null | undefined)[]) =>
      Array.from(new Set(values.filter(Boolean) as string[])).sort((a, b) =>
        a.localeCompare(b)
      );

    setFilterOptions({
      brand: unique(data?.map((d) => d.brand) ?? []),
      fuelType: unique(data?.map((d) => d.fuel_type) ?? []),
      transmission: unique(data?.map((d) => d.transmission) ?? []),
      bodyType: unique(data?.map((d) => d.body_type) ?? []),
      ownership: unique(data?.map((d) => d.ownership) ?? []),
    });
  }


  const params = useCallback(
    () => new URLSearchParams(searchParams.toString()),
    [searchParams]
  );

  const push = useCallback(
    (p: URLSearchParams) => {
      const query = p.toString();
      router.push(query ? `?${query}` : "?", { scroll: false });
    },
    [router]
  );

  function handleCheckboxChange(key: string, value: string, checked: boolean) {
    const p = params();
    const current = p.getAll(key);
    if (checked) {
      if (!current.includes(value)) p.append(key, value);
    } else {
      const next = current.filter((v) => v !== value);
      p.delete(key);
      next.forEach((v) => p.append(key, v));
    }
    push(p);
  }

  function handleRangeChange(minKey: string, maxKey: string, value: number[]) {
    const p = params();
    const [min, max] = value;
    Number.isFinite(min) ? p.set(minKey, String(min)) : p.delete(minKey);
    Number.isFinite(max) ? p.set(maxKey, String(max)) : p.delete(maxKey);
    push(p);
  }

  function handlePriceCheckbox(
    label: string,
    checked: boolean,
    min: number,
    max: number
  ) {
    const p = params();
    const current = p.getAll("priceRange");

    if (checked) {
      if (!current.includes(label)) p.append("priceRange", label);
      // Pre-fill slider only if it hasn't been manually set
      if (!p.get("minPrice") && !p.get("maxPrice")) {
        p.set("minPrice", String(min));
        p.set("maxPrice", String(max));
      }
    } else {
      const next = current.filter((v) => v !== label);
      p.delete("priceRange");
      next.forEach((v) => p.append("priceRange", v));
      // Reset slider when no ranges remain
      if (next.length === 0) {
        p.delete("minPrice");
        p.delete("maxPrice");
      }
    }

    push(p);
  }

  function clearAllFilters() {
    router.push("/cars", { scroll: false });
  }


  const currentParams = new URLSearchParams(searchParams.toString());
  const hasActiveFilters = currentParams.toString().length > 0;
  const priceSliderValue = getRangeValue(
    currentParams,
    "minPrice",
    "maxPrice",
    100000,
    5000000
  );
  const selectedPriceLabels = currentParams.getAll("priceRange");


  const filterTree = (
    <div className="space-y-3">
      <FilterHeader hasActiveFilters={hasActiveFilters} onClear={clearAllFilters} />

      <Accordion
        defaultValue={ALL_ACCORDION_ITEMS}
        className="space-y-3"
      >
        <FilterSection value="price-range" label="Price Range">
          <PriceRangeFilter
            selectedLabels={selectedPriceLabels}
            sliderValue={priceSliderValue}
            onSliderChange={(value) =>
              handleRangeChange("minPrice", "maxPrice", value)
            }
            onCheckboxChange={handlePriceCheckbox}
          />
        </FilterSection>

        <FilterSection value="brand" label="Brand">
          <CheckboxFilter
            options={filterOptions.brand}
            selectedValues={getSelectedValues(currentParams, "brand")}
            onOptionChange={(option, checked) =>
              handleCheckboxChange("brand", option, checked)
            }
          />
        </FilterSection>

        <FilterSection value="fuel-type" label="Fuel Type">
          <CheckboxFilter
            options={filterOptions.fuelType}
            selectedValues={getSelectedValues(currentParams, "fuelType")}
            onOptionChange={(option, checked) =>
              handleCheckboxChange("fuelType", option, checked)
            }
          />
        </FilterSection>

        <FilterSection value="transmission" label="Transmission">
          <CheckboxFilter
            options={filterOptions.transmission}
            selectedValues={getSelectedValues(currentParams, "transmission")}
            onOptionChange={(option, checked) =>
              handleCheckboxChange("transmission", option, checked)
            }
          />
        </FilterSection>

        <FilterSection value="body-type" label="Body Type">
          <CheckboxFilter
            options={filterOptions.bodyType}
            selectedValues={getSelectedValues(currentParams, "bodyType")}
            onOptionChange={(option, checked) =>
              handleCheckboxChange("bodyType", option, checked)
            }
          />
        </FilterSection>

        <FilterSection value="ownership" label="Ownership">
          <CheckboxFilter
            options={filterOptions.ownership}
            selectedValues={getSelectedValues(currentParams, "ownership")}
            onOptionChange={(option, checked) =>
              handleCheckboxChange("ownership", option, checked)
            }
          />
        </FilterSection>

        <FilterSection value="registration-year" label="Registration Year">
          <RangeFilter
            min={2015}
            max={2025}
            value={getRangeValue(
              currentParams,
              "registrationYearMin",
              "registrationYearMax",
              2015,
              2025
            )}
            onValueChange={(value) =>
              handleRangeChange(
                "registrationYearMin",
                "registrationYearMax",
                value
              )
            }
          />
        </FilterSection>

        <FilterSection value="kilometer-driven" label="Kilometer Driven">
          <RangeFilter
            min={0}
            max={150000}
            value={getRangeValue(currentParams, "kmMin", "kmMax", 0, 150000)}
            onValueChange={(value) => handleRangeChange("kmMin", "kmMax", value)}
          />
        </FilterSection>
      </Accordion>
    </div>
  );


  return (
    <>
      {/* Mobile trigger — hidden here; the page renders an inline pill trigger instead */}

      {/* Mobile drawer */}
      <MobileFilterDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        {filterTree}
      </MobileFilterDrawer>

      {/* Desktop sticky sidebar */}
      <div className="hidden lg:block lg:sticky lg:top-24 lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto lg:rounded-xl">
        {filterTree}
      </div>
    </>
  );
}