"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

type Geom = { w: number; h: number; d: string };

/** Vertical distance (px) covered by one left↔right sweep of the ribbon. */
const SWEEP_PX = 1400;

/**
 * Scroll-drawn comet edge: a tight feathered stack of strokes, each pushed a
 * little toward the bleed side so the hot line sits on the dark edge of the
 * canvas wash underneath.
 */
const EDGE_LAYERS = [
  { w: 160, dx: 22, dy: 14, color: "color-mix(in oklab, var(--fr-azure) 55%, var(--fr-blue))", alpha: 0.07 },
  { w: 124, dx: 16, dy: 10, color: "var(--fr-azure)", alpha: 0.09 },
  { w: 96, dx: 11, dy: 7, color: "color-mix(in oklab, var(--fr-cyan) 55%, var(--fr-azure))", alpha: 0.11 },
  { w: 72, dx: 7, dy: 4.5, color: "var(--fr-cyan)", alpha: 0.14 },
  { w: 52, dx: 4, dy: 2.5, color: "var(--fr-sky)", alpha: 0.18 },
  { w: 36, dx: 2, dy: 1, color: "color-mix(in oklab, var(--fr-hot) 60%, var(--fr-sky))", alpha: 0.22 },
  { w: 22, dx: 0, dy: 0, color: "var(--fr-hot)", alpha: 0.3 },
];

/**
 * Aurora wash bands painted onto the canvas: overlapping radial-gradient
 * blobs stamped along the path. `r`/`a` are the base blob radius and alpha,
 * `dx`/`dy` push the band toward the bleed side, `spacing` is the stamp
 * interval along the path. The `spill` band throws huge ultra-faint blobs far
 * outside the band so the light appears to tint the room, not float on it.
 */
const WASH_BANDS = [
  { color: "--fr-deep", r: 850, dx: 240, dy: 150, spacing: 620, a: 0.05, seed: 11 },
  { color: "--fr-deep", r: 420, dx: 150, dy: 95, spacing: 48, a: 0.028, seed: 2 },
  { color: "--fr-indigo", r: 290, dx: 95, dy: 60, spacing: 42, a: 0.03, seed: 5 },
  { color: "--fr-blue", r: 190, dx: 55, dy: 34, spacing: 36, a: 0.03, seed: 8 },
  { color: "--fr-azure", r: 120, dx: 28, dy: 18, spacing: 32, a: 0.025, seed: 13 },
];

/**
 * Wash render scale. Canvas gradients are dithered; upscaling magnifies that
 * dither into a visible checkerboard, so render at native CSS resolution.
 */
const WASH_SCALE = 1;

/** Deterministic pseudo-random in [0, 1) so the curve is stable across renders. */
function rand(i: number) {
  const f = Math.sin(i * 12.9898) * 43758.5453;
  return f - Math.floor(f);
}

/** Smooth organic modulation in [0, 1] — sum of incommensurate sines. */
function noise(x: number, seed: number) {
  return (
    0.5 +
    0.3 * Math.sin(x + seed * 7.13) +
    0.2 * Math.sin(2.7 * x + seed * 3.71 + 1.3)
  );
}

/**
 * A snake of cubic beziers with vertical tangents at every turning point,
 * so consecutive sweeps join smoothly.
 */
function buildPath(w: number, h: number): string {
  const cx = w / 2;
  const amp = Math.min(w * 0.4, 680);
  // Inset the endpoints so the widest strokes end in rounded caps inside the
  // container instead of being clipped flat at its edges.
  const yTop = 400;
  const yBottom = h - 460;
  const span = yBottom - yTop;
  const n = Math.max(2, Math.round(span / SWEEP_PX));
  const step = span / n;

  // Start under the hero visual (right of center), end near center-bottom.
  let x = cx + amp * 0.62;
  let py = yTop;
  let side = -1;
  let d = `M ${x.toFixed(1)} ${yTop.toFixed(1)}`;

  for (let i = 1; i <= n; i++) {
    const y = yTop + step * i;
    const reach = i === n ? 0.35 : 0.72 + 0.28 * rand(i);
    const nx = cx + side * amp * reach;
    const c1y = py + step * 0.52;
    const c2y = y - step * 0.52;
    d += ` C ${x.toFixed(1)} ${c1y.toFixed(1)}, ${nx.toFixed(1)} ${c2y.toFixed(1)}, ${nx.toFixed(1)} ${y.toFixed(1)}`;
    x = nx;
    py = y;
    side = -side;
  }
  return d;
}

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.trim().slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/**
 * Paint the aurora wash: for each band, stamp radial-gradient blobs along the
 * core path with noise-modulated radius/strength, blended additively (normal
 * over light backgrounds). Runs once per resize/theme change — the result is
 * a static raster with perfectly continuous falloff, so nothing here costs
 * anything at scroll time.
 */
function paintWash(
  canvas: HTMLCanvasElement,
  core: SVGPathElement,
  w: number,
  h: number,
  f: number
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const light =
    document.documentElement.getAttribute("data-theme") === "light";
  const styles = getComputedStyle(canvas);

  canvas.width = Math.ceil(w * WASH_SCALE);
  canvas.height = Math.ceil(h * WASH_SCALE);
  ctx.setTransform(WASH_SCALE, 0, 0, WASH_SCALE, 0, 0);
  ctx.clearRect(0, 0, w, h);
  // Additive blending melts overlapping blobs into one continuous light
  // field on dark backgrounds; on light ones it would wash out to white.
  ctx.globalCompositeOperation = light ? "source-over" : "lighter";

  const len = core.getTotalLength();

  for (const band of WASH_BANDS) {
    const [cr, cg, cb] = hexToRgb(styles.getPropertyValue(band.color));
    const rgb = `${cr}, ${cg}, ${cb}`;
    for (let s = 0; s <= len; s += band.spacing) {
      const t = s / len;
      // Taper the band in and out at the ends instead of stopping abruptly.
      const fade = Math.min(1, t / 0.08, (1 - t) / 0.08);
      if (fade <= 0) continue;
      const swell = noise(s * 0.004, band.seed);
      const r = band.r * f * (0.7 + 0.6 * swell);
      const a =
        band.a * fade * (0.6 + 0.8 * noise(s * 0.0026, band.seed + 3)) *
        (light ? 0.8 : 1);
      const pt = core.getPointAtLength(s);
      const cx = pt.x + band.dx * f * (0.75 + 0.5 * swell);
      const cy = pt.y + band.dy * f;
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      g.addColorStop(0, `rgba(${rgb}, ${a})`);
      g.addColorStop(0.35, `rgba(${rgb}, ${a * 0.72})`);
      g.addColorStop(0.7, `rgba(${rgb}, ${a * 0.28})`);
      g.addColorStop(1, `rgba(${rgb}, 0)`);
      ctx.fillStyle = g;
      ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
    }
  }
}

/**
 * Mounts the ribbon from `lg` up only. On a phone or tablet the beam runs
 * straight behind body copy, where it costs legibility, and the canvas wash
 * plus its scroll-driven redraw is the most expensive thing on the page — so
 * below that width it is never rendered, rather than hidden with CSS.
 */
export default function FlowRibbon() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const sync = () => setEnabled(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return enabled ? <Ribbon /> : null;
}

/**
 * Decorative scroll-following aurora. A canvas wash (painted once) provides
 * the liquid color field; an SVG comet edge draws in with scroll on top of
 * it. No blur filters or CSS blend modes — Safari rasterizes those on the
 * CPU every frame.
 */
function Ribbon() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const groupRef = useRef<SVGGElement>(null);
  const corePathRef = useRef<SVGPathElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const [geom, setGeom] = useState<Geom | null>(null);

  const state = useRef({
    len: 0,
    top: 0,
    height: 1,
    current: 0,
    target: 0,
    raf: 0,
    reduced: false,
  });

  const apply = (p: number) => {
    const s = state.current;
    const group = groupRef.current;
    const core = corePathRef.current;
    const head = headRef.current;
    if (!group || !core || !s.len) return;

    group.style.strokeDashoffset = `${s.len * (1 - (s.reduced ? 1 : p))}`;

    if (!head) return;
    if (s.reduced || p <= 0.004 || p >= 0.996) {
      head.style.opacity = "0";
    } else {
      const pt = core.getPointAtLength(s.len * p);
      head.style.opacity = "1";
      head.style.transform = `translate3d(${pt.x}px, ${pt.y}px, 0) translate(-50%, -50%)`;
    }
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    state.current.reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const measure = () => {
      const rect = root.getBoundingClientRect();
      state.current.top = rect.top + window.scrollY;
      state.current.height = rect.height || 1;
      const w = Math.round(rect.width);
      const h = Math.round(rect.height);
      setGeom((g) =>
        g && g.w === w && g.h === h ? g : { w, h, d: buildPath(w, h) }
      );
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(root);

    // The wash bakes theme colors into pixels, so repaint on theme switch.
    const mo = new MutationObserver(() => {
      const core = corePathRef.current;
      const canvas = canvasRef.current;
      const rect = root.getBoundingClientRect();
      if (core && canvas) {
        paintWash(canvas, core, rect.width, rect.height, rect.width < 768 ? 0.58 : 1);
      }
    });
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      ro.disconnect();
      mo.disconnect();
    };
  }, []);

  useLayoutEffect(() => {
    if (!geom) return;
    const core = corePathRef.current;
    const group = groupRef.current;
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!core || !group || !root || !canvas) return;

    const len = core.getTotalLength();
    state.current.len = len;
    group.style.strokeDasharray = `${len}`;
    paintWash(canvas, core, geom.w, geom.h, geom.w < 768 ? 0.58 : 1);
    apply(state.current.current);
    root.classList.add("is-ready");
  }, [geom]);

  useEffect(() => {
    const s = state.current;
    if (s.reduced) return;

    const computeTarget = () => {
      // The ribbon tip tracks a focus line ~72% down the viewport.
      const focus = window.scrollY + window.innerHeight * 0.72;
      s.target = Math.min(1, Math.max(0, (focus - s.top) / s.height));
    };

    const tick = () => {
      s.raf = 0;
      const diff = s.target - s.current;
      if (Math.abs(diff) < 0.0004) {
        s.current = s.target;
        apply(s.current);
        return;
      }
      s.current += diff * 0.14;
      apply(s.current);
      s.raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      computeTarget();
      if (!s.raf) s.raf = requestAnimationFrame(tick);
    };

    computeTarget();
    s.current = s.target; // no catch-up animation on load / restored scroll
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (s.raf) cancelAnimationFrame(s.raf);
      // Must clear: `s` outlives this effect (StrictMode remounts it in dev,
      // reusing the ref), and `onScroll` only schedules a frame when `raf` is
      // 0 — a stale id left here would stop the ribbon following scroll.
      s.raf = 0;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Scale the whole stack down on narrow screens.
  const f = geom && geom.w < 768 ? 0.58 : 1;

  return (
    <div ref={rootRef} className="flow-ribbon" aria-hidden="true">
      <canvas ref={canvasRef} className="fr-wash" />
      {geom && (
        <svg
          width={geom.w}
          height={geom.h}
          viewBox={`0 0 ${geom.w} ${geom.h}`}
          fill="none"
        >
          <defs>
            <linearGradient id="fr-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="var(--fr-hot)" />
              <stop offset="0.5" stopColor="var(--fr-ice)" />
              <stop offset="1" stopColor="var(--fr-hot)" />
            </linearGradient>
          </defs>
          {/* Scroll-drawn comet edge riding the dark side of the wash */}
          <g ref={groupRef} className="fr-draw">
            {EDGE_LAYERS.map((l, i) => (
              <path
                key={i}
                d={geom.d}
                stroke={l.color}
                strokeWidth={l.w * f}
                transform={
                  l.dx || l.dy
                    ? `translate(${l.dx * f} ${l.dy * f})`
                    : undefined
                }
                style={{ opacity: `calc(var(--fr-dim, 1) * ${l.alpha})` }}
              />
            ))}
            <path
              ref={corePathRef}
              className="fr-core"
              d={geom.d}
              stroke="url(#fr-grad)"
              strokeWidth={10 * f}
            />
          </g>
        </svg>
      )}
      <div ref={headRef} className="fr-head" />
    </div>
  );
}
