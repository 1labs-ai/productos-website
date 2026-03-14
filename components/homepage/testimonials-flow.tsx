"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Star } from "lucide-react"

// Testimonial type
type Testimonial = {
  quote: string
  author: string
  role: string
  company: string
  rating: number
}

// Testimonials data
const testimonials: Testimonial[] = [
  {
    quote: "I went from idea to live product in 6 days. ProductOS handled research, PRD, designs, and code. I just guided it.",
    author: "Sarah Chen",
    role: "Founder",
    company: "DataFlow",
    rating: 5,
  },
  {
    quote: "It's like having a product team on demand. The agents actually build on each other's work — research informs the PRD, PRD shapes the design.",
    author: "Marcus Johnson",
    role: "Solo Founder",
    company: "TechStart",
    rating: 5,
  },
  {
    quote: "We shipped our MVP in under 2 weeks. What would have cost us $50k in dev work, ProductOS did for a fraction of the cost.",
    author: "Elena Rodriguez",
    role: "CEO",
    company: "Nexus AI",
    rating: 5,
  },
  {
    quote: "The code quality surprised me. TypeScript, tests, proper architecture — it's production-ready, not prototype garbage.",
    author: "James Park",
    role: "Technical Founder",
    company: "CloudSync",
    rating: 5,
  },
  {
    quote: "Finally, a tool that understands product thinking. It doesn't just write code — it thinks through the entire user journey first.",
    author: "Aisha Patel",
    role: "Product Lead",
    company: "Metric Labs",
    rating: 5,
  },
  {
    quote: "Went from napkin sketch to deployed SaaS in 10 days. My co-founder thought I hired a full team.",
    author: "David Kim",
    role: "Founder",
    company: "Automate.io",
    rating: 5,
  },
]

// Single testimonial card with fixed height
function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex-shrink-0 w-[350px] h-[220px] p-6 rounded-2xl bg-card/60 border border-border/50 flex flex-col">
      {/* Rating */}
      <div className="flex gap-0.5 mb-3">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-amber-500/80 text-amber-500/80" />
        ))}
      </div>

      {/* Quote - fixed height with line clamp */}
      <blockquote className="text-foreground/90 leading-relaxed text-sm flex-1 line-clamp-4">
        {testimonial.quote}
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border/40">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center font-semibold text-sm text-white/80">
          {testimonial.author.charAt(0)}
        </div>
        <div>
          <div className="font-medium text-foreground text-sm">{testimonial.author}</div>
          <div className="text-xs text-muted-foreground">
            {testimonial.role}, {testimonial.company}
          </div>
        </div>
      </div>
    </div>
  )
}

// Infinite scroll row using CSS animation
function InfiniteScrollRow({ 
  items, 
  direction = "left",
  duration = 30
}: { 
  items: Testimonial[]
  direction?: "left" | "right"
  duration?: number
}) {
  // Triple the items for seamless infinite loop
  const tripled = [...items, ...items, ...items]
  
  return (
    <div className="relative overflow-hidden">
      {/* Gradient masks for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      
      <div 
        className={`flex gap-5 ${direction === "left" ? "animate-scroll-left" : "animate-scroll-right"}`}
        style={{
          animationDuration: `${duration}s`,
        }}
      >
        {tripled.map((testimonial, index) => (
          <TestimonialCard key={`${testimonial.author}-${index}`} testimonial={testimonial} />
        ))}
      </div>
    </div>
  )
}

export function TestimonialsFlow() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  // Split testimonials into two rows
  const row1 = testimonials.slice(0, 3)
  const row2 = testimonials.slice(3, 6)

  return (
    <section 
      ref={sectionRef} 
      className="py-24 bg-card/20 overflow-hidden"
    >
      <div className="max-w-[1436px] mx-auto px-6 lg:px-[50px]">
        {/* Header */}
        <motion.div 
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
            Testimonials
          </p>
          <h2 
            className="text-3xl sm:text-4xl lg:text-[48px] font-medium" 
            style={{ lineHeight: 1, letterSpacing: '-0.022em' }}
          >
            Founders shipping faster
          </h2>
        </motion.div>
      </div>

      {/* Scrolling testimonials - full width, two rows */}
      <div className="space-y-5">
        <InfiniteScrollRow items={row1} direction="left" duration={35} />
        <InfiniteScrollRow items={row2} direction="right" duration={40} />
      </div>

      {/* Bottom trust indicators */}
      <div className="max-w-[1436px] mx-auto px-6 lg:px-[50px] mt-14">
        <motion.div 
          className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {['S', 'M', 'E', 'J'].map((initial, i) => (
                <div 
                  key={i}
                  className="w-7 h-7 rounded-full bg-gradient-to-br from-zinc-600 to-zinc-700 border-2 border-background flex items-center justify-center text-xs font-medium text-white/70"
                >
                  {initial}
                </div>
              ))}
            </div>
            <span>500+ founders building with ProductOS</span>
          </div>
          <div className="h-4 w-px bg-border hidden sm:block" />
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-500/80 text-amber-500/80" />
              ))}
            </div>
            <span>4.9/5 average rating</span>
          </div>
        </motion.div>
      </div>

      {/* CSS for infinite scroll animation */}
      <style jsx global>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-350px * 3 - 20px * 3));
          }
        }
        
        @keyframes scroll-right {
          0% {
            transform: translateX(calc(-350px * 3 - 20px * 3));
          }
          100% {
            transform: translateX(0);
          }
        }
        
        .animate-scroll-left {
          animation: scroll-left linear infinite;
        }
        
        .animate-scroll-right {
          animation: scroll-right linear infinite;
        }
      `}</style>
    </section>
  )
}
