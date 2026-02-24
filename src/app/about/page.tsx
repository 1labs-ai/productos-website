"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Target, Heart, Zap, Users, Rocket, Shield, Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const values = [
  {
    icon: Target,
    title: "Mission-Driven",
    description: "Every feature ships with purpose. We build what matters, not what's easy.",
  },
  {
    icon: Heart,
    title: "Developer-First",
    description: "Built by developers, for developers. We understand your workflow.",
  },
  {
    icon: Zap,
    title: "Speed Matters",
    description: "Ship fast without sacrificing quality. 10x faster is our baseline.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Growing together with our users. Your feedback shapes our roadmap.",
  },
  {
    icon: Shield,
    title: "Trust & Security",
    description: "Your data is sacred. Enterprise-grade security, always.",
  },
  {
    icon: Globe,
    title: "Global Impact",
    description: "Building world-class products from India to the world.",
  },
];

const timeline = [
  {
    year: "2024",
    title: "The Beginning",
    description: "ProductOS was born from a simple idea: AI should handle the grunt work, so you can focus on building.",
  },
  {
    year: "2024",
    title: "First 100 Users",
    description: "Early adopters helped shape the product with invaluable feedback.",
  },
  {
    year: "2025",
    title: "Public Launch",
    description: "ProductOS opens to the world with AI-native workflows for every team.",
  },
];

const team = [
  {
    name: "Coming Soon",
    role: "Founder & CEO",
    image: null,
  },
  {
    name: "Coming Soon",
    role: "Head of Engineering",
    image: null,
  },
  {
    name: "Coming Soon",
    role: "Head of Product",
    image: null,
  },
  {
    name: "Coming Soon",
    role: "Head of Design",
    image: null,
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-transparent to-transparent" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-[120px]" />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8"
              >
                <Rocket className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-muted-foreground">Our Story</span>
              </motion.div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
                Building the future of{" "}
                <span className="text-gradient">product development</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                ProductOS is on a mission to help teams ship products 10x faster with 
                AI-native workflows. We believe the best products are built when humans 
                focus on creativity while AI handles the execution.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <div className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-blue-500/10 via-violet-500/5 to-transparent border border-white/10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-violet-500/20 rounded-full blur-3xl" />
                
                <div className="relative z-10">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-6">Our Mission</h2>
                  <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                    We&apos;re building the operating system for product development. One where 
                    AI agents handle research, design, and code while maintaining perfect context 
                    from first idea to production deployment. We want every team—from solo founders 
                    to enterprise organizations—to ship world-class products without the traditional 
                    overhead.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Values Grid */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Values</h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                The principles that guide everything we build.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((value, i) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group p-6 rounded-2xl bg-card border border-white/5 hover:border-white/10 transition-all hover-lift"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <value.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-24 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Journey</h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                From idea to reality—and we&apos;re just getting started.
              </p>
            </motion.div>

            <div className="max-w-2xl mx-auto">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="relative pl-8 pb-12 last:pb-0"
                >
                  {/* Timeline line */}
                  {i !== timeline.length - 1 && (
                    <div className="absolute left-[11px] top-6 w-0.5 h-full bg-gradient-to-b from-blue-500/50 to-transparent" />
                  )}
                  
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  
                  <div className="bg-card border border-white/5 rounded-xl p-6 hover:border-white/10 transition-colors">
                    <span className="text-sm font-medium text-blue-400">{item.year}</span>
                    <h3 className="text-xl font-semibold mt-1 mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Meet the Team</h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                The people behind ProductOS.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {team.map((member, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center group"
                >
                  <div className="relative w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500/20 to-violet-500/20 border border-white/10 flex items-center justify-center overflow-hidden group-hover:border-white/20 transition-colors">
                    <Users className="w-12 h-12 text-muted-foreground/50" />
                  </div>
                  <h3 className="font-semibold text-muted-foreground">{member.name}</h3>
                  <p className="text-sm text-muted-foreground/70">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 1Labs Connection */}
        <section className="py-24 bg-gradient-to-b from-transparent via-violet-500/5 to-transparent">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto text-center"
            >
              <p className="text-muted-foreground mb-4">A product by</p>
              <a 
                href="https://1labs.ai" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-3xl sm:text-4xl font-bold text-gradient hover:opacity-80 transition-opacity"
              >
                1Labs AI
              </a>
              <p className="text-lg text-muted-foreground mt-6 max-w-xl mx-auto">
                Part of 1Labs AI&apos;s mission to build world-class AI products from India 
                to the world. We believe in making cutting-edge technology accessible to 
                everyone.
              </p>
              <a
                href="https://1labs.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center mt-6 text-blue-400 hover:text-blue-300 transition-colors"
              >
                Learn more about 1Labs AI
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative max-w-3xl mx-auto text-center p-12 rounded-3xl bg-gradient-to-br from-blue-500/10 via-violet-500/10 to-transparent border border-white/10 overflow-hidden"
            >
              {/* Background glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px]" />
              
              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  Ready to ship <span className="text-gradient">10x faster</span>?
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                  Join thousands of teams already building with ProductOS.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-blue-500 to-violet-500 hover:opacity-90 px-8"
                    asChild
                  >
                    <Link href="/sign-up">
                      Get Started Free
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-white/20 hover:bg-white/5"
                    asChild
                  >
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
