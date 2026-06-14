import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className=" border-t bg-slate-950 text-slate-300">
      <div className="container mx-auto px-10 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo & About */}
          <div>
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo.png"
                alt="GaadiHub"
                width={180}
                height={60}
                className="h-auto"
              />
            </Link>

            <p className="mt-4 text-sm leading-6 text-slate-400">
              Find your dream car with GaadiHub. Browse thousands of verified
              used cars from trusted sellers across India.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-orange-500">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/cars" className="hover:text-orange-500">
                  Used Cars
                </Link>
              </li>

              <li>
                <Link href="/about" className="hover:text-orange-500">
                  About Us
                </Link>
              </li>

              <li>
                <Link href="/contact" className="hover:text-orange-500">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Brands */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Popular Brands
            </h3>

            <ul className="space-y-3 text-sm">
              <li>Maruti Suzuki</li>
              <li>Hyundai</li>
              <li>Honda</li>
              <li>Tata</li>
              <li>Mahindra</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Contact Us
            </h3>

            <ul className="space-y-3 text-sm">
              <li>Ahmedabad, Gujarat</li>
              <li>+91 98765 43210</li>
              <li>info@gaadihub.com</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-slate-800 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-slate-500 md:flex-row">
            <p>
              © {new Date().getFullYear()} GaadiHub. All rights reserved.
            </p>

            <div className="flex gap-6">
              <Link href="/privacy-policy" className="hover:text-orange-500">
                Privacy Policy
              </Link>

              <Link href="/terms" className="hover:text-orange-500">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}