"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, MessageSquare, Calendar, Wallet,
  Star, Check, MapPin, Sparkles, Clock, Globe,
  Shield, Send, Zap,
} from "lucide-react";

const fade = {
  hidden: { opacity: 0, y: 18 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: {
      duration: 0.55,
      delay: i * 0.09,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

const STATS = [
  { value: "50K+",  label: "Trips planned" },
  { value: "120+",  label: "Countries covered" },
  { value: "4.9",   label: "Average rating" },
  { value: "< 30s", label: "To get your itinerary" },
];

const STEPS = [
  {
    n: "01",
    icon: <MessageSquare className="w-5 h-5" />,
    title: "Tell us where you want to go",
    desc: "Type your destination, travel dates, budget, and travel style in plain language — no forms to fill out.",
  },
  {
    n: "02",
    icon: <Sparkles className="w-5 h-5" />,
    title: "AI builds your full itinerary",
    desc: "Our AI generates a structured day-by-day plan with activities, restaurants, and cost estimates in seconds.",
  },
  {
    n: "03",
    icon: <Calendar className="w-5 h-5" />,
    title: "Save, refine, and go",
    desc: "Your trip is saved to your account. Tweak it by chatting further, then travel with confidence.",
  },
];

const FEATURES = [
  {
    icon: <MessageSquare className="w-5 h-5 text-accent" />,
    title: "Conversational Planning",
    desc: "Chat naturally. Ask follow-ups. Refine anything. The AI understands context across your whole conversation.",
  },
  {
    icon: <Calendar className="w-5 h-5 text-accent" />,
    title: "Day-by-Day Itineraries",
    desc: "Morning, afternoon, and evening plans for every day of your trip, tailored to your exact preferences.",
  },
  {
    icon: <Wallet className="w-5 h-5 text-accent" />,
    title: "Budget Breakdown",
    desc: "Real-time cost estimates per activity and per day. Know what you'll spend before you book anything.",
  },
  {
    icon: <Globe className="w-5 h-5 text-accent" />,
    title: "Any Destination",
    desc: "Tokyo, Tuscany, Tulum — the AI knows 120+ countries and thousands of cities in depth.",
  },
  {
    icon: <Clock className="w-5 h-5 text-accent" />,
    title: "Ready in Seconds",
    desc: "No waiting, no back-and-forth with travel agents. A complete trip plan in under 30 seconds.",
  },
  {
    icon: <Shield className="w-5 h-5 text-accent" />,
    title: "Saved to Your Account",
    desc: "Every trip is stored in your dashboard. Access, share, or update it anytime from any device.",
  },
];

const TESTIMONIALS = [
  {
    name: "Sarah Jenkins",
    role: "Solo Traveler",
    content: "Planova suggested spots I would have never found on my own. My Tokyo trip was the best I've ever taken.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
  },
  {
    name: "Mark Thompson",
    role: "Family Vacationer",
    content: "Planning a 10-day trip for five people used to take weeks. Planova gave me a full plan in minutes.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150",
  },
  {
    name: "Elena Rodriguez",
    role: "Adventure Seeker",
    content: "The budget breakdown was spot on. I knew exactly what to expect financially before I even landed.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150",
  },
];

/* ── Chat mockup data ─────────────────── */
const CHAT_MESSAGES = [
  { role: "user",  text: "Plan a 7-day trip to Tokyo for 2, budget $3,000 🗾" },
  { role: "ai",    text: null },   // renders the itinerary card
  { role: "user",  text: "Add more street food spots on Day 2" },
  { role: "ai",    text: "Done! I've added Tsukiji Outer Market and Ameyoko to Day 2. Want me to adjust the budget?" },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col overflow-x-hidden">

      {/* ══ HERO ════════════════════════════════════════════ */}
      <section className="min-h-screen bg-white flex items-center pt-4 pb-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left — copy */}
            <div>
              {/* Badge */}
              <motion.div
                variants={fade} initial="hidden" animate="visible"
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-semibold mb-8"
              >
                <Sparkles className="w-3.5 h-3.5" />
                AI-Powered Travel Planning
              </motion.div>

              <motion.h1
                variants={fade} initial="hidden" animate="visible" custom={1}
                className="text-5xl sm:text-6xl font-heading font-black text-primary leading-[1.08] tracking-tight mb-6"
              >
                Plan any trip.<br />
                <span className="relative inline-block">
                  <span className="relative z-10 text-accent">Instantly.</span>
                  <span className="absolute bottom-1 left-0 w-full h-3 bg-accent/10 rounded-sm -z-0" />
                </span>
              </motion.h1>

              <motion.p
                variants={fade} initial="hidden" animate="visible" custom={2}
                className="text-lg text-slate-500 leading-relaxed mb-10 max-w-lg"
              >
                Tell our AI where you want to go. Get a full day-by-day itinerary,
                budget breakdown, and local tips in under 30 seconds — not hours.
              </motion.p>

              <motion.div
                variants={fade} initial="hidden" animate="visible" custom={3}
                className="flex flex-wrap gap-3 mb-12"
              >
                <Link
                  href="/register"
                  className="group inline-flex items-center gap-2 px-7 py-3.5 bg-accent text-white font-bold text-base rounded-xl hover:bg-orange-500 transition-all shadow-lg shadow-accent/25 hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  Start for free
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-slate-50 text-primary font-semibold text-base rounded-xl hover:bg-slate-100 transition-all border border-slate-200"
                >
                  Sign in
                </Link>
              </motion.div>

              {/* Trust pills */}
              <motion.div
                variants={fade} initial="hidden" animate="visible" custom={4}
                className="flex flex-wrap gap-5 text-sm text-slate-400"
              >
                {[
                  "No credit card required",
                  "Free forever plan",
                  "50,000+ trips planned",
                ].map((t) => (
                  <span key={t} className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    {t}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Right — Chat mockup */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Glow behind the card */}
              <div className="absolute -inset-6 bg-gradient-to-br from-accent/10 via-primary/5 to-transparent rounded-3xl blur-2xl" />

              <div className="relative bg-white rounded-2xl border border-slate-200 shadow-2xl shadow-slate-200/60 overflow-hidden">
                {/* Window chrome */}
                <div className="flex items-center gap-2 px-4 py-3 bg-primary border-b border-primary/80">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-400/80" />
                    <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400/80" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="flex items-center gap-1.5 bg-white/10 rounded-md px-3 py-0.5">
                      <Sparkles className="w-3 h-3 text-accent" />
                      <span className="text-white/80 text-xs font-medium">Planova AI</span>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="p-4 space-y-3 bg-slate-50/50 min-h-[280px]">
                  {/* User bubble */}
                  <div className="flex justify-end">
                    <div className="bg-primary text-white text-sm rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[78%] shadow-sm">
                      Plan a 7-day trip to Tokyo for 2 people, $3,000 budget 🗾
                    </div>
                  </div>

                  {/* AI itinerary card */}
                  <div className="flex gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-accent shrink-0 flex items-center justify-center shadow-sm">
                      <Sparkles className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="bg-white rounded-2xl rounded-tl-sm border border-slate-100 px-4 py-3 shadow-sm max-w-[82%]">
                      <p className="font-bold text-primary text-sm mb-2">🗾 Tokyo · 7 Days · 2 Travelers</p>
                      <div className="space-y-1.5 text-xs text-slate-500">
                        {[
                          { d: "Day 1", t: "Shinjuku arrival & Omoide Yokocho" },
                          { d: "Day 2", t: "Asakusa, Senso-ji & Ueno Park" },
                          { d: "Day 3", t: "Harajuku, Meiji & Shibuya Crossing" },
                        ].map(({ d, t }) => (
                          <div key={d} className="flex items-center gap-2">
                            <span className="font-bold text-primary/60 w-10 shrink-0">{d}</span>
                            <span>{t}</span>
                          </div>
                        ))}
                        <div className="flex items-center gap-1.5 text-accent font-semibold pt-1">
                          <span>+ 4 more days planned</span>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-slate-100 flex justify-between items-center">
                        <span className="text-xs text-slate-400">Estimated total</span>
                        <span className="text-sm font-black text-primary">$2,840</span>
                      </div>
                    </div>
                  </div>

                  {/* User follow-up */}
                  <div className="flex justify-end">
                    <div className="bg-primary text-white text-sm rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[78%] shadow-sm">
                      Add more street food on Day 2 🍜
                    </div>
                  </div>

                  {/* AI follow-up */}
                  <div className="flex gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-accent shrink-0 flex items-center justify-center shadow-sm">
                      <Sparkles className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="bg-white rounded-2xl rounded-tl-sm border border-slate-100 px-4 py-3 shadow-sm">
                      <p className="text-sm text-slate-700">Added Tsukiji Outer Market and Ameyoko to Day 2! Budget updated to <span className="font-bold text-primary">$2,920</span>.</p>
                    </div>
                  </div>
                </div>

                {/* Input bar */}
                <div className="border-t border-slate-100 px-3 py-3 flex items-center gap-2 bg-white">
                  <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-400 select-none">
                    Ask anything about your trip…
                  </div>
                  <div className="w-8 h-8 bg-accent rounded-xl flex items-center justify-center shadow-sm shrink-0">
                    <Send className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.4 }}
                className="absolute -bottom-4 -left-4 bg-white border border-slate-100 shadow-lg rounded-2xl px-4 py-2.5 flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-emerald-500" />
                </div>
                <div>
                  <p className="text-xs font-bold text-primary">Generated in 8s</p>
                  <p className="text-[10px] text-slate-400">Full 7-day plan</p>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══ STATS STRIP ═════════════════════════════════════ */}
      <section className="border-y border-slate-100 bg-slate-50 py-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map((s, i) => (
              <motion.div
                key={i}
                variants={fade} initial="hidden" whileInView="visible"
                viewport={{ once: true }} custom={i}
              >
                <p className="text-3xl font-heading font-black text-primary mb-1">{s.value}</p>
                <p className="text-sm text-slate-400 font-medium">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ════════════════════════════════════ */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="mb-16 max-w-xl"
          >
            <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-3">How it works</p>
            <h2 className="text-4xl md:text-5xl font-heading font-black text-primary leading-tight">
              A trip plan in<br />three simple steps.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map((s, i) => (
              <motion.div
                key={i}
                variants={fade} initial="hidden" whileInView="visible"
                viewport={{ once: true }} custom={i}
                className="relative"
              >
                {/* Connector line */}
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-7 left-[calc(100%_-_16px)] w-8 border-t-2 border-dashed border-slate-200 z-10" />
                )}
                <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mb-5 text-white shadow-md shadow-primary/20">
                  {s.icon}
                </div>
                <span className="text-5xl font-heading font-black text-slate-100 select-none absolute top-0 right-0">{s.n}</span>
                <h3 className="text-lg font-bold text-primary mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FEATURES ════════════════════════════════════════ */}
      <section id="features" className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="mb-16 text-center max-w-2xl mx-auto"
          >
            <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-3">Features</p>
            <h2 className="text-4xl md:text-5xl font-heading font-black text-primary leading-tight">
              Everything you need to<br />travel smarter.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                variants={fade} initial="hidden" whileInView="visible"
                viewport={{ once: true }} custom={i * 0.5}
                className="bg-white rounded-2xl p-6 border border-slate-100 hover:border-accent/20 hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  {f.icon}
                </div>
                <h3 className="font-bold text-primary text-base mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ════════════════════════════════════ */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="mb-16 flex flex-col md:flex-row md:items-end gap-6 justify-between"
          >
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-3">Testimonials</p>
              <h2 className="text-4xl md:text-5xl font-heading font-black text-primary leading-tight">
                Loved by travelers<br />worldwide.
              </h2>
            </div>
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-accent text-accent" />
              ))}
              <span className="ml-1 text-slate-500 font-semibold text-sm">4.9 / 5</span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                variants={fade} initial="hidden" whileInView="visible"
                viewport={{ once: true }} custom={i}
                className="border border-slate-100 rounded-2xl p-7 hover:border-slate-200 hover:shadow-sm transition-all duration-300"
              >
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-slate-600 leading-relaxed mb-6 text-[15px]">
                  &ldquo;{t.content}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-primary text-sm">{t.name}</p>
                    <p className="text-xs text-slate-400 font-medium">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══════════════════════════════════════════════ */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Subtle top border accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-transparent via-accent to-transparent rounded-full" />

        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="relative bg-primary rounded-3xl px-8 py-16 text-center overflow-hidden"
          >
            {/* Inner dot pattern */}
            <div className="absolute inset-0 opacity-[0.05] rounded-3xl"
              style={{
                backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
            {/* Orange glow top */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-40 bg-accent/20 rounded-full blur-3xl" />

            <div className="relative z-10">
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-14 h-14 rounded-2xl bg-accent/15 border border-accent/20 flex items-center justify-center">
                  <Image src="/planova_no_bg.png" alt="Planova" width={36} height={36} className="object-contain" />
                </div>
              </div>

              <motion.h2
                variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
                className="text-4xl md:text-5xl font-heading font-black text-white mb-4 leading-tight"
              >
                Your next adventure<br />is one message away.
              </motion.h2>
              <motion.p
                variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}
                className="text-white/50 text-base mb-10 max-w-md mx-auto"
              >
                Free to start. No credit card needed. Join 50,000+ travelers already using Planova.
              </motion.p>
              <motion.div
                variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={3}
                className="flex flex-col sm:flex-row gap-3 justify-center"
              >
                <Link
                  href="/register"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-accent text-white font-bold text-base rounded-xl hover:bg-orange-500 transition-all shadow-lg shadow-accent/30 hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  Get started free
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-white/60 font-semibold text-base rounded-xl hover:text-white hover:bg-white/10 transition-all border border-white/15 hover:border-white/30"
                >
                  Sign in to existing account
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
