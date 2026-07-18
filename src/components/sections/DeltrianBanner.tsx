import Reveal from "@/components/Reveal";
import { MagneticLink } from "@/components/Magnetic";

export default function DeltrianBanner() {
  return (
    <section className="py-8 md:py-12">
      <div className="wrap">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-orange-500/25 bg-gradient-to-br from-navy-900 via-navy-950 to-navy-950 px-8 py-16 sm:px-14 md:py-20">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.14]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(115deg, var(--orange-500) 0px, var(--orange-500) 2px, transparent 2px, transparent 46px)",
              }}
            />
            {/* Glow orbs as radial gradients — same splat as the old blurred
                discs without Safari's per-layer blur cost */}
            <div
              className="pointer-events-none absolute -right-60 -top-60 h-[36rem] w-[36rem]"
              style={{
                background:
                  "radial-gradient(closest-side, color-mix(in srgb, var(--orange-500) 25%, transparent), color-mix(in srgb, var(--orange-500) 10%, transparent) 55%, transparent)",
              }}
            />
            <div
              className="pointer-events-none absolute -bottom-56 left-1/4 -ml-32 h-[32rem] w-[32rem]"
              style={{
                background:
                  "radial-gradient(closest-side, color-mix(in srgb, var(--navy-500) 30%, transparent), color-mix(in srgb, var(--navy-500) 12%, transparent) 55%, transparent)",
              }}
            />

            <div className="relative flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
              <div className="max-w-xl">
                <span className="eyebrow">Ekskluzivno partnerstvo</span>
                <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight text-ink-100 md:text-4xl">
                  Deltrian program filtera — zvanično, za ceo Ex-Yu region.
                </h2>
                <p className="mt-5 text-base leading-relaxed text-ink-300">
                  Yafi Filtertech je zvanični regionalni distributer
                  Deltrian programa filtera. Kompletna paleta industrijske
                  filtracije, razvijena u skladu sa evropskim standardima
                  kvaliteta vazduha, dostupna direktno kroz naš tim.
                </p>
                <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm text-ink-300">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                    Zvaničan regionalni distributer
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                    Kompletan program filtera
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                    Tehnička podrška na terenu
                  </li>
                </ul>
              </div>

              <MagneticLink href="/deltrian" className="btn-primary shrink-0">
                Otvorite Deltrian program →
              </MagneticLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
