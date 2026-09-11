import Image from "next/image";

/**
 * Brand wordmark. The asset is trimmed to the glyphs (1833×420, ~4.36:1), so
 * a height utility alone sets the rendered size and the visible left edge
 * lines up with the surrounding content.
 *
 * `width`/`height` carry the aspect ratio for layout reservation and size the
 * 1x/2x srcset — 240px covers the largest slot (the loader) at 1x.
 */
export function Logo({
  className = "h-9 w-auto",
  eager = false,
}: {
  className?: string;
  /** Above-the-fold instances (loader, nav) fetch at high priority. */
  eager?: boolean;
}) {
  return (
    <Image
      src="/yafi-filtertech-logo.webp"
      alt="Yafi Filtertech"
      width={240}
      height={55}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
      className={className}
    />
  );
}
