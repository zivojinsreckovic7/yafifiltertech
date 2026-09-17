"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * Drives the hero's scroll parallax and renders the photo layer it moves.
 * Shared by every page with a photo hero; the section it lives in is `#hero`.
 *
 * Three layers travel at three speeds. The panel itself is pushed back down as
 * the page scrolls, so it clears at roughly half speed and the opaque content
 * below rides up over it; the photo drifts up inside its own frame for depth;
 * and the copy fades and lifts rather than being sliced in half by the
 * incoming section. Progress (0 → 1 across the first viewport) is published as
 * `--hero-progress` on the section, so CSS owns the styling and this owns the
 * number.
 */
export default function HeroParallax({
  src,
  alt,
  className = "object-cover",
}: {
  /** The photo under `public/`, filling the frame. */
  src: string;
  alt: string;
  /** Object-fit/position classes — where the frame should crop the photo. */
  className?: string;
}) {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    const hero = layer?.closest<HTMLElement>("#hero");
    if (!layer || !hero) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    /** How much of the page's scroll the panel gives back. */
    const LAG = 0.45;
    // Surplus height of the photo layer over its frame — the drift budget.
    let travel = 0;
    // Past its own height the panel is long covered; stop lagging and let it go.
    let maxLag = 0;
    let frame = 0;

    const measure = () => {
      const frameEl = layer.parentElement;
      travel = frameEl
        ? Math.max(layer.offsetHeight - frameEl.offsetHeight, 0)
        : 0;
      maxLag = hero.offsetHeight * LAG;
    };

    const paint = () => {
      frame = 0;
      const scrolled = Math.max(window.scrollY, 0);
      const progress = Math.min(scrolled / window.innerHeight, 1);

      hero.style.transform = `translate3d(0, ${Math.min(
        scrolled * LAG,
        maxLag
      )}px, 0)`;
      hero.style.setProperty("--hero-progress", progress.toFixed(3));
      layer.style.transform = `translate3d(0, ${-progress * travel}px, 0)`;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (frame) cancelAnimationFrame(frame);
      hero.style.transform = "";
    };
  }, []);

  return (
    <div
      ref={layerRef}
      className="absolute inset-x-0 top-0 -z-10 h-[124%] will-change-transform"
    >
      <Image src={src} alt={alt} fill priority sizes="100vw" className={className} />
    </div>
  );
}
