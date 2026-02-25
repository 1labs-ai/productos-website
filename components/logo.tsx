"use client"

export function Logo({ className = "", size = 28 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* ProductOS Origami - 3 Fold Monochrome */}
      {/* Uses currentColor so it adapts to light/dark theme */}
      <path d="M4 32 L18 4 L32 32 Z" fill="currentColor" fillOpacity={0.35} />
      <path d="M18 4 L4 32 L18 32 Z" fill="currentColor" fillOpacity={0.65} />
      <path d="M18 4 L18 32 L32 4 Z" fill="currentColor" />
    </svg>
  )
}
