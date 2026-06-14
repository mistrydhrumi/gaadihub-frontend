import Link from "next/link";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ThumbsUp } from "lucide-react";
import { ThumbsDown } from "lucide-react";

export default function CarCard({ car }: any) {
    return (
        <Link href={`/cars/${car.slug}`}>
            <Card className="relative  overflow-hidden cursor-pointer transition hover:shadow-lg">
                <img
                    src={car.images?.[0]}
                    alt={car.model}
                    width={500}
                    height={300}
                    className="w-full h-52 object-cover border-b-gray-200 transition duration-300 hover:scale-105"
                />
                <Badge
                    variant="secondary"
                    className="rounded-full px-2.5 py-1 text-xs font-medium shadow-md absolute top-2 right-2"
                >
                    {car.badge}
                </Badge>
                <CardContent className="p-4">
                    <div className="flex flex-row items-start justify-between gap-3">
                        <h3 className=" line-clamp-1 text-base sm:text-lg font-semibold">
                            {car.brand} {car.model}
                        </h3>
                        <div className="shrink-0 text-right overflow-hidden">
                            <div className="flex flex-col items-end">
                                <div className="flex items-center gap-1">
                                    <span className="text-sm font-medium text-green-600">
                                        Save ₹
                                        {(
                                            (car.original_price - car.discount_price) /
                                            1000
                                        ).toFixed(0)}
                                        K
                                    </span>

                                    <span className="text-sm text-slate-400 line-through">
                                        ₹{(car.original_price / 100000).toFixed(2)}L
                                    </span>
                                </div>

                                <p className="text-2xl font-bold text-slate-900 leading-none">
                                    ₹{(car.discount_price / 100000).toFixed(2)}L
                                </p>
                            </div>
                        </div>
                    </div>


                    <div className="mt-3 flex flex-wrap gap-2 text-sm text-slate-600">
                        <Badge variant="outline" className="text-xs rounded-full px-2.5 py-1">
                            {car.km_driven.toLocaleString()} kms
                        </Badge>
                        <Badge variant="outline" className="text-xs rounded-full px-2.5 py-1">
                            {car.transmission}
                        </Badge>
                        <Badge variant="outline" className="text-xs rounded-full px-2.5 py-1">
                            {car.fuel_type}
                        </Badge>
                        <Badge variant="outline" className="text-xs rounded-full px-2.5 py-1">
                            {car.registration_year}
                        </Badge>
                    </div>
                    <div className="mt-3">
                        <Button className="h-11 w-full bg-slate-900 text-white cursor-pointer">
                            Book Now
                        </Button>
                        <Button variant="outline" className="w-full mt-2 gap-2">
                            compare
                        </Button>
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-2 pt-2 text-sm text-slate-500 border-t ">
                        <p className="text-xs">Is this car a good match for you?</p>
                        <div className="flex items-center gap-2">
                            <ThumbsUp className="w-4 h-4 cursor-pointer hover:text-green-500 transition" /> <span>Yes</span>
                            <ThumbsDown className="w-4 h-4 cursor-pointer hover:text-red-500 transition" /> <span>No</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}