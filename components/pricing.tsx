"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const plans = [
  {
    name: "Free",
    description: "For individuals getting started",
    price: { monthly: 0, yearly: 0 },
    features: [
      "1 project",
      "50 AI credits/month",
      "GPT-4o mini model",
      "Community support",
    ],
    cta: "Get Started",
    ctaLink: "https://build.productos.dev/sign-up",
    highlighted: false,
  },
  {
    name: "Starter",
    description: "For growing product builders",
    price: { monthly: 15, yearly: 12 },
    features: [
      "5 projects",
      "300 AI credits/month",
      "GPT-4o model",
      "PRD generation",
      "Email support",
    ],
    cta: "Start Free Trial",
    ctaLink: "https://build.productos.dev/sign-up?plan=starter",
    highlighted: false,
  },
  {
    name: "Pro",
    description: "Full power for serious makers",
    price: { monthly: 29, yearly: 24 },
    features: [
      "Unlimited projects",
      "1,000 AI credits/month",
      "All AI models",
      "Full PRD & roadmap",
      "Research agent",
      "Code generation",
      "Priority support",
    ],
    cta: "Start Free Trial",
    ctaLink: "https://build.productos.dev/sign-up?plan=pro",
    highlighted: true,
  },
  {
    name: "Team",
    description: "For collaborative teams",
    price: { monthly: 29, yearly: 24 },
    priceLabel: "/user",
    features: [
      "Everything in Pro",
      "2,000 AI credits/user",
      "Team collaboration",
      "Shared workspaces",
      "Admin controls",
      "SLA guarantee",
    ],
    cta: "Start Team Trial",
    ctaLink: "https://build.productos.dev/sign-up?plan=team",
    highlighted: false,
  },
]

function BorderBeam() {
  return (
    <div className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none">
      <div
        className="absolute w-24 h-24 bg-white/20 blur-xl border-beam"
        style={{
          offsetPath: "rect(0 100% 100% 0 round 16px)",
        }}
      />
    </div>
  )
}

export function Pricing() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

  return (
    <section id="pricing" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-2">
            From solo creators to enterprise teams. Pick the plan that fits.
          </p>
          <p className="text-sm text-emerald-400 mb-8">
            Credits work across Design, Develop, and Build
          </p>

          {/* Billing Toggle with animation */}
          <div className="inline-flex items-center p-1 rounded-full bg-card border border-border">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                billingCycle === "monthly" ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {billingCycle === "monthly" && (
                <motion.div
                  layoutId="billing-toggle"
                  className="absolute inset-0 bg-secondary rounded-full"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <span className="relative z-10">Monthly</span>
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                billingCycle === "yearly" ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {billingCycle === "yearly" && (
                <motion.div
                  layoutId="billing-toggle"
                  className="absolute inset-0 bg-secondary rounded-full"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <span className="relative z-10">Yearly</span>
              <span className="relative z-10 ml-2 px-2 py-0.5 text-xs bg-emerald-500/20 text-emerald-400 rounded-full">
                -20%
              </span>
            </button>
          </div>
        </motion.div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className={`relative p-6 rounded-lg border transition-all duration-300 hover:scale-[1.02] ${
                plan.highlighted
                  ? "bg-card border-emerald-500/50"
                  : "bg-card/50 border-border hover:border-border"
              }`}
            >
              {plan.highlighted && <BorderBeam />}

              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-emerald-500 text-white text-xs font-medium rounded-full">
                  Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm">{plan.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  {plan.price.monthly === 0 ? (
                    <span className="text-4xl font-bold text-foreground">Free</span>
                  ) : (
                    <>
                      <span className="text-4xl font-bold text-foreground">${plan.price[billingCycle]}</span>
                      <span className="text-muted-foreground text-sm">{plan.priceLabel || ""}/mo</span>
                    </>
                  )}
                </div>
                {billingCycle === "yearly" && plan.price.yearly > 0 && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Billed annually
                  </p>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-foreground/80">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" strokeWidth={1.5} />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full rounded-lg ${
                  plan.highlighted
                    ? "shimmer-btn bg-emerald-500 text-white hover:bg-emerald-600"
                    : "bg-secondary text-foreground hover:bg-secondary border border-border"
                }`}
                asChild
              >
                <a href={plan.ctaLink}>
                  {plan.cta}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* View all plans link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-8"
        >
          <Link href="/pricing" className="text-muted-foreground hover:text-foreground text-sm inline-flex items-center gap-1 transition-colors">
            View all plans & compare features
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
