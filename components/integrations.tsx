"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const integrations = [
  { name: "GitHub", description: "Version control & CI/CD" },
  { name: "Figma", description: "Design collaboration" },
  { name: "Slack", description: "Team communication" },
  { name: "Supabase", description: "Backend & database" },
  { name: "Vercel", description: "Edge deployment" },
  { name: "Stripe", description: "Payments" },
]

export function Integrations() {
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
          <p className="text-zinc-500 uppercase tracking-wider text-sm mb-4">Integrations</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Seamless Integrations
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Connect ProductOS with your favorite tools.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {integrations.map((integration, index) => (
            <motion.div
              key={integration.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.05 }}
              className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all text-center group hover:scale-[1.02]"
            >
              <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center mx-auto mb-3 group-hover:bg-zinc-700 transition-colors">
                <span className="text-lg font-bold text-zinc-400">{integration.name[0]}</span>
              </div>
              <div className="font-medium text-white text-sm">{integration.name}</div>
              <div className="text-xs text-zinc-500 mt-1">{integration.description}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
