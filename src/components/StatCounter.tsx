export default function StatCounter({
  value,
  suffix = "",
  prefix = "",
  label,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  delay?: number;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="font-display text-4xl font-extrabold text-ink-100 md:text-5xl">
        {prefix}
        <span>{Math.floor(value).toLocaleString("sr-RS")}</span>
        {suffix}
      </div>
      <div className="text-sm text-ink-400">{label}</div>
    </div>
  );
}
