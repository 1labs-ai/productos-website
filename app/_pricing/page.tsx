"use client";

import { Button } from "@/components/ui/button";
import { AnimatedSection, AnimatedScale } from "@/components/ui/animated-section";
import { SectionHeader, CTASection } from "@/components/shared";
import { Check, X, HelpCircle, Zap, ArrowRight, Users } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

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
  );
}

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const individualPlans = [
    {
      name: "Free",
      price: { monthly: 0, yearly: 0 },
      description: "For individuals getting started",
      features: [
        { name: "1 project", included: true },
        { name: "50 AI credits/month", included: true },
        { name: "3 stage actions/month", included: true },
        { name: "GPT-4o mini model", included: true },
        { name: "Community support", included: true },
      ],
      cta: "Get Started",
      ctaLink: "https://build.productos.dev/sign-up",
      highlighted: false,
    },
    {
      name: "Starter",
      price: { monthly: 15, yearly: 12 },
      description: "For growing product builders",
      features: [
        { name: "5 projects", included: true },
        { name: "300 AI credits/month", included: true },
        { name: "20 stage actions/month", included: true },
        { name: "GPT-4o model", included: true },
        { name: "PRD generation", included: true },
        { name: "Basic roadmap builder", included: true },
        { name: "Email support", included: true },
      ],
      cta: "Start Free Trial",
      ctaLink: "https://build.productos.dev/sign-up?plan=starter",
      highlighted: false,
    },
    {
      name: "Pro",
      price: { monthly: 29, yearly: 24 },
      description: "Full power for serious makers",
      features: [
        { name: "Unlimited projects", included: true },
        { name: "1,000 AI credits/month", included: true },
        { name: "66 stage actions/month", included: true },
        { name: "All AI models", included: true },
        { name: "Full PRD & roadmap", included: true },
        { name: "Research agent", included: true },
        { name: "Code generation", included: true },
        { name: "Priority support", included: true },
      ],
      cta: "Start Free Trial",
      ctaLink: "https://build.productos.dev/sign-up?plan=pro",
      highlighted: true,
    },
    {
      name: "Max",
      price: { monthly: 59, yearly: 49 },
      description: "Power users, priority access",
      features: [
        { name: "Everything in Pro", included: true },
        { name: "3,000 AI credits/month", included: true },
        { name: "200 stage actions/month", included: true },
        { name: "Priority model access", included: true },
        { name: "Dedicated support", included: true },
        { name: "Early access to features", included: true },
      ],
      cta: "Start Free Trial",
      ctaLink: "https://build.productos.dev/sign-up?plan=max",
      highlighted: false,
    },
  ];

  const businessPlans = [
    {
      name: "Team",
      price: { monthly: 29, yearly: 24 },
      priceLabel: "/user",
      description: "For collaborative teams",
      features: [
        { name: "Everything in Pro", included: true },
        { name: "2,000 AI credits/user/month", included: true },
        { name: "133 stage actions/user/month", included: true },
        { name: "Team collaboration", included: true },
        { name: "Shared workspaces", included: true },
        { name: "Admin controls", included: true },
        { name: "Usage analytics", included: true },
        { name: "SLA guarantee", included: true },
      ],
      cta: "Start Team Trial",
      ctaLink: "https://build.productos.dev/sign-up?plan=team",
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: { monthly: 0, yearly: 0 },
      priceLabel: "Custom",
      description: "Custom solutions at scale",
      features: [
        { name: "Everything in Team", included: true },
        { name: "Unlimited AI credits", included: true },
        { name: "SSO / SAML", included: true },
        { name: "Custom integrations", included: true },
        { name: "Dedicated account manager", included: true },
        { name: "SLA guarantees", included: true },
        { name: "On-premise option", included: true },
        { name: "Custom contracts", included: true },
      ],
      cta: "Contact Sales",
      ctaLink: "mailto:enterprise@productos.dev",
      highlighted: false,
    },
  ];

  const faqs = [
    {
      question: "Is there a free plan?",
      answer: "Yes! Our Free plan includes 1 project, 50 AI credits per month, and access to GPT-4o mini. It's perfect for individuals just getting started with product development.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express) through our secure payment processor Stripe.",
    },
    {
      question: "Can I change my plan later?",
      answer: "Yes! You can upgrade or downgrade your plan at any time. Upgrades take effect immediately, and downgrades apply at the end of your billing cycle.",
    },
    {
      question: "What happens if I exceed my credits?",
      answer: "You can purchase additional credits or upgrade to a higher plan. We'll notify you when you're approaching your limit.",
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 14-day money-back guarantee for new subscribers. Contact support if you're not satisfied.",
    },
    {
      question: "Is there a free trial?",
      answer: "Yes! All paid plans include a 14-day free trial so you can explore all features before committing. You can also start with our free plan to try the basics.",
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-4">
              From solo creators to enterprise teams. Pick the plan that fits your product development needs.
            </p>
            <p className="text-sm text-emerald-400 mb-8">
              Your credits work across Design, Develop, and Build — seamless cross-surface workflow
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center p-1 rounded-full bg-card border border-border">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  billingCycle === "monthly" ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {billingCycle === "monthly" && (
                  <motion.div
                    layoutId="pricing-billing-toggle"
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
                    layoutId="pricing-billing-toggle"
                    className="absolute inset-0 bg-secondary rounded-full"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <span className="relative z-10">Yearly</span>
                <span className="relative z-10 ml-2 px-2 py-0.5 text-xs bg-emerald-500/20 text-emerald-400 rounded-full">
                  Save 20%
                </span>
              </button>
            </div>
          </AnimatedSection>

          {/* Individual Plans */}
          <div className="mb-16">
            <AnimatedSection className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">Individual Plans</h2>
              <p className="text-muted-foreground">For Solo Creators & Builders</p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {individualPlans.map((plan, index) => (
                <AnimatedScale key={plan.name} delay={index * 0.1}>
                  <div
                    className={`relative p-6 rounded-lg border transition-all duration-300 hover:scale-[1.02] h-full flex flex-col ${
                      plan.highlighted
                        ? "bg-card border-emerald-500/50"
                        : "bg-card/50 border-border/50 hover:border-border"
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
                            <span className="text-4xl font-bold text-foreground">
                              ${plan.price[billingCycle]}
                            </span>
                            <span className="text-muted-foreground text-sm">/ mo</span>
                          </>
                        )}
                      </div>
                      {billingCycle === "yearly" && plan.price.yearly > 0 && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Billed annually (${plan.price.yearly * 12}/year)
                        </p>
                      )}
                    </div>

                    <ul className="space-y-3 mb-8 flex-grow">
                      {plan.features.map((feature) => (
                        <li key={feature.name} className="flex items-center gap-3 text-sm">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0" strokeWidth={1.5} />
                          <span className="text-foreground/80">{feature.name}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className={`w-full rounded-lg ${
                        plan.highlighted
                          ? "bg-emerald-500 text-white hover:bg-emerald-600"
                          : "bg-secondary text-foreground hover:bg-secondary/80 border border-border"
                      }`}
                      asChild
                    >
                      <a href={plan.ctaLink}>
                        {plan.cta}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  </div>
                </AnimatedScale>
              ))}
            </div>
          </div>

          {/* Business Plans */}
          <div className="mb-16">
            <AnimatedSection className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">Business Plans</h2>
              <p className="text-muted-foreground">For Teams & Organizations</p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {businessPlans.map((plan, index) => (
                <AnimatedScale key={plan.name} delay={index * 0.1}>
                  <div
                    className={`relative p-6 rounded-lg border transition-all duration-300 hover:scale-[1.02] h-full flex flex-col ${
                      plan.highlighted
                        ? "bg-card border-emerald-500/50"
                        : "bg-card/50 border-border/50 hover:border-border"
                    }`}
                  >
                    {plan.highlighted && <BorderBeam />}
                    {plan.highlighted && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-emerald-500 text-white text-xs font-medium rounded-full flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        Teams
                      </div>
                    )}

                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-foreground mb-2">{plan.name}</h3>
                      <p className="text-muted-foreground text-sm">{plan.description}</p>
                    </div>

                    <div className="mb-6">
                      <div className="flex items-baseline gap-1">
                        {plan.priceLabel === "Custom" ? (
                          <span className="text-4xl font-bold text-foreground">Custom</span>
                        ) : (
                          <>
                            <span className="text-4xl font-bold text-foreground">
                              ${plan.price[billingCycle]}
                            </span>
                            <span className="text-muted-foreground text-sm">{plan.priceLabel} / mo</span>
                          </>
                        )}
                      </div>
                      {billingCycle === "yearly" && plan.price.yearly > 0 && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Billed annually per user
                        </p>
                      )}
                    </div>

                    <ul className="space-y-3 mb-8 flex-grow">
                      {plan.features.map((feature) => (
                        <li key={feature.name} className="flex items-center gap-3 text-sm">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0" strokeWidth={1.5} />
                          <span className="text-foreground/80">{feature.name}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className={`w-full rounded-lg ${
                        plan.highlighted
                          ? "bg-emerald-500 text-white hover:bg-emerald-600"
                          : "bg-secondary text-foreground hover:bg-secondary/80 border border-border"
                      }`}
                      asChild
                    >
                      <a href={plan.ctaLink}>
                        {plan.cta}
                        {plan.name !== "Enterprise" && <ArrowRight className="w-4 h-4 ml-2" />}
                      </a>
                    </Button>
                  </div>
                </AnimatedScale>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-24 px-4 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Compare Plans"
            description="See what's included in each plan"
          />

          <AnimatedSection>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 text-muted-foreground font-medium">Feature</th>
                    <th className="text-center py-4 px-4 font-semibold text-foreground">Free</th>
                    <th className="text-center py-4 px-4 font-semibold text-foreground">Starter</th>
                    <th className="text-center py-4 px-4 font-semibold text-foreground bg-emerald-500/10">Pro</th>
                    <th className="text-center py-4 px-4 font-semibold text-foreground">Max</th>
                    <th className="text-center py-4 px-4 font-semibold text-foreground">Team</th>
                    <th className="text-center py-4 px-4 font-semibold text-foreground">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: "Monthly Price", free: "Free", starter: "$15/mo", pro: "$29/mo", max: "$59/mo", team: "$29/user/mo", enterprise: "Custom" },
                    { feature: "Yearly Price", free: "Free", starter: "$12/mo", pro: "$24/mo", max: "$49/mo", team: "$24/user/mo", enterprise: "Custom" },
                    { feature: "Projects", free: "1", starter: "5", pro: "Unlimited", max: "Unlimited", team: "Unlimited", enterprise: "Unlimited" },
                    { feature: "AI Credits/month", free: "50", starter: "300", pro: "1,000", max: "3,000", team: "2,000/user", enterprise: "Unlimited" },
                    { feature: "Stage Actions/month", free: "3", starter: "20", pro: "66", max: "200", team: "133/user", enterprise: "Unlimited" },
                    { feature: "AI Models", free: "GPT-4o mini", starter: "GPT-4o", pro: "All models", max: "All + Priority", team: "All models", enterprise: "All + Custom" },
                    { feature: "PRD Generation", free: "—", starter: "✓", pro: "✓", max: "✓", team: "✓", enterprise: "✓" },
                    { feature: "Roadmap Builder", free: "—", starter: "Basic", pro: "Full", max: "Full", team: "Full", enterprise: "Full" },
                    { feature: "Research Agent", free: "—", starter: "—", pro: "✓", max: "✓", team: "✓", enterprise: "✓" },
                    { feature: "Code Generation", free: "—", starter: "—", pro: "✓", max: "✓", team: "✓", enterprise: "✓" },
                    { feature: "Team Collaboration", free: "—", starter: "—", pro: "—", max: "—", team: "✓", enterprise: "✓" },
                    { feature: "SSO / SAML", free: "—", starter: "—", pro: "—", max: "—", team: "—", enterprise: "✓" },
                    { feature: "Support", free: "Community", starter: "Email", pro: "Priority", max: "Dedicated", team: "Dedicated", enterprise: "Dedicated + SLA" },
                  ].map((row) => (
                    <tr key={row.feature} className="border-b border-border/50">
                      <td className="py-4 px-4 text-foreground font-medium">{row.feature}</td>
                      <td className="py-4 px-4 text-center text-muted-foreground">{row.free}</td>
                      <td className="py-4 px-4 text-center text-muted-foreground">{row.starter}</td>
                      <td className="py-4 px-4 text-center text-foreground bg-emerald-500/5">{row.pro}</td>
                      <td className="py-4 px-4 text-center text-foreground">{row.max}</td>
                      <td className="py-4 px-4 text-center text-foreground">{row.team}</td>
                      <td className="py-4 px-4 text-center text-foreground">{row.enterprise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* AI Credits Section */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <p className="text-sm text-emerald-400 font-medium uppercase tracking-wider mb-4">CREDITS</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              AI Credits That Never Expire
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Need more power? Purchase AI credits that never expire. Use them whenever you need extra generation power—no monthly limits or pressure to use them quickly.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { credits: 300, price: 25, popular: true },
              { credits: 1000, price: 75, popular: false },
              { credits: 3000, price: 200, popular: false },
            ].map((pack) => (
              <AnimatedScale key={pack.credits}>
                <div className={`relative p-6 rounded-lg border transition-all duration-300 hover:scale-[1.02] ${
                  pack.popular ? "bg-card border-emerald-500/50" : "bg-card/50 border-border/50"
                }`}>
                  {pack.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-emerald-500 text-white text-xs font-medium rounded-full">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-foreground mb-2">{pack.credits.toLocaleString()} Credits</h3>
                  <p className="text-3xl font-bold text-foreground mb-4">${pack.price}<span className="text-sm text-muted-foreground font-normal"> one-time</span></p>
                  <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-500" />
                      Credits never expire
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-500" />
                      15 credits per stage action
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-500" />
                      Works across all ProductOS surfaces
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-500" />
                      Auto-used when monthly limit reached
                    </li>
                  </ul>
                  <Button className="w-full bg-secondary text-foreground hover:bg-secondary/80 border border-border" asChild>
                    <a href="https://build.productos.dev/sign-up">
                      Buy Credits
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </div>
              </AnimatedScale>
            ))}
          </div>

          <AnimatedSection className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              Credits provide AI usage but do not unlock Pro features. <Link href="mailto:enterprise@productos.dev" className="text-foreground hover:underline">Contact us</Link> for custom credit packages.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Everything you need to know about our pricing
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <AnimatedSection key={faq.question} delay={index * 0.05}>
                <div className="p-6 rounded-lg bg-card border border-border/50 hover:border-border transition-all">
                  <div className="flex gap-3">
                    <HelpCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                      <p className="text-muted-foreground text-sm">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Credits Explanation */}
      <section className="py-16 px-4 bg-card/30">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <p className="text-muted-foreground mb-2">
              <span className="text-foreground font-medium">15 credits per stage action.</span> Every credit powers your journey from concept to code.
            </p>
            <p className="text-sm text-muted-foreground">
              Start in Design or Develop, continue your journey in Build — seamless cross-surface workflow
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        badge={{ icon: Zap, text: "Start Building" }}
        title="Ready to build your product?"
        description="Join thousands of founders who are building their products with ProductOS. Start for free, no credit card required."
        primaryAction={{
          label: "Get Started Free",
          href: "https://build.productos.dev/sign-up",
          icon: ArrowRight,
        }}
        secondaryAction={{
          label: "Talk to Sales",
          href: "mailto:enterprise@productos.dev",
        }}
      />
    </>
  );
}
