"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import HashLink from "./HashLink";
import { DeltrianLogo } from "./DeltrianLogo";
import { Logo } from "./Logo";
import { MagneticLink } from "./Magnetic";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import ProductsMenu, { type MenuItem } from "./ProductsMenu";
import { routes } from "@/data/nav";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/sr";

export default function Nav({
  locale,
  nav,
  theme,
  products,
}: {
  locale: Locale;
  nav: Dictionary["nav"];
  theme: Dictionary["theme"];
  /** Catalogue categories, already resolved to locale-prefixed hrefs. */
  products: MenuItem[];
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  /** Main menu order: Naslovna | O nama | Proizvodi | Katalozi | Deltrian (logo). */
  const leadLinks = [
    { href: localePath(locale, routes.home), label: nav.home },
    { href: localePath(locale, routes.about), label: nav.about },
  ];
  const trailLinks = [
    { href: localePath(locale, routes.catalogues), label: nav.catalogues },
  ];
  const productsHref = localePath(locale, routes.products);
  const deltrianHref = localePath(locale, routes.deltrian);
  const contactHref = localePath(locale, routes.contact);

  useEffect(() => {
    let current = false;
    const onScroll = () => {
      const next = window.scrollY > 24;
      if (next === current) return;
      current = next;
      setScrolled(next);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("no-scroll", open);
    return () => document.documentElement.classList.remove("no-scroll");
  }, [open]);

  const closeMenu = () => {
    setOpen(false);
    setProductsOpen(false);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled || open
            ? "border-b border-navy-700/60 bg-navy-950/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="wrap flex h-20 items-center justify-between gap-4">
          {/* The wordmark is wide; on narrow phones the link gives way so the
              controls never spill past the edge, and the image scales inside it. */}
          <Link
            href={localePath(locale, routes.home)}
            data-cursor="link"
            className="block min-w-0 shrink"
          >
            <Logo
              className="block h-8 w-auto max-w-full object-contain object-left md:h-9"
              eager
            />
          </Link>

          {/* The full row (wordmark + five links + controls) needs ~1100px, so
              the compact header stays up through lg. */}
          <nav className="hidden items-center gap-6 xl:flex 2xl:gap-8">
            {leadLinks.map((l) => (
              <HashLink
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-ink-300 transition-colors hover:text-ink-100"
              >
                {l.label}
              </HashLink>
            ))}
            <ProductsMenu
              label={nav.products}
              regionLabel={nav.productCategories}
              items={products}
              allHref={productsHref}
              allLabel={nav.allProducts}
            />
            {trailLinks.map((l) => (
              <HashLink
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-ink-300 transition-colors hover:text-ink-100"
              >
                {l.label}
              </HashLink>
            ))}
            {/* The Deltrian page is linked by its wordmark rather than a label. */}
            <Link
              href={deltrianHref}
              data-cursor="link"
              className="flex items-center opacity-90 transition-opacity hover:opacity-100"
            >
              <DeltrianLogo alt={nav.deltrian} className="h-3.5 w-auto" eager />
            </Link>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSwitcher locale={locale} label={nav.language} />
            <ThemeToggle toDark={theme.toDark} toLight={theme.toLight} />
            <MagneticLink
              href={contactHref}
              className="btn-primary hidden md:inline-flex"
            >
              {nav.quote}
            </MagneticLink>
            <button
              aria-label={open ? nav.closeMenu : nav.openMenu}
              onClick={() => setOpen((v) => !v)}
              className="relative z-10 flex h-10 w-10 flex-col items-center justify-center gap-1.5 xl:hidden"
            >
              <span
                className={`h-px w-6 bg-ink-100 transition-transform duration-300 ${
                  open ? "translate-y-[3.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-px w-6 bg-ink-100 transition-transform duration-300 ${
                  open ? "-translate-y-[3.5px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 overflow-y-auto bg-navy-950 transition-transform duration-300 xl:hidden ${
          open ? "translate-y-0" : "-translate-y-full"
        }`}
        aria-hidden={!open}
      >
        <div className="wrap flex min-h-full flex-col justify-center gap-6 py-28">
          {leadLinks.map((l) => (
            <HashLink
              key={l.href}
              href={l.href}
              data-menu-item
              onClick={closeMenu}
              className="font-display text-4xl font-bold text-ink-100"
            >
              {l.label}
            </HashLink>
          ))}

          <div data-menu-item>
            <button
              type="button"
              aria-expanded={productsOpen}
              onClick={() => setProductsOpen((v) => !v)}
              className="flex items-center gap-3 font-display text-4xl font-bold text-ink-100"
            >
              {nav.products}
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className={`transition-transform duration-300 ${
                  productsOpen ? "rotate-180" : ""
                }`}
              >
                <path
                  d="M6 9.5 12 15.5 18 9.5"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {productsOpen && (
              <ul className="mt-5 flex flex-col gap-3.5 border-l border-navy-700 pl-5">
                {products.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className="text-base leading-snug text-ink-300"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href={productsHref}
                    onClick={closeMenu}
                    className="text-sm font-semibold text-orange-400"
                  >
                    {nav.allProducts}
                  </Link>
                </li>
              </ul>
            )}
          </div>

          {trailLinks.map((l) => (
            <HashLink
              key={l.href}
              href={l.href}
              data-menu-item
              onClick={closeMenu}
              className="font-display text-4xl font-bold text-ink-100"
            >
              {l.label}
            </HashLink>
          ))}
          <Link
            href={deltrianHref}
            data-menu-item
            onClick={closeMenu}
            className="flex w-fit items-center py-1"
          >
            <DeltrianLogo alt={nav.deltrian} className="h-6 w-auto" />
          </Link>
          <Link
            href={contactHref}
            data-menu-item
            onClick={closeMenu}
            className="btn btn-primary mt-4 w-fit"
          >
            {nav.quote}
          </Link>
        </div>
      </div>
    </>
  );
}
