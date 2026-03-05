"use client";

import { useState, useEffect, useRef } from "react";
import { PitchDeckContent } from "./pitch-deck-content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Mail, ArrowLeft, ShieldCheck, Lock } from "lucide-react";

// Logo component
function Logo({ className = "size-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" fill="none" className={className}>
      <path d="M4 32 L18 4 L32 32 Z" fill="#E5E5E5" />
      <path d="M18 4 L4 32 L18 32 Z" fill="#B3B3B3" />
      <path d="M18 4 L18 32 L32 4 Z" fill="#808080" />
    </svg>
  );
}

type AuthStep = "email" | "otp" | "denied";

export default function PitchDeckPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [viewerName, setViewerName] = useState("");
  
  // Auth flow state
  const [authStep, setAuthStep] = useState<AuthStep>("email");
  const [email, setEmail] = useState("");
  const [allowedName, setAllowedName] = useState("");
  const [maskedEmail, setMaskedEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Check if user already has a session
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/pitch-deck/session");
        const data = await res.json();
        if (data.authenticated) {
          setIsAuthenticated(true);
          setViewerName(data.viewer.name);
        }
      } catch (error) {
        console.error("Session check failed:", error);
      } finally {
        setIsLoading(false);
      }
    };
    checkSession();
  }, []);

  // Handle email submission
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // First check if email is allowed
      const checkRes = await fetch("/api/pitch-deck/check-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      
      const checkData = await checkRes.json();
      
      if (!checkData.allowed) {
        setAuthStep("denied");
        setIsSubmitting(false);
        return;
      }

      setAllowedName(checkData.name);

      // Send OTP
      const otpRes = await fetch("/api/pitch-deck/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!otpRes.ok) {
        const otpData = await otpRes.json();
        throw new Error(otpData.error || "Failed to send code");
      }

      const otpData = await otpRes.json();
      setMaskedEmail(otpData.maskedEmail);
      setAuthStep("otp");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle OTP input
  const handleOtpChange = (index: number, value: string) => {
    // Only allow digits
    const digit = value.replace(/\D/g, "").slice(-1);
    
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    // Auto-focus next input
    if (digit && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace
  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste
  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);
    // Focus on next empty or last input
    const nextEmptyIndex = newOtp.findIndex(d => !d);
    otpRefs.current[nextEmptyIndex === -1 ? 5 : nextEmptyIndex]?.focus();
  };

  // Handle OTP verification
  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    
    if (code.length !== 6) {
      setError("Please enter the 6-digit code");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/pitch-deck/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Invalid code");
      }

      setIsAuthenticated(true);
      setViewerName(data.viewer.name);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
      setOtp(["", "", "", "", "", ""]);
      otpRefs.current[0]?.focus();
    } finally {
      setIsSubmitting(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    setIsSubmitting(true);
    setError("");
    setOtp(["", "", "", "", "", ""]);

    try {
      const res = await fetch("/api/pitch-deck/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to resend code");
      }

      // Focus first input
      otpRefs.current[0]?.focus();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Logo className="size-16 animate-pulse" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Show pitch deck if authenticated
  if (isAuthenticated) {
    return <PitchDeckContent />;
  }

  // Access denied
  if (authStep === "denied") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center size-16 rounded-full bg-red-500/10 mb-4">
              <Lock className="size-8 text-red-500" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Access Restricted</h1>
            <p className="text-muted-foreground">
              This pitch deck is invite-only. If you&apos;re an investor interested in ProductOS,
              please reach out to us.
            </p>
          </div>
          
          <div className="space-y-4">
            <a
              href="mailto:founders@productos.dev?subject=Pitch%20Deck%20Access%20Request"
              className="inline-flex items-center justify-center w-full h-12 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              <Mail className="size-4 mr-2" />
              Contact founders@productos.dev
            </a>
            
            <Button
              variant="ghost"
              className="w-full"
              onClick={() => {
                setAuthStep("email");
                setEmail("");
                setError("");
              }}
            >
              <ArrowLeft className="size-4 mr-2" />
              Try another email
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // OTP input
  if (authStep === "otp") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center size-16 rounded-full bg-green-500/10 mb-4">
              <ShieldCheck className="size-8 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Check your email</h1>
            <p className="text-muted-foreground">
              Hi {allowedName}! We sent a 6-digit code to{" "}
              <span className="text-foreground font-medium">{maskedEmail}</span>
            </p>
          </div>

          <form onSubmit={handleOtpSubmit} className="space-y-6">
            {/* OTP Input Fields */}
            <div className="flex justify-center gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => { otpRefs.current[index] = el }}
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  onPaste={handleOtpPaste}
                  className="w-12 h-14 text-center text-2xl font-bold border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  autoFocus={index === 0}
                />
              ))}
            </div>

            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            <Button
              type="submit"
              className="w-full h-12 text-base"
              disabled={isSubmitting || otp.join("").length !== 6}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify & View Pitch Deck"
              )}
            </Button>

            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Didn&apos;t receive the code?
              </p>
              <Button
                type="button"
                variant="link"
                onClick={handleResendOtp}
                disabled={isSubmitting}
                className="text-sm"
              >
                Resend code
              </Button>
            </div>

            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={() => {
                setAuthStep("email");
                setOtp(["", "", "", "", "", ""]);
                setError("");
              }}
            >
              <ArrowLeft className="size-4 mr-2" />
              Use different email
            </Button>
          </form>
        </div>
      </div>
    );
  }

  // Email input (default)
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Logo className="size-16 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-foreground mb-2">ProductOS</h1>
          <p className="text-muted-foreground">
            Enter your email to access our investor pitch deck
          </p>
        </div>

        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
            <Input
              type="email"
              name="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12 pl-10"
              autoFocus
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          <Button
            type="submit"
            className="w-full h-12 text-base"
            disabled={isSubmitting || !email}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Checking...
              </>
            ) : (
              "Continue"
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground mt-4">
            This pitch deck is for invited investors only.
            <br />
            Contact <a href="mailto:founders@productos.dev" className="underline hover:text-foreground">founders@productos.dev</a> for access.
          </p>
        </form>
      </div>
    </div>
  );
}
