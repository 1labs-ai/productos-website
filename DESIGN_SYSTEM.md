# ProductOS Design System

> The official design language for ProductOS across all surfaces: Website, Build, Design, Develop.

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Brand Assets](#brand-assets)
3. [Colors](#colors)
4. [Typography](#typography)
5. [Spacing & Layout](#spacing--layout)
6. [Components](#components)
7. [Navigation](#navigation)
8. [Animations & Transitions](#animations--transitions)
9. [Icons](#icons)
10. [Patterns & Best Practices](#patterns--best-practices)
11. [Implementation Checklist](#implementation-checklist)

---

## Design Philosophy

ProductOS follows a **dark-first, minimal, premium** design language that communicates technical sophistication without being flashy.

### Core Principles

| Principle | Description |
|-----------|-------------|
| **Dark & Focused** | Dark backgrounds reduce visual noise and keep focus on content |
| **Subtle Over Flashy** | No bright gradients or neon colors. Subtlety conveys professionalism |
| **Technical & Premium** | Monospace touches, clean lines, and sharp corners |
| **Consistent** | Same patterns across all surfaces (website, app, docs) |

### Visual Keywords
- Clean
- Minimal
- Technical
- Professional
- Focused
- Premium

### Anti-Patterns (What to Avoid)
- ❌ Colorful gradient backgrounds (purple/blue/cyan)
- ❌ Neon glows or flashy effects
- ❌ Rounded pills everywhere
- ❌ Excessive shadows
- ❌ Multiple accent colors competing

---

## Brand Assets

### Logo - Origami Mark

The ProductOS logo is an origami-inspired triangle with three folded sections representing the product development journey.

#### SVG Source (Dark Background)

```svg
<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Main triangle (lightest) -->
  <path d="M4 32 L18 4 L32 32 Z" fill="#E5E5E5"/>
  <!-- Left fold (medium) -->
  <path d="M18 4 L4 32 L18 32 Z" fill="#B3B3B3"/>
  <!-- Right fold overlay (darkest) -->
  <path d="M18 4 L18 32 L32 4 Z" fill="#808080"/>
</svg>
```

#### SVG Source (Light Background)

```svg
<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Main triangle (darkest) -->
  <path d="M4 32 L18 4 L32 32 Z" fill="#1a1a1a"/>
  <!-- Left fold (medium) -->
  <path d="M18 4 L4 32 L18 32 Z" fill="#4a4a4a"/>
  <!-- Right fold overlay (lightest) -->
  <path d="M18 4 L18 32 L32 4 Z" fill="#7a7a7a"/>
</svg>
```

#### Logo Sizes

| Context | Size | Usage |
|---------|------|-------|
| Favicon | 32x32, 16x16 | Browser tabs |
| Navbar | 28px | Site header |
| Footer | 24px | Site footer |
| App Icon | 512x512 | App stores, PWA |
| OG Image | 120px | Social sharing |

### Wordmark

**Font:** Inter, weight 600 (Semibold)
**Letter Spacing:** -0.02em
**Color:** `#fafafa` (dark bg) / `#0a0a0a` (light bg)

```tsx
<span className="font-semibold text-lg tracking-tight">ProductOS</span>
```

### Logo + Wordmark Lockup

Always maintain consistent spacing between mark and wordmark:

```tsx
<div className="flex items-center gap-2.5">
  <Logo size={28} />
  <span className="font-semibold text-lg tracking-tight">ProductOS</span>
</div>
```

### OG Image (Social Sharing)

**Dimensions:** 1200x630px
**Background:** `#09090b` (near black)
**Layout:** Centered logo (120px) + wordmark (96px font)

```html
<!-- OG Image Template -->
<div style="
  width: 1200px;
  height: 630px;
  background: #09090b;
  display: flex;
  align-items: center;
  justify-content: center;
">
  <div style="display: flex; align-items: center; gap: 24px;">
    <!-- Logo SVG at 120px -->
    <!-- Wordmark at 96px, font-weight 600, color #fafafa -->
  </div>
</div>
```

### Favicon Files

| File | Size | Format |
|------|------|--------|
| `/favicon.ico` | 256x256 | ICO (multi-size) |
| `/icon.svg` | Any | SVG (scalable) |
| `/apple-touch-icon.png` | 180x180 | PNG |
| `/og-image.png` | 1200x630 | PNG |

---

## Colors

### Core Palette

#### Dark Mode (Primary)

| Token | HSL Value | Hex (Approx) | Usage |
|-------|-----------|--------------|-------|
| `--background` | `hsl(240 10% 6%)` | `#0f0f12` | Page background |
| `--foreground` | `hsl(0 0% 95%)` | `#f2f2f2` | Primary text |
| `--card` | `hsl(240 10% 9%)` | `#15151a` | Card/surface backgrounds |
| `--muted` | `hsl(240 8% 14%)` | `#212127` | Muted backgrounds |
| `--muted-foreground` | `hsl(0 0% 55%)` | `#8c8c8c` | Secondary text |
| `--border` | `hsl(0 0% 100% / 8%)` | `rgba(255,255,255,0.08)` | Borders |
| `--input` | `hsl(0 0% 100% / 10%)` | `rgba(255,255,255,0.10)` | Input backgrounds |

#### Light Mode

| Token | HSL Value | Hex (Approx) | Usage |
|-------|-----------|--------------|-------|
| `--background` | `hsl(0 0% 99%)` | `#fcfcfc` | Page background |
| `--foreground` | `hsl(0 0% 9%)` | `#171717` | Primary text |
| `--card` | `hsl(0 0% 100%)` | `#ffffff` | Card/surface backgrounds |
| `--muted` | `hsl(0 0% 96%)` | `#f5f5f5` | Muted backgrounds |
| `--muted-foreground` | `hsl(0 0% 45%)` | `#737373` | Secondary text |
| `--border` | `hsl(0 0% 0% / 8%)` | `rgba(0,0,0,0.08)` | Borders |

### Semantic Colors

| Token | Dark Mode | Usage |
|-------|-----------|-------|
| `--success` | `hsl(142 70% 45%)` | Success states, confirmations |
| `--warning` | `hsl(38 92% 55%)` | Warnings, alerts |
| `--info` | `hsl(217 91% 65%)` | Information |
| `--destructive` | `hsl(0 72% 51%)` | Errors, deletions |

### Stage Colors (ProductOS Specific)

Used for the 5-stage product development workflow:

| Stage | Color Name | Dark Mode | Background (Dark) |
|-------|------------|-----------|-------------------|
| Ideate | Sky Blue | `hsl(199 89% 55%)` | `hsl(199 50% 15%)` |
| Discover | Violet | `hsl(258 90% 70%)` | `hsl(258 50% 15%)` |
| Define | Teal | `hsl(168 76% 50%)` | `hsl(168 50% 15%)` |
| Design | Purple | `hsl(271 91% 70%)` | `hsl(271 50% 15%)` |
| Develop | Amber | `hsl(38 92% 55%)` | `hsl(38 50% 15%)` |

### Accent Color

The primary accent across ProductOS is **Amber** (`text-amber-500`), used sparingly for:
- Badge icons
- Highlights
- Interactive indicators

### Text Opacity Scale

For creating visual hierarchy with `text-foreground`:

| Class | Opacity | Usage |
|-------|---------|-------|
| `text-foreground` | 100% | Primary headlines, important text |
| `text-foreground/80` | 80% | Secondary headlines |
| `text-foreground/60` | 60% | Tertiary text, subheadings |
| `text-muted-foreground` | ~55% | Body text, descriptions |
| `text-muted-foreground/50` | ~28% | Disabled, excluded features |

---

## Typography

### Font Stack

```css
--font-sans: var(--font-inter), system-ui, -apple-system, sans-serif;
--font-mono: var(--font-mono), ui-monospace, 'SF Mono', monospace;
```

- **Inter** — Primary typeface for all UI and body text
- **JetBrains Mono** — Code blocks, technical labels, monospace elements

### Type Scale

| Name | Size | Weight | Line Height | Letter Spacing | Usage |
|------|------|--------|-------------|----------------|-------|
| Display | `text-5xl` to `text-7xl` | Bold (700) | 1.05 | -0.025em | Hero headlines |
| H1 | `text-4xl` to `text-6xl` | Semibold (600) | 1.1 | -0.02em | Page titles |
| H2 | `text-3xl` to `text-4xl` | Semibold (600) | 1.15 | -0.015em | Section headers |
| H3 | `text-2xl` | Semibold (600) | 1.25 | -0.01em | Subsections |
| H4 | `text-lg` | Semibold (600) | 1.3 | — | Card titles |
| Body Large | `text-lg` | Normal (400) | 1.6 | — | Lead paragraphs |
| Body | `text-base` | Normal (400) | 1.5 | — | Default body text |
| Body Small | `text-sm` | Normal (400) | 1.5 | — | Secondary content |
| Caption | `text-xs` | Medium (500) | 1.4 | 0.01em | Labels, metadata |

### Headline Patterns

**Two-tone headlines** create visual hierarchy:

```tsx
<h1 className="text-5xl font-bold" style={{ lineHeight: 1.05, letterSpacing: '-0.025em' }}>
  <span className="text-foreground">Build What Matters.</span>
  <br />
  <span className="text-foreground/60">Ship What Works.</span>
</h1>
```

---

## Spacing & Layout

### Spacing Scale

Using Tailwind's default spacing (4px base):

| Token | Value | Usage |
|-------|-------|-------|
| `gap-2` | 8px | Tight element spacing |
| `gap-4` | 16px | Default component spacing |
| `gap-6` | 24px | Section element spacing |
| `gap-8` | 32px | Card padding, group spacing |
| `gap-12` | 48px | Section padding |
| `gap-16` | 64px | Major section separation |
| `gap-24` | 96px | Page section (`py-24`) |

### Container Width

```tsx
// Standard container
<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

// Narrow (content-focused)
<div className="max-w-4xl mx-auto px-4">

// Wide (full-width sections)
<div className="max-w-7xl mx-auto px-4">
```

### Section Padding

```tsx
// Standard section
<section className="py-24 px-4">

// Hero section
<section className="min-h-[90vh] flex items-center px-4 pt-20 pb-16">

// Compact section
<section className="py-16 px-4">
```

### Border Radius Scale

Sharp, angular corners to match the origami logo aesthetic:

| Token | Value | Usage |
|-------|-------|-------|
| `rounded-sm` | 4px | Small elements, badges |
| `rounded-md` | 6px | Buttons, inputs |
| `rounded-lg` | 8px | Cards |
| `rounded-xl` | 10px | Large cards, modals |
| `rounded-full` | 9999px | Pills, avatars, toggles |

---

## Components

### Buttons

#### Primary Button (CTA)

```tsx
<Button
  size="lg"
  className="bg-foreground text-background hover:bg-foreground/90 rounded-md px-8 h-12 text-base font-medium shadow-lg shadow-foreground/10"
>
  Start Building Free
  <ArrowRight className="ml-2 size-4" />
</Button>
```

#### Secondary/Outline Button

```tsx
<Button
  variant="outline"
  size="lg"
  className="rounded-md px-8 h-12 text-base font-medium border-border/50 hover:bg-card hover:border-border"
>
  See How It Works
</Button>
```

#### Ghost Button

```tsx
<Button
  variant="ghost"
  className="text-muted-foreground hover:text-foreground hover:bg-muted"
>
  Learn More
</Button>
```

### Cards

#### Standard Card

```tsx
<div className="p-6 rounded-lg bg-card border border-border/50 hover:border-border transition-colors">
  {/* Content */}
</div>
```

#### Elevated Card

```tsx
<div className="p-6 rounded-lg bg-card border border-border hover:scale-[1.02] transition-all">
  {/* Content */}
</div>
```

#### Highlighted Card (e.g., popular pricing tier)

```tsx
<div className="p-6 rounded-lg bg-card border-2 border-foreground relative">
  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
    <span className="px-3 py-1 text-xs font-medium bg-foreground text-background rounded-full">
      Most Popular
    </span>
  </div>
  {/* Content */}
</div>
```

### Badges

#### Standard Badge

```tsx
<div className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-card/80 backdrop-blur-sm border border-border/50">
  <Sparkles className="size-3.5 text-amber-500" />
  <span className="text-sm font-medium text-foreground/80">Badge Label</span>
</div>
```

#### Category Badge (e.g., changelog)

```tsx
// New feature
<span className="px-2 py-0.5 text-xs font-medium rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
  New
</span>

// Improvement
<span className="px-2 py-0.5 text-xs font-medium rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
  Improved
</span>

// Bug fix
<span className="px-2 py-0.5 text-xs font-medium rounded-md bg-orange-500/10 text-orange-400 border border-orange-500/20">
  Fixed
</span>
```

### Inputs

```tsx
<input
  type="text"
  placeholder="Enter your email"
  className="w-full px-4 py-3 rounded-lg bg-background/50 border border-border focus:border-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 text-foreground placeholder:text-muted-foreground transition-all"
/>
```

### Feature/Stat Cards

```tsx
<div className="p-6 rounded-xl bg-card border border-border/50 hover:border-border transition-colors text-center">
  <div className="text-3xl sm:text-4xl font-bold text-foreground mb-2">10,000+</div>
  <div className="text-sm text-muted-foreground">Founders Served</div>
</div>
```

### Icon Containers

```tsx
// Standard icon box
<div className="w-10 h-10 rounded-lg bg-muted/50 border border-border/50 flex items-center justify-center">
  <Sparkles className="w-5 h-5 text-foreground/60" />
</div>

// With accent color
<div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
  <Zap className="w-6 h-6 text-amber-500" />
</div>
```

---

## Navigation

### Navbar Structure

```tsx
// Desktop Navigation
<nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
  <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
    {/* Logo */}
    {/* Nav Links */}
    {/* Theme Toggle + Auth Buttons */}
  </div>
</nav>
```

### Nav Link Styling

```tsx
// Standard nav link
<a className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group">
  Link Text
  <span className="absolute inset-x-2 -bottom-px h-px bg-gradient-to-r from-primary/0 via-primary/70 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity" />
</a>
```

### Dropdown Menu

```tsx
// Dropdown container
<div className="absolute top-full left-0 mt-2 w-64 rounded-lg border border-border bg-background/95 backdrop-blur-lg shadow-lg overflow-hidden">
  <div className="p-2">
    {/* Dropdown items */}
  </div>
</div>

// Dropdown item
<a className="flex items-start gap-3 px-3 py-2.5 rounded-md text-sm hover:bg-muted transition-colors">
  <Icon className="size-5 mt-0.5 text-muted-foreground" />
  <div>
    <div className="font-medium text-foreground">Item Label</div>
    <div className="text-xs text-muted-foreground">Description</div>
  </div>
</a>
```

### Theme Toggle

Three-state toggle: Light / System / Dark

```tsx
<div className="flex items-center gap-0.5 p-1 rounded-full bg-muted/50 border border-border/50">
  <button className={cn(
    "size-6 rounded-full flex items-center justify-center transition-all",
    isActive ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
  )}>
    <Icon className="size-3.5" />
  </button>
</div>
```

### Footer Structure

```tsx
<footer className="border-t border-border py-12 px-4">
  <div className="max-w-6xl mx-auto">
    {/* 5-column grid: Brand + 4 link groups */}
    <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
      {/* Brand column */}
      {/* Product links */}
      {/* Resources links */}
      {/* Company links */}
      {/* Legal links */}
    </div>
    
    {/* Bottom bar */}
    <div className="flex items-center justify-between pt-8 border-t border-border">
      <p className="text-sm text-muted-foreground">© 2026 ProductOS</p>
      <ThemeToggle />
    </div>
  </div>
</footer>
```

### Footer Link Styling

```tsx
<a className="text-sm text-muted-foreground hover:text-foreground transition-colors">
  Link Text
</a>
```

---

## Animations & Transitions

### Standard Transitions

```tsx
// Color transitions
className="transition-colors duration-200"

// All properties (hover effects)
className="transition-all duration-200"

// Transform (scale, translate)
className="transition-transform duration-200"
```

### Hover Effects

```tsx
// Card lift
className="hover:scale-[1.02] transition-transform duration-200"

// Border highlight
className="border-border/50 hover:border-border transition-colors"

// Background change
className="hover:bg-card transition-colors"
```

### Framer Motion Patterns

#### Fade In + Slide Up (Default)

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
```

#### Staggered Children

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, delay: index * 0.1 }}
>
```

#### Viewport Animation (Scroll-triggered)

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
>
```

### CSS Animations

```css
/* Subtle shimmer for premium buttons */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* Fade in */
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Slide up */
@keyframes slide-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
```

---

## Icons

### Icon Library

**Lucide React** — Primary icon set

```tsx
import { ArrowRight, Sparkles, Check, X, Zap } from "lucide-react"
```

### Standard Sizes

| Context | Size | Class |
|---------|------|-------|
| Inline with text | 14px | `size-3.5` |
| Button icons | 16px | `size-4` |
| Card icons | 20px | `w-5 h-5` |
| Feature icons | 24px | `w-6 h-6` |
| Hero/Large | 32px+ | `w-8 h-8` |

### Icon Styling

```tsx
// Muted icon
<Icon className="w-5 h-5 text-muted-foreground" />

// Accent icon
<Icon className="w-5 h-5 text-amber-500" />

// Foreground icon
<Icon className="w-5 h-5 text-foreground" />

// Check mark (success)
<Check className="w-4 h-4 text-emerald-500" />

// X mark (excluded)
<X className="w-4 h-4 text-muted-foreground/50" />
```

---

## Patterns & Best Practices

### Background Patterns

#### Subtle Radial Glow

```tsx
<div 
  className="absolute inset-0 pointer-events-none opacity-40"
  style={{
    background: "radial-gradient(ellipse 60% 40% at 50% 0%, hsl(240 10% 20% / 0.3) 0%, transparent 70%)"
  }}
/>
```

#### Gradient to Card

```tsx
<div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card pointer-events-none" />
```

### Section Patterns

#### Hero Section

```tsx
<section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 pt-20 pb-16 overflow-hidden">
  {/* Subtle background */}
  <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card pointer-events-none" />
  <div className="absolute inset-0 pointer-events-none opacity-40" style={{
    background: "radial-gradient(ellipse 60% 40% at 50% 0%, hsl(240 10% 20% / 0.3) 0%, transparent 70%)"
  }} />
  
  <div className="relative z-10 max-w-4xl mx-auto text-center">
    {/* Badge */}
    {/* Headline */}
    {/* Subheadline */}
    {/* CTAs */}
  </div>
</section>
```

#### Feature Section

```tsx
<section className="py-24 px-4">
  <div className="max-w-6xl mx-auto">
    <motion.div className="text-center mb-16">
      <h2 className="text-3xl font-bold mb-4">Section Title</h2>
      <p className="text-muted-foreground max-w-2xl mx-auto">Section description</p>
    </motion.div>
    
    <div className="grid md:grid-cols-3 gap-6">
      {/* Feature cards */}
    </div>
  </div>
</section>
```

#### CTA Section

```tsx
<section className="py-24 px-4">
  <div className="max-w-4xl mx-auto">
    <div className="relative p-8 sm:p-12 rounded-xl bg-card border border-border overflow-hidden">
      <div className="absolute inset-0 opacity-50 pointer-events-none" style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 100%, hsl(240 10% 15% / 0.5) 0%, transparent 70%)"
      }} />
      
      <div className="relative z-10 text-center">
        {/* Badge */}
        {/* Headline */}
        {/* CTAs */}
      </div>
    </div>
  </div>
</section>
```

### Responsive Breakpoints

Following Tailwind defaults:

| Breakpoint | Min Width | Usage |
|------------|-----------|-------|
| `sm:` | 640px | Small tablets |
| `md:` | 768px | Tablets |
| `lg:` | 1024px | Laptops |
| `xl:` | 1280px | Desktops |
| `2xl:` | 1536px | Large desktops |

### Accessibility

1. **Focus states**: Always use `focus:outline-none focus-visible:ring-2 focus-visible:ring-ring`
2. **Color contrast**: Text on dark backgrounds must meet WCAG AA (4.5:1 for body text)
3. **Interactive elements**: Minimum touch target of 44x44px on mobile
4. **Motion**: Respect `prefers-reduced-motion` where possible

---

## Quick Reference

### Most Used Classes

```tsx
// Text
"text-foreground"          // Primary text
"text-foreground/60"       // Secondary text
"text-muted-foreground"    // Tertiary text
"text-amber-500"           // Accent color

// Backgrounds
"bg-background"            // Page background
"bg-card"                  // Card background
"bg-card/50"               // Transparent card
"bg-muted/50"              // Subtle background

// Borders
"border-border"            // Standard border
"border-border/50"         // Subtle border
"border-foreground"        // Strong border (highlighted cards)

// Transitions
"transition-colors"        // Color changes
"transition-all"           // All properties

// Layout
"max-w-6xl mx-auto px-4"   // Standard container
"py-24 px-4"               // Standard section
"gap-6"                    // Standard grid gap
```

---

---

## Implementation Checklist

Use this checklist when implementing the design system on a new surface.

### Setup

- [ ] Install fonts: Inter, JetBrains Mono
- [ ] Configure Tailwind with custom colors
- [ ] Add CSS variables for theming
- [ ] Set up dark/light mode toggle

### Brand

- [ ] Add logo SVG (both color variants)
- [ ] Add favicon files (ico, svg, apple-touch-icon)
- [ ] Add OG image (1200x630)
- [ ] Configure meta tags

### Layout

- [ ] Fixed navbar with backdrop blur
- [ ] Footer with 5-column grid
- [ ] Standard container widths (max-w-4xl, max-w-6xl)
- [ ] Consistent section padding (py-24)

### Components

- [ ] Button variants (primary, secondary, ghost)
- [ ] Card styles (standard, elevated, highlighted)
- [ ] Input styles with focus states
- [ ] Badge variants
- [ ] Theme toggle

### Typography

- [ ] Headline hierarchy (display, h1-h4)
- [ ] Two-tone headline pattern
- [ ] Body text scales
- [ ] Code/monospace styling

### Interactions

- [ ] Hover states on all interactive elements
- [ ] Focus-visible ring on keyboard navigation
- [ ] Smooth transitions (200ms default)
- [ ] Framer Motion for scroll animations

### Accessibility

- [ ] Color contrast meets WCAG AA
- [ ] Touch targets 44x44px minimum
- [ ] ARIA labels on icons-only buttons
- [ ] Keyboard navigation support

---

## Surfaces

This design system applies to:

| Surface | URL | Status |
|---------|-----|--------|
| Website | www.productos.dev | ✅ Implemented |
| Build App | build.productos.dev | 🔄 In Progress |
| Design App | design.productos.dev | 🔄 Needs Update |
| Develop App | develop.productos.dev | 🔄 Needs Update |
| Documentation | docs.productos.dev | 📋 Planned |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 2.0.0 | Feb 25, 2026 | Added brand assets, navigation patterns, implementation checklist |
| 1.0.0 | Feb 25, 2025 | Initial design system documentation |

---

*ProductOS Design System — Built by 1Labs AI*
