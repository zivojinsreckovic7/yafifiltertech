import { rating } from "@/data/testimonials";

/**
 * Subtle one-line trust row used near CTAs: rating, response time, track
 * record. Intentionally quiet — small type, muted color.
 */
export default function TrustSignals({ className = "" }: { className?: string }) {
  const items = [
    `${rating.score}/${rating.outOf} prosečna ocena saradnje`,
    "Odgovor u roku od 24h",
    "1.200+ realizovanih projekata",
  ];

  return (
    <div
      className={`flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-medium text-ink-400 ${className}`}
    >
      <span className="tracking-wide text-orange-400" aria-hidden="true">
        ★★★★★
      </span>
      {items.map((item, i) => (
        <span key={item} className="flex items-center gap-3">
          {i > 0 && (
            <span className="h-1 w-1 rounded-full bg-orange-500/60" aria-hidden="true" />
          )}
          {item}
        </span>
      ))}
    </div>
  );
}
