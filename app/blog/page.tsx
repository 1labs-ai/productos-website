import { Metadata } from "next"
import { getPosts } from "@/lib/wordpress"
import { PageHero, PostCard, EmptyState } from "@/components/shared"

export const metadata: Metadata = {
  title: "Blog | ProductOS",
  description: "Latest articles on AI-native product development, shipping faster, and building better products.",
  openGraph: {
    title: "Blog | ProductOS",
    description: "Latest articles on AI-native product development, shipping faster, and building better products.",
    type: "website",
  },
}

export const revalidate = 60 // ISR: Revalidate every minute (temp for testing)

export default async function BlogPage() {
  const { posts } = await getPosts({ perPage: 12 })

  return (
    <>
      {/* Hero Section */}
      <PageHero
        title="Blog"
        description="Latest articles on AI-native product development, shipping faster, and building better products."
        className="min-h-0 pt-32 pb-16"
      />

      {/* Posts Grid */}
      <section className="pb-24 px-4">
        <div className="max-w-6xl mx-auto">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  title={post.title}
                  excerpt={post.excerpt}
                  slug={post.slug}
                  date={post.date}
                  author={post.author}
                  category={post.categories[0]}
                  featuredImage={post.featuredImage}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No posts yet"
              description="We're working on some great content. Check back soon for articles on AI-native product development."
            />
          )}
        </div>
      </section>
    </>
  )
}
