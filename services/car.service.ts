import { supabase } from "@/lib/supabase";

export async function getCarById(id: string) {
  const { data, error } = await supabase
    .from("cars")
    .select("*")
    .eq("slug", id)
    .single();

  if (error) throw error;

  return data;
}

export async function getCars(filters?: {
  minPrice?: number;
  maxPrice?: number;
  brand?: string[];
  fuelType?: string[];
  transmission?: string[];
  bodyType?: string[];
  ownership?: string[];
  registrationYearMin?: number;
  registrationYearMax?: number;
  kmMin?: number;
  kmMax?: number;
}) {
  let query = supabase.from("cars").select("*");

  if (filters?.minPrice && filters.minPrice > 0) {
    query = query.gte("discount_price", filters.minPrice);
  }

  if (filters?.maxPrice && filters.maxPrice > 0) {
    query = query.lte("discount_price", filters.maxPrice);
  }

  if (filters?.brand?.length) {
    query = query.in("brand", filters.brand);
  }

  if (filters?.fuelType?.length) {
    query = query.in("fuel_type", filters.fuelType);
  }

  if (filters?.transmission?.length) {
    query = query.in("transmission", filters.transmission);
  }

  if (filters?.bodyType?.length) {
    query = query.in("body_type", filters.bodyType);
  }

  if (filters?.ownership?.length) {
    query = query.in("ownership", filters.ownership);
  }

  if (filters?.registrationYearMin) {
    query = query.gte("registration_year", filters.registrationYearMin);
  }

  if (filters?.registrationYearMax) {
    query = query.lte("registration_year", filters.registrationYearMax);
  }

  if (filters?.kmMin) {
    query = query.gte("km_driven", filters.kmMin);
  }

  if (filters?.kmMax) {
    query = query.lte("km_driven", filters.kmMax);
  }

  const { data, error } = await query;

  if (error) throw error;

  return data;
}