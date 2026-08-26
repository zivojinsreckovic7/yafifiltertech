export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect width="48" height="48" rx="10" fill="var(--navy-800)" />
      <path
        d="M9 12 L24 26 L39 12"
        stroke="var(--ink-100)"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M24 26 L24 38"
        stroke="var(--orange-500)"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({
  className = "",
  markClassName = "h-9 w-9",
}: {
  className?: string;
  markClassName?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark className={markClassName} />
      <span className="flex flex-col leading-none">
        <span className="font-display text-base font-bold tracking-tight text-ink-100">
          YAFI
        </span>
        <span className="text-[9px] font-semibold tracking-[0.28em] text-ink-400">
          FILTERTECH
        </span>
      </span>
    </span>
  );
}
