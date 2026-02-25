"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const testimonials = [
  {
    quote: "Launched MVP in 12 days; onboarding paid users a week later. ProductOS killed the context switching.",
    name: "Sarah Jenkins",
    title: "CEO, FinFlow (YC W23)",
  },
  {
    quote: "Pre-seed in 3 weeks. Research + PRD stages shaped our pitch while code shipped in parallel.",
    name: "Michael Ross",
    title: "Founder, DataMind",
  },
  {
    quote: "1,200 DAU and zero downtime. Context stayed intact from research to design to code.",
    name: "Alex Lee",
    title: "CTO, Nexus Health",
  },
  {
    quote: "Design matched the PRD pixel-for-pixel. Agents kept tokens, components, and copy synced.",
    name: "Priya Iyer",
    title: "Design Lead, Forma",
  },
  {
    quote: "Edge deploy with 24 passing tests on day 10. Zero handoff friction between design and code.",
    name: "Ramon Diaz",
    title: "VP Eng, Ledgerly",
  },
  {
    quote: "PRD was live on day 3. By day 7 we had clickable design and by day 12 production code.",
    name: "Sebastian Deb",
    title: "Founder, DeltaOps",
  },
]

export function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-zinc-500 uppercase tracking-wider text-sm mb-4">Customer Success</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Hear From Our Customers
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-sm text-zinc-400">
              200+ founders shipped with ProductOS
            </span>
            <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-sm text-zinc-400">
              Context-preserving handoffs
            </span>
            <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-sm text-zinc-400">
              MVPs in 3–12 days
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all"
            >
              <p className="text-zinc-300 mb-6 leading-relaxed">"{testimonial.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
                  <span className="text-sm font-medium text-zinc-400">
                    {testimonial.name.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-white">{testimonial.name}</div>
                  <div className="text-sm text-zinc-500">{testimonial.title}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
