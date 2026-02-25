"use client"

import { motion } from "framer-motion"

const testimonials = [
  {
    quote: "It was night and day from one batch to another, adoption went from single digits to over 80%. It just spread like wildfire, all the best builders were using ProductOS.",
    author: "Diana Hu",
    role: "General Partner, Y Combinator",
    initials: "DH",
  },
  {
    quote: "ProductOS helped us ship 50% more features while maintaining quality. Every one of our product teams now uses it.",
    author: "Engineering Lead",
    role: "Fortune 500 Company",
    initials: "EL",
  },
  {
    quote: "The context preservation is what sets ProductOS apart. Research flows into PRD, PRD flows into design, design flows into code. Nothing gets lost.",
    author: "Priya Iyer",
    role: "Design Lead, Forma",
    initials: "PI",
  },
]

export function Testimonials() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Trusted by product teams worldwide
          </h2>
          <p className="text-muted-foreground">
            See what teams are saying about ProductOS
          </p>
        </motion.div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-sm bg-card border border-border"
            >
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-sm font-medium text-muted-foreground">
                  {testimonial.initials}
                </div>
                <div>
                  <div className="text-sm font-medium">{testimonial.author}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
