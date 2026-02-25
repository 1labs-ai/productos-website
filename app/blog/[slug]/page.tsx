import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, User } from "lucide-react"
import DOMPurify from "isomorphic-dompurify"
import { getPostBySlug, getAllPosts, type WordPressPost } from "@/lib/wordpress"
import { ArticleSchema, BreadcrumbSchema } from "@/components/structured-data"

// ISR: Revalidate every hour
export const revalidate = 3600

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

// Generate static params for popular posts
export async function generateStaticParams() {
  try {
    const posts = await getAllPosts({ perPage: 20 })
    return posts.map((post) => ({
      slug: post.slug,
    }))
  } catch (error) {
    console.error("Error generating static params:", error)
    return []
  }
}

// Dynamic metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: "Post Not Found | ProductOS Blog",
    }
  }

  // Clean excerpt for description
  const description = post.excerpt
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 160)

  return {
    title: `${post.title} | ProductOS Blog`,
    description,
    openGraph: {
      title: post.title,
      description,
      type: "article",
      publishedTime: post.date,
      authors: post.author?.name ? [post.author.name] : undefined,
      images: post.featuredImage
        ? [
            {
              url: post.featuredImage.url,
              width: post.featuredImage.width || 1200,
              height: post.featuredImage.height || 630,
              alt: post.featuredImage.alt || post.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: post.featuredImage ? [post.featuredImage.url] : undefined,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Calculate reading time if not provided
  const readingTime = post.readingTime || Math.max(1, Math.ceil(
    post.content.replace(/<[^>]*>/g, "").split(/\s+/).length / 200
  ))

  // Sanitize WordPress HTML to prevent XSS attacks
  const sanitizedContent = DOMPurify.sanitize(post.content, {
    ALLOWED_TAGS: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'img', 'ul', 'ol', 'li', 'strong', 'em', 'b', 'i', 'code', 'pre', 'blockquote', 'figure', 'figcaption', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'br', 'hr', 'span', 'div'],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'class', 'id', 'target', 'rel', 'width', 'height', 'loading'],
    ALLOW_DATA_ATTR: false,
    ADD_ATTR: ['target'], // Allow target for links
  })

  // Clean excerpt for structured data
  const cleanExcerpt = post.excerpt
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 160)

  return (
    <>
      {/* Structured Data for SEO */}
      <ArticleSchema
        title={post.title}
        description={cleanExcerpt}
        image={post.featuredImage?.url}
        datePublished={post.date}
        dateModified={post.modified}
        authorName={post.author?.name}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.productos.dev' },
          { name: 'Blog', url: 'https://www.productos.dev/blog' },
          { name: post.title, url: `https://www.productos.dev/blog/${slug}` },
        ]}
      />
      
      <article className="pb-16">
        {/* Hero Section with Featured Image */}
        {post.featuredImage && (
          <div className="relative w-full h-[40vh] sm:h-[50vh] lg:h-[60vh] max-h-[600px] mb-8">
            <Image
              src={post.featuredImage.url}
              alt={post.featuredImage.alt || post.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          </div>
        )}

        <div className="container-padding max-w-4xl mx-auto">
          {/* Back to Blog Link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Blog</span>
          </Link>

          {/* Category Badge */}
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/blog?category=${category.slug || category.id}`}
                  className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            {post.title}
          </h1>

          {/* Author Info */}
          <div className="flex items-center gap-4 pb-8 mb-8 border-b border-border">
            {post.author?.avatar ? (
              <Image
                src={post.author.avatar}
                alt={post.author.name || "Author"}
                width={48}
                height={48}
                className="rounded-full"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <User className="w-6 h-6 text-muted-foreground" />
              </div>
            )}
            <div>
              {post.author?.name && (
                <p className="font-medium text-foreground">{post.author.name}</p>
              )}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.date}>{formattedDate}</time>
                <span>·</span>
                <span>{readingTime} min read</span>
              </div>
            </div>
          </div>

          {/* Post Content - Sanitized for XSS protection */}
          <div
            className="prose-content"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="inline-flex items-center px-3 py-1 text-sm rounded-md bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  >
                    #{tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Back to Blog CTA */}
          <div className="mt-12 pt-8 border-t border-border">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to All Posts
            </Link>
          </div>
        </div>
      </article>
    </>
  )
}
