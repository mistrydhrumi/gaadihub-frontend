
import CarCard from "./CarCard";

/**
 * @param {{ cars?: any[] }} props
 */
export default function CarList({ cars = [] }) {
  return (
    <div className="grid grid-cols-3 gap-6 md:grid-cols-3 xl:grid-cols-3">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
}