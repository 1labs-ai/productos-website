export function SocialProofBar() {
  return (
    <section className="py-12 px-4 border-y border-border/50">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-sm text-muted-foreground mb-8">
          Trusted every day by teams that build world-class software
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-4">
          {["Stripe", "Vercel", "Linear", "Notion", "Figma", "Supabase"].map((name) => (
            <span key={name} className="text-lg font-semibold text-muted-foreground/60 hover:text-muted-foreground transition-colors">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
