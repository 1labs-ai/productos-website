"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Check, X, TestTube, Shield, Zap, Eye } from "lucide-react"

const testSuites = [
  { 
    name: "Unit Tests", 
    icon: TestTube,
    tests: [
      { name: "components/Button", status: "pass" },
      { name: "components/Card", status: "pass" },
      { name: "hooks/useAuth", status: "pass" },
      { name: "utils/formatDate", status: "pass" },
      { name: "lib/api", status: "pass" },
    ]
  },
  { 
    name: "Integration", 
    icon: Zap,
    tests: [
      { name: "auth-flow", status: "pass" },
      { name: "checkout", status: "pass" },
      { name: "api-routes", status: "pass" },
    ]
  },
  { 
    name: "E2E Tests", 
    icon: Eye,
    tests: [
      { name: "user-journey", status: "pass" },
      { name: "critical-paths", status: "pass" },
    ]
  },
  { 
    name: "Security", 
    icon: Shield,
    tests: [
      { name: "xss-prevention", status: "pass" },
      { name: "csrf-tokens", status: "pass" },
      { name: "sql-injection", status: "pass" },
    ]
  },
]

export function TestCoverageMatrix() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [animatedTests, setAnimatedTests] = useState<Set<string>>(new Set())
  const [coverage, setCoverage] = useState(0)

  useEffect(() => {
    if (!isInView) return

    let testIndex = 0
    const allTests = testSuites.flatMap(suite => 
      suite.tests.map(test => `${suite.name}-${test.name}`)
    )

    const interval = setInterval(() => {
      if (testIndex >= allTests.length) {
        clearInterval(interval)
        return
      }
      
      setAnimatedTests(prev => new Set([...prev, allTests[testIndex]]))
      setCoverage(Math.round(((testIndex + 1) / allTests.length) * 100))
      testIndex++
    }, 150)

    return () => clearInterval(interval)
  }, [isInView])

  const totalTests = testSuites.reduce((acc, suite) => acc + suite.tests.length, 0)
  const passedTests = animatedTests.size

  return (
    <div ref={ref} className="relative">
      <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-b from-card/80 to-card/40 backdrop-blur-sm">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border/30">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <TestTube className="w-4 h-4 text-emerald-500" />
            </div>
            <div>
              <span className="text-sm font-medium text-foreground">Test Suite</span>
              <span className="text-xs text-muted-foreground ml-2">Auto-generated</span>
            </div>
          </div>
          
          {/* Coverage Badge */}
          <div className="flex items-center gap-2">
            <div className="w-16 h-1.5 rounded-full bg-muted/30 overflow-hidden">
              <motion.div 
                className="h-full bg-emerald-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${coverage}%` }}
              />
            </div>
            <span className="text-xs font-mono text-emerald-500">{coverage}%</span>
          </div>
        </div>

        {/* Test Grid */}
        <div className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testSuites.map((suite, suiteIndex) => {
              const Icon = suite.icon
              const suiteTestIds = suite.tests.map(t => `${suite.name}-${t.name}`)
              const passedInSuite = suiteTestIds.filter(id => animatedTests.has(id)).length
              
              return (
                <motion.div
                  key={suite.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: suiteIndex * 0.1 }}
                  className="p-4 rounded-xl bg-muted/20 border border-border/30"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">{suite.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {passedInSuite}/{suite.tests.length}
                    </span>
                  </div>
                  
                  <div className="space-y-1.5">
                    {suite.tests.map((test, testIndex) => {
                      const testId = `${suite.name}-${test.name}`
                      const isAnimated = animatedTests.has(testId)
                      
                      return (
                        <motion.div
                          key={test.name}
                          initial={{ opacity: 0.3 }}
                          animate={{ opacity: isAnimated ? 1 : 0.3 }}
                          className="flex items-center justify-between py-1"
                        >
                          <span className={`text-xs font-mono ${isAnimated ? "text-foreground/70" : "text-muted-foreground/50"}`}>
                            {test.name}
                          </span>
                          {isAnimated && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-4 h-4 rounded-full bg-emerald-500/10 flex items-center justify-center"
                            >
                              <Check className="w-2.5 h-2.5 text-emerald-500" />
                            </motion.div>
                          )}
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-border/30 bg-muted/20">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Check className="w-3 h-3 text-emerald-500" />
              {passedTests} passed
            </span>
            <span className="flex items-center gap-1">
              <X className="w-3 h-3 text-red-500" />
              0 failed
            </span>
          </div>
          {passedTests === totalTests && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-emerald-500 font-medium"
            >
              All tests passing ✓
            </motion.span>
          )}
        </div>
      </div>
    </div>
  )
}
