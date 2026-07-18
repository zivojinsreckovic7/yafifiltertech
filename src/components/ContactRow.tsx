export default function ContactRow({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <span className="font-display text-lg font-medium text-ink-100 transition-colors group-hover:text-orange-300">
      {value}
    </span>
  );
  return (
    <div className="group flex items-baseline gap-4 border-b border-navy-800 pb-4">
      <span className="w-28 shrink-0 text-xs font-semibold uppercase tracking-widest text-ink-400">
        {label}
      </span>
      {href ? <a href={href}>{content}</a> : content}
    </div>
  );
}
