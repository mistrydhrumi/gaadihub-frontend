// import Image from "next/image";
import Link from "next/link";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Badge } from "../ui/badge";

export default function CarCard({ car }: any) {
    return (
        <Link href={`/cars/${car.slug}`}>
            <Card className="relative overflow-hidden cursor-pointer transition hover:shadow-lg">
                <img
                    src={car.images?.[0]}
                    alt={car.model}
                    width={500}
                    height={300}
                    className="w-full h-52 object-cover border-b-gray-200"
                />
                <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-3">
                        <h3 className="text-lg font-semibold leading-tight">
                            {car.brand} {car.model}
                        </h3>
                        <Badge
                            variant="default"
                            className="rounded-full px-2.5 py-1 text-xs font-medium shadow-md"
                        >
                            {car.badge}
                        </Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
                        <Badge variant="outline" className="rounded-full px-2.5 py-1">
                            {car.registration_year}
                        </Badge>
                        <Badge variant="outline" className="rounded-full px-2.5 py-1">
                            {car.fuel_type}
                        </Badge>
                        <Badge variant="outline" className="rounded-full px-2.5 py-1">
                            {car.transmission}
                        </Badge>
                        <Badge variant="outline" className="rounded-full px-2.5 py-1">
                            {car.km_driven.toLocaleString()} km
                        </Badge>
                    </div>
                    <div className="mt-3">
                        <span className="text-xl font-bold">
                            ₹{car.discount_price.toLocaleString()}
                        </span>

                        <span className="line-through ml-2 text-gray-400">
                            ₹{car.original_price.toLocaleString()}
                        </span>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}