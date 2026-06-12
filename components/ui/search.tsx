"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (query.trim()) {
      params.set("q", query.trim());
    } else {
      params.delete("q");
    }

    router.push(`/cars${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
    <Field>
      <ButtonGroup>
        <Input
          id="input-button-group"
          placeholder="Search brand, model or variant"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              handleSearch();
            }
          }}
        />
        <Button variant="outline" onClick={handleSearch} type="button">
          Search
        </Button>
      </ButtonGroup>
    </Field>
  );
}