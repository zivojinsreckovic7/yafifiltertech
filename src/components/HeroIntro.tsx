export default function HeroIntro({
  children,
  className = "",
  delay = 0.06,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div
      data-reveal-group
      data-reveal-delay={Math.max(delay, 0)}
      className={className}
    >
      {children}
    </div>
  );
}
