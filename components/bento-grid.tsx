"use client"

import { motion } from "framer-motion"
import { Lightbulb, Search, FileText, Palette, Code, Zap } from "lucide-react"

const features = [
  {
    icon: Lightbulb,
    title: "Ideate",
    description: "Generate big ideas, positioning, and product angles before deep research.",
  },
  {
    icon: Search,
    title: "Discover",
    description: "Validate market opportunities with multi-model AI research and competitive analysis.",
  },
  {
    icon: FileText,
    title: "Define",
    description: "Turn research into a living PRD with user stories and acceptance criteria.",
  },
  {
    icon: Palette,
    title: "Design",
    description: "Generate design tokens, components, and key screens synced to the PRD.",
  },
  {
    icon: Code,
    title: "Develop",
    description: "Ship full-stack code with tests and deployable builds in days.",
  },
  {
    icon: Zap,
    title: "Context Preserved",
    description: "Nothing falls through the cracks. Each agent builds on the last.",
  },
]

export function BentoGrid() {
  return (
    <section id="features" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Five Stages. Zero Context Lost.
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Each AI agent builds on the last. Research feeds the PRD. PRD drives design. 
            Design shapes code.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-6 rounded-sm bg-card border border-border hover:border-border/80 transition-colors"
            >
              <div className="w-10 h-10 rounded-sm bg-secondary flex items-center justify-center mb-4">
                <feature.icon className="w-5 h-5 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
