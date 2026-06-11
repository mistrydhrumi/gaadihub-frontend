
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import type { Car } from "@/types/car";

export default function CarImageCarousel({ car }: { car: Car | null }) {
    const images = car?.images.filter(Boolean) ?? [];

    return (
        <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
          <div className="relative w-full overflow-hidden rounded-2xl border border-slate-100 bg-slate-100">
        <Carousel className="w-full" >
            <CarouselContent>
                {images.map((image, index) => (
                    <CarouselItem key={`${image}-${index}`}>
                        <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-sm">
                            <img
                                src={image}
                                alt={car?.model ?? "Car image"}
                                className="h-full w-full object-cover md:h-64"
                            />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>

            <CarouselPrevious className="left-3 top-1/2 -translate-y-1/2 bg-white/90 text-slate-700 shadow-md hover:bg-white" />
            <CarouselNext className="right-3 top-1/2 -translate-y-1/2 bg-white/90 text-slate-700 shadow-md hover:bg-white" />
        </Carousel>

        {images.length > 0 && (
          <div className="absolute bottom-4 right-4 rounded-full bg-black/75 px-3 py-1 text-sm font-medium text-white shadow-lg backdrop-blur-sm">
            {images.length} Photos
          </div>
        )}
          </div>
        </section>
    );
}