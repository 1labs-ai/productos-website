const testimonials = [
  {
    quote: "It was night and day from one batch to another, adoption went from single digits to over 80%. It just spread like wildfire, all the best builders were using ProductOS.",
    name: "Diana Hu",
    title: "General Partner, Y Combinator",
  },
  {
    quote: "ProductOS helped us ship 50% more features while maintaining quality. Every one of our product teams now uses it.",
    name: "Engineering Lead",
    title: "Fortune 500 Company",
  },
  {
    quote: "The context preservation is what sets ProductOS apart. Research flows into PRD, PRD flows into design, design flows into code. Nothing gets lost.",
    name: "Priya Iyer",
    title: "Design Lead, Forma",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 px-4 border-t border-border/50">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by product teams worldwide
          </h2>
          <p className="text-muted-foreground">
            See what teams are saying about ProductOS
          </p>
        </div>

        {/* Testimonial grid - clean, professional */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="p-8 rounded-xl bg-card border border-border/50"
            >
              <blockquote className="text-base leading-relaxed mb-6">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-muted" />
                <div>
                  <div className="font-medium text-sm">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
