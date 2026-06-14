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
import Image from "next/image"


export function BrandsList() {

    return (
        <>
            <div className="container mx-auto px-10 py-20">
                <div className="mb-8 text-center">
                    <span className="text-sm font-semibold uppercase tracking-wider text-orange-500">
                        Explore Brands
                    </span>

                    <h2 className="mt-2 text-3xl font-bold text-slate-900">
                        Popular Car Brands
                    </h2>

                    <p className="mt-3 text-slate-500">
                        Browse top automobile brands and find your dream car.
                    </p>
                </div>
                <div className="relative">

                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full "
                    >

                        <CarouselContent>
                            {BRAND_OPTIONS.map((brand) => (
                                <CarouselItem
                                    key={brand.value}
                                    className="basis-1/2 md:basis-1/4 lg:basis-1/6"
                                >
                                    <div className="p-2">
                                        <Card className="transition-all hover:shadow-lg">
                                            <CardContent className="flex h-28 flex-col items-center justify-center gap-2">
                                                <Image
                                                    src={brand.img}
                                                    alt={brand.label}
                                                    width={80}
                                                    height={80}
                                                    className="object-contain"
                                                />

                                                <span className="text-sm font-medium">
                                                    {brand.label}
                                                </span>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-2" />
                        <CarouselNext className="right-2"/>
                    </Carousel>
                </div>
            </div >
        </>
    )
}
