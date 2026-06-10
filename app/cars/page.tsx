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
  }>;
}) {
  const params = await searchParams;

  const cars = await getCars({
    minPrice: Number(params.minPrice) || 100000,
    maxPrice: Number(params.maxPrice) || 5000000,
    brand: toArray(params.brand),
    fuelType: toArray(params.fuelType),
    transmission: toArray(params.transmission),
    bodyType: toArray(params.bodyType),
    ownership: toArray(params.ownership),
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