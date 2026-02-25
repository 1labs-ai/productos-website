"use client"

import { Logo } from "@/components/logo"

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

export function Footer() {
  return (
    <footer className="border-t border-border py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-2">
              <Logo size={24} className="shrink-0" />
              <span className="font-semibold text-lg tracking-tight">ProductOS</span>
            </div>
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
          <p className="text-sm text-muted-foreground">
            A product by{" "}
            <a href="https://1labs.ai" className="hover:text-foreground transition-colors">
              1Labs AI
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
