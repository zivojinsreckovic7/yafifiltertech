"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent, ReactNode } from "react";

/**
 * A `Link` to an in-page anchor that still works on a repeat click.
 *
 * Navigating to the URL you are already on is a no-op for the router, so once
 * `/#kontakt` is in the address bar the link stops scrolling — you click it,
 * having scrolled away, and nothing happens. Only in that case does this take
 * over and scroll; every other click is an ordinary `Link` navigation.
 */
export default function HashLink({
  href,
  className,
  onClick,
  children,
  ...rest
}: {
  href: string;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "onClick" | "children">) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.();

    // Leave modified clicks (new tab, download, …) to the browser.
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const hashAt = href.indexOf("#");
    if (hashAt === -1) return;

    const hash = href.slice(hashAt);
    // A real navigation is still ahead — the router handles the scroll itself.
    if (window.location.hash !== hash) return;

    const target = document.getElementById(hash.slice(1));
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView();
  };

  return (
    <Link href={href} className={className} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
