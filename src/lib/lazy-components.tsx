"use client";

import dynamic from "next/dynamic";

// Skeleton placeholder for lazy-loaded components
const LoadingSkeleton = ({ className = "h-96" }: { className?: string }) => (
  <div className={`animate-pulse bg-white/5 rounded-lg ${className}`} />
);

/**
 * Lazy load heavy components that are below the fold.
 * This reduces the initial bundle size and improves FCP/LCP.
 *
 * Usage:
 * import { LazyTestimonials, LazyFAQ } from "@/lib/lazy-components";
 *
 * Then use <LazyTestimonials /> in your page instead of direct import.
 */

// Example: Lazy load testimonials section (below-fold)
// Uncomment when component exists:
// export const LazyTestimonials = dynamic(
//   () => import("@/components/sections/testimonials").then((mod) => mod.TestimonialsSection),
//   {
//     loading: () => <LoadingSkeleton className="h-96 w-full" />,
//     ssr: true, // Enable SSR for SEO, use ssr: false for purely interactive components
//   }
// );

// Example: Lazy load FAQ accordion (below-fold)
// export const LazyFAQ = dynamic(
//   () => import("@/components/sections/faq").then((mod) => mod.FAQSection),
//   {
//     loading: () => <LoadingSkeleton className="h-64 w-full" />,
//     ssr: true,
//   }
// );

// Example: Lazy load heavy interactive components with no SSR
// export const LazyInteractiveDemo = dynamic(
//   () => import("@/components/demo/interactive-demo"),
//   {
//     loading: () => <LoadingSkeleton className="h-80 w-full" />,
//     ssr: false, // Disable SSR for client-only interactivity
//   }
// );

/**
 * Performance Best Practices:
 *
 * 1. Lazy load components that are:
 *    - Below the fold (not visible on initial load)
 *    - Heavy (large JS bundles, complex animations)
 *    - Interactive (client-only functionality)
 *
 * 2. Use ssr: true for SEO-important content
 * 3. Use ssr: false for purely interactive components
 *
 * 4. Animation optimization:
 *    - Use transform and opacity (GPU accelerated)
 *    - Avoid animating width, height, top, left
 *    - Use will-change sparingly: style={{ willChange: "transform" }}
 */

export { LoadingSkeleton };
