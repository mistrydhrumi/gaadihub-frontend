// app/not-found.tsx

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Car, Home, Search } from "lucide-react";
import Header from "@/components/common/header";

export default function NotFound() {
  return (
    <>
    <Header/>
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 px-6">
      <div className="mx-auto max-w-2xl text-center">
        {/* 404 Number */}
        <h1 className="text-8xl font-extrabold tracking-tight text-slate-900 md:text-9xl">
          404
        </h1>

        {/* Icon */}
        <div className="my-6 flex justify-center">
          <div className="rounded-full bg-primary/10 p-6">
            <Car className="h-12 w-12 text-primary" />
          </div>
        </div>

        {/* Content */}
        <h2 className="text-3xl font-bold text-slate-900">
          Oops! Car Not Found
        </h2>

        <p className="mt-4 text-lg text-slate-600">
          The page you're looking for may have been moved, deleted,
          or never existed.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Button  size="lg">
            <Link href="/">
              Back Home
            </Link>
          </Button>

          <Button variant="outline"  size="lg">
            <Link href="/cars">
              Browse Cars
            </Link>
          </Button>
        </div>

        {/* Decorative Car */}
        <div className="mt-12 text-6xl opacity-20">
          🚗💨
        </div>
      </div>
    </div>
    </>
  );
}