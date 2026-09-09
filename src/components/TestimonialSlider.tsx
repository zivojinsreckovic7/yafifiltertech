"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Testimonial } from "@/data/testimonials";

const AUTOPLAY_MS = 6500;
/** Horizontal travel, in px, before a drag counts as a swipe. */
const SWIPE_PX = 50;

export default function TestimonialSlider({
  items,
  labels,
  quoteMarks,
}: {
  items: Testimonial[];
  /* Plain strings only — dictionary template functions cannot cross into a
     Client Component, so `goTo` is resolved per slide on the server. */
  labels: { previous: string; next: string; goTo: string[] };
  quoteMarks: { open: string; close: string };
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const dragStart = useRef<number | null>(null);
  /* Mirrors `dragStart` as state: the track's transition depends on it, and a
     ref alone would not re-render when the drag begins. */
  const [dragging, setDragging] = useState(false);
  const [drag, setDrag] = useState(0);

  const go = useCallback(
    (next: number) => setIndex((next + items.length) % items.length),
    [items.length]
  );

  useEffect(() => {
    if (paused || items.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => go(index + 1), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [index, paused, go, items.length]);

  const onPointerDown = (event: React.PointerEvent) => {
    // Let text selection and secondary buttons behave normally.
    if (event.button !== 0) return;
    dragStart.current = event.clientX;
    setDragging(true);
    setPaused(true);
  };

  const onPointerMove = (event: React.PointerEvent) => {
    if (dragStart.current === null) return;
    setDrag(event.clientX - dragStart.current);
  };

  const endDrag = () => {
    if (dragStart.current === null) return;
    if (drag <= -SWIPE_PX) go(index + 1);
    else if (drag >= SWIPE_PX) go(index - 1);
    dragStart.current = null;
    setDragging(false);
    setDrag(0);
    setPaused(false);
  };

  return (
    <div
      className="relative select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(index + 1);
        if (e.key === "ArrowLeft") go(index - 1);
      }}
    >
      <div
        className="overflow-hidden"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
        style={{ touchAction: "pan-y", cursor: dragging ? "grabbing" : "grab" }}
      >
        <div
          className="flex"
          style={{
            transform: `translate3d(calc(${-index * 100}% + ${drag}px), 0, 0)`,
            transition: dragging
              ? "none"
              : "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {items.map((t, i) => (
            <figure
              key={t.name}
              className="w-full shrink-0 px-1"
              aria-hidden={i !== index}
              /* Off-slide content stays out of the tab order (React 19 takes
                 a boolean here). */
              inert={i !== index}
            >
              <blockquote className="font-display text-xl font-medium leading-snug text-ink-100 sm:text-2xl md:text-[1.75rem] md:leading-snug">
                {quoteMarks.open}
                {t.quote}
                {quoteMarks.close}
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <Image
                  src={t.avatar}
                  alt=""
                  width={56}
                  height={56}
                  className="h-14 w-14 shrink-0 rounded-full object-cover ring-1 ring-white/20"
                  draggable={false}
                />
                <span className="text-sm">
                  <span className="block font-semibold text-ink-100">
                    {t.name}
                  </span>
                  <span className="mt-0.5 block text-ink-400">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="mt-10 flex items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          {items.map((t, i) => (
            <button
              key={t.name}
              type="button"
              aria-label={labels.goTo[i]}
              aria-current={i === index}
              onClick={() => go(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === index
                  ? "w-8 bg-orange-400"
                  : "w-1.5 bg-ink-400/50 hover:bg-ink-300"
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <SliderButton label={labels.previous} onClick={() => go(index - 1)}>
            <path d="M15 6 9 12l6 6" />
          </SliderButton>
          <SliderButton label={labels.next} onClick={() => go(index + 1)}>
            <path d="m9 6 6 6-6 6" />
          </SliderButton>
        </div>
      </div>
    </div>
  );
}

function SliderButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-navy-600/70 text-ink-200 transition-colors hover:border-orange-400 hover:text-orange-300"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {children}
      </svg>
    </button>
  );
}
