"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AnimatedSection } from "@/components/ui/animated-section"
import { PageHero } from "@/components/shared"
import {
  Sparkles,
  Send,
  CheckCircle,
  Rocket,
  Users,
  Zap,
  Shield,
} from "lucide-react"

const benefits = [
  {
    icon: Rocket,
    title: "First Access",
    description: "Be among the first to experience ProductOS and shape its future",
  },
  {
    icon: Users,
    title: "Direct Feedback",
    description: "Work directly with our team and influence product direction",
  },
  {
    icon: Zap,
    title: "Priority Support",
    description: "Get dedicated support during your onboarding journey",
  },
  {
    icon: Shield,
    title: "Founder Pricing",
    description: "Lock in special early adopter pricing when we launch",
  },
]

export default function EarlyAccessPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    useCase: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Send to our API endpoint
      const response = await fetch('/api/early-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      
      if (response.ok) {
        setSubmitted(true)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    }
    
    setIsSubmitting(false)
  }

  return (
    <>
      {/* Hero */}
      <PageHero
        badge={{ icon: Sparkles, text: "Private Beta" }}
        title="Request Early"
        titleHighlight="Access"
        description="ProductOS is currently in private beta. Join our waitlist to be among the first founders to experience AI-native product development."
        className="min-h-0 pt-32 pb-16"
      />

      {/* Benefits Grid */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <AnimatedSection key={benefit.title} delay={index * 0.1}>
                <Card className="p-6 bg-card/50 border-border hover:border-primary/30 transition-all h-full">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                    <benefit.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold mb-2 text-foreground">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Request Form */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-xl mx-auto">
          <AnimatedSection>
            <Card className="p-8 bg-card/50 border-border">
              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 mx-auto mb-6 text-emerald-400" />
                  <h2 className="text-2xl font-bold mb-4 text-foreground">You're on the list!</h2>
                  <p className="text-muted-foreground mb-2">
                    Thanks for your interest in ProductOS. We'll review your application and reach out soon.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    In the meantime, follow us on{" "}
                    <a href="https://twitter.com/productos_dev" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Twitter</a>
                    {" "}for updates.
                  </p>
                </div>
              ) : (
                <>
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold mb-2 text-foreground">Request an Invite</h2>
                    <p className="text-muted-foreground">Tell us about yourself and we'll be in touch.</p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-foreground">Name *</label>
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
                        <label className="block text-sm font-medium mb-2 text-foreground">Email *</label>
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

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-foreground">Company</label>
                        <Input
                          type="text"
                          placeholder="Your company"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="bg-background/50 border-border focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-foreground">Role</label>
                        <select
                          value={formData.role}
                          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                          className="w-full h-10 px-3 rounded-lg bg-background/50 border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground text-sm"
                        >
                          <option value="">Select your role</option>
                          <option value="founder">Founder / CEO</option>
                          <option value="product">Product Manager</option>
                          <option value="engineer">Engineer</option>
                          <option value="designer">Designer</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">What are you building?</label>
                      <textarea
                        placeholder="Tell us about your product idea or current project..."
                        value={formData.useCase}
                        onChange={(e) => setFormData({ ...formData, useCase: e.target.value })}
                        rows={4}
                        className="w-full px-3 py-2 rounded-lg bg-background/50 border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none text-foreground placeholder:text-muted-foreground text-sm"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-foreground text-background hover:bg-foreground/90 rounded-md h-12 text-base font-medium"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Request Early Access"}
                      <Send className="w-4 h-4 ml-2" />
                    </Button>
                    
                    <p className="text-xs text-center text-muted-foreground">
                      By requesting access, you agree to our{" "}
                      <a href="/terms" className="underline hover:text-foreground">Terms</a>
                      {" "}and{" "}
                      <a href="/privacy" className="underline hover:text-foreground">Privacy Policy</a>.
                    </p>
                  </form>
                </>
              )}
            </Card>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 border-t border-border px-4">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection>
            <h2 className="text-2xl font-bold text-center mb-8 text-foreground">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                {
                  q: "How long until I get access?",
                  a: "We're onboarding beta users in batches. Most applicants hear back within 1-2 weeks. Founders and product teams building actively get priority.",
                },
                {
                  q: "Is the beta free?",
                  a: "Yes! Early access users get full access to ProductOS during the beta period. We'll work with you on fair pricing before our public launch.",
                },
                {
                  q: "What can I build with ProductOS?",
                  a: "ProductOS is designed for builders going from idea to shipped product. Whether you're validating a new concept or building an MVP, our AI agents help you move faster.",
                },
                {
                  q: "Can I invite my team?",
                  a: "Once you're in, you can request additional seats for your team. We want to make sure the experience works well for collaborative teams.",
                },
              ].map((faq) => (
                <div key={faq.q} className="p-6 rounded-lg bg-card/30 border border-border/50">
                  <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
