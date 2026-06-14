import CarCard from "./CarCard";
import NoCarsFound from "../common/NoCarsFound";
import type { Car } from "@/types/car";

interface CarListProps {
  cars: Car[];
}

export default function CarList({ cars }: CarListProps) {
  return (
    <>
      {cars.length === 0 ? (
        <NoCarsFound />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </>
  );
}