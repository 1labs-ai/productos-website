import { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { AnimatedSection } from "@/components/ui/animated-section"
import { FileText, Mail } from "lucide-react"

export const metadata: Metadata = {
  title: "Terms of Service | ProductOS",
  description: "Terms of Service for ProductOS - The AI-native product development platform.",
  openGraph: {
    title: "Terms of Service | ProductOS",
    description: "Terms of Service for ProductOS - The AI-native product development platform.",
    type: "website",
  },
}

const sections = [
  { id: "acceptance", title: "1. Acceptance of Terms" },
  { id: "accounts", title: "2. User Accounts" },
  { id: "subscription", title: "3. Subscription & Billing" },
  { id: "usage", title: "4. Acceptable Use" },
  { id: "intellectual-property", title: "5. Intellectual Property" },
  { id: "user-content", title: "6. User Content" },
  { id: "third-party", title: "7. Third-Party Services" },
  { id: "disclaimers", title: "8. Disclaimers" },
  { id: "liability", title: "9. Limitation of Liability" },
  { id: "indemnification", title: "10. Indemnification" },
  { id: "termination", title: "11. Termination" },
  { id: "changes", title: "12. Changes to Terms" },
  { id: "governing-law", title: "13. Governing Law" },
  { id: "contact", title: "14. Contact Us" },
]

export default function TermsPage() {
  const lastUpdated = "February 25, 2025"

  return (
    <>
      
      {/* Hero */}
      <section className="relative pt-32 pb-16 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <AnimatedSection>
            <Badge variant="secondary" className="mb-6 px-4 py-2 bg-muted/50 border border-border">
              <FileText className="w-4 h-4 mr-2" />
              Legal
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4" style={{ letterSpacing: '-0.025em' }}>
              Terms of Service
            </h1>
            <p className="text-muted-foreground">
              Last updated: {lastUpdated}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Content */}
      <section className="pb-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Table of Contents - Sticky Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card className="p-6 bg-card/50 border-border">
                  <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
                    Table of Contents
                  </h3>
                  <nav className="space-y-2">
                    {sections.map((section) => (
                      <a
                        key={section.id}
                        href={`#${section.id}`}
                        className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
                      >
                        {section.title}
                      </a>
                    ))}
                  </nav>
                </Card>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <AnimatedSection delay={0.1}>
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                  <p className="text-muted-foreground text-lg mb-8">
                    Welcome to ProductOS. These Terms of Service (&quot;Terms&quot;) govern your access to and use of ProductOS&apos;s 
                    website, products, and services (&quot;Services&quot;). Please read these Terms carefully before using our Services.
                  </p>

                  <section id="acceptance" className="mb-12 scroll-mt-24">
                    <h2 className="text-2xl font-bold mb-4 text-foreground">1. Acceptance of Terms</h2>
                    <p className="text-muted-foreground mb-4">
                      By accessing or using ProductOS, you agree to be bound by these Terms and our Privacy Policy. 
                      If you do not agree to these Terms, you may not access or use our Services.
                    </p>
                    <p className="text-muted-foreground">
                      You must be at least 18 years old to use our Services. By using ProductOS, you represent and 
                      warrant that you meet this age requirement.
                    </p>
                  </section>

                  <section id="accounts" className="mb-12 scroll-mt-24">
                    <h2 className="text-2xl font-bold mb-4 text-foreground">2. User Accounts</h2>
                    <p className="text-muted-foreground mb-4">
                      To access certain features of ProductOS, you must create an account. When you create an account, you agree to:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                      <li>Provide accurate, current, and complete information</li>
                      <li>Maintain and promptly update your account information</li>
                      <li>Maintain the security of your password and account</li>
                      <li>Accept responsibility for all activities under your account</li>
                      <li>Notify us immediately of any unauthorized use</li>
                    </ul>
                    <p className="text-muted-foreground">
                      We reserve the right to suspend or terminate accounts that violate these Terms or for any other reason at our discretion.
                    </p>
                  </section>

                  <section id="subscription" className="mb-12 scroll-mt-24">
                    <h2 className="text-2xl font-bold mb-4 text-foreground">3. Subscription & Billing</h2>
                    <h3 className="text-xl font-semibold mb-3 text-foreground/90">3.1 Plans and Pricing</h3>
                    <p className="text-muted-foreground mb-4">
                      ProductOS offers various subscription plans with different features and pricing. Current pricing is 
                      available on our <Link href="/#pricing" className="text-primary hover:underline">pricing section</Link>. 
                      We reserve the right to modify pricing with 30 days notice.
                    </p>
                    
                    <h3 className="text-xl font-semibold mb-3 text-foreground/90">3.2 Billing</h3>
                    <p className="text-muted-foreground mb-4">
                      Subscriptions are billed in advance on a monthly or annual basis. Your subscription will automatically 
                      renew unless cancelled before the renewal date.
                    </p>
                    
                    <h3 className="text-xl font-semibold mb-3 text-foreground/90">3.3 Refunds</h3>
                    <p className="text-muted-foreground">
                      We offer a 14-day money-back guarantee for first-time subscribers. After this period, payments are 
                      non-refundable except where required by law.
                    </p>
                  </section>

                  <section id="usage" className="mb-12 scroll-mt-24">
                    <h2 className="text-2xl font-bold mb-4 text-foreground">4. Acceptable Use</h2>
                    <p className="text-muted-foreground mb-4">You agree not to use ProductOS to:</p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                      <li>Violate any applicable laws or regulations</li>
                      <li>Infringe on intellectual property rights of others</li>
                      <li>Transmit harmful code, viruses, or malware</li>
                      <li>Engage in unauthorized data collection or scraping</li>
                      <li>Interfere with or disrupt the Services</li>
                      <li>Attempt to gain unauthorized access to our systems</li>
                      <li>Harass, abuse, or harm other users</li>
                      <li>Generate illegal, harmful, or misleading content</li>
                    </ul>
                  </section>

                  <section id="intellectual-property" className="mb-12 scroll-mt-24">
                    <h2 className="text-2xl font-bold mb-4 text-foreground">5. Intellectual Property</h2>
                    <p className="text-muted-foreground mb-4">
                      ProductOS and its original content, features, and functionality are owned by ProductOS Inc. and are 
                      protected by international copyright, trademark, patent, trade secret, and other intellectual 
                      property laws.
                    </p>
                    <p className="text-muted-foreground">
                      Our trademarks and trade dress may not be used in connection with any product or service without 
                      prior written consent.
                    </p>
                  </section>

                  <section id="user-content" className="mb-12 scroll-mt-24">
                    <h2 className="text-2xl font-bold mb-4 text-foreground">6. User Content</h2>
                    <p className="text-muted-foreground mb-4">
                      You retain ownership of content you create using ProductOS. By using our Services, you grant us 
                      a limited license to process and store your content as necessary to provide the Services.
                    </p>
                    <p className="text-muted-foreground">
                      AI-generated outputs created through ProductOS are licensed to you for your use, subject to these 
                      Terms and any applicable third-party licenses.
                    </p>
                  </section>

                  <section id="third-party" className="mb-12 scroll-mt-24">
                    <h2 className="text-2xl font-bold mb-4 text-foreground">7. Third-Party Services</h2>
                    <p className="text-muted-foreground">
                      ProductOS may integrate with or contain links to third-party services. We are not responsible for 
                      the content, privacy policies, or practices of third-party services. Your use of such services is 
                      at your own risk and subject to their terms.
                    </p>
                  </section>

                  <section id="disclaimers" className="mb-12 scroll-mt-24">
                    <h2 className="text-2xl font-bold mb-4 text-foreground">8. Disclaimers</h2>
                    <p className="text-muted-foreground mb-4">
                      THE SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER 
                      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS 
                      FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                    </p>
                    <p className="text-muted-foreground">
                      We do not warrant that the Services will be uninterrupted, error-free, or secure. AI-generated 
                      content may contain errors and should be reviewed before use.
                    </p>
                  </section>

                  <section id="liability" className="mb-12 scroll-mt-24">
                    <h2 className="text-2xl font-bold mb-4 text-foreground">9. Limitation of Liability</h2>
                    <p className="text-muted-foreground mb-4">
                      TO THE MAXIMUM EXTENT PERMITTED BY LAW, PRODUCTOS AND ITS AFFILIATES SHALL NOT BE LIABLE FOR ANY 
                      INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO 
                      LOSS OF PROFITS, DATA, USE, OR GOODWILL.
                    </p>
                    <p className="text-muted-foreground">
                      Our total liability for any claims arising from these Terms or your use of the Services shall not 
                      exceed the amount you paid us in the 12 months preceding the claim.
                    </p>
                  </section>

                  <section id="indemnification" className="mb-12 scroll-mt-24">
                    <h2 className="text-2xl font-bold mb-4 text-foreground">10. Indemnification</h2>
                    <p className="text-muted-foreground">
                      You agree to indemnify and hold harmless ProductOS, its affiliates, and their respective officers, 
                      directors, employees, and agents from any claims, damages, losses, or expenses arising from your 
                      use of the Services or violation of these Terms.
                    </p>
                  </section>

                  <section id="termination" className="mb-12 scroll-mt-24">
                    <h2 className="text-2xl font-bold mb-4 text-foreground">11. Termination</h2>
                    <p className="text-muted-foreground mb-4">
                      You may terminate your account at any time by contacting us or using the account settings. We may 
                      terminate or suspend your access immediately, without prior notice, for any reason including breach 
                      of these Terms.
                    </p>
                    <p className="text-muted-foreground">
                      Upon termination, your right to use the Services will cease immediately. Provisions that by their 
                      nature should survive termination will survive.
                    </p>
                  </section>

                  <section id="changes" className="mb-12 scroll-mt-24">
                    <h2 className="text-2xl font-bold mb-4 text-foreground">12. Changes to Terms</h2>
                    <p className="text-muted-foreground">
                      We reserve the right to modify these Terms at any time. We will provide notice of material changes 
                      by posting the updated Terms on our website and updating the &quot;Last updated&quot; date. Your continued 
                      use of the Services after changes constitutes acceptance of the modified Terms.
                    </p>
                  </section>

                  <section id="governing-law" className="mb-12 scroll-mt-24">
                    <h2 className="text-2xl font-bold mb-4 text-foreground">13. Governing Law</h2>
                    <p className="text-muted-foreground">
                      These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, 
                      United States, without regard to its conflict of law provisions. Any disputes shall be resolved in 
                      the courts located in Delaware.
                    </p>
                  </section>

                  <section id="contact" className="mb-12 scroll-mt-24">
                    <h2 className="text-2xl font-bold mb-4 text-foreground">14. Contact Us</h2>
                    <p className="text-muted-foreground mb-4">
                      If you have any questions about these Terms, please contact us:
                    </p>
                    <Card className="p-6 bg-card/50 border-border inline-block">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-primary" />
                        <a href="mailto:legal@productos.dev" className="text-primary hover:underline transition-colors">
                          legal@productos.dev
                        </a>
                      </div>
                    </Card>
                  </section>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="py-12 border-t border-border">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
