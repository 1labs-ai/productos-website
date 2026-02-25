import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { LogoMarquee } from "@/components/logo-marquee"
import { BentoGrid } from "@/components/bento-grid"
import { Testimonials } from "@/components/testimonials"
import { Pricing } from "@/components/pricing"
import { FinalCTA } from "@/components/final-cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <LogoMarquee />
      <BentoGrid />
      <Testimonials />
      <Pricing />
      <FinalCTA />
      <Footer />
    </main>
  )
}
