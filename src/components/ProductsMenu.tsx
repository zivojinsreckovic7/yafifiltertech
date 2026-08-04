"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

export type MenuItem = { href: string; label: string };

/**
 * Desktop catalogue dropdown. The trigger is a link to the full range, so a
 * click always goes somewhere useful; the panel opens on hover for mouse users
 * and on focus for keyboard users, which keeps every category one Tab away.
 */
export default function ProductsMenu({
  label,
  regionLabel,
  items,
  allHref,
  allLabel,
}: {
  label: string;
  regionLabel: string;
  items: MenuItem[];
  allHref: string;
  allLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLAnchorElement>(null);
  const closeTimer = useRef<number>(0);
  /**
   * Set when the visitor dismisses the panel with Escape. Without it, moving
   * focus back to the trigger would immediately reopen what they just closed.
   * Cleared once the pointer or focus leaves the trigger area.
   */
  const dismissed = useRef(false);
  const menuId = useId();

  const cancelClose = () => window.clearTimeout(closeTimer.current);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      cancelClose();
      dismissed.current = true;
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

  const openPanel = () => {
    if (dismissed.current) return;
    cancelClose();
    setOpen(true);
  };

  /** Small grace period so diagonal travel to the panel doesn't dismiss it. */
  const scheduleClose = () => {
    cancelClose();
    dismissed.current = false;
    closeTimer.current = window.setTimeout(() => setOpen(false), 140);
  };

  return (
    <div
      ref={containerRef}
      className="relative"
      onPointerEnter={(e) => {
        if (e.pointerType === "touch") return;
        openPanel();
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "touch") return;
        scheduleClose();
      }}
      onFocus={openPanel}
      onBlur={(e) => {
        if (e.currentTarget.contains(e.relatedTarget as Node)) return;
        dismissed.current = false;
        setOpen(false);
      }}
    >
      <Link
        ref={triggerRef}
        href={allHref}
        data-cursor="link"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen(false)}
        className="nav-trigger"
      >
        {label}
        <svg
          className="nav-trigger__chevron"
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
      </Link>

      {open && (
        <div id={menuId} className="nav-menu" aria-label={regionLabel}>
          <span className="nav-menu__label">{regionLabel}</span>
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="nav-menu__item"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={allHref}
            onClick={() => setOpen(false)}
            className="nav-menu__all"
          >
            {allLabel}
          </Link>
        </div>
      )}
    </div>
  );
}
