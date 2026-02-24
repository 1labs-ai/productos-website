"use client";

import { motion } from "framer-motion";
import { Lightbulb, Search, FileText, Palette, Code } from "lucide-react";
import { fadeInUp, transitions } from "@/lib/animations";

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

const lineVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: { 
    scaleX: 1, 
    opacity: 1,
    transition: { duration: 1.2, ease: "easeOut" as const, delay: 0.3 }
  },
};

const iconVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i: number) => ({
    scale: 1,
    opacity: 1,
    transition: {
      delay: 0.1 + i * 0.15,
      type: "spring" as const,
      stiffness: 200,
      damping: 15,
    },
  }),
};

export function HowItWorksSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <motion.span 
            className="text-sm font-medium text-blue-400 mb-4 block"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            THE PROCESS
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Five connected stages. One continuous context. AI agents that remember everything.
          </p>
        </motion.div>

        {/* Desktop: Horizontal flow with connecting lines */}
        <div className="hidden lg:block relative">
          {/* Animated connecting line */}
          <motion.div 
            className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-500/30 via-blue-500/30 to-pink-500/30 transform -translate-y-1/2 origin-left"
            variants={lineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          />
          
          <div className="grid grid-cols-5 gap-4">
            {stages.map((stage, index) => (
              <motion.div
                key={stage.number}
                custom={index}
                variants={iconVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="relative flex flex-col items-center text-center group cursor-default"
              >
                {/* Icon circle */}
                <motion.div 
                  className={`relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br ${stage.color} p-[1px] mb-4`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={transitions.spring}
                >
                  <div className="relative w-full h-full rounded-2xl bg-black flex items-center justify-center">
                    <stage.icon className="w-7 h-7 text-white" />
                  </div>
                </motion.div>
                
                {/* Stage number */}
                <motion.span 
                  className={`text-xs font-bold bg-gradient-to-r ${stage.color} text-transparent bg-clip-text mb-2`}
                  whileHover={{ scale: 1.1 }}
                >
                  STAGE {stage.number}
                </motion.span>
                
                {/* Title */}
                <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                  {stage.title}
                </h3>
                
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
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, ...transitions.smooth }}
              whileHover={{ x: 8, transition: { duration: 0.2 } }}
              className="flex items-start gap-4 group cursor-default"
            >
              {/* Icon */}
              <motion.div 
                className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${stage.color} p-[1px]`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={transitions.spring}
              >
                <div className="w-full h-full rounded-xl bg-black flex items-center justify-center">
                  <stage.icon className="w-5 h-5 text-white" />
                </div>
              </motion.div>
              
              {/* Content */}
              <div>
                <span className={`text-xs font-bold bg-gradient-to-r ${stage.color} text-transparent bg-clip-text`}>
                  STAGE {stage.number}
                </span>
                <h3 className="text-lg font-semibold group-hover:text-blue-400 transition-colors">
                  {stage.title}
                </h3>
                <p className="text-sm text-muted-foreground">{stage.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
