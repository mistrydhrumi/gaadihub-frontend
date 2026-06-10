import { Skeleton } from "@/components/ui/skeleton";

export default function FilterSkeleton() {
  return (
    <div className="border rounded-xl p-5 space-y-6">
      <Skeleton className="h-6 w-28" />

      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="space-y-3">
          <Skeleton className="h-5 w-24" />

          <Skeleton className="h-4 w-full" />

          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}