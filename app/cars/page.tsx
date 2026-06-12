import CarFilter from "@/components/cars/CarFilter";
import CarList from "@/components/cars/CarList";
import Header from "@/components/common/header";
import { SortDropdown } from "@/components/sorting/SortDropdown";
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
    sort?: string;
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
    sort: params.sort,
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
            <div className="mb-6 flex items-center justify-between gap-4">
              <div className="flex-1 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white flex justify-center items-center gap-1">
                💳 Used Car Loans Starting at{" "}
                <span className="font-bold text-green-400">8.5%</span> Interest
                <span className="mx-2 text-slate-500">|</span>
                ⚡ Instant Approval Available
                <span className="mx-2 text-slate-500">|</span>
                🛡️ Trusted Dealers
              </div>

              <SortDropdown />
            </div>

            <CarList cars={cars} />
          </section>
        </div>
      </main>
    </>
  );
}