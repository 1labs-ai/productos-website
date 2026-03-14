"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Star, Quote } from "lucide-react"
import Image from "next/image"

// Testimonials data
const testimonials = [
  {
    quote: "I went from idea to live product in 6 days. ProductOS handled research, PRD, designs, and code. I just guided it.",
    author: "Sarah Chen",
    role: "Founder",
    company: "DataFlow",
    avatar: "/avatars/sarah.jpg",
    rating: 5,
  },
  {
    quote: "It's like having a product team on demand. The agents actually build on each other's work — research informs the PRD, PRD shapes the design.",
    author: "Marcus Johnson",
    role: "Solo Founder",
    company: "TechStart",
    avatar: "/avatars/marcus.jpg",
    rating: 5,
  },
  {
    quote: "We shipped our MVP in under 2 weeks. What would have cost us $50k in dev work, ProductOS did for a fraction of the cost.",
    author: "Elena Rodriguez",
    role: "CEO",
    company: "Nexus AI",
    avatar: "/avatars/elena.jpg",
    rating: 5,
  },
  {
    quote: "The code quality surprised me. TypeScript, tests, proper architecture — it's production-ready, not prototype garbage.",
    author: "James Park",
    role: "Technical Founder",
    company: "CloudSync",
    avatar: "/avatars/james.jpg",
    rating: 5,
  },
  {
    quote: "Finally, a tool that understands product thinking. It doesn't just write code — it thinks through the entire user journey first.",
    author: "Aisha Patel",
    role: "Product Lead",
    company: "Metric Labs",
    avatar: "/avatars/aisha.jpg",
    rating: 5,
  },
  {
    quote: "Went from napkin sketch to deployed SaaS in 10 days. My co-founder thought I hired a full team.",
    author: "David Kim",
    role: "Founder",
    company: "Automate.io",
    avatar: "/avatars/david.jpg",
    rating: 5,
  },
]

// Single testimonial card
function TestimonialCard({ 
  testimonial, 
  index,
  isActive = false 
}: { 
  testimonial: Testimonial
  index: number
  isActive?: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative p-6 rounded-2xl border transition-all duration-500 ${
        isActive 
          ? "bg-card/80 border-border/50 scale-100" 
          : "bg-card/40 border-border/20 scale-[0.98]"
      }`}
    >
      {/* Quote icon */}
      <div className="absolute top-4 right-4 opacity-10">
        <Quote className="w-8 h-8 text-foreground" />
      </div>

      {/* Rating */}
      <div className="flex gap-0.5 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-foreground/90 leading-relaxed mb-6 text-[15px]">
        "{testimonial.quote}"
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-muted to-muted-foreground/20 flex items-center justify-center font-semibold text-sm text-foreground/60 overflow-hidden">
          {testimonial.author.charAt(0)}
        </div>
        <div>
          <div className="font-medium text-foreground text-sm">{testimonial.author}</div>
          <div className="text-xs text-muted-foreground">
            {testimonial.role}, {testimonial.company}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Testimonial type
type Testimonial = {
  quote: string
  author: string
  role: string
  company: string
  avatar: string
  rating: number
}

// Infinite scroll row
function ScrollRow({ 
  items, 
  direction = "left",
  speed = 30
}: { 
  items: Testimonial[]
  direction?: "left" | "right"
  speed?: number
}) {
  return (
    <div className="relative overflow-hidden">
      {/* Gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      
      <motion.div
        className="flex gap-6"
        animate={{
          x: direction === "left" ? [0, -50 * items.length * 16] : [-50 * items.length * 16, 0],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        {/* Double the items for seamless loop */}
        {[...items, ...items].map((testimonial, index) => (
          <div key={index} className="flex-shrink-0 w-[400px]">
            <TestimonialCard 
              testimonial={testimonial} 
              index={index % items.length}
              isActive={true}
            />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export function TestimonialsFlow() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [isPaused, setIsPaused] = useState(false)

  // Split testimonials into two rows
  const row1 = testimonials.slice(0, 3)
  const row2 = testimonials.slice(3, 6)

  return (
    <section 
      ref={sectionRef} 
      className="py-24 bg-card/30 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-[1436px] mx-auto px-6 lg:px-[50px]">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
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

      {/* Scrolling testimonials - full width */}
      <div className="space-y-6">
        <ScrollRow items={row1} direction="left" speed={40} />
        <ScrollRow items={row2} direction="right" speed={45} />
      </div>

      {/* Bottom stats/trust indicators */}
      <div className="max-w-[1436px] mx-auto px-6 lg:px-[50px] mt-16">
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
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-muted to-muted-foreground/30 border-2 border-background flex items-center justify-center text-xs font-medium text-foreground/60"
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
                <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
              ))}
            </div>
            <span>4.9/5 average rating</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
