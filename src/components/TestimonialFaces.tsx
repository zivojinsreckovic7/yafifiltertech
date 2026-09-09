import Image from "next/image";

/**
 * The scattered wall of client portraits that heads the testimonials panel.
 *
 * Cast to read as the Ex-Yu market the company sells into — worth keeping in
 * mind when swapping a face, since a generic stock search skews American.
 *
 * The row is deliberately wider than the panel and centred, so it clips at
 * both edges the way a crowd should, at every viewport. Each card carries its
 * own lift and tilt; the middle pair sit highest, opening the gap the headline
 * drops into. Purely decorative — no alt text, not focusable.
 */
const CARDS = [
  { y: 44, rot: -3 },
  { y: 6, rot: 2 },
  { y: 58, rot: -1.5 },
  { y: 20, rot: 2.5 },
  { y: 0, rot: -2 },
  { y: 34, rot: 1.5 },
  { y: 4, rot: -2.5 },
  { y: 48, rot: 2 },
  { y: 14, rot: -1.5 },
  { y: 52, rot: 2.5 },
  { y: 10, rot: -2 },
  { y: 40, rot: 1.5 },
];

export default function TestimonialFaces() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative h-[224px] select-none sm:h-[268px] md:h-[312px]"
    >
      {/* Ghost cards: the suggestion of a wall carrying on behind the crowd. */}
      <div className="absolute inset-x-0 top-0 flex justify-center gap-3">
        {Array.from({ length: 13 }).map((_, i) => (
          <span
            key={i}
            className="h-28 w-[104px] shrink-0 rounded-xl bg-navy-800/40 sm:w-[124px] md:w-[140px]"
          />
        ))}
      </div>

      <div className="absolute inset-x-0 top-0 flex justify-center gap-3">
        {CARDS.map((card, i) => (
          <div
            key={i}
            className="shrink-0 overflow-hidden rounded-xl shadow-[0_18px_40px_-20px_rgba(0,10,22,0.65)] ring-1 ring-white/10"
            style={{
              transform: `translateY(${card.y}px) rotate(${card.rot}deg)`,
            }}
          >
            <Image
              src={`/testimonials/faces/${String(i + 1).padStart(2, "0")}.webp`}
              alt=""
              width={132}
              height={176}
              loading="lazy"
              className="h-[140px] w-[104px] object-cover sm:h-[166px] sm:w-[124px] md:h-[186px] md:w-[140px]"
            />
          </div>
        ))}
      </div>

      {/* Just enough to settle the crowd into the panel at the sides and foot —
          the portraits themselves stay crisp. */}
      <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-navy-900 to-transparent md:w-20" />
      <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-navy-900 to-transparent md:w-20" />
      <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-navy-900 to-transparent" />
    </div>
  );
}
