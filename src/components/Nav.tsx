"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { MagneticLink } from "./Magnetic";
import ThemeToggle from "./ThemeToggle";
import { navLinks } from "@/data/nav";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled || open
            ? "border-b border-navy-700/60 bg-navy-950/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="wrap flex h-20 items-center justify-between">
          <Link href="/" data-cursor="link">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-ink-300 transition-colors hover:text-ink-100"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/deltrian"
              className="group flex items-center gap-2 rounded-full border border-orange-500/40 bg-orange-500/10 px-4 py-1.5 text-sm font-semibold text-orange-300 transition-colors hover:border-orange-400 hover:bg-orange-500/20"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
              Deltrian program
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <MagneticLink
              href="/kontakt"
              className="btn-primary hidden md:inline-flex"
            >
              Zatražite ponudu
            </MagneticLink>
            <button
              aria-label={open ? "Zatvori meni" : "Otvori meni"}
              onClick={() => setOpen((v) => !v)}
              className="relative z-10 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
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
        className={`fixed inset-0 z-40 flex flex-col justify-center bg-navy-950 transition-transform duration-300 lg:hidden ${
          open ? "translate-y-0" : "-translate-y-full"
        }`}
        aria-hidden={!open}
      >
        <div className="wrap flex flex-col gap-6">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              data-menu-item
              onClick={() => setOpen(false)}
              className="font-display text-4xl font-extrabold text-ink-100"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/deltrian"
            data-menu-item
            onClick={() => setOpen(false)}
            className="font-display text-4xl font-extrabold text-orange-400"
          >
            Deltrian program
          </Link>
          <Link
            href="/kontakt"
            data-menu-item
            onClick={() => setOpen(false)}
            className="btn btn-primary mt-4 w-fit"
          >
            Zatražite ponudu
          </Link>
        </div>
      </div>
    </>
  );
}
