"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Sun, Moon, Monitor, Globe, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { AnimatedLogo } from "@/components/animated-logo"

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Enterprise", href: "/enterprise" },
    { label: "Changelog", href: "#" },
  ],
  Resources: [
    { label: "Documentation", href: "https://docs.productos.dev" },
    { label: "Blog", href: "/blog" },
    { label: "Templates", href: "#" },
    { label: "API Reference", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "mailto:hello@1labs.ai" },
  ],
  Legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Security", href: "#" },
  ],
}

const languages = [
  { code: "EN", label: "English" },
  { code: "ES", label: "Español" },
  { code: "FR", label: "Français" },
  { code: "DE", label: "Deutsch" },
  { code: "JA", label: "日本語" },
  { code: "ZH", label: "中文" },
]

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

function LanguageSwitcher() {
  const [language, setLanguage] = useState("EN")
  const [showMenu, setShowMenu] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 border border-border/50 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
      >
        <Globe className="size-3.5" />
        <span>{language}</span>
        <ChevronDown className={cn("size-3 transition-transform", showMenu && "rotate-180")} />
      </button>

      {showMenu && (
        <div className="absolute bottom-full mb-2 right-0 bg-background border border-border rounded-lg shadow-xl py-1.5 min-w-[130px] z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code)
                setShowMenu(false)
              }}
              className={cn(
                "w-full px-3 py-1.5 text-left text-sm transition-colors",
                language === lang.code
                  ? "text-foreground bg-muted/50"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
              )}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-border py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="flex items-center gap-2.5 mb-2">
              <AnimatedLogo size={24} className="shrink-0" />
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

        {/* Bottom - Theme toggle & Language switcher instead of 1Labs branding */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ProductOS. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </footer>
  )
}
