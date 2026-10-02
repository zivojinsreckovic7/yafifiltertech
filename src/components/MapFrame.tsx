"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The map embed behind a click-to-activate shield. A cross-origin iframe takes
 * every wheel and touch-drag gesture over it, so scrolling the page past the
 * map would zoom or pan it instead — and the OSM embed has no option to turn
 * that off. The shield hands those gestures to the page until the map is
 * clicked, and returns once the pointer leaves the map.
 */
export default function MapFrame({
  src,
  title,
  hint,
}: {
  src: string;
  title: string;
  hint: string;
}) {
  const [active, setActive] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!active) return;
    // Pointer events over the iframe stay in its own document, so anything
    // this document sees happened off the map. The iframe itself is skipped:
    // browsers may re-dispatch a move to it when the shield is removed.
    const deactivate = (event: PointerEvent) => {
      if (event.target !== frameRef.current) setActive(false);
    };
    document.addEventListener("pointermove", deactivate);
    document.addEventListener("pointerdown", deactivate);
    return () => {
      document.removeEventListener("pointermove", deactivate);
      document.removeEventListener("pointerdown", deactivate);
    };
  }, [active]);

  return (
    <div className="group relative">
      <iframe
        ref={frameRef}
        src={src}
        title={title}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="block h-[320px] w-full border-0 md:h-[420px]"
      />
      {/* Pointer-only: keyboard users tab straight into the iframe. */}
      {!active && (
        <div
          aria-hidden="true"
          data-cursor="link"
          onClick={() => setActive(true)}
          className="absolute inset-0 cursor-pointer"
        >
          <span className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-navy-950/85 px-4 py-2 text-xs font-semibold text-ink-100 opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100">
            {hint}
          </span>
        </div>
      )}
    </div>
  );
}
