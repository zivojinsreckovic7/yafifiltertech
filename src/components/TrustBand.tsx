export default function TrustBand({ items }: { items: string[] }) {
  return (
    <div className="marquee-mask overflow-hidden border-y border-navy-800 bg-navy-900/40 py-5">
      <div className="flex w-max animate-marquee items-center gap-16">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-16 whitespace-nowrap text-sm font-medium uppercase tracking-widest text-ink-400"
          >
            {item}
            <span className="h-1 w-1 shrink-0 rounded-full bg-orange-500" />
          </span>
        ))}
      </div>
    </div>
  );
}
