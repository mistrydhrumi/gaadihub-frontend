import { Button } from "@base-ui/react"
import Link from "next/link"
import Image from "next/image"

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-slate-50">

            <div className="relative container mx-auto px-10 py-20">
                <div className="grid items-center gap-10 lg:grid-cols-2">

                    {/* Left Content */}
                    <div className="max-w-xl">
                        <span className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-2 font-bold text-blue-600">
                            Premium Car Rentals
                        </span>

                        <h1 className="text-7xl font-bold leading-tight text-slate-900">
                            Find Your
                            <span className="block text-orange-500">
                                Best Dream Car
                            </span>
                        </h1>

                        <p className="mt-6 text-lg text-slate-700">
                            Trusted car rental services with a wide variety of
                            vehicles. Choose from hatchbacks, sedans, SUVs and
                            luxury cars at affordable prices.
                        </p>

                        <div className="mt-8">
                            <Link href="/cars">
                                <Button className="bg-slate-900 hover:bg-slate-700 rounded-full px-6 py-3 text-white font-medium text-lg cursor-pointer transition-colors">
                                    View All Cars
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Right Side Image */}
                    <div className="flex justify-center lg:justify-end">
                        <div className="relative w-full max-w-xl aspect-[16/9] lg:aspect-auto">
                            <Image
                                src="/images/bg-heo-image.png"
                                alt="Premium Rental Car"
                                width={900}
                                height={500}
                                className="w-full h-auto object-contain "
                                priority
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}