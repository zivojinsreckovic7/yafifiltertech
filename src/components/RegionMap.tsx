"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import Reveal from "@/components/Reveal";
import {
  contextRegions,
  regionMapViewBox,
  servedRegions,
  type RegionCode,
} from "@/data/regionMap";

/**
 * Arc from the hub to a capital: a quadratic curve bowed off the straight
 * chord so the five spokes fan out instead of overlapping near Belgrade.
 */
function arcPath(from: [number, number], to: [number, number]) {
  const [x1, y1] = from;
  const [x2, y2] = to;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.hypot(dx, dy);
  const bow = length * 0.18;
  const cx = (x1 + x2) / 2 - (dy / length) * bow;
  const cy = (y1 + y2) / 2 + (dx / length) * bow;
  return `M${x1},${y1} Q${cx.toFixed(1)},${cy.toFixed(1)} ${x2},${y2}`;
}

const home = servedRegions.find((r) => r.code === "rs")!;
const spokes = servedRegions.filter((r) => r.code !== "rs");

/**
 * The served markets as a list beside a map of the region. Hovering (or
 * tapping) either side highlights the country on the other; the entrance
 * choreography lives in CSS under `.region-map` and runs off the reveal.
 *
 * The map is two stacked SVGs: the country fills (which only repaint on
 * hover) and, above them, the arcs, pins and pulse whose ambient animations
 * repaint every frame. Kept apart, WebKit re-rasterises a few thin strokes
 * per frame instead of the whole map. The ambient animations also run only
 * while the block is on screen.
 */
export default function RegionMap({
  children,
  names,
  hub,
  mapLabel,
}: {
  /** Heading block rendered above the list. */
  children: ReactNode;
  names: Record<RegionCode, string>;
  hub: string;
  mapLabel: string;
}) {
  const [active, setActive] = useState<RegionCode | null>(null);
  const toggle = (code: RegionCode) =>
    setActive((current) => (current === code ? null : code));

  const root = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const element = root.current;
    if (!element || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) =>
      setInView(entry.isIntersecting),
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={root}
      data-inview={inView || undefined}
      className="region grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16"
    >
      <div>
        {children}

        <ul data-reveal-group className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {servedRegions.map((r) => {
            const on = active === r.code;
            return (
              <li
                key={r.code}
                data-reveal
                onMouseEnter={() => setActive(r.code)}
                onMouseLeave={() => setActive(null)}
                onClick={() => toggle(r.code)}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
                  on
                    ? "border-orange-500/50 bg-orange-500/10 text-ink-100"
                    : "border-navy-700/70 bg-navy-900/40 text-ink-300"
                }`}
              >
                <span
                  className={`h-2 w-2 shrink-0 rounded-full transition-colors ${
                    on ? "bg-orange-300" : "bg-orange-500"
                  }`}
                />
                {names[r.code]}
              </li>
            );
          })}
        </ul>

        <Reveal delay={0.3} className="mt-6 flex items-center gap-3 text-sm text-ink-400">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="region-hub-ping absolute inset-0 rounded-full bg-orange-400" />
            <span className="relative h-2.5 w-2.5 rounded-full bg-orange-300" />
          </span>
          {hub}
        </Reveal>
      </div>

      <Reveal y={0} className="region-map">
        <div aria-hidden="true" className="region-map__glow" />
        <svg
          viewBox={regionMapViewBox}
          role="img"
          aria-label={mapLabel}
          className="region-map__svg"
        >
          <defs>
            {/* Neighbours fade out towards the frame instead of being cut off
                flat at its edge, which would draw a rectangle on the page. */}
            <radialGradient id="region-map-fade">
              <stop offset="0.5" stopColor="#fff" />
              <stop offset="1" stopColor="#000" />
            </radialGradient>
            <mask id="region-map-mask">
              <rect width="100%" height="100%" fill="url(#region-map-fade)" />
            </mask>
          </defs>

          <g
            className="region-map__ctx"
            mask="url(#region-map-mask)"
            aria-hidden="true"
          >
            {contextRegions.map((c) => (
              <path key={c.code} d={c.d} />
            ))}
          </g>

          <g className="region-map__land">
            {servedRegions.map((r, i) => (
              <path
                key={r.code}
                d={r.d}
                data-active={active === r.code || undefined}
                style={{ "--i": i } as CSSProperties}
                onMouseEnter={() => setActive(r.code)}
                onMouseLeave={() => setActive(null)}
                onClick={() => toggle(r.code)}
              />
            ))}
          </g>
        </svg>

        <svg
          viewBox={regionMapViewBox}
          aria-hidden="true"
          className="region-map__svg region-map__overlay"
        >
          <g className="region-map__arcs">
            {spokes.map((r, i) => {
              const d = arcPath(home.capital, r.capital);
              return (
                <g key={r.code} style={{ "--i": i } as CSSProperties}>
                  <path d={d} pathLength={1} className="region-map__arc" />
                  <path d={d} className="region-map__flow" />
                </g>
              );
            })}
          </g>

          <g className="region-map__pins">
            {spokes.map((r, i) => (
              <circle
                key={r.code}
                cx={r.capital[0]}
                cy={r.capital[1]}
                r={3.5}
                className="region-map__pin"
                style={{ "--i": i } as CSSProperties}
              />
            ))}
            <g transform={`translate(${home.capital[0]} ${home.capital[1]})`}>
              <g className="region-map__pulse">
                <circle r={6} className="region-map__ripple" />
                <circle r={6} className="region-map__ripple region-map__ripple--late" />
              </g>
              <circle r={5} className="region-map__hub" />
            </g>
          </g>

          <g className="region-map__labels">
            {servedRegions.map((r) => (
              <text
                key={r.code}
                x={r.capital[0] + 12}
                y={r.capital[1] + 4}
                data-active={active === r.code || undefined}
              >
                {names[r.code]}
              </text>
            ))}
          </g>
        </svg>
      </Reveal>
    </div>
  );
}
