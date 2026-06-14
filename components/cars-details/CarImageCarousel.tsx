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
        <section className="rounded-3xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4 md:p-5">
            <div className="relative w-full overflow-hidden rounded-2xl border border-slate-100 bg-slate-100">
                <Carousel className="w-full">
                    <CarouselContent>
                        {images.length > 0 ? (
                            images.map((image, index) => (
                                <CarouselItem key={`${image}-${index}`}>
                                    <div className="aspect-[4/3] w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-sm sm:aspect-[16/10] lg:aspect-[16/9]">
                                        <img
                                            src={image}
                                            alt={car?.model ?? "Car image"}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                </CarouselItem>
                            ))
                        ) : (
                            <CarouselItem>
                                <div className="flex aspect-[4/3] w-full items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-sm text-slate-400 sm:aspect-[16/10] lg:aspect-[16/9]">
                                    No images available
                                </div>
                            </CarouselItem>
                        )}
                    </CarouselContent>

                    {images.length > 1 && (
                        <>
                            <CarouselPrevious className="left-2 top-1/2 -translate-y-1/2 bg-white/90 text-slate-700 shadow-md hover:bg-white sm:left-3" />
                            <CarouselNext className="right-2 top-1/2 -translate-y-1/2 bg-white/90 text-slate-700 shadow-md hover:bg-white sm:right-3" />
                        </>
                    )}
                </Carousel>

                {images.length > 0 && (
                    <div className="absolute bottom-3 right-3 rounded-full bg-black/75 px-2.5 py-1 text-xs font-medium text-white shadow-lg backdrop-blur-sm sm:bottom-4 sm:right-4 sm:px-3 sm:text-sm">
                        {images.length} Photos
                    </div>
                )}
            </div>
        </section>
    );
}