"use client";
import CarFeatures from "@/components/cars-details/CarFeatures";
import CarImageCarousel from "@/components/cars-details/CarImageCarousel";
import CarOverview from "@/components/cars-details/CarOverview";
import CarPriceCard from "@/components/cars-details/CarPriceCard";
import CarSpecifications from "@/components/cars-details/CarSpecifications";
import EmiCalculator from "@/components/cars-details/EmiCalculator";
import Header from "@/components/common/header";
import { getCarById } from "@/services/car.service";
import { notFound } from "next/navigation";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Car } from "@/types/car";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";


export default function CarDetailsPage() {
  const params = useParams();
  const id = params.slug as string;

  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchCar() {
    try {
      setCar(await getCarById(id));
    } catch {
      notFound();
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchCar();
  }, []);

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">

        <Link
          href="/cars"
          className="inline-flex items-center gap-2 text-lg font-medium text-slate-900 hover:text-blue-900 transition-colors mb-4"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Used Cars
        </Link>
        {loading ? (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="order-2 space-y-6 lg:order-1 lg:col-span-8">
              <div className="aspect-[4/3] animate-pulse rounded-3xl bg-slate-100 sm:aspect-[16/10] lg:aspect-[16/9]" />
              <div className="h-40 animate-pulse rounded-3xl bg-slate-100" />
              <div className="h-32 animate-pulse rounded-3xl bg-slate-100" />
              <div className="h-40 animate-pulse rounded-3xl bg-slate-100" />
            </div>
            <div className="order-1 lg:order-2 lg:col-span-4">
              <div className="h-96 animate-pulse rounded-3xl bg-slate-100" />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">

            {/* Right Side / Price Card - shown first on mobile */}
            <div className="order-1 lg:order-2 lg:col-span-4">
              <div className="lg:sticky lg:top-24">
                <CarPriceCard car={car} />
              </div>
            </div>

            {/* Left Side */}
            <div className="order-2 space-y-6 lg:order-1 lg:col-span-8">
              <CarImageCarousel car={car} />
              <CarOverview car={car} />
              <CarFeatures car={car} />
              <CarSpecifications car={car} />
              <EmiCalculator car={car} />
            </div>

          </div>
        )}
      </div>
    </>
  );
}