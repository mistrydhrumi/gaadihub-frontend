"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navlink({ href, name, showUnderline = true }: { href: string; name: string; showUnderline?: boolean }) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className={`relative py-1 text-sm font-medium transition-colors duration-300 w-fit ${isActive && showUnderline
                    ? "text-primary"
                    : "text-slate-600 hover:text-primary"
                } group`}
        >
            {name}
            {showUnderline && (
                <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ease-out ${isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                />
            )}
        </Link>
    );
}
