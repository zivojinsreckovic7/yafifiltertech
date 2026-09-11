import Link from "next/link";
import HashLink from "./HashLink";
import { Logo } from "./Logo";
import Reveal from "./Reveal";
import { addressLine, contact } from "@/data/contact";
import { getIndustries } from "@/data/industries";
import { industryPath, routes } from "@/data/nav";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export default function Footer({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const { footer, nav } = dict;

  const navItems = [
    { href: routes.products, label: nav.products },
    { href: routes.industries, label: nav.industries },
    { href: routes.deltrian, label: nav.deltrian },
    { href: routes.about, label: nav.about },
    { href: routes.contact, label: nav.contact },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-navy-700/60 bg-navy-950">
      <div
        aria-hidden="true"
        className="text-stroke pointer-events-none absolute inset-x-0 bottom-0 translate-y-[32%] select-none whitespace-nowrap text-center font-display text-[17vw] font-bold leading-none opacity-[0.05]"
      >
        FILTERTECH
      </div>
      <div className="wrap relative py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <Reveal>
            <Logo className="h-9 w-auto" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-400">
              {footer.description}
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <h3 className="eyebrow mb-5">{footer.navHeading}</h3>
            <ul className="flex flex-col gap-3 text-sm text-ink-300">
              {navItems.map((item) => (
                <li key={item.href}>
                  <HashLink
                    href={localePath(locale, item.href)}
                    className="hover:text-orange-300"
                  >
                    {item.label}
                  </HashLink>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.12}>
            <h3 className="eyebrow mb-5">{footer.industriesHeading}</h3>
            <ul className="flex flex-col gap-3 text-sm text-ink-300">
              {getIndustries(locale).map((i) => (
                <li key={i.slug}>
                  <Link
                    href={localePath(locale, industryPath(i.slug))}
                    className="hover:text-orange-300"
                  >
                    {i.short}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.18}>
            <h3 className="eyebrow mb-5">{footer.contactHeading}</h3>
            <ul className="flex flex-col gap-3 text-sm text-ink-300">
              <li className="text-ink-400">
                <address className="not-italic">{addressLine(locale)}</address>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="hover:text-orange-300"
                >
                  {contact.email}
                </a>
              </li>
              {contact.phones.map((phone) => (
                <li key={phone.tel}>
                  <a
                    href={`tel:${phone.tel}`}
                    className="hover:text-orange-300"
                  >
                    {phone.label}
                  </a>
                </li>
              ))}
              <li className="text-ink-400">{footer.regionValue}</li>
            </ul>
          </Reveal>
        </div>

        <Reveal className="mt-16 flex flex-col gap-4 border-t border-navy-800 pt-8 text-xs text-ink-400 md:flex-row md:items-center md:justify-between">
          <p>{footer.rights(new Date().getFullYear())}</p>
          <p>{footer.tagline}</p>
        </Reveal>
      </div>
    </footer>
  );
}
