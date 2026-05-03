import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";

const LINKS = {
  Product: [
    { label: "How it works", href: "#how-it-works" },
    { label: "Features",     href: "#features" },
    { label: "Plan a trip",  href: "/chat" },
    { label: "My trips",     href: "/trips" },
  ],
  Company: [
    { label: "About",          href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Use",   href: "#" },
  ],
  Account: [
    { label: "Sign up",   href: "/register" },
    { label: "Log in",    href: "/login" },
    { label: "Dashboard", href: "/dashboard" },
  ],
};

const Footer = () => (
  <footer className="bg-[#001f38] text-white">
    <div className="max-w-7xl mx-auto px-6 lg:px-10">

      {/* Main grid */}
      <div className="py-16 grid grid-cols-1 md:grid-cols-5 gap-10">

        {/* Brand col — 2 spans */}
        <div className="md:col-span-2">
          <Link href="/" className="flex items-center gap-2.5 mb-4">
            <Image
              src="/planova_no_bg.png"
              alt="Planova"
              width={28}
              height={28}
              className="object-contain"
            />
            <span className="text-lg font-heading font-bold text-white">Planova</span>
          </Link>
          <p className="text-white/40 text-sm leading-relaxed max-w-xs">
            Your AI-powered travel companion. Plan any trip in seconds — itinerary,
            budget, and local tips included.
          </p>

          {/* Mini stat pill */}
          <div className="mt-6 inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2">
            <MapPin className="w-3.5 h-3.5 text-accent" />
            <span className="text-sm text-white/50">
              <span className="text-white font-semibold">50,000+</span> trips planned worldwide
            </span>
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(LINKS).map(([group, items]) => (
          <div key={group}>
            <p className="text-xs font-bold text-white/30 uppercase tracking-[0.15em] mb-4">{group}</p>
            <ul className="space-y-3">
              {items.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-white/25">
          © {new Date().getFullYear()} Planova. All rights reserved.
        </p>
        <p className="text-xs text-white/20">
          Built with AI · Made for explorers
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
