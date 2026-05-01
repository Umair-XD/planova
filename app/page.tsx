"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Compass, Calendar, Wallet, Star } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Image from "next/image";

export default function LandingPage() {
  const features = [
    {
      icon: <Compass className="w-8 h-8 text-accent" />,
      title: "AI Chatbot",
      description:
        "Chat with our intelligent assistant to discover hidden gems and local secrets.",
    },
    {
      icon: <Calendar className="w-8 h-8 text-accent" />,
      title: "Smart Planner",
      description:
        "Generate day-by-day itineraries tailored specifically to your interests and pace.",
    },
    {
      icon: <Wallet className="w-8 h-8 text-accent" />,
      title: "Budget Tracker",
      description:
        "Keep your travel expenses in check with real-time budget estimates and tracking.",
    },
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
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-slate-900 to-accent/20 animate-gradient-slow" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-heading font-bold text-white mb-6 leading-tight"
          >
            Your AI Travel <span className="text-accent">Companion</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto"
          >
            Experience the future of travel planning. Planova uses advanced AI
            to craft personalized journeys that match your unique style.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/register">
              <Button size="lg">Start Planning Free</Button>
            </Link>
            <button
              onClick={() =>
                document
                  .getElementById("features")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-8 py-4 text-white font-medium border-2 border-white/20 rounded-xl hover:bg-white/10 transition-all"
            >
              See How It Works
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-primary mb-4">
              Travel Smarter, Not Harder
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Everything you need to plan, track, and enjoy your next adventure
              in one elegant platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="p-8 h-full border border-slate-100 flex flex-col items-center text-center">
                  <div className="p-4 bg-accent/10 rounded-2xl mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-primary mb-4">
              Loved by Explorers
            </h2>
            <p className="text-slate-500">
              Join thousands of travelers who have found their perfect path.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="p-8 h-full border border-slate-100">
                  <div className="flex items-center gap-2 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-slate-700 italic mb-8">"{t.content}"</p>
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="relative w-12 h-12 shrink-0">
                      <Image
                        src={t.avatar}
                        alt={t.name}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary">{t.name}</h4>
                      <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
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

      {/* CTA Section */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-10" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
            Ready to start your next adventure?
          </h2>
          <p className="text-slate-300 text-lg mb-10">
            Join Planova today and get a personalized 3-day itinerary for any
            city in the world, absolutely free.
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary">
              Create Your Account
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
