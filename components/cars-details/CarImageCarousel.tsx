
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

export default function CarImageCarousel() {
    return (
        <Carousel className="w-full max-w-xl ">
            <CarouselContent>
                {[1, 2, 3, 4].map((item) => (
                    <CarouselItem key={item}>
                        <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                            Image {item}
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>

            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
}