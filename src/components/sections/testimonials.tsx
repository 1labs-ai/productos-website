"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Launched MVP in 12 days; onboarding paid users a week later. ProductOS killed the context switching.",
    name: "Sarah Jenkins",
    title: "CEO, FinFlow (YC W23)",
    avatar: "/avatars/sarah.jpg",
  },
  {
    quote: "Pre-seed in 3 weeks. Research + PRD stages shaped our pitch while code shipped in parallel.",
    name: "Michael Ross",
    title: "Founder, DataMind",
    avatar: "/avatars/michael.jpg",
  },
  {
    quote: "1,200 DAU and zero downtime. Context stayed intact from research to design to code.",
    name: "Alex Lee",
    title: "CTO, Nexus Health",
    avatar: "/avatars/alex.jpg",
  },
  {
    quote: "Design matched the PRD pixel-for-pixel. Agents kept tokens, components, and copy synced.",
    name: "Priya Iyer",
    title: "Design Lead, Forma",
    avatar: "/avatars/priya.jpg",
  },
  {
    quote: "Edge deploy with 24 passing tests on day 10. Zero handoff friction between design and code.",
    name: "Ramon Diaz",
    title: "VP Eng, Ledgerly",
    avatar: "/avatars/ramon.jpg",
  },
  {
    quote: "Context rail meant my agents never lost state. We shipped AI workflows without rewrites.",
    name: "Krishna T.",
    title: "Head of Product, Orbit",
    avatar: "/avatars/krishna.jpg",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Hear From Our <span className="text-gradient">Customers</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            200+ founders shipped with ProductOS
          </p>
        </motion.div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative p-6 rounded-2xl bg-card border border-white/5 hover:border-white/10 transition-all"
            >
              <Quote className="w-8 h-8 text-blue-500/30 mb-4" />
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white font-semibold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-medium">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.title}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
