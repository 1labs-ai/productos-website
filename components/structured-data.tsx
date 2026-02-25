/**
 * Structured Data (JSON-LD) Components for SEO and GEO
 * 
 * These schemas help search engines and LLMs understand:
 * - What ProductOS is (Organization, SoftwareApplication)
 * - What each page contains (Article, FAQ, Breadcrumb)
 * - Relationships between content
 */

interface FAQItem {
  question: string
  answer: string
}

interface BreadcrumbItem {
  name: string
  url: string
}

interface ArticleProps {
  title: string
  description: string
  image?: string
  datePublished: string
  dateModified?: string
  authorName?: string
}

// Organization schema - who we are
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ProductOS",
    "alternateName": "ProductOS by 1Labs AI",
    "url": "https://www.productos.dev",
    "logo": "https://www.productos.dev/logo-gradient.svg",
    "description": "AI-native product development platform. Ship products 10x faster with 5 specialized AI agents for ideation, research, PRD, design, and code generation.",
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
      "contactType": "sales",
      "availableLanguage": "English"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN"
    }
  }
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Software Application schema - what we build
export function SoftwareApplicationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "ProductOS",
    "applicationCategory": "BusinessApplication",
    "applicationSubCategory": "Product Development Platform",
    "operatingSystem": "Web",
    "url": "https://build.productos.dev",
    "description": "AI-native platform with 5 specialized agents for complete product development: Ideation, Discovery, Define, Design, and Develop.",
    "offers": [
      {
        "@type": "Offer",
        "name": "Free",
        "price": "0",
        "priceCurrency": "USD",
        "description": "1 project, 5 generations/day, basic AI agents"
      },
      {
        "@type": "Offer",
        "name": "Pro",
        "price": "49",
        "priceCurrency": "USD",
        "priceValidUntil": "2027-12-31",
        "description": "Unlimited projects, all AI agents, GitHub integration",
        "billingIncrement": "P1M"
      },
      {
        "@type": "Offer",
        "name": "Enterprise",
        "price": "0",
        "priceCurrency": "USD",
        "description": "Custom pricing, SSO, dedicated support, SLA guarantee"
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
      "AI-powered ideation and brainstorming",
      "Automated market research",
      "PRD and specification generation",
      "UI/UX design generation",
      "Production-ready code generation",
      "GitHub integration",
      "Figma sync",
      "One-click Vercel deployment"
    ],
    "screenshot": "https://www.productos.dev/og-image.png",
    "softwareVersion": "1.0",
    "author": {
      "@type": "Organization",
      "name": "1Labs AI",
      "url": "https://1labs.ai"
    }
  }
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// FAQ schema for pages with questions
export function FAQSchema({ faqs }: { faqs: FAQItem[] }) {
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

// Article schema for blog posts
export function ArticleSchema({ 
  title, 
  description, 
  image, 
  datePublished, 
  dateModified,
  authorName = "ProductOS Team" 
}: ArticleProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": image || "https://www.productos.dev/og-image.png",
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished,
    "author": {
      "@type": "Person",
      "name": authorName,
      "url": "https://www.productos.dev/about"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ProductOS",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.productos.dev/logo-gradient.svg"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://www.productos.dev/blog"
    }
  }
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Breadcrumb schema for navigation
export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
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

// WebSite schema for search box
export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ProductOS",
    "url": "https://www.productos.dev",
    "description": "AI-native product development platform. Ship products 10x faster with AI.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.productos.dev/blog?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  }
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Product schema for specific product pages
export function ProductSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "ProductOS Pro",
    "description": "Full-featured AI product development platform with unlimited projects and all AI agents",
    "brand": {
      "@type": "Brand",
      "name": "ProductOS"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://www.productos.dev/pricing",
      "priceCurrency": "USD",
      "price": "49",
      "priceValidUntil": "2027-12-31",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "500"
    }
  }
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
