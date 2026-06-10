"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import CheckboxFilter from "./CheckboxFilter";
import RangeFilter from "./RangeFilter";

export default function Filters() {
  const filterCardClass =
    "rounded-xl border border-slate-200 bg-white p-4 shadow-sm";
  const router = useRouter();
  const searchParams = useSearchParams();

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

  function toggleFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    const currentValues = params.getAll(key);

    if (currentValues.includes(value)) {
      const nextValues = currentValues.filter((item) => item !== value);
      params.delete(key);
      nextValues.forEach((item) => params.append(key, item));
    } else {
      params.append(key, value);
    }

    const query = params.toString();

    router.push(query ? `?${query}` : "?", { scroll: false });
  }

  return (
    <div className="space-y-3 rounded-xl p-3 gap-5">
      <section className={filterCardClass}>
        <RangeFilter title="Price Range" min={100000} max={5000000} />
      </section>

      <section className={filterCardClass}>
        <CheckboxFilter
          title="Brand"
          options={filterOptions.brand}
          selectedValues={getSelectedValues("brand")}
          onOptionChange={(option) => toggleFilter("brand", option)}
        />
      </section>

      <section className={filterCardClass}>
        <CheckboxFilter
          title="Fuel Type"
          options={filterOptions.fuelType}
          selectedValues={getSelectedValues("fuelType")}
          onOptionChange={(option) => toggleFilter("fuelType", option)}
        />
      </section>

      <section className={filterCardClass}>
        <CheckboxFilter
          title="Transmission"
          options={filterOptions.transmission}
          selectedValues={getSelectedValues("transmission")}
          onOptionChange={(option) => toggleFilter("transmission", option)}
        />
      </section>

      <section className={filterCardClass}>
        <CheckboxFilter
          title="Body Type"
          options={filterOptions.bodyType}
          selectedValues={getSelectedValues("bodyType")}
          onOptionChange={(option) => toggleFilter("bodyType", option)}
        />
      </section>

      <section className={filterCardClass}>
        <CheckboxFilter
          title="Ownership"
          options={filterOptions.ownership}
          selectedValues={getSelectedValues("ownership")}
          onOptionChange={(option) => toggleFilter("ownership", option)}
        />
      </section>

      <section className={filterCardClass}>
        <RangeFilter title="Registration Year" min={2015} max={2025} />
      </section>

      <section className={filterCardClass}>
        <RangeFilter title="Kilometer Driven" min={0} max={150000} />
      </section>
    </div>
  );
}