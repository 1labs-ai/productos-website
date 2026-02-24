"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Mail, 
  MessageSquare, 
  ArrowRight, 
  Send,
  Twitter,
  Github,
  Linkedin,
  Youtube,
  Headphones,
  FileText,
  CheckCircle2,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

type FormState = "idle" | "submitting" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const contactOptions = [
  {
    icon: Mail,
    title: "Email us",
    description: "For general inquiries",
    link: "mailto:hello@productos.dev",
    linkText: "hello@productos.dev",
  },
  {
    icon: MessageSquare,
    title: "Sales",
    description: "Talk to our sales team",
    link: "mailto:sales@productos.dev",
    linkText: "sales@productos.dev",
  },
  {
    icon: Headphones,
    title: "Support",
    description: "Get technical help",
    link: "mailto:support@productos.dev",
    linkText: "support@productos.dev",
  },
];

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com/productos", label: "Twitter" },
  { icon: Github, href: "https://github.com/virusha-tech", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/company/productos", label: "LinkedIn" },
  { icon: Youtube, href: "https://youtube.com/@productos", label: "YouTube" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [formState, setFormState] = useState<FormState>("idle");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setFormState("submitting");
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // TODO: Replace with actual form submission logic
    console.log("Form submitted:", formData);
    
    setFormState("success");
    setFormData({ name: "", email: "", company: "", message: "" });
    
    // Reset to idle after showing success
    setTimeout(() => setFormState("idle"), 5000);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative py-12 sm:py-16 md:py-24 overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-transparent to-transparent" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-[120px]" />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8"
              >
                <Send className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-muted-foreground">Get in Touch</span>
              </motion.div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Let&apos;s build something{" "}
                <span className="text-gradient">amazing</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                Have questions about ProductOS? Want to discuss enterprise solutions? 
                We&apos;d love to hear from you.
              </p>
            </motion.div>

            {/* Main Content Grid */}
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="relative p-5 sm:p-6 md:p-8 rounded-2xl bg-card border border-white/5 overflow-hidden">
                  {/* Subtle glow */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
                  
                  <div className="relative z-10">
                    <h2 className="text-2xl font-bold mb-2">Send us a message</h2>
                    <p className="text-muted-foreground mb-6">
                      Fill out the form below and we&apos;ll get back to you within 24 hours.
                    </p>

                    {formState === "success" ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center py-12 text-center"
                      >
                        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                          <CheckCircle2 className="w-8 h-8 text-green-500" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Message sent!</h3>
                        <p className="text-muted-foreground">
                          We&apos;ll get back to you as soon as possible.
                        </p>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name *</Label>
                          <Input
                            id="name"
                            placeholder="Your name"
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            className={`bg-background/50 border-white/10 focus:border-blue-500 ${
                              errors.name ? "border-red-500 focus:border-red-500" : ""
                            }`}
                            disabled={formState === "submitting"}
                          />
                          {errors.name && (
                            <p className="text-sm text-red-500">{errors.name}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="you@company.com"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            className={`bg-background/50 border-white/10 focus:border-blue-500 ${
                              errors.email ? "border-red-500 focus:border-red-500" : ""
                            }`}
                            disabled={formState === "submitting"}
                          />
                          {errors.email && (
                            <p className="text-sm text-red-500">{errors.email}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="company">Company</Label>
                          <Input
                            id="company"
                            placeholder="Your company (optional)"
                            value={formData.company}
                            onChange={(e) => handleInputChange("company", e.target.value)}
                            className="bg-background/50 border-white/10 focus:border-blue-500"
                            disabled={formState === "submitting"}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message">Message *</Label>
                          <textarea
                            id="message"
                            rows={5}
                            placeholder="How can we help you?"
                            value={formData.message}
                            onChange={(e) => handleInputChange("message", e.target.value)}
                            className={`w-full px-3 py-2 rounded-md bg-background/50 border text-foreground placeholder:text-muted-foreground focus:ring-1 focus:ring-blue-500 outline-none transition-colors resize-none ${
                              errors.message 
                                ? "border-red-500 focus:border-red-500" 
                                : "border-white/10 focus:border-blue-500"
                            }`}
                            disabled={formState === "submitting"}
                          />
                          {errors.message && (
                            <p className="text-sm text-red-500">{errors.message}</p>
                          )}
                        </div>

                        <Button 
                          type="submit" 
                          className="w-full bg-gradient-to-r from-blue-500 to-violet-500 hover:opacity-90 text-white"
                          disabled={formState === "submitting"}
                        >
                          {formState === "submitting" ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              Send Message
                              <ArrowRight className="w-4 h-4" />
                            </>
                          )}
                        </Button>
                      </form>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Contact Info & Social */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="space-y-6"
              >
                {/* Contact Options */}
                {contactOptions.map((option, i) => (
                  <motion.div
                    key={option.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="group p-6 rounded-2xl bg-card border border-white/5 hover:border-white/10 transition-all hover-lift"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <option.icon className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-1">{option.title}</h3>
                        <p className="text-muted-foreground text-sm mb-2">{option.description}</p>
                        <a 
                          href={option.link} 
                          className="text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center group/link"
                        >
                          {option.linkText}
                          <ArrowRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Documentation Link */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 via-violet-500/5 to-transparent border border-white/10"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Check our docs</h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        Find answers in our comprehensive documentation.
                      </p>
                      <Button variant="outline" size="sm" className="border-white/20 hover:bg-white/5" asChild>
                        <Link href="/docs">
                          Browse Documentation
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </motion.div>

                {/* Social Links */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="p-6 rounded-2xl bg-card border border-white/5"
                >
                  <h3 className="text-lg font-semibold mb-4">Follow us</h3>
                  <div className="flex space-x-4">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-all hover:scale-110"
                        aria-label={social.label}
                      >
                        <social.icon size={20} />
                      </a>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ CTA Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative max-w-3xl mx-auto text-center p-12 rounded-3xl bg-gradient-to-br from-blue-500/10 via-violet-500/10 to-transparent border border-white/10 overflow-hidden"
            >
              {/* Background glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-violet-500/20 rounded-full blur-[100px]" />
              
              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                  Ready to get <span className="text-gradient">started</span>?
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                  Join thousands of teams already shipping faster with ProductOS.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-blue-500 to-violet-500 hover:opacity-90 px-8"
                    asChild
                  >
                    <Link href="/sign-up">
                      Start Free Trial
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-white/20 hover:bg-white/5"
                    asChild
                  >
                    <Link href="/pricing">View Pricing</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
