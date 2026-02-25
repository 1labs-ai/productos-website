import { SmoothScroll } from "@/components/smooth-scroll"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { LogoMarquee } from "@/components/logo-marquee"
import { StickyStages } from "@/components/sticky-stages"
import { ImpactStats } from "@/components/impact-stats"
import { WhyAINative } from "@/components/why-ai-native"
import { Testimonials } from "@/components/testimonials"
import { Integrations } from "@/components/integrations"
import { Pricing } from "@/components/pricing"
import { FAQ } from "@/components/faq"
import { FinalCTA } from "@/components/final-cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-zinc-950">
        <Navbar />
        <Hero />
        <LogoMarquee />
        <StickyStages />
        <ImpactStats />
        <WhyAINative />
        <Testimonials />
        <Integrations />
        <Pricing />
        <FAQ />
        <FinalCTA />
        <Footer />
      </main>
    </SmoothScroll>
  )
}
