"use client"

import Image from "next/image"
import Link from "next/link"
import { Calendar, User, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface PostCardProps {
  title: string
  excerpt: string
  slug: string
  date: string
  author?: {
    name: string
    avatar?: string
  }
  category?: {
    name: string
    slug?: string
  }
  featuredImage?: {
    url: string
    alt?: string
  }
  className?: string
}

/**
 * PostCard - Blog post card component
 * 
 * Usage:
 * <PostCard
 *   title="Getting Started with AI"
 *   excerpt="Learn how to integrate AI into your workflow."
 *   slug="getting-started"
 *   date="2025-02-20"
 *   author={{ name: "Alex Chen", avatar: "/avatars/alex.jpg" }}
 *   category={{ name: "Tutorial" }}
 * />
 */
export function PostCard({
  title,
  excerpt,
  slug,
  date,
  author,
  category,
  featuredImage,
  className,
}: PostCardProps) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  const truncatedExcerpt =
    excerpt.length > 120 ? excerpt.slice(0, 120).trim() + "..." : excerpt

  return (
    <article
      className={cn(
        "group flex flex-col h-full bg-card rounded-lg border border-border/50 overflow-hidden",
        "transition-all duration-300 hover:border-border hover:shadow-lg hover:shadow-foreground/5 hover:-translate-y-1",
        className
      )}
    >
      {/* Featured Image */}
      <Link
        href={`/blog/${slug}`}
        className="relative aspect-[16/9] overflow-hidden bg-muted"
      >
        {featuredImage ? (
          <Image
            src={featuredImage.url}
            alt={featuredImage.alt || title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-muted to-card">
            <span className="text-4xl font-bold text-muted-foreground/20">
              {title.charAt(0)}
            </span>
          </div>
        )}

        {/* Category Badge */}
        {category && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-background/90 backdrop-blur-sm text-foreground border border-border/50">
              {category.name}
            </span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Title */}
        <Link href={`/blog/${slug}`}>
          <h2 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-foreground/80 transition-colors">
            {title}
          </h2>
        </Link>

        {/* Excerpt */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">
          {truncatedExcerpt}
        </p>

        {/* Meta Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {/* Author */}
            <div className="flex items-center gap-1.5">
              {author?.avatar ? (
                <Image
                  src={author.avatar}
                  alt={author.name}
                  width={20}
                  height={20}
                  className="rounded-full object-cover"
                />
              ) : (
                <User className="size-3.5" />
              )}
              <span>{author?.name || "ProductOS Team"}</span>
            </div>

            <span className="text-border">•</span>

            {/* Date */}
            <div className="flex items-center gap-1.5">
              <Calendar className="size-3.5" />
              <time dateTime={date}>{formattedDate}</time>
            </div>
          </div>

          {/* Read More */}
          <Link
            href={`/blog/${slug}`}
            className="flex items-center gap-1 text-xs font-medium text-foreground/70 hover:text-foreground transition-colors"
          >
            Read more
            <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  )
}

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description: string
  className?: string
}

/**
 * EmptyState - Empty state display
 * 
 * Usage:
 * <EmptyState
 *   title="No posts yet"
 *   description="Check back soon for new content."
 * />
 */
export function EmptyState({
  icon,
  title,
  description,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-20 text-center",
        className
      )}
    >
      {icon ? (
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-6">
          {icon}
        </div>
      ) : (
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-6">
          <svg
            className="w-8 h-8 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
            />
          </svg>
        </div>
      )}
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-sm">{description}</p>
    </div>
  )
}
