import Image from "next/image";
import { getElectricCars } from "@/services/car.service";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function ElectricCarsSection() {
    const cars = await getElectricCars(4);

    if (!cars?.length) return null;

    return (
        <section className="container mx-auto px-10 py-12 bg-gray-200">
            <div className="mb-8 flex items-end justify-between">
                <div>
                    <span className="text-m font-bold uppercase tracking-wider text-green-600">
                        Eco Friendly
                    </span>

                    <h2 className="mt-2 text-3xl font-bold text-slate-900">
                        Popular Electric Cars
                    </h2>

                    <p className="mt-3 text-slate-500">
                        Discover the latest electric vehicles available.
                    </p>
                </div>

                <Button variant="ghost" className="text-sm font-medium hover:underline">
                    <Link href="/cars">
                        View All →
                    </Link>
                </Button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {cars.map((car) => (
                    <Link
                        key={car.id}
                        href={`/cars/${car.slug}`}
                        className="block"
                    >
                        <Card className="overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg">
                            <div className="relative ">
                                <img
                                    src={Array.isArray(car.images) ? car.images[0] : car.images}
                                    alt={`${car.brand} ${car.model}`}
                                    className="object-cover"
                                />
                            </div>

                            <CardContent className="space-y-3 p-4">
                                <div>
                                    <h3 className="line-clamp-1 text-lg font-semibold">
                                        {car.brand} {car.model}
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-500">
                                        {car.registration_year} •{" "}
                                        {car.km_driven?.toLocaleString("en-IN")} km
                                    </p>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-xl font-bold text-blue-900">
                                        ₹{car.discount_price?.toLocaleString("en-IN")}
                                    </span>

                                    <Badge>
                                        Electric
                                    </Badge>
                                </div>

                                <Button variant="default" className="w-full gap-2 bg-blue-900 hover:bg-blue-700">
                                    <Link href={`/cars/${car.slug}`}>
                                        View Details
                                    </Link>

                                </Button>
                                <Button variant="outline" className="w-full gap-2">
                                    <Link href="/compare">
                                        Compare
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

    </section>
    );
}