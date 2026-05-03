"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Avatar from "@/components/ui/Avatar";
import {
  LogOut, LayoutDashboard, Map,
  Menu, X, MessageSquare, ChevronDown,
} from "lucide-react";

const NAV_LINKS = [
  { href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
  { href: "/chat",      label: "Plan Trip",  icon: <MessageSquare className="w-4 h-4" /> },
  { href: "/trips",     label: "My Trips",   icon: <Map className="w-4 h-4" /> },
];

/* Public nav anchors — shown when logged out */
const PUBLIC_LINKS = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#features",     label: "Features" },
  { href: "#testimonials", label: "Testimonials" },
];

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  /* scroll shadow */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* click-outside dropdown */
  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
        setDropdownOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  /* close mobile on route change */
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <nav className={`sticky top-0 z-50 bg-white transition-all duration-200 ${
      scrolled ? "border-b border-slate-100 shadow-sm" : "border-b border-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <Image
              src="/planova_no_bg.png"
              alt="Planova"
              width={28}
              height={28}
              className="object-contain"
            />
            <span className="text-lg font-heading font-bold text-primary tracking-tight">
              Planova
            </span>
          </Link>

          {/* ── Desktop centre links ── */}
          <div className="hidden md:flex items-center gap-1">
            {session ? (
              NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive(link.href)
                      ? "bg-primary/5 text-primary"
                      : "text-slate-500 hover:text-primary hover:bg-slate-50"
                  }`}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))
            ) : (
              PUBLIC_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="px-3.5 py-2 text-sm font-semibold text-slate-500 hover:text-primary rounded-lg hover:bg-slate-50 transition-colors"
                >
                  {l.label}
                </a>
              ))
            )}
          </div>

          {/* ── Desktop right side ── */}
          <div className="hidden md:flex items-center gap-2">
            {session ? (
              /* Avatar dropdown */
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-xl hover:bg-slate-50 transition-colors focus:outline-none"
                >
                  <Avatar src={session.user?.image} name={session.user?.name} size="sm" />
                  <span className="text-sm font-semibold text-primary hidden lg:block max-w-[100px] truncate">
                    {session.user?.name?.split(" ")[0]}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl py-2 border border-slate-100 animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="px-4 py-2.5 border-b border-slate-50 mb-1">
                      <p className="text-sm font-bold text-primary truncate">{session.user?.name}</p>
                      <p className="text-xs text-slate-400 truncate">{session.user?.email}</p>
                    </div>
                    {NAV_LINKS.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setDropdownOpen(false)}
                        className={`flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors ${
                          isActive(link.href)
                            ? "text-primary bg-primary/5 font-semibold"
                            : "text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {link.icon} {link.label}
                      </Link>
                    ))}
                    <div className="border-t border-slate-50 mt-1 pt-1">
                      <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-primary rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  className="px-5 py-2 bg-accent text-white rounded-xl text-sm font-bold hover:bg-orange-500 transition-all shadow-sm shadow-accent/20"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* ── Mobile burger ── */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-slate-500 hover:text-primary hover:bg-slate-50 rounded-xl transition-colors"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 py-4 space-y-1 animate-in slide-in-from-top-1 duration-150">
          {session ? (
            <>
              <div className="flex items-center gap-3 px-3 py-3 mb-2 bg-slate-50 rounded-xl">
                <Avatar src={session.user?.image} name={session.user?.name} size="sm" />
                <div>
                  <p className="text-sm font-bold text-primary">{session.user?.name}</p>
                  <p className="text-xs text-slate-400">{session.user?.email}</p>
                </div>
              </div>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2.5 px-3 py-2.5 text-sm font-semibold rounded-xl transition-colors ${
                    isActive(link.href)
                      ? "bg-primary/5 text-primary"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {link.icon} {link.label}
                </Link>
              ))}
              <div className="pt-1 border-t border-slate-100 mt-1">
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            </>
          ) : (
            <>
              {PUBLIC_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 rounded-xl"
                >
                  {l.label}
                </a>
              ))}
              <div className="pt-3 flex flex-col gap-2">
                <Link href="/login" className="block text-center px-3 py-2.5 text-sm font-semibold text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50">
                  Log in
                </Link>
                <Link href="/register" className="block text-center px-3 py-2.5 bg-accent text-white text-sm font-bold rounded-xl hover:bg-orange-500">
                  Get Started
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
