import Image from "next/image";

/**
 * Dust particles that flow right-to-left through the filter.
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

/**
 * Air streaks on the same path, kept to the filter's vertical band so they
 * visibly run into it — the part of the flow that reads at a glance.
 */
const STREAKS = Array.from({ length: 12 }, (_, i) => ({
  y: 22 + ((i * 29) % 56),
  w: 9 + ((i * 7) % 10),
  o: 0.45 + ((i * 13) % 40) / 100,
  d: (((i * 41) % 100) / 100) * 4,
  t: 62 + ((i * 23) % 14),
  dur: 3.2 + ((i * 11) % 3),
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

      {/* Particles render behind the filter so dust visibly disappears into
          it and re-emerges clean on the far side */}
      <div
        className="hero-airflow__particles"
        style={{ opacity: Math.min(Math.max(density, 0.35), 1) }}
      >
        {STREAKS.map((s, i) => (
          <span
            key={`s${i}`}
            className="hero-airflow__streak"
            style={
              {
                "--y": `${s.y}%`,
                "--w": `${s.w}vw`,
                "--o": s.o,
                "--d": `${s.d}s`,
                "--t": `${s.t}vw`,
                "--dur": `${s.dur}s`,
              } as React.CSSProperties
            }
          />
        ))}
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

      {/* The Deltrian V-bank filter the dust flows into: a cutout photo,
          floated gently on a warm ground glow. */}
      <div className="hero-filter">
        <span className="hero-filter__glow" />
        {/* Rendered at min(28rem, 38vw) (62vw below md, see .hero-filter), so
            `sizes` keeps the srcset width-based instead of 1x/2x of 1254. */}
        <Image
          src="/deltrian-filter-hero.webp"
          alt=""
          width={1254}
          height={1254}
          sizes="(max-width: 767px) 62vw, (max-width: 1178px) 38vw, 448px"
          priority
          className="hero-filter__photo"
        />
      </div>
    </div>
  );
}
