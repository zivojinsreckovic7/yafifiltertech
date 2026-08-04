import Image from "next/image";
import PleatIcon from "./PleatIcon";

/**
 * Image slot for catalogue cards. Product shots are square with a white
 * background — deliberate, so dark products stay readable — so the photo fills
 * the whole square and the rounded corners are clipped off it. Cards without a
 * photo keep the same footprint with a watermark.
 */
export default function ProductMedia({
  src,
  alt,
  className = "",
  sizes = "(min-width: 1024px) 22vw, (min-width: 640px) 44vw, 88vw",
  priority = false,
}: {
  src?: string;
  alt: string;
  className?: string;
  /** Override for slots wider than a catalogue card, e.g. the detail page. */
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={`relative aspect-square overflow-hidden rounded-[1.4rem] border border-navy-700/60 ${
        src ? "bg-white" : "bg-navy-950/50"
      } ${className}`}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <>
          <div className="card-grid-line pointer-events-none absolute inset-0 opacity-60" />
          <div className="flex h-full items-center justify-center">
            <PleatIcon className="h-10 w-10 opacity-25" />
          </div>
        </>
      )}
    </div>
  );
}
