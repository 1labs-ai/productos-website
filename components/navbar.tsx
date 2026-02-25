"use client"

import { useState, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Sun, Moon, Monitor, ChevronDown, BookOpen, FileText, Newspaper } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { AnimatedLogo, type AnimatedLogoRef } from "@/components/animated-logo"

const navItems = [
  { label: "Product", href: "/#features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Enterprise", href: "/enterprise" },
  { 
    label: "Resources", 
    dropdown: [
      { label: "Documentation", href: "https://docs.productos.dev", icon: BookOpen, description: "Guides and API reference" },
      { label: "Blog", href: "/blog", icon: Newspaper, description: "Latest articles and insights" },
      { label: "Changelog", href: "/changelog", icon: FileText, description: "Product updates and releases" },
    ]
  },
]

// Resources dropdown component
function ResourcesDropdown({ item }: { item: { label: string; dropdown: Array<{ label: string; href: string; icon: any; description: string }> } }) {
  const [isOpen, setIsOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150)
  }

  return (
    <div 
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={cn(
          "relative flex items-center gap-1 px-4 py-2 text-sm font-medium text-muted-foreground",
          "transition-colors hover:text-foreground",
          "group"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {item.label}
        <ChevronDown className={cn(
          "size-3.5 transition-transform duration-200",
          isOpen && "rotate-180"
        )} />
        <span className="absolute inset-x-2 -bottom-px h-px bg-gradient-to-r from-primary/0 via-primary/70 to-primary/0 opacity-0 transition-opacity group-hover:opacity-100" />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full left-0 mt-2 w-64 rounded-lg border border-border bg-background/95 backdrop-blur-lg shadow-lg overflow-hidden"
          >
            <div className="p-2">
              {item.dropdown.map((subItem) => {
                const Icon = subItem.icon
                return (
                  <a
                    key={subItem.label}
                    href={subItem.href}
                    className="flex items-start gap-3 px-3 py-2.5 rounded-md text-sm transition-colors hover:bg-muted group/item"
                  >
                    <Icon className="size-5 mt-0.5 text-muted-foreground group-hover/item:text-foreground transition-colors" />
                    <div>
                      <div className="font-medium text-foreground">{subItem.label}</div>
                      <div className="text-xs text-muted-foreground">{subItem.description}</div>
                    </div>
                  </a>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Theme toggle matching develop.productos.dev exactly
function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex h-8 w-[88px] rounded-full bg-muted/50 border border-border/50 animate-pulse" />
    )
  }

  const themeOptions = [
    { value: "light", icon: Sun, label: "Light theme" },
    { value: "system", icon: Monitor, label: "System theme" },
    { value: "dark", icon: Moon, label: "Dark theme" },
  ] as const

  return (
    <div
      className={cn(
        "relative flex items-center gap-0.5 p-1 rounded-full",
        "bg-muted/50 border border-border/50",
        "transition-colors duration-200"
      )}
      role="radiogroup"
      aria-label="Theme selection"
    >
      {themeOptions.map((option) => {
        const Icon = option.icon
        const isActive = theme === option.value

        return (
          <button
            key={option.value}
            onClick={() => setTheme(option.value)}
            className={cn(
              "relative flex items-center justify-center",
              "size-6 rounded-full",
              "transition-all duration-200 ease-out",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
              isActive
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-background/50"
            )}
            role="radio"
            aria-checked={isActive}
            aria-label={option.label}
            title={option.label}
          >
            <Icon
              className={cn(
                "size-3.5 transition-transform duration-200",
                isActive && "scale-110"
              )}
            />
          </button>
        )
      })}
    </div>
  )
}

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHomepage = pathname === "/"
  const logoRef = useRef<AnimatedLogoRef>(null)

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50"
    >
      <nav className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - animates on hover of entire logo area */}
          <a 
            href="/" 
            className="flex items-center gap-2.5"
            onMouseEnter={() => logoRef.current?.replay()}
          >
            <AnimatedLogo ref={logoRef} size={28} className="shrink-0" />
            <span className="font-semibold text-lg leading-none tracking-tight">
              ProductOS
            </span>
          </a>

          {/* Center Nav Items */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              'dropdown' in item ? (
                <ResourcesDropdown key={item.label} item={item} />
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium text-muted-foreground",
                    "transition-colors hover:text-foreground",
                    "group"
                  )}
                >
                  {item.label}
                  <span className="absolute inset-x-2 -bottom-px h-px bg-gradient-to-r from-primary/0 via-primary/70 to-primary/0 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              )
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              asChild
            >
              <a href="https://build.productos.dev/sign-in">Sign In</a>
            </Button>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                size="sm"
                className="bg-primary hover:bg-primary/90 shadow-sm"
                asChild
              >
                <a href="https://build.productos.dev/sign-up">Sign Up</a>
              </Button>
            </motion.div>
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
                className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <hr className="border-border my-3" />
            <div className="flex items-center justify-between px-3 py-2">
              <span className="text-sm text-muted-foreground">Theme</span>
              <ThemeToggle />
            </div>
            <div className="flex flex-col gap-2 pt-2">
              <Button variant="ghost" className="justify-start" asChild>
                <a href="https://build.productos.dev/sign-in">Sign In</a>
              </Button>
              <Button className="bg-primary hover:bg-primary/90" asChild>
                <a href="https://build.productos.dev/sign-up">Sign Up</a>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
