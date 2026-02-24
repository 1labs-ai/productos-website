export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <text x="0" y="22" className="fill-current font-bold text-xl">
        ProductOS
      </text>
    </svg>
  );
}

export function LogoIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="32" height="32" rx="8" className="fill-gradient" />
      <text x="8" y="22" className="fill-white font-bold">
        P
      </text>
    </svg>
  );
}
