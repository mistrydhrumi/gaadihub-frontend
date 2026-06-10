import { supabase } from "@/lib/supabase";

export async function getCars() {
  const { data, error } = await supabase
    .from("cars")
    .select("*");

  if (error) throw error;

  return data;
}