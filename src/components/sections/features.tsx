"use client";

import { motion } from "framer-motion";
import { 
  Lightbulb, Search, FileText, Palette, Code, 
  Zap, ArrowRight 
} from "lucide-react";
import { fadeInUp, staggerContainer, staggerItem, transitions } from "@/lib/animations";

const features = [
  {
    icon: Lightbulb,
    title: "Ideate",
    description: "Generate big ideas, positioning, and product angles before deep research.",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Search,
    title: "Discover",
    description: "Validate market opportunities with multi-model AI research and competitive analysis.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: FileText,
    title: "Define",
    description: "Turn research into a living PRD with user stories and acceptance criteria.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Palette,
    title: "Design",
    description: "Generate design tokens, components, and key screens synced to the PRD.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Code,
    title: "Develop",
    description: "Ship full-stack code with tests and deployable builds in days.",
    color: "from-red-500 to-rose-500",
  },
  {
    icon: Zap,
    title: "Context Preserved",
    description: "Nothing falls through the cracks. Each agent builds on the last.",
    color: "from-blue-500 to-violet-500",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Four Stages. <span className="text-gradient">Zero Context Lost.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Each AI agent builds on the last. Research feeds the PRD. PRD drives design. 
            Design shapes code.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={staggerItem}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.2, ease: "easeOut" }
              }}
              className="group relative p-6 rounded-2xl bg-card border border-white/5 hover:border-white/15 transition-colors"
            >
              {/* Glow effect on hover */}
              <motion.div 
                className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl`}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.08 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Icon with bounce on hover */}
              <motion.div 
                className={`relative z-10 inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-4`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={transitions.spring}
              >
                <feature.icon className="w-6 h-6 text-white" />
              </motion.div>
              
              <h3 className="relative z-10 text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="relative z-10 text-muted-foreground">{feature.description}</p>
              
              {/* Arrow indicator */}
              <motion.div 
                className="relative z-10 mt-4 flex items-center text-sm text-primary"
                initial={{ opacity: 0, x: -10 }}
                whileHover={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more
                </span>
                <motion.span
                  className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
