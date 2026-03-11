"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AnimatedSection } from "@/components/ui/animated-section"
import { PageHero } from "@/components/shared"
import { motion } from "framer-motion"
import {
  Sparkles,
  Send,
  CheckCircle,
  Rocket,
  Users,
  Zap,
  Shield,
  Clock,
  Flame,
  Lock,
} from "lucide-react"

// Beta seats configuration
const TOTAL_SEATS = 100

// Dynamic batch system - two batches per month (15th and end of month)
function getBatchInfo() {
  const now = new Date()
  const day = now.getDate()
  const month = now.getMonth()
  const year = now.getFullYear()
  
  // Determine which batch we're in
  const isFirstHalf = day <= 15
  
  // Batch deadlines: 15th or last day of month
  const batchEndDay = isFirstHalf ? 15 : new Date(year, month + 1, 0).getDate()
  const batchStartDay = isFirstHalf ? 1 : 16
  
  const batchEndDate = new Date(year, month, batchEndDay, 23, 59, 59)
  const batchStartDate = new Date(year, month, batchStartDay, 0, 0, 0)
  
  // Calculate progress through the batch (0 to 1)
  const totalBatchDays = (batchEndDate.getTime() - batchStartDate.getTime()) / (1000 * 60 * 60 * 24)
  const daysElapsed = (now.getTime() - batchStartDate.getTime()) / (1000 * 60 * 60 * 24)
  const progress = Math.min(Math.max(daysElapsed / totalBatchDays, 0), 1)
  
  // Seats fill from 65% to 97% as batch progresses
  // Using easeInQuad for acceleration near the end
  const easedProgress = progress * progress // Accelerates filling near deadline
  const minFill = 65
  const maxFill = 97
  const claimedSeats = Math.floor(minFill + (easedProgress * (maxFill - minFill)))
  
  const batchNumber = isFirstHalf ? 1 : 2
  
  return {
    claimedSeats,
    remainingSeats: TOTAL_SEATS - claimedSeats,
    batchEndDate,
    batchNumber,
    progress,
  }
}

// Get initial batch info (will be recalculated client-side)
const initialBatchInfo = getBatchInfo()

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
    title: "Partner Pricing",
    description: "Lock in special early adopter pricing when we launch",
  },
]

function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime()
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-4">
      {[
        { value: timeLeft.days, label: 'Days' },
        { value: timeLeft.hours, label: 'Hours' },
        { value: timeLeft.minutes, label: 'Mins' },
        { value: timeLeft.seconds, label: 'Secs' },
      ].map((item, index) => (
        <div key={item.label} className="flex flex-col items-center">
          <div className="relative">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-muted/50 border border-border flex items-center justify-center">
              <span className="text-xl sm:text-2xl font-bold text-foreground font-mono">
                {String(item.value).padStart(2, '0')}
              </span>
            </div>
            {index < 3 && (
              <span className="absolute -right-2 top-1/2 -translate-y-1/2 text-muted-foreground text-lg hidden sm:block">:</span>
            )}
          </div>
          <span className="text-[10px] sm:text-xs text-muted-foreground mt-1.5 uppercase tracking-wider">{item.label}</span>
        </div>
      ))}
    </div>
  )
}

function SeatProgress({ claimedSeats, remainingSeats }: { claimedSeats: number; remainingSeats: number }) {
  const percentage = (claimedSeats / TOTAL_SEATS) * 100
  
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-muted-foreground">Beta seats claimed</span>
        <span className="text-sm font-medium text-foreground">{claimedSeats}/{TOTAL_SEATS}</span>
      </div>
      <div className="h-3 bg-muted/50 rounded-full overflow-hidden border border-border/50">
        <motion.div 
          className="h-full bg-gradient-to-r from-foreground/60 to-foreground/40 rounded-full relative"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </motion.div>
      </div>
      <div className="flex items-center justify-center gap-2 mt-3">
        <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
        <span className="text-sm font-medium text-orange-500">Only {remainingSeats} spots remaining</span>
      </div>
    </div>
  )
}

function RecentActivity() {
  const [activityCount, setActivityCount] = useState(12)
  
  useEffect(() => {
    // Randomly increment activity to show live engagement
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setActivityCount(prev => prev + 1)
      }
    }, 30000) // Check every 30 seconds
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div 
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground/50 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-foreground/60"></span>
      </span>
      <span className="text-sm text-muted-foreground">{activityCount} people applied this week</span>
    </motion.div>
  )
}

export default function EarlyAccessPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    linkedin: "",
    company: "",
    role: "",
    useCase: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [batchInfo, setBatchInfo] = useState(initialBatchInfo)
  
  // Update batch info on client side and refresh periodically
  useEffect(() => {
    setBatchInfo(getBatchInfo())
    
    // Refresh every minute to keep seats updating
    const interval = setInterval(() => {
      setBatchInfo(getBatchInfo())
    }, 60000)
    
    return () => clearInterval(interval)
  }, [])
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
      {/* Hero with Urgency */}
      <section className="relative min-h-0 pt-32 pb-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Status Badge */}
          <AnimatedSection>
            <div className="flex flex-col items-center gap-4 mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <Lock className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Private Beta — Limited Access</span>
              </div>
              <RecentActivity />
            </div>
          </AnimatedSection>

          {/* Title */}
          <AnimatedSection delay={0.1}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="text-foreground">Request Early </span>
              <span className="text-foreground">Access</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              We're onboarding {TOTAL_SEATS} design partners to shape the future of AI-native product development. Spots are filling fast.
            </p>
          </AnimatedSection>

          {/* Seat Progress */}
          <AnimatedSection delay={0.2}>
            <div className="mb-10">
              <SeatProgress claimedSeats={batchInfo.claimedSeats} remainingSeats={batchInfo.remainingSeats} />
            </div>
          </AnimatedSection>

          {/* Countdown */}
          <AnimatedSection delay={0.3}>
            <div className="mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Batch {batchInfo.batchNumber} closes in</span>
              </div>
              <CountdownTimer targetDate={batchInfo.batchEndDate} />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Urgency Banner */}
      <section className="py-6 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="relative overflow-hidden rounded-xl bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/10 border border-orange-500/20 p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-500" />
                <span className="font-semibold text-foreground">Still accepting applications!</span>
              </div>
              <span className="text-muted-foreground">
                We review applications weekly. Apply now to secure your spot.
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <h2 className="text-xl font-semibold text-center mb-8 text-foreground">What you get as a design partner</h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <AnimatedSection key={benefit.title} delay={index * 0.1}>
                <Card className="p-6 bg-card/50 border-border hover:border-primary/30 transition-all h-full">
                  <div className="w-10 h-10 rounded-lg bg-muted/50 border border-border flex items-center justify-center text-muted-foreground mb-4">
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
            <Card className="p-8 bg-card/50 border-border relative overflow-hidden">
              {/* Corner Badge */}
              <div className="absolute top-0 right-0">
                <div className="bg-orange-500 text-white text-xs font-bold px-3 py-1 transform rotate-0 origin-top-right">
                  {batchInfo.remainingSeats} LEFT
                </div>
              </div>

              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 mx-auto mb-6 text-muted-foreground" />
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
                    <h2 className="text-2xl font-bold mb-2 text-foreground">Request Your Invite</h2>
                    <p className="text-muted-foreground">Join {batchInfo.claimedSeats} design partners already on the waitlist</p>
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

                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">LinkedIn Profile *</label>
                      <Input
                        type="url"
                        placeholder="https://linkedin.com/in/yourprofile"
                        value={formData.linkedin}
                        onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                        required
                        className="bg-background/50 border-border focus:border-primary"
                      />
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
                      className="w-full bg-foreground text-background hover:bg-foreground/90 rounded-md h-12 text-base font-medium group"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Secure Your Spot"}
                      <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
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
                  a: "We're onboarding beta users in batches. Most applicants hear back within 1-2 weeks. Product managers and teams building actively get priority.",
                },
                {
                  q: "What happens after the 100 seats fill up?",
                  a: "We run two batches per month, each with 100 beta seats. If Batch 1 fills up, you'll be prioritized for Batch 2. Design partners get lifetime benefits including locked-in pricing.",
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
