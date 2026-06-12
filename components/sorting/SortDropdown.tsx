"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useRouter, useSearchParams } from "next/navigation";
import { SORT_OPTIONS } from "./sort-options";

export function SortDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSort =
    searchParams.get("sort") || "relevance";

  const handleChange = (value: string | null) => {
    if (!value) return;

    const params = new URLSearchParams(searchParams);

    params.set("sort", value);

    router.push(`?${params.toString()}`);
  };

  return (
    <Select
      value={currentSort}
      onValueChange={handleChange}
    >
      <SelectTrigger className="w-[220px]">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>

      <SelectContent>
        {SORT_OPTIONS.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}