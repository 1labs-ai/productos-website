"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Heart,
  Zap,
  Users,
  Rocket,
  Target,
} from "lucide-react";
import {
  PageHero,
  StatsGrid,
  SectionHeader,
  FeatureGrid,
  TeamGrid,
  CTASection,
} from "@/components/shared";

export default function AboutPage() {
  const stats = [
    { value: "10,000+", label: "Founders Served" },
    { value: "50,000+", label: "Products Built" },
    { value: "1M+", label: "AI Generations" },
    { value: "4.9/5", label: "User Rating" },
  ];

  const values = [
    {
      icon: Sparkles,
      title: "AI-First",
      description:
        "We believe AI should augment human creativity, not replace it. Every feature is designed with AI at its core.",
    },
    {
      icon: Users,
      title: "Builder Obsessed",
      description:
        "We're founders ourselves. We build tools we want to use, solving real problems we've experienced.",
    },
    {
      icon: Rocket,
      title: "Ship Fast",
      description:
        "The best product wins. We iterate quickly, ship often, and learn from our users constantly.",
    },
    {
      icon: Heart,
      title: "Radically Transparent",
      description:
        "Open roadmap, public changelog, honest communication. We build in public and share our journey.",
    },
  ];

  const team = [
    {
      name: "Alex Chen",
      role: "CEO & Co-founder",
      bio: "Former PM at Google. Built 3 startups. Obsessed with AI and product development.",
      initials: "AC",
      social: { twitter: "#", linkedin: "#" },
    },
    {
      name: "Sarah Kim",
      role: "CTO & Co-founder",
      bio: "Ex-engineering lead at Stripe. 15 years building scalable systems.",
      initials: "SK",
      social: { twitter: "#", linkedin: "#" },
    },
    {
      name: "Marcus Johnson",
      role: "Head of AI",
      bio: "PhD in ML from Stanford. Previously at OpenAI research team.",
      initials: "MJ",
      social: { twitter: "#", linkedin: "#" },
    },
    {
      name: "Emma Williams",
      role: "Head of Design",
      bio: "Former design lead at Figma. Passionate about developer tools.",
      initials: "EW",
      social: { twitter: "#", linkedin: "#" },
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <PageHero
        badge={{ icon: Target, text: "About ProductOS" }}
        title="Making product development"
        titleHighlight="accessible to everyone."
        description="We're on a mission to democratize product development. With AI as your co-pilot, building great products shouldn't require a massive team or years of experience."
      />

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <StatsGrid stats={stats} columns={4} />
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-muted/50 border border-border/50 mb-6">
                <Sparkles className="size-3.5 text-amber-500" />
                <span className="text-sm font-medium text-foreground/80">
                  Our Mission
                </span>
              </div>

              <h2
                className="text-3xl sm:text-4xl font-bold text-foreground mb-6"
                style={{ letterSpacing: "-0.02em" }}
              >
                Empowering solo founders and small teams
              </h2>

              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  The best products aren&apos;t always built by the biggest
                  teams. Some of the most innovative solutions come from solo
                  founders and small, scrappy teams who deeply understand their
                  users&apos; problems.
                </p>
                <p>
                  But building a product is hard. Market research, PRDs,
                  designs, code—it traditionally requires specialists in each
                  area. We&apos;re changing that.
                </p>
                <p className="text-foreground font-medium">
                  ProductOS gives every founder access to AI-powered expertise
                  across the entire product development lifecycle. From idea to
                  launch, we&apos;re your complete product team.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative p-8 rounded-xl bg-card border border-border/50"
            >
              <div
                className="absolute inset-0 rounded-xl pointer-events-none opacity-30"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 60% at 50% 100%, hsl(240 10% 15% / 0.5) 0%, transparent 70%)",
                }}
              />

              <div className="relative z-10">
                <h3 className="text-lg font-semibold text-foreground mb-6">
                  What we believe
                </h3>
                <ul className="space-y-4">
                  {[
                    "AI should augment human creativity, not replace it",
                    "Great products can come from anywhere",
                    "Speed matters — ship fast, learn faster",
                    "Building in public creates accountability",
                  ].map((belief, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-foreground/80"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-foreground/40 mt-2 shrink-0" />
                      {belief}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="Our values"
            description="The principles that guide everything we build."
          />
          <FeatureGrid features={values} columns={4} />
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="Meet the team"
            description="We're a small team of builders, designers, and AI enthusiasts passionate about making product development better."
          />
          <TeamGrid members={team} columns={4} />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-12"
          >
            <p className="text-muted-foreground">
              Built with ❤️ in India
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        badge={{ icon: Zap, text: "Join us" }}
        title="Ready to build something amazing?"
        description="Join our private beta and be among the first founders to experience AI-native product development."
        primaryAction={{
          label: "Request Early Access",
          href: "/early-access",
        }}
        secondaryAction={{
          label: "Back to Home",
          href: "/",
        }}
        footnote="Private beta · Limited spots available"
      />
    </>
  );
}
