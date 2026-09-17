import Image from "next/image";

/**
 * Deltrian wordmark, used as the nav link to the Deltrian page. Like the
 * brand wordmark the asset is trimmed to the glyphs (446×57, ~7.8:1), so a
 * height utility alone sets the rendered size and the left edge lines up.
 *
 * `width`/`height` carry the aspect ratio and size the 1x/2x srcset — 188px
 * covers the largest slot (the mobile menu) at 1x.
 *
 * It is white on transparent and only reads on dark surfaces;
 * `.deltrian-mark` inverts it on the light theme (see globals.css).
 */
export function DeltrianLogo({
  alt,
  className = "h-3.5 w-auto",
  eager = false,
}: {
  /** Localised link name — the image is the only content of the link. */
  alt: string;
  className?: string;
  /** Above-the-fold instances (nav) fetch at high priority. */
  eager?: boolean;
}) {
  return (
    <Image
      src="/deltrian-logo.webp"
      alt={alt}
      width={188}
      height={24}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
      className={`deltrian-mark ${className}`}
    />
  );
}
