import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "For individuals getting started",
    features: [
      { name: "1 project", included: true },
      { name: "Basic AI agents", included: true },
      { name: "Community support", included: true },
      { name: "5 generations/day", included: true },
      { name: "Custom domains", included: false },
      { name: "Priority support", included: false },
    ],
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "For professionals",
    popular: true,
    features: [
      { name: "Unlimited projects", included: true },
      { name: "All AI agents", included: true },
      { name: "Email support", included: true },
      { name: "Unlimited generations", included: true },
      { name: "Custom domains", included: true },
      { name: "Priority support", included: false },
    ],
  },
  {
    name: "Team",
    price: "$79",
    period: "/user/month",
    description: "For growing teams",
    features: [
      { name: "Everything in Pro", included: true },
      { name: "Team collaboration", included: true },
      { name: "Admin controls", included: true },
      { name: "SSO", included: true },
      { name: "Priority support", included: true },
      { name: "Custom contracts", included: false },
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations",
    features: [
      { name: "Everything in Team", included: true },
      { name: "Dedicated support", included: true },
      { name: "SLA guarantee", included: true },
      { name: "Custom integrations", included: true },
      { name: "On-premise option", included: true },
      { name: "Custom contracts", included: true },
    ],
  },
];

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Simple, transparent pricing
            </h1>
            <p className="text-lg text-muted-foreground">
              Start free, scale as you grow
            </p>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`p-6 rounded-xl border ${
                  plan.popular ? "border-foreground" : "border-border/50"
                } bg-card`}
              >
                {plan.popular && (
                  <div className="text-xs font-medium text-foreground mb-4">
                    Most popular
                  </div>
                )}
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <div className="mt-2 mb-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-muted-foreground">{plan.period}</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  {plan.description}
                </p>
                <Button className="w-full mb-6" variant={plan.popular ? "default" : "outline"}>
                  {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                </Button>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature.name} className="flex items-center text-sm">
                      {feature.included ? (
                        <Check className="size-4 text-green-500 mr-2" />
                      ) : (
                        <X className="size-4 text-muted-foreground/50 mr-2" />
                      )}
                      <span className={feature.included ? "" : "text-muted-foreground/50"}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
