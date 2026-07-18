import Link from "next/link";
import { Logo } from "./Logo";
import Reveal from "./Reveal";
import { industries } from "@/data/nav";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-navy-700/60 bg-navy-950">
      <div
        aria-hidden="true"
        className="text-stroke pointer-events-none absolute inset-x-0 bottom-0 translate-y-[32%] select-none whitespace-nowrap text-center font-display text-[17vw] font-extrabold leading-none opacity-[0.05]"
      >
        FILTERTECH
      </div>
      <div className="wrap relative py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <Reveal>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-400">
              Projektujemo i isporučujemo industrijske sisteme filtracije
              vazduha za Ex-Yu tržište. Regionalni distributer Deltrian
              programa filtera.
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <h3 className="eyebrow mb-5">Navigacija</h3>
            <ul className="flex flex-col gap-3 text-sm text-ink-300">
              <li>
                <Link href="/proizvodi" className="hover:text-orange-300">
                  Proizvodi
                </Link>
              </li>
              <li>
                <Link href="/industrije" className="hover:text-orange-300">
                  Industrije
                </Link>
              </li>
              <li>
                <Link href="/deltrian" className="hover:text-orange-300">
                  Deltrian program
                </Link>
              </li>
              <li>
                <Link href="/#o-nama" className="hover:text-orange-300">
                  O nama
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="hover:text-orange-300">
                  Kontakt
                </Link>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.12}>
            <h3 className="eyebrow mb-5">Industrije</h3>
            <ul className="flex flex-col gap-3 text-sm text-ink-300">
              {industries.map((i) => (
                <li key={i.slug}>
                  <Link
                    href={`/industrije/${i.slug}`}
                    className="hover:text-orange-300"
                  >
                    {i.short}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.18}>
            <h3 className="eyebrow mb-5">Kontakt</h3>
            <ul className="flex flex-col gap-3 text-sm text-ink-300">
              <li>
                <a href="mailto:info@yafi.co.rs" className="hover:text-orange-300">
                  info@yafi.co.rs
                </a>
              </li>
              <li>
                <a href="tel:+381000000000" className="hover:text-orange-300">
                  +381 00 000 0000
                </a>
              </li>
              <li className="text-ink-400">Srbija · Ex-Yu region</li>
            </ul>
          </Reveal>
        </div>

        <Reveal className="mt-16 flex flex-col gap-4 border-t border-navy-800 pt-8 text-xs text-ink-400 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Yafi Filtertech. Sva prava zadržana.</p>
          <p>Industrijska filtracija vazduha · ISO 16890</p>
        </Reveal>
      </div>
    </footer>
  );
}
