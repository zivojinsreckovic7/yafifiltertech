export default function StatCounter({
  value,
  suffix = "",
  prefix = "",
  label,
  numberLocale,
}: {
  /** A count to format, or a literal to print as-is (a standard number, say). */
  value: number | string;
  suffix?: string;
  prefix?: string;
  label: string;
  /** BCP 47 tag for digit grouping — Serbian uses "1.200", English "1,200". */
  numberLocale: string;
  delay?: number;
}) {
  const shown =
    typeof value === "number"
      ? Math.floor(value).toLocaleString(numberLocale)
      : value;

  return (
    <div className="flex flex-col gap-1">
      <div className="font-display text-4xl font-bold text-ink-100 md:text-5xl">
        {prefix}
        <span>{shown}</span>
        {suffix}
      </div>
      <div className="text-sm text-ink-400">{label}</div>
    </div>
  );
}
