"use client";

import { motion } from "framer-motion";
import { Lightbulb, Search, FileText, Palette, Code } from "lucide-react";

const stages = [
  {
    number: "01",
    icon: Lightbulb,
    title: "Ideate",
    description: "Generate big ideas and positioning before research begins.",
    color: "from-yellow-500 to-orange-500",
  },
  {
    number: "02",
    icon: Search,
    title: "Discover",
    description: "Validate with multi-model AI research and competitive analysis.",
    color: "from-green-500 to-emerald-500",
  },
  {
    number: "03",
    icon: FileText,
    title: "Define",
    description: "Living PRD with user stories and acceptance criteria.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    number: "04",
    icon: Palette,
    title: "Design",
    description: "AI generates pixel-perfect screens from your PRD context.",
    color: "from-violet-500 to-purple-500",
  },
  {
    number: "05",
    icon: Code,
    title: "Develop",
    description: "Production-ready code that matches every design decision.",
    color: "from-pink-500 to-rose-500",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-blue-400 mb-4 block">THE PROCESS</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Five connected stages. One continuous context. AI agents that remember everything.
          </p>
        </motion.div>

        {/* Desktop: Horizontal flow with connecting lines */}
        <div className="hidden lg:block relative">
          {/* Connecting line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-500/20 via-blue-500/20 to-pink-500/20 transform -translate-y-1/2" />
          
          <div className="grid grid-cols-5 gap-4">
            {stages.map((stage, index) => (
              <motion.div
                key={stage.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative flex flex-col items-center text-center"
              >
                {/* Icon circle */}
                <div className={`relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br ${stage.color} p-[1px] mb-4`}>
                  <div className="w-full h-full rounded-2xl bg-black flex items-center justify-center">
                    <stage.icon className="w-7 h-7 text-white" />
                  </div>
                </div>
                
                {/* Stage number */}
                <span className={`text-xs font-bold bg-gradient-to-r ${stage.color} text-transparent bg-clip-text mb-2`}>
                  STAGE {stage.number}
                </span>
                
                {/* Title */}
                <h3 className="text-lg font-semibold mb-2">{stage.title}</h3>
                
                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {stage.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet: Vertical list */}
        <div className="lg:hidden space-y-6">
          {stages.map((stage, index) => (
            <motion.div
              key={stage.number}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-4"
            >
              {/* Icon */}
              <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${stage.color} p-[1px]`}>
                <div className="w-full h-full rounded-xl bg-black flex items-center justify-center">
                  <stage.icon className="w-5 h-5 text-white" />
                </div>
              </div>
              
              {/* Content */}
              <div>
                <span className={`text-xs font-bold bg-gradient-to-r ${stage.color} text-transparent bg-clip-text`}>
                  STAGE {stage.number}
                </span>
                <h3 className="text-lg font-semibold">{stage.title}</h3>
                <p className="text-sm text-muted-foreground">{stage.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
