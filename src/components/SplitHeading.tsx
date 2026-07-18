type Tag = "h1" | "h2" | "h3" | "p";

export default function SplitHeading({
  as = "h2",
  children,
  className = "",
  trigger = "scroll",
  delay = 0,
}: {
  as?: Tag;
  children: string;
  className?: string;
  trigger?: "scroll" | "load";
  delay?: number;
}) {
  const Component = as;

  return (
    <Component
      data-reveal
      data-reveal-kind="heading"
      data-reveal-trigger={trigger}
      className={className}
      style={
        {
          "--reveal-delay": `${Math.max(delay, 0)}s`,
          "--reveal-y": "24px",
        } as React.CSSProperties
      }
    >
      {children}
    </Component>
  );
}
