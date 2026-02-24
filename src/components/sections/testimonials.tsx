"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { fadeInUp, staggerContainer, staggerItem, transitions } from "@/lib/animations";

const testimonials = [
  {
    quote: "Launched MVP in 12 days; onboarding paid users a week later. ProductOS killed the context switching.",
    name: "Sarah Jenkins",
    title: "CEO, FinFlow (YC W23)",
  },
  {
    quote: "Pre-seed in 3 weeks. Research + PRD stages shaped our pitch while code shipped in parallel.",
    name: "Michael Ross",
    title: "Founder, DataMind",
  },
  {
    quote: "1,200 DAU and zero downtime. Context stayed intact from research to design to code.",
    name: "Alex Lee",
    title: "CTO, Nexus Health",
  },
  {
    quote: "Design matched the PRD pixel-for-pixel. Agents kept tokens, components, and copy synced.",
    name: "Priya Iyer",
    title: "Design Lead, Forma",
  },
  {
    quote: "Edge deploy with 24 passing tests on day 10. Zero handoff friction between design and code.",
    name: "Ramon Diaz",
    title: "VP Eng, Ledgerly",
  },
  {
    quote: "Context rail meant my agents never lost state. We shipped AI workflows without rewrites.",
    name: "Krishna T.",
    title: "Head of Product, Orbit",
  },
];

const quoteVariants = {
  hidden: { scale: 0.8, opacity: 0, rotate: -10 },
  visible: { 
    scale: 1, 
    opacity: 1, 
    rotate: 0,
    transition: { type: "spring" as const, stiffness: 200, damping: 15 }
  },
};

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
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
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.name}
              variants={staggerItem}
              whileHover={{ 
                y: -6,
                borderColor: "rgba(255, 255, 255, 0.15)",
                transition: { duration: 0.2 }
              }}
              className="relative p-6 rounded-2xl bg-card border border-white/5 transition-shadow group"
            >
              {/* Subtle glow on hover */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 to-violet-500/10"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              
              <motion.div
                variants={quoteVariants}
                className="relative z-10"
              >
                <Quote className="w-8 h-8 text-blue-500/30 mb-4 group-hover:text-blue-500/50 transition-colors" />
              </motion.div>
              
              <p className="relative z-10 text-muted-foreground mb-6 leading-relaxed group-hover:text-foreground/80 transition-colors">
                &quot;{testimonial.quote}&quot;
              </p>
              
              <div className="relative z-10 flex items-center space-x-3">
                <motion.div 
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white font-semibold"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={transitions.spring}
                >
                  {testimonial.name.charAt(0)}
                </motion.div>
                <div>
                  <div className="font-medium">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.title}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
