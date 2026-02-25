"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "https://docs.productos.dev" },
  { label: "Blog", href: "/blog" },
]

export function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-3xl"
    >
      <nav
        ref={navRef}
        className="relative flex items-center justify-between px-4 py-3 rounded-full bg-card/60 backdrop-blur-md border border-border"
      >
        {/* ProductOS Logo */}
        <a href="#" className="flex items-center gap-2">
          <span 
            className="text-xl font-bold tracking-tight"
            style={{
              background: "linear-gradient(180deg, #a1a1aa 0%, #52525b 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            ProductOS
          </span>
        </a>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-1 relative">
          {navItems.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              className="relative px-4 py-2 text-sm text-muted-foreground hover:text-white transition-colors"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {hoveredIndex === index && (
                <motion.div
                  layoutId="navbar-hover"
                  className="absolute inset-0 bg-secondary rounded-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </a>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-muted-foreground hover:text-white hover:bg-secondary"
            asChild
          >
            <a href="https://build.productos.dev/sign-in">Sign In</a>
          </Button>
          <Button 
            size="sm" 
            className="shimmer-btn bg-white text-zinc-950 hover:bg-zinc-200 rounded-sm px-4"
            asChild
          >
            <a href="https://build.productos.dev/sign-up">Get Started</a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-muted-foreground hover:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 right-0 mt-2 p-4 rounded-lg bg-card/95 backdrop-blur-md border border-border"
        >
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-4 py-3 text-sm text-muted-foreground hover:text-white hover:bg-secondary rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <hr className="border-border my-2" />
            <Button variant="ghost" className="justify-start text-muted-foreground hover:text-white" asChild>
              <a href="https://build.productos.dev/sign-in">Sign In</a>
            </Button>
            <Button className="shimmer-btn bg-white text-zinc-950 hover:bg-zinc-200 rounded-sm" asChild>
              <a href="https://build.productos.dev/sign-up">Get Started</a>
            </Button>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
