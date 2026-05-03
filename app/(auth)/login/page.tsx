"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { Eye, EyeOff, ArrowRight, MapPin, Star } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await signIn("credentials", { email, password, redirect: false });
      if (res?.error) {
        toast.error("Invalid email or password");
      } else {
        toast.success("Welcome back!");
        router.push("/dashboard");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[100dvh] w-full flex overflow-hidden">

      {/* ── Left panel — decorative ── */}
      <div className="hidden lg:flex lg:w-[52%] relative flex-col">
        {/* Photo */}
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1400"
          alt="Travel"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#003e6c]/90 via-[#003e6c]/70 to-[#003e6c]/40" />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full p-12">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/planova_no_bg.png" alt="Planova" width={32} height={32} className="object-contain" />
            <span className="text-xl font-heading font-bold text-white">Planova</span>
          </Link>

          {/* Centre quote */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-accent text-accent" />
              ))}
            </div>
            <h2 className="text-4xl font-heading font-black text-white leading-tight mb-4">
              Your journey<br />begins here.
            </h2>
            <p className="text-white/60 text-base leading-relaxed max-w-sm">
              Sign in to access your saved trips and keep planning your next great adventure with AI.
            </p>
          </div>

          {/* Bottom stat pills */}
          <div className="flex gap-3 flex-wrap">
            {[
              { icon: <MapPin className="w-3.5 h-3.5" />, text: "120+ countries" },
              { icon: <Star className="w-3.5 h-3.5 fill-current" />, text: "4.9/5 rating" },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-3.5 py-1.5 text-white/70 text-xs font-medium">
                {icon} {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right panel — form ── */}
      <div className="flex-1 flex flex-col bg-white overflow-y-auto">
        <div className="flex-1 flex items-center justify-center px-8 py-10">
          <div className="w-full max-w-sm">

            {/* Mobile logo */}
            <Link href="/" className="flex items-center gap-2 mb-10 lg:hidden">
              <Image src="/planova_no_bg.png" alt="Planova" width={28} height={28} className="object-contain" />
              <span className="text-lg font-heading font-bold text-primary">Planova</span>
            </Link>

            <h1 className="text-3xl font-heading font-black text-primary mb-1">Welcome back</h1>
            <p className="text-slate-400 text-sm mb-8">Enter your details to sign in to your account.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                  Email address
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/10 transition-all"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 pr-11 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/10 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-accent text-white font-bold rounded-xl hover:bg-orange-500 transition-all shadow-md shadow-accent/20 hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none mt-2"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in…
                  </span>
                ) : (
                  <>Sign In <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-accent font-semibold hover:underline">
                Create one free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
