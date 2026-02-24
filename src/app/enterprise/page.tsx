import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enterprise",
  description:
    "Enterprise-grade AI product development. Trusted by Fortune 500 companies.",
  openGraph: {
    title: "Enterprise | ProductOS",
    description: "Enterprise-grade AI product development.",
  },
};

export default function EnterprisePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold text-center mb-4">Enterprise</h1>
        <p className="text-muted-foreground text-center text-lg">
          Enterprise-grade AI product development. Trusted by Fortune 500
          companies.
        </p>
      </div>
    </main>
  );
}
