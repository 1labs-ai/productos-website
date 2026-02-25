import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Building the future of product development
            </h1>
            <p className="text-xl text-muted-foreground">
              ProductOS is on a mission to help teams ship products 10x faster with AI-native workflows.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16 px-4 border-t border-border/50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              We believe product development should be fast, intuitive, and connected. 
              Traditional tools force teams to context-switch between research, requirements, 
              design, and code — losing critical context at every handoff.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              ProductOS changes this. Our AI agents work through five connected stages — 
              Ideate, Discover, Define, Design, and Develop — keeping full context from 
              the first idea to production deployment.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 px-4 border-t border-border/50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">What We Value</h2>
            <div className="space-y-8">
              {[
                { title: "Speed without sacrifice", description: "Ship fast without cutting corners on quality." },
                { title: "Context is everything", description: "Every decision should flow from the decisions before it." },
                { title: "Developer experience", description: "Built by developers, for developers." },
                { title: "Transparency", description: "Clear pricing, clear communication, no surprises." },
              ].map((value) => (
                <div key={value.title}>
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 1Labs */}
        <section className="py-16 px-4 border-t border-border/50">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-muted-foreground mb-2">A product by</p>
            <a href="https://1labs.ai" className="text-2xl font-bold hover:underline">
              1Labs AI
            </a>
            <p className="text-muted-foreground mt-4">
              Building world-class AI products from India to the world.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
