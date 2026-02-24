import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, transparent pricing for ProductOS. Start free, scale as you grow.",
  openGraph: {
    title: "Pricing | ProductOS",
    description: "Simple, transparent pricing for ProductOS.",
  },
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold text-center mb-4">Pricing</h1>
        <p className="text-muted-foreground text-center text-lg">
          Simple, transparent pricing for ProductOS. Start free, scale as you
          grow.
        </p>
      </div>
    </main>
  );
}
