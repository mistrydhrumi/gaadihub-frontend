"use client";

import Headerlink from "./headerlink";
import  { Search } from "../ui/search";
import { Suspense } from "react";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 shadow-sm backdrop-blur ">
            <div className=" mx-auto px-4 py-6  flex h-12  items-center gap-4  md:h-18 md:px-6 lg:px-8">
                {/* Logo */}
                <a href="/" className="flex shrink-0 items-center">
                    <img
                        src="/images/logo.png"
                        alt="Logo"
                        className=" md:h-12 lg:h-14"
                    />
                </a>

                {/* Center Menu */}
                <nav className="hidden flex-1 items-center justify-center md:flex">
                    <div className="flex items-center gap-6 lg:gap-8">
                        <Headerlink />
                    </div>
                </nav>

                {/* Right Side */}
                <div className="ml-auto flex shrink-0 items-center">
                    <Suspense fallback={null}>
                        <Search />
                    </Suspense>
                </div>

            </div>
        </header>
    );
}