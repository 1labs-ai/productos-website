"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Menu, X, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { label: "Product", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Enterprise", href: "/enterprise" },
  { label: "Docs", href: "https://docs.productos.dev" },
  { label: "Blog", href: "/blog" },
]

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <span className="text-lg font-semibold text-foreground">
              ProductOS
            </span>
          </a>

          {/* Center Nav Items */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-muted-foreground hover:text-foreground"
              asChild
            >
              <a href="https://build.productos.dev/sign-in">Sign In</a>
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              className="rounded-sm border-border hover:bg-secondary"
              asChild
            >
              <a href="https://build.productos.dev/sign-up">Get Started</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-background border-b border-border"
        >
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-sm transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <hr className="border-border my-3" />
            <div className="flex flex-col gap-2">
              <Button variant="ghost" className="justify-start" asChild>
                <a href="https://build.productos.dev/sign-in">Sign In</a>
              </Button>
              <Button variant="outline" className="rounded-sm" asChild>
                <a href="https://build.productos.dev/sign-up">Get Started</a>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
