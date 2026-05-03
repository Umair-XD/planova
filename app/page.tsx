"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Compass, Calendar, Wallet, Star, ArrowRight, MapPin, Users, Zap } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Image from "next/image";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1 },
  }),
};

export default function LandingPage() {
  const features = [
    {
      icon: <Compass className="w-7 h-7 text-accent" />,
      title: "AI Chatbot",
      description:
        "Chat with our intelligent assistant to discover hidden gems, local secrets, and personalized recommendations.",
      color: "bg-teal-50",
    },
    {
      icon: <Calendar className="w-7 h-7 text-violet-500" />,
      title: "Smart Planner",
      description:
        "Generate complete day-by-day itineraries tailored specifically to your interests, pace, and travel style.",
      color: "bg-violet-50",
    },
    {
      icon: <Wallet className="w-7 h-7 text-amber-500" />,
      title: "Budget Tracker",
      description:
        "Keep your travel expenses in check with real-time budget estimates, cost breakdowns, and spending insights.",
      color: "bg-amber-50",
    },
  ];

  const stats = [
    { value: "50K+", label: "Trips Planned", icon: <MapPin className="w-5 h-5" /> },
    { value: "120+", label: "Countries", icon: <Compass className="w-5 h-5" /> },
    { value: "98%", label: "Satisfaction", icon: <Star className="w-5 h-5" /> },
    { value: "10x", label: "Faster Planning", icon: <Zap className="w-5 h-5" /> },
  ];

  const testimonials = [
    {
      name: "Sarah Jenkins",
      role: "Solo Traveler",
      content:
        "Planova changed the way I travel. The AI suggested spots I would have never found on my own!",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    },
    {
      name: "Mark Thompson",
      role: "Family Vacationer",
      content:
        "Planning a 10-day trip for a family of five used to be a nightmare. Planova did it in minutes.",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150",
    },
    {
      name: "Elena Rodriguez",
      role: "Adventure Seeker",
      content:
        "The budget estimation was spot on. I knew exactly what to expect before I even landed.",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-slate-900 to-accent/30 animate-gradient-slow" />
        {/* Decorative blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm text-teal-200 font-semibold mb-8 backdrop-blur-sm"
          >
            <Zap className="w-4 h-4 text-accent" />
            Powered by Google Gemini AI
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="text-5xl md:text-7xl font-heading font-bold text-white mb-6 leading-tight tracking-tight"
          >
            Your AI Travel{" "}
            <span className="text-accent">Companion</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Experience the future of travel planning. Planova uses advanced AI
            to craft personalized journeys that match your unique style and
            budget.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/register">
              <Button size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                Start Planning Free
              </Button>
            </Link>
            <button
              onClick={() =>
                document
                  .getElementById("features")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-8 py-4 text-white font-semibold border-2 border-white/20 rounded-xl hover:bg-white/10 hover:border-white/40 transition-all backdrop-blur-sm"
            >
              See How It Works
            </button>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center pt-2">
            <div className="w-1.5 h-2.5 bg-white/60 rounded-full" />
          </div>
        </div>
      </section>

      {/* ── Stats Bar ─────────────────────────────────────── */}
      <section className="bg-white border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-slate-100">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="flex flex-col items-center text-center px-6"
              >
                <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-accent mb-3">
                  {s.icon}
                </div>
                <p className="text-3xl font-heading font-bold text-primary">{s.value}</p>
                <p className="text-sm text-slate-500 mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────── */}
      <section id="features" className="py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-accent font-bold text-sm uppercase tracking-widest mb-3"
            >
              Why Planova
            </motion.p>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4"
            >
              Travel Smarter, Not Harder
            </motion.h2>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={2}
              className="text-slate-500 max-w-2xl mx-auto text-lg"
            >
              Everything you need to plan, track, and enjoy your next adventure
              — in one elegant platform.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
              >
                <Card
                  variant="interactive"
                  padding="lg"
                  className="h-full flex flex-col items-start text-left border border-slate-100 group"
                >
                  <div className={`p-3.5 ${feature.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────── */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-4xl font-heading font-bold text-primary mb-4"
            >
              Loved by Explorers
            </motion.h2>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              className="text-slate-500 text-lg"
            >
              Join thousands of travelers who have found their perfect path.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
              >
                <Card padding="lg" className="h-full border border-slate-100 flex flex-col">
                  <div className="flex items-center gap-1 mb-5">
                    {[...Array(5)].map((_, j) => (
                      <Star
                        key={j}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-slate-600 leading-relaxed mb-8 flex-1">
                    &ldquo;{t.content}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 mt-auto">
                    <div className="relative w-11 h-11 shrink-0">
                      <Image
                        src={t.avatar}
                        alt={t.name}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary text-sm">{t.name}</h4>
                      <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">
                        {t.role}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────── */}
      <section className="py-28 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary to-accent/20" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm text-teal-200 font-semibold mb-8"
          >
            <Users className="w-4 h-4" />
            50,000+ Travelers Trust Planova
          </motion.div>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight"
          >
            Ready to start your next adventure?
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            className="text-slate-300 text-lg mb-10 leading-relaxed"
          >
            Join Planova today and get a personalized 3-day itinerary for any
            city in the world — absolutely free.
          </motion.p>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={3}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/register">
              <Button size="lg" variant="secondary" rightIcon={<ArrowRight className="w-5 h-5" />}>
                Create Your Account
              </Button>
            </Link>
            <Link href="/login">
              <button className="px-8 py-4 text-white font-semibold border-2 border-white/20 rounded-xl hover:bg-white/10 transition-all">
                Sign In
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
