import CarFilter from "@/components/cars/CarFilter";
import CarList from "@/components/cars/CarList";
import Header from "@/components/common/header";
import { getCars } from "@/services/car.service";

function toArray(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value.filter(Boolean);
  return value ? [value] : [];
}

export default async function Cars({
  searchParams,
}: {
  searchParams: Promise<{
    minPrice?: string;
    maxPrice?: string;
    brand?: string | string[];
    fuelType?: string | string[];
    transmission?: string | string[];
    bodyType?: string | string[];
    ownership?: string | string[];
    registrationYearMin?: string;
    registrationYearMax?: string;
    kmMin?: string;
    kmMax?: string;
  }>;
}) {
  const params = await searchParams;

  const minPrice = Number(params.minPrice);
  const maxPrice = Number(params.maxPrice);
  const registrationYearMin = Number(params.registrationYearMin);
  const registrationYearMax = Number(params.registrationYearMax);
  const kmMin = Number(params.kmMin);
  const kmMax = Number(params.kmMax);

  const cars = await getCars({
    minPrice: Number.isFinite(minPrice) ? minPrice : 100000,
    maxPrice: Number.isFinite(maxPrice) ? maxPrice : 5000000,
    brand: toArray(params.brand),
    fuelType: toArray(params.fuelType),
    transmission: toArray(params.transmission),
    bodyType: toArray(params.bodyType),
    ownership: toArray(params.ownership),
    registrationYearMin: Number.isFinite(registrationYearMin)
      ? registrationYearMin
      : undefined,
    registrationYearMax: Number.isFinite(registrationYearMax)
      ? registrationYearMax
      : undefined,
    kmMin: Number.isFinite(kmMin) ? kmMin : undefined,
    kmMax: Number.isFinite(kmMax) ? kmMax : undefined,
  });

  return (
    <>
      <Header />

      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          <aside className="col-span-3">
            <CarFilter />
          </aside>

          <section className="col-span-9">
            <CarList cars={cars} />
          </section>
        </div>
      </main>
    </>
  );
}