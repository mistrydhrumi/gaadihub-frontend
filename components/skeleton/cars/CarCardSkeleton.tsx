import { Skeleton } from "@/components/ui/skeleton";

export default function CarCardSkeleton() {
  return (
    <div className="border rounded-xl overflow-hidden">
      <Skeleton className="h-52 w-full" />

      <div className="p-4 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />

        <div className="flex gap-2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-16" />
        </div>
      </div>
    </div>
  );
}