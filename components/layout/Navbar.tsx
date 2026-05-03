"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Avatar from "@/components/ui/Avatar";
import {
  LogOut,
  LayoutDashboard,
  Map,
  Menu,
  X,
  Compass,
  MessageSquare,
} from "lucide-react";

const NAV_LINKS = [
  { href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
  { href: "/chat",      label: "Plan Trip",  icon: <MessageSquare className="w-4 h-4" /> },
  { href: "/trips",     label: "My Trips",   icon: <Map className="w-4 h-4" /> },
];

const Navbar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  /* Scroll shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Click-outside for dropdown */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* Close mobile menu on navigation */
  useEffect(() => { setIsOpen(false); }, [pathname]);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <nav
      className={`sticky top-0 z-50 bg-white border-b border-slate-100 transition-shadow duration-300 ${
        scrolled ? "shadow-md" : "shadow-none"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="p-1.5 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                <Compass className="w-5 h-5 text-accent" />
              </div>
              <span className="text-xl font-heading font-bold text-primary">
                Planova
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {session ? (
              <>
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      isActive(link.href)
                        ? "bg-accent/10 text-accent"
                        : "text-slate-600 hover:text-accent hover:bg-slate-50"
                    }`}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                ))}

                {/* User dropdown */}
                <div className="relative ml-3" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <Avatar src={session.user?.image} name={session.user?.name} size="sm" />
                    <span className="text-sm font-semibold text-primary hidden lg:block max-w-[120px] truncate">
                      {session.user?.name?.split(" ")[0]}
                    </span>
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl py-2 border border-slate-100 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="px-4 py-3 border-b border-slate-50 mb-1">
                        <p className="text-sm font-bold text-primary truncate">
                          {session.user?.name}
                        </p>
                        <p className="text-xs text-slate-400 truncate">
                          {session.user?.email}
                        </p>
                      </div>
                      {NAV_LINKS.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsDropdownOpen(false)}
                          className={`flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors ${
                            isActive(link.href)
                              ? "text-accent bg-accent/5"
                              : "text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          {link.icon} {link.label}
                        </Link>
                      ))}
                      <div className="border-t border-slate-50 mt-1 pt-1">
                        <button
                          onClick={() => signOut({ callbackUrl: "/" })}
                          className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-accent transition-colors rounded-xl hover:bg-slate-50"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-5 py-2.5 bg-accent text-white rounded-xl text-sm font-semibold hover:bg-teal-600 transition-all shadow-sm hover:shadow-md"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile burger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-600 hover:text-primary hover:bg-slate-50 rounded-xl focus:outline-none transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 py-3 px-4 space-y-1 animate-in slide-in-from-top-2 duration-150">
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
                      ? "bg-accent/10 text-accent"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {link.icon} {link.label}
                </Link>
              ))}
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="block px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-xl"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="block px-3 py-2.5 bg-accent text-white rounded-xl text-sm font-semibold text-center"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
