export function Logo({ className = "h-12 w-12" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#667eea', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: '#764ba2', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#4facfe', stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      {/* Background circle for better visibility */}
      <circle cx="50" cy="50" r="45" fill="url(#logoGradient)" opacity="0.15" />

      {/* Stylized "H" letter with cloud/server concept */}
      <g transform="translate(50, 50)">
        {/* Left vertical bar */}
        <rect x="-25" y="-28" width="10" height="56" rx="3" fill="url(#logoGradient)" opacity="0.95"/>

        {/* Right vertical bar */}
        <rect x="15" y="-28" width="10" height="56" rx="3" fill="url(#logoGradient)" opacity="0.95"/>

        {/* Horizontal connection with cloud shape */}
        <path d="M -15 -3 L -8 -3 Q -5 -8 0 -8 Q 5 -8 8 -3 L 15 -3 L 15 3 L 8 3 Q 5 8 0 8 Q -5 8 -8 3 L -15 3 Z"
              fill="url(#logoGradient)" opacity="0.95"/>

        {/* Small dots for server/data indication */}
        <circle cx="-20" cy="-15" r="2" fill="url(#logoGradient)" opacity="0.7"/>
        <circle cx="-20" cy="0" r="2" fill="url(#logoGradient)" opacity="0.7"/>
        <circle cx="-20" cy="15" r="2" fill="url(#logoGradient)" opacity="0.7"/>

        <circle cx="20" cy="-15" r="2" fill="url(#logoGradient)" opacity="0.7"/>
        <circle cx="20" cy="0" r="2" fill="url(#logoGradient)" opacity="0.7"/>
        <circle cx="20" cy="15" r="2" fill="url(#logoGradient)" opacity="0.7"/>
      </g>
    </svg>
  );
}
