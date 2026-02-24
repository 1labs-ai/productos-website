import Link from "next/link";
import { Github, Twitter, Linkedin, Youtube } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Enterprise", href: "/enterprise" },
    { label: "Changelog", href: "/changelog" },
  ],
  Resources: [
    { label: "Documentation", href: "/docs" },
    { label: "Blog", href: "/blog" },
    { label: "Templates", href: "/templates" },
    { label: "API Reference", href: "/api" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
    { label: "Press", href: "/press" },
  ],
  Legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Security", href: "/security" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com/productos", label: "Twitter" },
  { icon: Github, href: "https://github.com/virusha-tech", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/company/productos", label: "LinkedIn" },
  { icon: Youtube, href: "https://youtube.com/@productos", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-background/50">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="text-xl font-bold text-gradient">ProductOS</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Ship products 10x faster with AI-native development.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors p-2 -m-2"
                  aria-label={social.label}
                >
                  <social.icon size={20} className="touch-target" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold text-sm mb-4">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ProductOS. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <span className="text-sm text-muted-foreground">
              A product by{" "}
              <a
                href="https://1labs.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors"
              >
                1Labs AI
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
