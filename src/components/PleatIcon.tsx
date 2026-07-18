export default function PleatIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" fill="none">
      <path
        d="M4 12 L14 52 L24 12 L34 52 L44 12 L54 52 L60 30"
        stroke="var(--orange-500)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 12 L14 52 L24 12 L34 52 L44 12 L54 52"
        stroke="var(--ink-300)"
        strokeWidth="1"
        strokeOpacity="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(0 4)"
      />
    </svg>
  );
}
