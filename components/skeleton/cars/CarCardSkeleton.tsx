import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function CarCardSkeleton() {
  return (
    <Card className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
      {/* Image */}
      <Skeleton className="h-52 w-full rounded-none" />

      <CardContent className="p-4">
        {/* Badge */}
        <Skeleton className="mb-4 h-6 w-20 rounded-full" />

        {/* Title */}
        <Skeleton className="mb-2 h-6 w-3/4" />

        {/* Location */}
        <div className="mb-4 flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-28" />
        </div>

        {/* Price Section */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <Skeleton className="mb-2 h-4 w-20" />
            <Skeleton className="h-7 w-28" />
          </div>

          <Skeleton className="h-8 w-20 rounded-full" />
        </div>

        {/* Specs */}
        <div className="mb-4 flex flex-wrap gap-2">
          <Skeleton className="h-7 w-20 rounded-full" />
          <Skeleton className="h-7 w-24 rounded-full" />
          <Skeleton className="h-7 w-20 rounded-full" />
          <Skeleton className="h-7 w-16 rounded-full" />
        </div>

        {/* Buttons */}
        <Skeleton className="mb-2 h-11 w-full rounded-lg" />
        <Skeleton className="h-11 w-full rounded-lg" />

        {/* Footer */}
        <div className="mt-4 border-t pt-3">
          <Skeleton className="mb-2 h-4 w-40" />
          <div className="flex gap-3">
            <Skeleton className="h-4 w-10" />
            <Skeleton className="h-4 w-10" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}