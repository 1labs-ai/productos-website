"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "How do you ensure quality in your work?",
    answer: "Each stage is AI-assisted with validations, code QA, and human review. We ship production-grade code with best practices baked in.",
  },
  {
    question: "How long does it take to launch?",
    answer: "Typical delivery is 3–12 days depending on scope. Templates and agents accelerate research, PRD, design, and code.",
  },
  {
    question: "Do you provide ongoing support?",
    answer: "Yes. We offer ongoing maintenance, iteration sprints, and feature shipping via the same 5-stage pipeline.",
  },
  {
    question: "Who owns the IP and code?",
    answer: "You do. Repos, infrastructure, and generated assets are transferred fully to your org.",
  },
  {
    question: "Can I use my own design system?",
    answer: "Absolutely. ProductOS can work with your existing design tokens and component library, or generate new ones based on your brand.",
  },
  {
    question: "What tech stack do you support?",
    answer: "We primarily ship React/Next.js with TypeScript, but can adapt to your stack. Backend options include Supabase, Firebase, or custom APIs.",
  },
]

function FAQItem({ faq, index, isInView }: { faq: typeof faqs[0]; index: number; isInView: boolean }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
      className="border-b border-border last:border-b-0"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left"
      >
        <span className="font-medium text-foreground pr-4">{faq.question}</span>
        <ChevronDown
          className={`w-5 h-5 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="pb-6 text-muted-foreground leading-relaxed">{faq.answer}</p>
      </motion.div>
    </motion.div>
  )
}

export function FAQ() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-muted-foreground uppercase tracking-wider text-sm mb-4">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground">
            Answers to common questions about ProductOS.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-lg bg-card border border-border px-6"
        >
          {faqs.map((faq, index) => (
            <FAQItem key={faq.question} faq={faq} index={index} isInView={isInView} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
