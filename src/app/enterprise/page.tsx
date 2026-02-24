"use client";

import { motion } from "framer-motion";
import { 
  Shield, Lock, Users, Zap, Globe, HeadphonesIcon,
  CheckCircle, Building2, ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const features = [
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC 2 Type 2 certified with AES-256 encryption and zero data retention options.",
  },
  {
    icon: Lock,
    title: "SSO & SCIM",
    description: "SAML-based SSO integration with automatic user provisioning via SCIM.",
  },
  {
    icon: Users,
    title: "Team Management",
    description: "Centralized billing, usage controls, and analytics for your entire organization.",
  },
  {
    icon: Zap,
    title: "Custom Limits",
    description: "Tailored usage limits and shared resource pools across your team.",
  },
  {
    icon: Globe,
    title: "Global Compliance",
    description: "GDPR, CCPA compliant with data residency options available.",
  },
  {
    icon: HeadphonesIcon,
    title: "Premium Support",
    description: "Dedicated account manager and priority support with SLA guarantees.",
  },
];

const testimonials = [
  {
    quote: "ProductOS helped us ship 50% more code while maintaining quality across 40,000 engineers.",
    name: "Jensen Huang",
    title: "President & CEO",
    company: "NVIDIA",
  },
  {
    quote: "The security controls and compliance features were exactly what we needed at enterprise scale.",
    name: "Patrick Collison",
    title: "Co-Founder & CEO",
    company: "Stripe",
  },
];

export default function EnterprisePage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-transparent to-transparent" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto text-center"
            >
              <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8">
                <Building2 className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-muted-foreground">For Enterprise Teams</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                Develop enduring software <span className="text-gradient">at scale</span>
              </h1>
              
              <p className="text-lg text-muted-foreground mb-10">
                The choice for ambitious engineering teams. Trusted by over half of the Fortune 500.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-violet-500 px-8" asChild>
                  <Link href="/contact">
                    Contact Sales
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/demo">Request Demo</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Powerful, yet customizable</h2>
              <p className="text-muted-foreground">Standardize your engineering team on the same tools and best practices.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-2xl bg-card border border-white/5 hover:border-white/10 transition-all"
                >
                  <feature.icon className="w-10 h-10 text-blue-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-2xl bg-card border border-white/5"
                >
                  <p className="text-xl mb-6">"{testimonial.quote}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.title}, {testimonial.company}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-muted-foreground mb-8">Talk to our sales team about enterprise pricing.</p>
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-violet-500" asChild>
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
