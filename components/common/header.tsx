"use client";

import { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import Headerlink from "./headerlink";
import { Search } from "../ui/search";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b bg-white">
        <div className="container mx-auto flex h-16 items-center px-4 lg:h-20">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src="/images/logo.png"
              alt="GaadiHub"
              width={180}
              height={60}
              className="h-8 w-auto sm:h-10 lg:h-14"
              priority
            />
          </Link>

          {/* Desktop Menu - unchanged */}
          <nav className="hidden flex-1 items-center justify-center md:flex">
            <div className="flex items-center gap-6 lg:gap-8">
              <Headerlink />
            </div>
          </nav>

          {/* Desktop Search - unchanged */}
          <div className="ml-auto hidden md:flex">
            <Suspense fallback={null}>
              <Search />
            </Suspense>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(true)}
            className="ml-auto md:hidden"
            aria-label="Open Menu"
          >
            <Menu className="h-7 w-7" />
          </button>
        </div>

        {/* Mobile Search */}
        <div className="border-t p-3 md:hidden">
          <Suspense fallback={null}>
            <Search />
          </Suspense>
        </div>
      </header>

      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 z-50 h-screen w-72 bg-white shadow-xl transition-transform duration-300 md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between border-b p-4">
          <Image
            src="/images/logo.png"
            alt="GaadiHub"
            width={140}
            height={40}
            className="h-8 w-auto"
          />

          <button
            onClick={() => setOpen(false)}
            aria-label="Close Menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className="flex flex-col">
          <Link
            href="/cars"
            onClick={() => setOpen(false)}
            className="border-b px-6 py-4 text-lg font-medium text-slate-700 hover:bg-slate-50"
          >
            Used Cars
          </Link>

          <Link
            href="/about"
            onClick={() => setOpen(false)}
            className="border-b px-6 py-4 text-lg font-medium text-slate-700 hover:bg-slate-50"
          >
            About Us
          </Link>
        </nav>
      </div>
    </>
  );
}