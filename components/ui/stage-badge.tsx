import { cn } from "@/lib/utils";

type Stage = "ideate" | "discover" | "define" | "design" | "develop";

interface StageBadgeProps {
  stage: Stage;
  className?: string;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
}

const stageConfig: Record<Stage, { label: string; icon: string }> = {
  ideate: { label: "Ideate", icon: "💡" },
  discover: { label: "Discover", icon: "🔍" },
  define: { label: "Define", icon: "📋" },
  design: { label: "Design", icon: "🎨" },
  develop: { label: "Develop", icon: "⚡" },
};

const sizeClasses = {
  sm: "text-[10px] px-1.5 py-0.5",
  md: "text-xs px-2 py-1",
  lg: "text-sm px-3 py-1.5",
};

export function StageBadge({ 
  stage, 
  className, 
  size = "sm",
  showIcon = false 
}: StageBadgeProps) {
  const config = stageConfig[stage];
  
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-medium rounded-md uppercase tracking-wide",
        sizeClasses[size],
        // Stage-specific colors using CSS variables
        stage === "ideate" && "bg-[var(--stage-ideate-bg)] text-[var(--stage-ideate)]",
        stage === "discover" && "bg-[var(--stage-discover-bg)] text-[var(--stage-discover)]",
        stage === "define" && "bg-[var(--stage-define-bg)] text-[var(--stage-define)]",
        stage === "design" && "bg-[var(--stage-design-bg)] text-[var(--stage-design)]",
        stage === "develop" && "bg-[var(--stage-develop-bg)] text-[var(--stage-develop)]",
        className
      )}
    >
      {showIcon && <span>{config.icon}</span>}
      {config.label}
    </span>
  );
}

// Inline stage indicator (dot + text)
export function StageIndicator({ stage, className }: { stage: Stage; className?: string }) {
  const config = stageConfig[stage];
  
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-sm", className)}>
      <span 
        className={cn(
          "size-2 rounded-full",
          stage === "ideate" && "bg-[var(--stage-ideate)]",
          stage === "discover" && "bg-[var(--stage-discover)]",
          stage === "define" && "bg-[var(--stage-define)]",
          stage === "design" && "bg-[var(--stage-design)]",
          stage === "develop" && "bg-[var(--stage-develop)]",
        )}
      />
      <span className="text-muted-foreground">{config.label}</span>
    </span>
  );
}
