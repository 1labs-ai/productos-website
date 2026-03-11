"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AnimatedSection } from "@/components/ui/animated-section"
import { PageHero } from "@/components/shared"
import {
  Mail,
  MessageSquare,
  Send,
  Calendar,
  Building,
  Handshake,
  HelpCircle,
  CheckCircle,
  Twitter,
  Linkedin,
} from "lucide-react"

const contactOptions = [
  {
    icon: Building,
    title: "Sales",
    description: "Talk to our sales team about Enterprise plans",
    action: "Schedule a call",
    href: "https://calendly.com/heemang-1labs/30min",
    external: true,
  },
  {
    icon: HelpCircle,
    title: "Support",
    description: "Get help with technical issues",
    action: "Contact support",
    href: "mailto:founders@productos.dev",
    external: false,
  },
  {
    icon: Handshake,
    title: "Partnerships",
    description: "Explore partnership opportunities",
    action: "Partner with us",
    href: "mailto:founders@productos.dev",
    external: false,
  },
]

const socialLinks = [
  { icon: Twitter, label: "Twitter", href: "https://twitter.com/productos_dev" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/company/productos-dev" },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    inquiryType: "general",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setSubmitted(true)
    setIsSubmitting(false)
  }

  return (
    <>
      {/* Hero */}
      <PageHero
        badge={{ icon: MessageSquare, text: "Get in Touch" }}
        title="Let's"
        titleHighlight="talk"
        description="Have questions about ProductOS? Want to explore Enterprise options? We'd love to hear from you."
        className="min-h-0 pt-32 pb-16"
      />

      {/* Contact Options */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {contactOptions.map((option, index) => (
              <AnimatedSection key={option.title} delay={index * 0.1}>
                <Card className="p-6 bg-card/50 border-border hover:border-primary/30 transition-all h-full flex flex-col">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center text-primary mb-4">
                    <option.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{option.title}</h3>
                  <p className="text-muted-foreground mb-4 flex-grow">{option.description}</p>
                  <Button
                    variant="outline"
                    className="rounded-full border-border bg-background/50 hover:bg-muted w-full"
                    asChild
                  >
                    <Link href={option.href} target={option.external ? "_blank" : undefined} rel={option.external ? "noopener noreferrer" : undefined}>
                      {option.action}
                    </Link>
                  </Button>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection>
            <Card className="p-8 bg-card/50 border-border">
              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 mx-auto mb-6 text-emerald-400" />
                  <h2 className="text-2xl font-bold mb-4 text-foreground">Message Sent!</h2>
                  <p className="text-muted-foreground mb-6">
                    Thanks for reaching out. We&apos;ll get back to you within 24 hours.
                  </p>
                  <Button
                    variant="outline"
                    className="rounded-full"
                    onClick={() => {
                      setSubmitted(false)
                      setFormData({
                        name: "",
                        email: "",
                        company: "",
                        inquiryType: "general",
                        message: "",
                      })
                    }}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold mb-6 text-foreground">Send us a message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-foreground">Name</label>
                        <Input
                          type="text"
                          placeholder="Your name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          className="bg-background/50 border-border focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-foreground">Email</label>
                        <Input
                          type="email"
                          placeholder="you@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          className="bg-background/50 border-border focus:border-primary"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">Company</label>
                      <Input
                        type="text"
                        placeholder="Your company (optional)"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="bg-background/50 border-border focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">Inquiry Type</label>
                      <select
                        value={formData.inquiryType}
                        onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-background/50 border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="sales">Sales / Enterprise</option>
                        <option value="support">Technical Support</option>
                        <option value="partnership">Partnership</option>
                        <option value="press">Press / Media</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">Message</label>
                      <textarea
                        placeholder="Tell us how we can help..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        rows={5}
                        className="w-full px-4 py-3 rounded-lg bg-background/50 border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none text-foreground placeholder:text-muted-foreground"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"} <Send className="w-4 h-4 ml-2" />
                    </Button>
                  </form>
                </>
              )}
            </Card>
          </AnimatedSection>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-16 border-t border-border px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 text-center md:text-left">
            <AnimatedSection>
              <Mail className="w-8 h-8 text-primary mb-4 mx-auto md:mx-0" />
              <h3 className="text-xl font-semibold mb-2 text-foreground">Email Us</h3>
              <p className="text-muted-foreground mb-2">For general inquiries:</p>
              <a href="mailto:founders@productos.dev" className="text-primary hover:underline">
                founders@productos.dev
              </a>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <Calendar className="w-8 h-8 text-primary mb-4 mx-auto md:mx-0" />
              <h3 className="text-xl font-semibold mb-2 text-foreground">Schedule a Call</h3>
              <p className="text-muted-foreground mb-2">Book a 30-minute demo:</p>
              <a 
                href="https://calendly.com/heemang-1labs/30min" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Schedule a call
              </a>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <MessageSquare className="w-8 h-8 text-primary mb-4 mx-auto md:mx-0" />
              <h3 className="text-xl font-semibold mb-2 text-foreground">Follow Us</h3>
              <p className="text-muted-foreground mb-3">Stay updated on social:</p>
              <div className="flex gap-3 justify-center md:justify-start">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-muted/50 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  )
}
