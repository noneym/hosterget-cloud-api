export function Logo({ className = "h-12 w-12" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Cloud shape with server lines */}
      <path 
        d="M70 35C70 28.3726 64.6274 23 58 23C55.6 23 53.4 23.8 51.6 25.2C49 19.4 43.2 15 36.5 15C27.4 15 20 22.4 20 31.5C20 32.2 20.1 32.9 20.2 33.6C14.9 35.4 11 40.3 11 46C11 53.1797 16.8203 59 24 59H66C74.2843 59 81 52.2843 81 44C81 36.8203 75.7797 30.6 69 29.2C69 29.1 70 28.3726 70 35Z" 
        className="fill-primary"
      />
      {/* Server lines inside cloud */}
      <line x1="35" y1="35" x2="57" y2="35" className="stroke-background" strokeWidth="3" strokeLinecap="round"/>
      <line x1="35" y1="43" x2="57" y2="43" className="stroke-background" strokeWidth="3" strokeLinecap="round"/>
      <line x1="35" y1="51" x2="57" y2="51" className="stroke-background" strokeWidth="3" strokeLinecap="round"/>
      {/* Small dots for server indicators */}
      <circle cx="30" cy="35" r="2" className="fill-background"/>
      <circle cx="30" cy="43" r="2" className="fill-background"/>
      <circle cx="30" cy="51" r="2" className="fill-background"/>
    </svg>
  );
}
