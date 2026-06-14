import CarCardSkeleton from "./CarCardSkeleton";

export default function CarListSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 9 }).map((_, index) => (
        <CarCardSkeleton key={index} />
      ))}
    </div>
  );
}