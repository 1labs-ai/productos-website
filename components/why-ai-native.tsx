"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Brain, Sparkles, Building2, Workflow } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI-Native Intelligence",
    description: "Access contextual, real-time insights to drive systematic product decisions. Specialized AI agents understand your complete project context.",
  },
  {
    icon: Sparkles,
    title: "Contextual Intelligence",
    description: "Make strategic decisions with live product insights and real-time development data. Every stage builds on the previous one.",
  },
  {
    icon: Building2,
    title: "Enterprise Integration",
    description: "Connect teams and workflows with intelligent development orchestration. Seamlessly integrate with your existing tools.",
  },
  {
    icon: Workflow,
    title: "AI-Native Workflows",
    description: "Build systematic workflows that optimize multi-stage processes across tools. Our 5-stage framework eliminates fragmentation.",
  },
]

export function WhyAINative() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-zinc-500 uppercase tracking-wider text-sm mb-4">Why AI-Native Matters</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Built for AI from the ground up
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Not AI bolted on. AI woven into every stage—research, requirements, design, and code.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all hover:scale-[1.02]"
              >
                <div className="p-3 rounded-xl bg-zinc-800 w-fit mb-4">
                  <Icon className="w-6 h-6 text-zinc-400" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
