import { Hero } from "@/components/hero"
import { LogoMarquee } from "@/components/logo-marquee"
import { StickyStages } from "@/components/sticky-stages"
import { Testimonials } from "@/components/testimonials"
import { FinalCTA } from "@/components/final-cta"

export default function Home() {
  return (
    <>
      <Hero />
      <LogoMarquee />
      <StickyStages />
      <Testimonials />
      <FinalCTA />
    </>
  )
}
