"use client"

import { useState, useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import { Sun, Moon, Monitor } from "lucide-react"
import { cn } from "@/lib/utils"
import { AnimatedLogo, type AnimatedLogoRef } from "@/components/animated-logo"

const footerLinks = {
  Product: [
    { label: "Features", href: "/#features" },
    { label: "Early Access", href: "/early-access" },
  ],
  Resources: [
    { label: "Blog", href: "/blog" },
    { label: "Compare", href: "/compare" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Careers", href: "mailto:founders@productos.dev?subject=Careers" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
}

// TODO: Implement i18n with next-intl when ready for internationalization
// Languages supported: EN, ES, FR, DE, JA, ZH

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="flex h-8 w-[88px] rounded-full bg-muted/50 border border-border/50" />
  }

  const themeOptions = [
    { value: "light", icon: Sun, label: "Light" },
    { value: "system", icon: Monitor, label: "System" },
    { value: "dark", icon: Moon, label: "Dark" },
  ] as const

  return (
    <div className="flex items-center gap-0.5 p-1 rounded-full bg-muted/50 border border-border/50">
      {themeOptions.map((option) => {
        const Icon = option.icon
        const isActive = theme === option.value
        return (
          <button
            key={option.value}
            onClick={() => setTheme(option.value)}
            className={cn(
              "flex items-center justify-center size-6 rounded-full transition-all duration-200",
              isActive
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-background/50"
            )}
            aria-label={option.label}
            title={option.label}
          >
            <Icon className={cn("size-3.5 transition-transform", isActive && "scale-110")} />
          </button>
        )
      })}
    </div>
  )
}

export function Footer() {
  const logoRef = useRef<AnimatedLogoRef>(null)
  
  return (
    <footer className="border-t border-border py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a 
              href="/" 
              className="flex items-center gap-2.5 mb-2"
              onMouseEnter={() => logoRef.current?.replay()}
            >
              <AnimatedLogo ref={logoRef} size={24} className="shrink-0" />
              <span className="font-semibold text-lg tracking-tight">ProductOS</span>
            </a>
            <p className="text-sm text-muted-foreground">
              Ship products 10x faster with AI.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-foreground mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ProductOS. All rights reserved.
          </p>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  )
}
