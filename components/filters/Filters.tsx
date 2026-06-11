"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CheckboxFilter from "./CheckboxFilter";
import RangeFilter from "./RangeFilter";

export default function Filters() {
  const filterCardClass =
    "rounded-xl border border-slate-200 bg-white p-4 shadow-sm";

  const priceRanges = [
    { label: "Under ₹2 Lakh", min: 0, max: 200000 },
    { label: "₹2 - ₹3 Lakh", min: 200000, max: 300000 },
    { label: "₹3 - ₹5 Lakh", min: 300000, max: 500000 },
    { label: "₹5 - ₹8 Lakh", min: 500000, max: 800000 },
    { label: "₹8 - ₹10 Lakh", min: 800000, max: 1000000 },
    { label: "Above ₹10 Lakh", min: 1000000, max: 5000000 },
  ];

  
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedPriceRanges = getSelectedValues("priceRange");
  const [filterOptions, setFilterOptions] = useState({
    brand: [] as string[],
    fuelType: [] as string[],
    transmission: [] as string[],
    bodyType: [] as string[],
    ownership: [] as string[],
  });

  useEffect(() => {
    fetchFilterOptions();
  }, []);

  async function fetchFilterOptions() {
    const { data, error } = await supabase
      .from("cars")
      .select("brand, fuel_type, transmission, body_type, ownership");

    if (error) {
      console.error("Failed to load filters", error);
      return;
    }

    const unique = (values: (string | null | undefined)[]) =>
      Array.from(new Set(values.filter(Boolean) as string[])).sort((a, b) =>
        a.localeCompare(b)
      );

    setFilterOptions({
      brand: unique(data?.map((item) => item.brand) ?? []),
      fuelType: unique(data?.map((item) => item.fuel_type) ?? []),
      transmission: unique(data?.map((item) => item.transmission) ?? []),
      bodyType: unique(data?.map((item) => item.body_type) ?? []),
      ownership: unique(data?.map((item) => item.ownership) ?? []),
    });
  }


  function getSelectedValues(key: string) {
    return new URLSearchParams(searchParams.toString()).getAll(key);
  }

  function getRangeValue(
    minKey: string,
    maxKey: string,
    minDefault: number,
    maxDefault: number
  ) {
    const params = new URLSearchParams(searchParams.toString());
    const min = Number(params.get(minKey));
    const max = Number(params.get(maxKey));

    return [
      Number.isFinite(min) ? min : minDefault,
      Number.isFinite(max) ? max : maxDefault,
    ] as number[];
  }
  function updatePriceRange(
    label: string,
    checked: boolean,
    min: number,
    max: number
  ) {
    const params = new URLSearchParams(searchParams.toString());

    if (checked) {
      params.append("priceRange", label);

      // Optional:
      params.set("minPrice", String(min));
      params.set("maxPrice", String(max));
    } else {
      const ranges = params
        .getAll("priceRange")
        .filter((item) => item !== label);

      params.delete("priceRange");

      ranges.forEach((range) => {
        params.append("priceRange", range);
      });
    }

    router.push(`?${params.toString()}`, {
      scroll: false,
    });
  }
  function updateCheckboxFilter(key: string, value: string, checked: boolean) {
    const params = new URLSearchParams(searchParams.toString());
    const currentValues = params.getAll(key);

    if (checked) {
      if (!currentValues.includes(value)) {
        params.append(key, value);
      }
    } else {
      const nextValues = currentValues.filter((item) => item !== value);
      params.delete(key);
      nextValues.forEach((item) => params.append(key, item));
    }

    const query = params.toString();
    router.push(query ? `?${query}` : "?", { scroll: false });
  }

  function updateRangeFilter(minKey: string, maxKey: string, value: number[]) {
    const params = new URLSearchParams(searchParams.toString());
    const [min, max] = value;

    if (Number.isFinite(min)) params.set(minKey, String(min));
    else params.delete(minKey);

    if (Number.isFinite(max)) params.set(maxKey, String(max));
    else params.delete(maxKey);

    const query = params.toString();
    router.push(query ? `?${query}` : "?", { scroll: false });
  }

  function clearAllFilters() {
    router.push("/cars", { scroll: false });
  }

  return (
    <div className="space-y-4 rounded-xl p-3 border border-slate-200 bg-white shadow-sm scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100 h-[calc(100vh-80px)] overflow-y-auto fixed">
      <section className={filterCardClass}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">Find your next car</p>
            <h2 className="text-lg font-semibold text-slate-900">Filter Cars</h2>
          </div>
          <button
            type="button"
            onClick={clearAllFilters}
            disabled={!searchParams.toString()}
            className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Clear all filters
          </button>
        </div>
      </section>

      <Accordion defaultValue={['price-range', 'brand', 'fuel-type', 'transmission', 'body-type', 'ownership', 'registration-year', 'kilometer-driven']} className="space-y-3">

        <AccordionItem value="price-range" className={filterCardClass}>
          <AccordionTrigger className="rounded-xl border-none p-0 text-base text-slate-900 hover:no-underline">
            Price Range
          </AccordionTrigger>
          <AccordionContent className="pt-4 space-y-5">
            <RangeFilter
              min={100000}
              max={5000000}
              value={getRangeValue(
                "minPrice",
                "maxPrice",
                100000,
                5000000
              )}
              onValueChange={(value) =>
                updateRangeFilter("minPrice", "maxPrice", value)
              }
            />

            <div>
              <h4 className="mb-3 text-sm font-semibold">
                What is your price range?
              </h4>

              <div className="space-y-3">
                {priceRanges.map((range) => (
                  <div
                    key={range.label}
                    className="flex items-center justify-between"
                  >
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedPriceRanges.includes(range.label)}
                        onChange={(e) =>
                          updatePriceRange(
                            range.label,
                            e.target.checked,
                            range.min,
                            range.max
                          )
                        }
                        className="h-4 w-4 rounded border-slate-300"
                      />

                      <span className="text-sm">
                        {range.label}
                      </span>
                    </label>

                    <span className="text-sm text-slate-500">
                      109
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="brand" className={filterCardClass}>
          <AccordionTrigger className="rounded-xl border-none p-0 text-base text-slate-900 hover:no-underline">
            Brand
          </AccordionTrigger>
          <AccordionContent className="pt-3">
            <CheckboxFilter
              options={filterOptions.brand}
              selectedValues={getSelectedValues("brand")}
              onOptionChange={(option, checked) =>
                updateCheckboxFilter("brand", option, checked)
              }
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="fuel-type" className={filterCardClass}>
          <AccordionTrigger className="rounded-xl border-none p-0 text-base text-slate-900 hover:no-underline">
            Fuel Type
          </AccordionTrigger>
          <AccordionContent className="pt-3">
            <CheckboxFilter
              options={filterOptions.fuelType}
              selectedValues={getSelectedValues("fuelType")}
              onOptionChange={(option, checked) =>
                updateCheckboxFilter("fuelType", option, checked)
              }
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="transmission" className={filterCardClass}>
          <AccordionTrigger className="rounded-xl border-none p-0 text-base text-slate-900 hover:no-underline">
            Transmission
          </AccordionTrigger>
          <AccordionContent className="pt-3">
            <CheckboxFilter
              options={filterOptions.transmission}
              selectedValues={getSelectedValues("transmission")}
              onOptionChange={(option, checked) =>
                updateCheckboxFilter("transmission", option, checked)
              }
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="body-type" className={filterCardClass}>
          <AccordionTrigger className="rounded-xl border-none p-0 text-base text-slate-900 hover:no-underline">
            Body Type
          </AccordionTrigger>
          <AccordionContent className="pt-3">
            <CheckboxFilter
              options={filterOptions.bodyType}
              selectedValues={getSelectedValues("bodyType")}
              onOptionChange={(option, checked) =>
                updateCheckboxFilter("bodyType", option, checked)
              }
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="ownership" className={filterCardClass}>
          <AccordionTrigger className="rounded-xl border-none p-0 text-base text-slate-900 hover:no-underline">
            Ownership
          </AccordionTrigger>
          <AccordionContent className="pt-3">
            <CheckboxFilter
              options={filterOptions.ownership}
              selectedValues={getSelectedValues("ownership")}
              onOptionChange={(option, checked) =>
                updateCheckboxFilter("ownership", option, checked)
              }
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="registration-year" className={filterCardClass}>
          <AccordionTrigger className="rounded-xl border-none p-0 text-base text-slate-900 hover:no-underline">
            Registration Year
          </AccordionTrigger>
          <AccordionContent className="pt-3">
            <RangeFilter
              min={2015}
              max={2025}
              value={getRangeValue(
                "registrationYearMin",
                "registrationYearMax",
                2015,
                2025
              )}
              onValueChange={(value) =>
                updateRangeFilter("registrationYearMin", "registrationYearMax", value)
              }
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="kilometer-driven" className={filterCardClass}>
          <AccordionTrigger className="rounded-xl border-none p-0 text-base text-slate-900 hover:no-underline">
            Kilometer Driven
          </AccordionTrigger>
          <AccordionContent className="pt-3">
            <RangeFilter
              min={0}
              max={1500000}
              value={getRangeValue("kmMin", "kmMax", 0, 1500000)}
              onValueChange={(value) =>
                updateRangeFilter("kmMin", "kmMax", value)
              }
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}