"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { fadeInUp, transitions } from "@/lib/animations";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  items?: FAQItem[];
}

const defaultFAQs: FAQItem[] = [
  {
    question: "How does ProductOS work?",
    answer: "ProductOS uses AI agents that work through 5 connected stages: Ideate, Discover, Define, Design, and Develop. Each agent builds on the previous one's output, maintaining full context throughout the product development lifecycle.",
  },
  {
    question: "How long does it take to launch a product?",
    answer: "Most products launch within 3-12 days depending on scope. Our AI agents accelerate research, PRD creation, design generation, and code development while maintaining quality.",
  },
  {
    question: "What technologies does ProductOS generate code for?",
    answer: "ProductOS generates production-ready code using modern frameworks including Next.js, React, TypeScript, and Tailwind CSS. The code follows best practices and includes tests.",
  },
  {
    question: "Who owns the generated code and designs?",
    answer: "You do. All generated assets, code, designs, and documentation belong entirely to you. We transfer full ownership of everything created.",
  },
  {
    question: "Do you provide ongoing support?",
    answer: "Yes. We offer ongoing maintenance, iteration sprints, and feature shipping using the same 4-stage AI pipeline. Support plans are available for all tiers.",
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We're SOC 2 Type 2 certified, use AES-256 encryption, and offer zero data retention options. Your code and ideas stay private.",
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 15, scale: 0.98 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.08,
      ...transitions.smooth,
    },
  }),
};

export function FAQSection({ 
  title = "Frequently Asked Questions",
  subtitle = "Answers to common questions about ProductOS.",
  items = defaultFAQs 
}: FAQSectionProps) {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-muted-foreground">{subtitle}</p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ scale: 1.01, transition: { duration: 0.15 } }}
              >
                <AccordionItem 
                  value={`item-${index}`}
                  className="bg-card border border-white/5 rounded-xl px-6 data-[state=open]:border-blue-500/30 data-[state=open]:bg-blue-500/5 transition-all duration-300"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-6 group">
                    <motion.span 
                      className="font-medium group-hover:text-blue-400 transition-colors"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.15 }}
                    >
                      {item.question}
                    </motion.span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6">
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.answer}
                    </motion.div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
