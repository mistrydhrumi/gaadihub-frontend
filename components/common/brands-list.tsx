"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { BRAND_OPTIONS } from "./brand-list"

export function BrandsList() {
    return (
        <Carousel
            opts={{
                align: "start",
            }}
            className="w-full max-w-[12rem] sm:max-w-xs md:max-w-sm"
        >
            <CarouselContent>
                {BRAND_OPTIONS.map((brand) => (
                    <CarouselItem key={brand.value} className="basis-1/4 lg:basis-1/4">
                        <div className="p-1">
                            <Card>
                                <CardContent className="flex aspect-square items-center justify-center p-6">
                                    <span className="text-3xl font-semibold">{brand.label}</span>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}
