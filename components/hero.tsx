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
  const demoVideoMobileSrc = "/demo/productos-demo-mobile.mp4"
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
            <a href="/early-access">
              Request Early Access
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

        {/* Demo Video/GIF Section - 3D Perspective Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative max-w-5xl mx-auto mb-12 px-4"
          style={{ perspective: "1500px" }}
        >
          {/* Floating glow effect behind the mockup */}
          <div 
            className="absolute inset-0 blur-3xl opacity-20 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 70%)",
              transform: "translateY(20%)"
            }}
          />
          
          {/* 3D Perspective Container */}
          <motion.div
            initial={{ rotateX: 15 }}
            animate={{ rotateX: 5 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            whileHover={{ rotateX: 0, scale: 1.02 }}
            className="relative"
            style={{ 
              transformStyle: "preserve-3d",
              transition: "transform 0.4s ease-out"
            }}
          >
            <div 
              className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-card to-card/80"
              style={{
                boxShadow: `
                  0 4px 6px -1px rgba(0, 0, 0, 0.1),
                  0 25px 50px -12px rgba(0, 0, 0, 0.4),
                  0 50px 100px -24px rgba(0, 0, 0, 0.3),
                  inset 0 1px 0 0 rgba(255, 255, 255, 0.05)
                `,
                border: "1px solid rgba(255, 255, 255, 0.1)"
              }}
            >
              {/* Browser chrome effect */}
              <div className="flex items-center gap-2 px-4 py-3 bg-gradient-to-b from-muted/60 to-muted/40 border-b border-white/5">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57] shadow-inner" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e] shadow-inner" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840] shadow-inner" />
                </div>
              </div>
              
              {/* Video/GIF Container */}
              <div className="relative aspect-[16/9] bg-black">
                {/* Loading skeleton - shown until video loads */}
                {!videoLoaded && !videoError && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-10 h-10 border-2 border-zinc-700 border-t-zinc-400 rounded-full animate-spin" />
                      <span className="text-sm text-zinc-500">Loading video...</span>
                    </div>
                  </div>
                )}
                
                {/* Video for desktop (hidden on error) */}
                {!videoError && (
                  <video
                    ref={videoRef}
                    className={`w-full h-full object-contain hidden md:block bg-black ${!videoLoaded ? 'opacity-0' : 'opacity-100'}`}
                    muted
                    loop
                    playsInline
                    controls
                    preload="auto"
                    onLoadedData={() => setVideoLoaded(true)}
                    onError={() => setVideoError(true)}
                  >
                    <source src={demoVideoSrc} type="video/mp4" />
                  </video>
                )}
                
                {/* Mobile video */}
                <video
                  className={`w-full h-full object-contain md:hidden bg-black ${videoError ? 'hidden' : ''}`}
                  muted
                  loop
                  playsInline
                  controls
                  autoPlay
                  preload="auto"
                >
                  <source src={demoVideoMobileSrc} type="video/mp4" />
                </video>
                
                {/* Fallback image for video error */}
                {videoError && (
                  <img
                    src="/product/dashboard.webp"
                    alt="ProductOS demo - 5-stage AI product development workflow"
                    className="w-full h-full object-cover"
                  />
                )}
                
                {/* Bottom fade effect - positioned above video controls */}
                <div className="absolute bottom-10 left-0 right-0 h-16 bg-gradient-to-t from-background/50 to-transparent pointer-events-none" />
              </div>
            </div>
            
            {/* Reflection effect */}
            <div 
              className="absolute -bottom-px left-[5%] right-[5%] h-[30%] rounded-b-2xl opacity-[0.03] pointer-events-none hidden md:block"
              style={{
                background: "linear-gradient(to bottom, rgba(255,255,255,0.1), transparent)",
                transform: "rotateX(180deg) translateY(-1px)",
                filter: "blur(1px)"
              }}
            />
          </motion.div>
          
          {/* Caption */}
          <p className="text-sm text-muted-foreground mt-6 text-center">
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
            <div className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">10x</div>
            <div className="text-sm text-muted-foreground mt-1">Faster Shipping</div>
          </div>
          <div className="w-px h-10 bg-border" />
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">80%</div>
            <div className="text-sm text-muted-foreground mt-1">Less Dev Cost</div>
          </div>
          <div className="w-px h-10 bg-border" />
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Zero</div>
            <div className="text-sm text-muted-foreground mt-1">Code Required</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
