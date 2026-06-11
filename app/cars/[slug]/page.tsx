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

export default function CarDetailsPage() {
  const params = useParams();
  const id = params.slug as string;

  const [car, setCar] = useState<Car | null>(null);

  async function fetchCar() {
    try {
      setCar(await getCarById(id));
    } catch {
      notFound();
    }
  }
  useEffect(() => {
    fetchCar();
  }, []);

  return (
    <>
      <Header />
      <div className="container mx-auto py-10 px-8">


        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">


          {/* Left Side */}
          <div className="lg:col-span-8 space-y-6">
            <CarImageCarousel car={car} />
            <CarOverview car={car} />
            <CarFeatures car={car} />
            <CarSpecifications car={car} />
            <EmiCalculator car={car} />
          </div>

          {/* Right Side */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <CarPriceCard car={car} />
            </div>
          </div>

        </div>
      </div>
    </>
  );
}