export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 20,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** Merged with the reveal's own custom properties. */
  style?: React.CSSProperties;
}) {
  return (
    <div
      data-reveal
      className={className}
      style={
        {
          ...style,
          "--reveal-delay": `${Math.max(delay, 0)}s`,
          "--reveal-y": `${y}px`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
