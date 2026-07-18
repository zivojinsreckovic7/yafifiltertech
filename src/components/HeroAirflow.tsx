/**
 * Dust particles that flow right-to-left through the filter panel.
 * Deterministic values so server and client render identically.
 */
const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  y: 12 + ((i * 53) % 72),
  s: 2 + (i % 3),
  o: 0.35 + ((i * 17) % 45) / 100,
  d: (((i * 29) % 100) / 100) * 7,
  t: 56 + ((i * 31) % 17),
  dur: 6 + ((i * 13) % 5),
}));

export default function HeroAirflow({
  className = "",
  density = 1,
}: {
  className?: string;
  density?: number;
}) {
  return (
    <div className={`hero-airflow ${className}`} aria-hidden="true">
      <div className="hero-airflow__wash" />

      {/* Particles render behind the panel so dust visibly disappears into
          the filter and re-emerges clean on the far side */}
      <div
        className="hero-airflow__particles"
        style={{ opacity: Math.min(Math.max(density, 0.35), 1) }}
      >
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            style={
              {
                "--y": `${p.y}%`,
                "--s": `${p.s}px`,
                "--o": p.o,
                "--d": `${p.d}s`,
                "--t": `${p.t}vw`,
                "--dur": `${p.dur}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* Pleated filter panel in CSS 3D */}
      <div className="hero-filter">
        <div className="hero-filter__panel">
          <span className="hero-filter__back" />
          <span className="hero-filter__media" />
          <span className="hero-filter__edge hero-filter__edge--left" />
          <span className="hero-filter__edge hero-filter__edge--right" />
          <span className="hero-filter__edge hero-filter__edge--top" />
          <span className="hero-filter__frame" />
        </div>
      </div>
    </div>
  );
}
