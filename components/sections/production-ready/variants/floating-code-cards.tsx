"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Check, FileCode2, TestTube2, Rocket } from "lucide-react"

const codeSnippets = [
  {
    file: "api/users.ts",
    code: `export async function getUsers() {
  return db.user.findMany({
    include: { profile: true }
  })
}`,
    icon: FileCode2,
    status: "Generated",
    delay: 0,
    position: "left",
  },
  {
    file: "components/Card.tsx",
    code: `export function Card({ children }) {
  return (
    <div className="rounded-xl p-6">
      {children}
    </div>
  )
}`,
    icon: FileCode2,
    status: "Generated",
    delay: 0.2,
    position: "right",
  },
  {
    file: "tests/api.test.ts",
    code: `describe('API', () => {
  it('returns users', async () => {
    const users = await getUsers()
    expect(users).toBeDefined()
  })
})`,
    icon: TestTube2,
    status: "Passed",
    delay: 0.4,
    position: "center",
  },
]

export function FloatingCodeCards() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <div ref={ref} className="relative py-8">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-96 h-96 rounded-full bg-gradient-to-r from-emerald-500/5 via-transparent to-violet-500/5 blur-3xl" />
      </div>

      {/* Floating cards container */}
      <div className="relative flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-6 perspective-1000">
        {codeSnippets.map((snippet, index) => (
          <motion.div
            key={snippet.file}
            initial={{ 
              opacity: 0, 
              y: 40,
              rotateX: 20,
              rotateY: index === 0 ? 15 : index === 2 ? -15 : 0,
            }}
            animate={isInView ? { 
              opacity: 1, 
              y: 0,
              rotateX: 0,
              rotateY: index === 0 ? 8 : index === 2 ? -8 : 0,
            } : {}}
            transition={{ 
              duration: 0.8, 
              delay: snippet.delay,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            whileHover={{ 
              y: -8, 
              rotateY: 0,
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
            className={`
              relative w-full lg:w-[280px] rounded-xl border border-border/50 
              bg-gradient-to-b from-card/90 to-card/60 backdrop-blur-sm
              shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)]
              ${index === 1 ? 'lg:-translate-y-6 z-10' : 'z-0'}
            `}
            style={{ 
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Top shine */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/30">
              <div className="flex items-center gap-2">
                <snippet.icon className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-xs font-mono text-muted-foreground">{snippet.file}</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10">
                <Check className="w-2.5 h-2.5 text-emerald-500" />
                <span className="text-[10px] text-emerald-500 font-medium">{snippet.status}</span>
              </div>
            </div>

            {/* Code */}
            <div className="p-4 font-mono text-xs">
              <pre className="text-muted-foreground/80 whitespace-pre-wrap leading-relaxed">
                <code>{snippet.code}</code>
              </pre>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Deploy indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1, duration: 0.5 }}
        className="flex items-center justify-center mt-8 lg:mt-12"
      >
        <div className="flex items-center gap-4 px-6 py-3 rounded-full border border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <Rocket className="w-4 h-4 text-emerald-500" />
            <span className="text-sm text-muted-foreground">
              <span className="text-emerald-400 font-medium">3 files</span> → Production
            </span>
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-1.5">
            <div className="relative">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            </div>
            <span className="text-sm text-emerald-400">Live</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
