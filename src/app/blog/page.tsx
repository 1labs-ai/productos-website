import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const posts = [
  {
    slug: "ai-native-development",
    title: "The Rise of AI-Native Product Development",
    excerpt: "How AI is transforming the way we build products, from ideation to deployment.",
    date: "Feb 20, 2026",
    category: "Product",
  },
  {
    slug: "context-preservation",
    title: "Why Context Preservation Matters",
    excerpt: "The hidden cost of context switching and how to eliminate it.",
    date: "Feb 15, 2026",
    category: "Engineering",
  },
  {
    slug: "shipping-faster",
    title: "How Teams Ship 10x Faster with ProductOS",
    excerpt: "Real stories from teams who transformed their product development workflow.",
    date: "Feb 10, 2026",
    category: "Case Study",
  },
];

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
            <p className="text-lg text-muted-foreground">
              Insights on AI, product development, and building the future.
            </p>
          </div>

          {/* Posts */}
          <div className="space-y-6">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <article className="group p-6 rounded-xl bg-card border border-border/50 hover:border-border transition-colors">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <span>{post.category}</span>
                    <span>·</span>
                    <span>{post.date}</span>
                  </div>
                  <h2 className="text-xl font-semibold mb-2 group-hover:underline">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center text-sm font-medium">
                    Read more
                    <ArrowRight className="ml-1 size-4" />
                  </span>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
