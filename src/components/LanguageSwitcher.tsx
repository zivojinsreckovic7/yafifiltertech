"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import {
  localeCodes,
  localeNames,
  localePath,
  localeTags,
  locales,
  stripLocale,
  type Locale,
} from "@/i18n/config";

/**
 * Disclosure dropdown that swaps the locale prefix on the current path.
 * `stripLocale` accepts both the public Serbian path (`/proizvodi`) and the
 * internally rewritten one (`/sr/proizvodi`), so the hrefs render identically
 * on the server and after hydration.
 */
export default function LanguageSwitcher({
  locale,
  label,
  className = "",
}: {
  locale: Locale;
  label: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const pathname = usePathname();
  const basePath = stripLocale(pathname || "/");

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      triggerRef.current?.focus();
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        ref={triggerRef}
        type="button"
        aria-label={`${label}: ${localeNames[locale]}`}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
        className="lang-trigger"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
          <path
            d="M3.3 9.5h17.4M3.3 14.5h17.4"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
          <path
            d="M12 3c-2.5 2.4-3.7 5.4-3.7 9s1.2 6.6 3.7 9c2.5-2.4 3.7-5.4 3.7-9S14.5 5.4 12 3Z"
            stroke="currentColor"
            strokeWidth="1.7"
          />
        </svg>
        {localeCodes[locale]}
        <svg
          className="lang-trigger__chevron"
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
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

      {open && (
        <div id={menuId} className="lang-menu" aria-label={label}>
          {locales.map((option) => (
            <Link
              key={option}
              href={localePath(option, basePath)}
              hrefLang={localeTags[option]}
              aria-current={option === locale ? "true" : undefined}
              onClick={() => setOpen(false)}
              className="lang-option"
            >
              {localeNames[option]}
              <span className="lang-option__code" aria-hidden="true">
                {option === locale ? "✓" : localeCodes[option]}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
