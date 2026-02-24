"use client";

import { motion } from "framer-motion";

const logos = [
  { name: "Stripe", className: "grayscale hover:grayscale-0 transition-all" },
  { name: "GitHub", className: "grayscale hover:grayscale-0 transition-all" },
  { name: "Vercel", className: "grayscale hover:grayscale-0 transition-all" },
  { name: "Figma", className: "grayscale hover:grayscale-0 transition-all" },
  { name: "Slack", className: "grayscale hover:grayscale-0 transition-all" },
  { name: "Supabase", className: "grayscale hover:grayscale-0 transition-all" },
];

// For production, replace with actual SVG logos
const LogoPlaceholder = ({ name, className }: { name: string; className?: string }) => (
  <div className={`flex items-center justify-center min-w-[120px] h-12 ${className || ""}`}>
    <span className="text-lg sm:text-xl font-semibold text-muted-foreground/50 hover:text-muted-foreground transition-colors">
      {name}
    </span>
  </div>
);

export function SocialProofBar() {
  return (
    <section className="py-12 sm:py-16 border-y border-white/5">
      <div className="container mx-auto px-4">
        <p className="text-center text-xs sm:text-sm text-muted-foreground mb-6 sm:mb-8">
          Trusted every day by teams that build world-class software
        </p>

        <div className="relative overflow-hidden">
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-background to-transparent z-10" />

          {/* Scrolling logos */}
          <motion.div
            className="flex space-x-8 sm:space-x-12 items-center"
            animate={{ x: [0, -1000] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {[...logos, ...logos, ...logos].map((logo, i) => (
              <LogoPlaceholder
                key={`${logo.name}-${i}`}
                name={logo.name}
                className={logo.className}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Alternative variant with hover pause functionality
export function SocialProofBarWithPause() {
  return (
    <section className="py-12 sm:py-16 border-y border-white/5 group">
      <div className="container mx-auto px-4">
        <p className="text-center text-xs sm:text-sm text-muted-foreground mb-6 sm:mb-8">
          Trusted every day by teams that build world-class software
        </p>

        <div className="relative overflow-hidden">
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-background to-transparent z-10" />

          {/* Scrolling logos - pauses on hover */}
          <motion.div
            className="flex space-x-8 sm:space-x-12 items-center"
            animate={{ x: [0, -1000] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            whileHover={{ animationPlayState: "paused" }}
            style={{ willChange: "transform" }}
          >
            {[...logos, ...logos, ...logos].map((logo, i) => (
              <LogoPlaceholder
                key={`${logo.name}-${i}`}
                name={logo.name}
                className={logo.className}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default SocialProofBar;
