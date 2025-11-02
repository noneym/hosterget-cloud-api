export function Logo({ className = "h-12 w-12" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="cloudGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#667eea', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#764ba2', stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="serverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#4facfe', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#00f2fe', stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      {/* Cloud shape */}
      <path d="M140 85c0-11-9-20-20-20-2 0-4 0-6 1-5-12-17-20-31-20-18 0-33 15-33 33 0 1 0 2 0 3-11 3-19 13-19 24 0 14 11 25 25 25h79c11 0 20-9 20-20 0-10-7-18-16-20 1-2 1-4 1-6z"
            fill="url(#cloudGradient)"
            opacity="0.9"/>

      {/* Server stack */}
      <g transform="translate(140, 95)">
        {/* Server 1 */}
        <rect x="0" y="0" width="45" height="12" rx="2" fill="url(#serverGradient)" opacity="0.95"/>
        <circle cx="8" cy="6" r="1.5" fill="white" opacity="0.8"/>
        <circle cx="13" cy="6" r="1.5" fill="white" opacity="0.8"/>
        <rect x="20" y="4" width="20" height="4" rx="1" fill="white" opacity="0.3"/>

        {/* Server 2 */}
        <rect x="0" y="16" width="45" height="12" rx="2" fill="url(#serverGradient)" opacity="0.85"/>
        <circle cx="8" cy="22" r="1.5" fill="white" opacity="0.8"/>
        <circle cx="13" cy="22" r="1.5" fill="white" opacity="0.8"/>
        <rect x="20" y="20" width="20" height="4" rx="1" fill="white" opacity="0.3"/>

        {/* Server 3 */}
        <rect x="0" y="32" width="45" height="12" rx="2" fill="url(#serverGradient)" opacity="0.75"/>
        <circle cx="8" cy="38" r="1.5" fill="white" opacity="0.8"/>
        <circle cx="13" cy="38" r="1.5" fill="white" opacity="0.8"/>
        <rect x="20" y="36" width="20" height="4" rx="1" fill="white" opacity="0.3"/>
      </g>

      {/* Connection line */}
      <path d="M 135 100 Q 145 100 150 102"
            stroke="url(#serverGradient)"
            strokeWidth="2"
            fill="none"
            opacity="0.6"/>
    </svg>
  );
}
