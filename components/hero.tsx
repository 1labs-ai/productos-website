"use client"

import { motion } from "framer-motion"
import { ArrowRight, Sparkles, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useRef, useEffect } from "react"

export function Hero() {
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Check if demo video exists (will fail gracefully if not)
  const demoVideoSrc = "/demo/productos-demo.mp4"
  const demoPosterSrc = "/demo/productos-demo-poster.jpg"
  const demoGifSrc = "/demo/productos-demo.gif"

  useEffect(() => {
    // Auto-play video on desktop when in viewport
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && videoLoaded) {
          video.play().catch(() => {})
          setIsPlaying(true)
        } else {
          video.pause()
          setIsPlaying(false)
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [videoLoaded])

  const handlePlayClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
      } else {
        videoRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 pt-20 pb-16 overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card pointer-events-none" />
      
      {/* Subtle radial glow */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 0%, hsl(240 10% 20% / 0.3) 0%, transparent 70%)"
        }}
      />
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-card/80 backdrop-blur-sm border border-border/50 mb-8"
        >
          <Sparkles className="size-3.5 text-amber-500" />
          <span className="text-sm font-medium text-foreground/80">AI-Native Product Development Platform</span>
        </motion.div>

        {/* Headline - Balanced: Authentic + YC-aligned */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6"
          style={{ lineHeight: 1.05, letterSpacing: '-0.025em' }}
        >
          <span className="text-foreground">Build What Matters.</span>
          <br />
          <span className="text-foreground/60">Ship What Works.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          From product vision to production deployment — AI agents that work together, 
          so nothing gets lost in translation.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Button
            size="lg"
            className="bg-foreground text-background hover:bg-foreground/90 rounded-md px-8 h-12 text-base font-medium shadow-lg shadow-foreground/10"
            asChild
          >
            <a href="https://build.productos.dev/sign-up">
              Start Building Free
              <ArrowRight className="ml-2 size-4" />
            </a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-md px-8 h-12 text-base font-medium border-border/50 hover:bg-card hover:border-border"
            asChild
          >
            <a href="#stages">See How It Works</a>
          </Button>
        </motion.div>

        {/* Demo Video/GIF Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative max-w-4xl mx-auto mb-12"
        >
          <div className="relative rounded-xl overflow-hidden border border-border/50 shadow-2xl shadow-black/20 bg-card">
            {/* Browser chrome effect */}
            <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border/50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1 rounded-md bg-background/50 text-xs text-muted-foreground">
                  build.productos.dev
                </div>
              </div>
            </div>
            
            {/* Video/GIF Container */}
            <div className="relative aspect-video bg-background">
              {/* Video for desktop (hidden on error) */}
              {!videoError && (
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover hidden md:block"
                  poster={demoPosterSrc}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  onLoadedData={() => setVideoLoaded(true)}
                  onError={() => setVideoError(true)}
                >
                  <source src={demoVideoSrc} type="video/mp4" />
                </video>
              )}
              
              {/* GIF fallback for mobile or video error */}
              <img
                src={videoError ? demoGifSrc : demoPosterSrc}
                alt="ProductOS demo - 5-stage AI product development workflow"
                className={`w-full h-full object-cover ${!videoError ? 'md:hidden' : ''}`}
                onError={(e) => {
                  // Final fallback - show dashboard screenshot
                  (e.target as HTMLImageElement).src = '/product/dashboard.webp'
                }}
              />
              
              {/* Play/Pause overlay for desktop */}
              {!videoError && videoLoaded && (
                <button
                  onClick={handlePlayClick}
                  className="hidden md:flex absolute inset-0 items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                  aria-label={isPlaying ? "Pause demo video" : "Play demo video"}
                >
                  <div className="w-16 h-16 rounded-full bg-background/90 flex items-center justify-center shadow-lg">
                    {isPlaying ? (
                      <div className="flex gap-1">
                        <div className="w-1.5 h-6 bg-foreground rounded-full" />
                        <div className="w-1.5 h-6 bg-foreground rounded-full" />
                      </div>
                    ) : (
                      <Play className="size-6 text-foreground ml-1" fill="currentColor" />
                    )}
                  </div>
                </button>
              )}
              
              {/* Loading state */}
              {!videoLoaded && !videoError && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/50 md:flex hidden">
                  <div className="w-8 h-8 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
                </div>
              )}
            </div>
          </div>
          
          {/* Caption */}
          <p className="text-sm text-muted-foreground mt-4">
            Watch: Idea → Research → PRD → Design → Code in under 60 seconds
          </p>
        </motion.div>

        {/* Stats - Balanced messaging */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex items-center justify-center gap-12 sm:gap-20"
        >
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">5</div>
            <div className="text-sm text-muted-foreground mt-1">AI Agents</div>
          </div>
          <div className="w-px h-10 bg-border" />
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">1</div>
            <div className="text-sm text-muted-foreground mt-1">Unified Workflow</div>
          </div>
          <div className="w-px h-10 bg-border" />
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">0</div>
            <div className="text-sm text-muted-foreground mt-1">Handoffs</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
