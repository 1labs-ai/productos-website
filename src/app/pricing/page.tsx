"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "For individuals getting started",
    cta: "Get Started",
    ctaVariant: "outline" as const,
    features: [
      { name: "1 project", included: true },
      { name: "Basic AI agents", included: true },
      { name: "Community support", included: true },
      { name: "5 generations/day", included: true },
      { name: "Advanced features", included: false },
      { name: "Priority support", included: false },
    ],
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "For professionals and small teams",
    cta: "Start Free Trial",
    ctaVariant: "default" as const,
    popular: true,
    features: [
      { name: "Unlimited projects", included: true },
      { name: "All AI agents", included: true },
      { name: "Email support", included: true },
      { name: "100 generations/day", included: true },
      { name: "Advanced features", included: true },
      { name: "Priority support", included: false },
    ],
  },
  {
    name: "Team",
    price: "$79",
    period: "/user/month",
    description: "For growing teams",
    cta: "Contact Sales",
    ctaVariant: "outline" as const,
    features: [
      { name: "Unlimited projects", included: true },
      { name: "All AI agents", included: true },
      { name: "Priority support", included: true },
      { name: "Unlimited generations", included: true },
      { name: "Advanced features", included: true },
      { name: "Team collaboration", included: true },
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations",
    cta: "Contact Sales",
    ctaVariant: "outline" as const,
    features: [
      { name: "Everything in Team", included: true },
      { name: "Custom integrations", included: true },
      { name: "Dedicated support", included: true },
      { name: "SLA guarantee", included: true },
      { name: "Security review", included: true },
      { name: "On-premise option", included: true },
    ],
  },
];

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Simple, <span className="text-gradient">transparent</span> pricing
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Start free, scale as you grow. No hidden fees.
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`relative p-6 rounded-2xl border ${
                  plan.popular 
                    ? "border-blue-500/50 bg-blue-500/5" 
                    : "border-white/10 bg-card"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-violet-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground ml-1">{plan.period}</span>}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                </div>
                
                <Button 
                  className={`w-full mb-6 ${plan.popular ? "bg-gradient-to-r from-blue-500 to-violet-500" : ""}`}
                  variant={plan.ctaVariant}
                >
                  {plan.cta}
                </Button>
                
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature.name} className="flex items-center text-sm">
                      {feature.included ? (
                        <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      ) : (
                        <X className="w-4 h-4 text-muted-foreground/50 mr-2 flex-shrink-0" />
                      )}
                      <span className={feature.included ? "" : "text-muted-foreground/50"}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
