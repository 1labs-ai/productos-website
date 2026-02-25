import { Lightbulb, Search, FileText, Palette, Code, Zap } from "lucide-react";

const features = [
  {
    icon: Lightbulb,
    title: "Ideate",
    description: "Generate big ideas, positioning, and product angles before deep research.",
  },
  {
    icon: Search,
    title: "Discover",
    description: "Validate market opportunities with multi-model AI research and competitive analysis.",
  },
  {
    icon: FileText,
    title: "Define",
    description: "Turn research into a living PRD with user stories and acceptance criteria.",
  },
  {
    icon: Palette,
    title: "Design",
    description: "Generate design tokens, components, and key screens synced to the PRD.",
  },
  {
    icon: Code,
    title: "Develop",
    description: "Ship full-stack code with tests and deployable builds in days.",
  },
  {
    icon: Zap,
    title: "Context Preserved",
    description: "Nothing falls through the cracks. Each agent builds on the last.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 px-4 border-t border-border/50">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Five Stages. Zero Context Lost.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Each AI agent builds on the last. Research feeds the PRD. PRD drives design. Design shapes code.
          </p>
        </div>

        {/* Feature grid - clean cards, no fancy effects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 rounded-xl bg-card border border-border/50 hover:border-border transition-colors"
            >
              <div className="flex flex-col gap-4">
                <div className="size-10 rounded-lg bg-muted flex items-center justify-center">
                  <feature.icon className="size-5 text-foreground" />
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
