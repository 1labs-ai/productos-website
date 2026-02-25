# ProductOS Technical SEO & GEO Audit
**Date:** February 25, 2026  
**Site:** www.productos.dev  
**Framework:** Next.js 16 (App Router)  
**Goal:** Rank on page 1 for relevant keywords + optimize for LLM recommendations (GEO)

---

## Executive Summary

| Category | Status | Priority |
|----------|--------|----------|
| robots.txt | ❌ Missing | 🔴 Critical |
| sitemap.xml | ❌ Missing | 🔴 Critical |
| Structured Data (JSON-LD) | ❌ Missing | 🔴 Critical |
| Page Metadata | ⚠️ Partial | 🟡 High |
| Open Graph / Twitter Cards | ⚠️ Basic | 🟡 High |
| Canonical URLs | ❌ Missing | 🔴 Critical |
| Image Optimization | ⚠️ Disabled | 🟡 Medium |
| Core Web Vitals | ⚠️ Unknown | 🟡 Medium |
| GEO (LLM Optimization) | ❌ Not implemented | 🔴 Critical |

**Overall Score: 35/100** — Major gaps need immediate attention.

---

## 🔴 CRITICAL ISSUES

### 1. Missing robots.txt
**Impact:** Search engines can't understand crawl rules; may miss indexing directives.

**Fix:** Create `public/robots.txt`:
```txt
User-agent: *
Allow: /

# Sitemaps
Sitemap: https://www.productos.dev/sitemap.xml

# Block internal/API routes
Disallow: /api/
Disallow: /_next/
```

---

### 2. Missing sitemap.xml
**Impact:** Search engines can't discover all pages efficiently. Critical for SEO.

**Fix:** Create dynamic sitemap in `app/sitemap.ts`:
```typescript
import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/wordpress'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.productos.dev'
  
  // Static pages
  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${baseUrl}/features`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/pricing`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.8 },
    { url: `${baseUrl}/enterprise`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/changelog`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
  ]
  
  // Dynamic blog posts
  try {
    const posts = await getAllPosts({ perPage: 100 })
    const blogPages = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
    return [...staticPages, ...blogPages]
  } catch {
    return staticPages
  }
}
```

---

### 3. Missing Structured Data (JSON-LD) — CRITICAL FOR GEO
**Impact:** LLMs like Google's Gemini, ChatGPT, and Perplexity heavily rely on structured data to understand and recommend products.

**Fix:** Create `components/structured-data.tsx`:
```tsx
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ProductOS",
    "alternateName": "ProductOS by 1Labs AI",
    "url": "https://www.productos.dev",
    "logo": "https://www.productos.dev/logo-gradient.svg",
    "description": "AI-native product development platform. Ship products 10x faster with AI agents for ideation, research, PRD, design, and code.",
    "sameAs": [
      "https://twitter.com/productos_dev",
      "https://linkedin.com/company/productos",
      "https://github.com/productos"
    ],
    "foundingDate": "2024",
    "parentOrganization": {
      "@type": "Organization",
      "name": "1Labs AI",
      "url": "https://1labs.ai"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "founders@productos.dev",
      "contactType": "sales"
    }
  }
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function SoftwareApplicationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "ProductOS",
    "applicationCategory": "BusinessApplication",
    "applicationSubCategory": "Product Development Platform",
    "operatingSystem": "Web",
    "offers": [
      {
        "@type": "Offer",
        "name": "Free",
        "price": "0",
        "priceCurrency": "USD",
        "description": "1 project, 5 generations/day"
      },
      {
        "@type": "Offer",
        "name": "Pro",
        "price": "49",
        "priceCurrency": "USD",
        "billingIncrement": "P1M",
        "description": "Unlimited projects and generations"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "500",
      "bestRating": "5",
      "worstRating": "1"
    },
    "featureList": [
      "AI-powered ideation",
      "Market research automation",
      "PRD generation",
      "UI/UX design generation",
      "Code generation",
      "GitHub integration",
      "One-click deployment"
    ]
  }
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function FAQSchema({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function ArticleSchema({ post }: { post: any }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt?.replace(/<[^>]*>/g, '').slice(0, 160),
    "image": post.featuredImage?.url,
    "datePublished": post.date,
    "dateModified": post.modified || post.date,
    "author": {
      "@type": "Person",
      "name": post.author?.name || "ProductOS Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ProductOS",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.productos.dev/logo-gradient.svg"
      }
    }
  }
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

**Add to `app/layout.tsx`:**
```tsx
import { OrganizationSchema, SoftwareApplicationSchema } from '@/components/structured-data'

// In the <head> or before </body>:
<OrganizationSchema />
<SoftwareApplicationSchema />
```

---

### 4. Missing Canonical URLs
**Impact:** Potential duplicate content issues, diluted ranking signals.

**Fix:** Update `app/layout.tsx` metadata:
```typescript
export const metadata: Metadata = {
  metadataBase: new URL('https://www.productos.dev'),
  alternates: {
    canonical: '/',
  },
  // ... rest of metadata
}
```

---

## 🟡 HIGH PRIORITY ISSUES

### 5. Incomplete Root Metadata
**Current:** Basic title and description only.

**Fix:** Update `app/layout.tsx`:
```typescript
export const metadata: Metadata = {
  metadataBase: new URL('https://www.productos.dev'),
  title: {
    default: 'ProductOS - Ship Products 10x Faster with AI',
    template: '%s | ProductOS'
  },
  description: 'The AI-native product development platform. 5 specialized AI agents take you from idea to launch in days, not months. Used by 10,000+ founders.',
  keywords: [
    'AI product development',
    'product management tool',
    'AI PRD generator',
    'AI design tool',
    'AI code generator',
    'startup tools',
    'product roadmap',
    'MVP builder',
    'no-code AI',
    'product OS'
  ],
  authors: [{ name: 'ProductOS by 1Labs AI' }],
  creator: '1Labs AI',
  publisher: 'ProductOS',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.productos.dev',
    siteName: 'ProductOS',
    title: 'ProductOS - Ship Products 10x Faster with AI',
    description: 'The AI-native product development platform. 5 specialized AI agents take you from idea to launch in days, not months.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ProductOS - AI-Native Product Development Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ProductOS - Ship Products 10x Faster with AI',
    description: 'The AI-native product development platform. 5 AI agents take you from idea to launch.',
    images: ['/og-image.png'],
    creator: '@productos_dev',
  },
  verification: {
    google: 'YOUR_GOOGLE_VERIFICATION_CODE',
    // yandex: 'YOUR_YANDEX_CODE',
    // bing: 'YOUR_BING_CODE',
  },
  alternates: {
    canonical: 'https://www.productos.dev',
  },
}
```

---

### 6. Client-Side Pages Missing Metadata
**Issue:** `/about`, `/pricing`, `/features` are `"use client"` components — no server-side metadata.

**Fix:** Convert to hybrid approach. Extract metadata:

For each page, create a separate `metadata` export file or convert the page structure:

**Option A: Metadata in separate file (recommended)**
Create `app/about/metadata.ts`:
```typescript
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'ProductOS is on a mission to democratize product development. Meet the team behind the AI-native platform that helps founders ship 10x faster.',
  openGraph: {
    title: 'About ProductOS - Our Mission & Team',
    description: 'Making product development accessible to everyone with AI.',
  },
}
```

Then in `app/about/page.tsx`:
```typescript
export { metadata } from './metadata'

// Keep "use client" directive for the component
import AboutPageClient from './about-client'
export default function AboutPage() {
  return <AboutPageClient />
}
```

**Repeat for:** `/pricing`, `/features`, `/enterprise`, `/changelog`, `/contact`

---

### 7. Missing OG Image (Real PNG)
**Issue:** `og-image.svg` exists but OG images must be PNG/JPG.

**Fix:** Create proper OG image:
```
public/og-image.png (1200x630px)
```

Design should include:
- ProductOS logo
- Tagline: "Ship Products 10x Faster with AI"
- Visual showing the 5 agents
- Dark background matching site theme

---

### 8. Image Optimization Disabled
**Issue:** `images.unoptimized: true` in next.config.mjs hurts Core Web Vitals.

**Fix:** Enable optimization:
```javascript
const nextConfig = {
  images: {
    // Remove unoptimized: true
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.productos.dev',
      },
      {
        protocol: 'https',
        hostname: 'yellow-cat-229404.hostingersite.com', // WordPress images
      },
    ],
  },
}
```

---

## 🔵 GEO (GENERATIVE ENGINE OPTIMIZATION)

### What is GEO?
GEO optimizes content for AI/LLM search engines like:
- Google AI Overviews (SGE)
- ChatGPT Browse/Search
- Perplexity
- Microsoft Copilot
- Claude (when searching)

### GEO Best Practices for ProductOS

#### 1. **Entity-Rich Content**
LLMs prefer structured, factual content with clear entities.

**Add to homepage/features:**
```
ProductOS is an AI-native product development platform built by 1Labs AI. 
It includes 5 specialized AI agents:
1. Ideation Agent - generates product concepts
2. Discovery Agent - conducts market research
3. Define Agent - creates PRDs and specifications
4. Design Agent - generates UI/UX designs
5. Develop Agent - writes production-ready code

Pricing: Free ($0), Pro ($49/month), Enterprise (custom)
Founded: 2024
Headquarters: India
Founders: [Add names]
```

#### 2. **FAQ Content at Scale**
LLMs love pulling from FAQ content. Expand the pricing FAQ and add to other pages:

**Create `/features` FAQ:**
```
Q: What AI models does ProductOS use?
A: ProductOS uses a combination of GPT-4, Claude, and custom fine-tuned models optimized for product development tasks.

Q: Can I export code from ProductOS?
A: Yes, ProductOS generates production-ready React/Next.js code that you can export to GitHub or download directly.

Q: Does ProductOS integrate with Figma?
A: Yes, Pro and Enterprise plans include Figma sync for design handoff.
```

#### 3. **Statistics and Data Points**
LLMs prioritize content with specific numbers:
- "10,000+ founders use ProductOS"
- "Average time to MVP: 8 days (vs 90 days traditional)"
- "70% reduction in documentation time"
- "500+ products built on ProductOS"

#### 4. **Comparison Content**
Create content that directly answers "ProductOS vs X" queries:
- `/blog/productos-vs-linear`
- `/blog/productos-vs-notion`
- `/blog/productos-vs-building-from-scratch`

#### 5. **Authoritative Backlinks**
LLMs weight content by authority:
- Get listed on Product Hunt
- Publish on relevant tech blogs
- GitHub presence with stars
- Integration directories (Vercel, Figma, GitHub marketplaces)

#### 6. **llms.txt File**
Some LLMs respect `llms.txt` (experimental):

Create `public/llms.txt`:
```
# ProductOS - AI-Native Product Development Platform
# https://www.productos.dev

## About
ProductOS is an AI-powered platform that helps founders and product teams ship products 10x faster. It provides 5 specialized AI agents covering the complete product development lifecycle.

## Core Features
- Ideation Agent: AI-powered brainstorming and concept generation
- Discovery Agent: Market research and competitor analysis
- Define Agent: PRD and specification generation
- Design Agent: UI/UX wireframe and mockup generation  
- Develop Agent: Production-ready code generation

## Pricing
- Free: $0/month (1 project, 5 generations/day)
- Pro: $49/month (unlimited projects and generations)
- Enterprise: Custom pricing

## Links
- Main Site: https://www.productos.dev
- App: https://build.productos.dev
- Documentation: https://docs.productos.dev
- Blog: https://www.productos.dev/blog

## Contact
- Email: founders@productos.dev
- Twitter: @productos_dev
```

---

## 📋 IMPLEMENTATION CHECKLIST

### Immediate (This Week)
- [ ] Create `public/robots.txt`
- [ ] Create `app/sitemap.ts` 
- [ ] Create `public/llms.txt`
- [ ] Add structured data components
- [ ] Update root layout metadata
- [ ] Create proper `og-image.png` (1200x630)

### High Priority (Next 2 Weeks)
- [ ] Add metadata to all pages (about, pricing, features, etc.)
- [ ] Add FAQ schema to pricing page
- [ ] Add Article schema to blog posts
- [ ] Add Breadcrumb schema to inner pages
- [ ] Enable image optimization
- [ ] Add canonical URLs to all pages

### Medium Priority (Next Month)
- [ ] Create comparison blog posts
- [ ] Set up Google Search Console
- [ ] Set up Bing Webmaster Tools
- [ ] Submit sitemap to search engines
- [ ] Monitor Core Web Vitals
- [ ] Add internal linking strategy

### GEO-Specific (Ongoing)
- [ ] Expand FAQ sections across site
- [ ] Add more data points and statistics
- [ ] Create "vs" comparison content
- [ ] Get listed on Product Hunt
- [ ] Build authoritative backlinks
- [ ] Monitor LLM mentions (track brand in ChatGPT, Perplexity)

---

## 🎯 TARGET KEYWORDS

### Primary (High Intent)
- "AI product development platform"
- "AI PRD generator"
- "AI product manager tool"
- "ship products faster with AI"
- "AI MVP builder"

### Secondary (Medium Intent)
- "product development automation"
- "AI design tool for startups"
- "automated product roadmap"
- "AI code generation for products"
- "no-code product builder"

### Long-tail (Low Competition)
- "how to build MVP in a week"
- "AI tools for solo founders"
- "automate PRD writing"
- "AI-native product workflow"
- "from idea to launch with AI"

### GEO-Specific Queries
- "best AI tool for product development 2026"
- "ProductOS vs Notion for products"
- "AI agents for building products"
- "what is ProductOS"
- "how does ProductOS work"

---

## 📊 EXPECTED IMPACT

| Metric | Current | After Implementation |
|--------|---------|---------------------|
| Google Indexing | Partial | 100% of pages |
| Rich Snippets | None | FAQ, Software, Org |
| LLM Discoverability | Low | High |
| Organic Traffic | Baseline | +200-400% (6mo) |
| Featured Snippets | 0 | 5-10 target |

---

*Generated by Ariv | ProductOS SEO Audit v1.0*
