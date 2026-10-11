"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import { useTheme } from "@/lib/useTheme";

declare global {
  interface Window {
    turnstile?: {
      render(container: HTMLElement, options: Record<string, unknown>): string;
      remove(widgetId: string): void;
    };
  }
}

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

/**
 * Cloudflare Turnstile. It checks the visitor in the background and only
 * shows itself when Cloudflare wants a click; the token lands in a hidden
 * `cf-turnstile-response` input inside the surrounding form, and the server
 * action verifies it. Rendered explicitly, because the implicit mode only
 * scans the page once and would miss a form reached by client-side
 * navigation.
 */
export default function Turnstile({ locale }: { locale: Locale }) {
  const container = useRef<HTMLDivElement>(null);
  const [scriptReady, setScriptReady] = useState(false);
  const [shown, setShown] = useState(false);
  // Turnstile can't restyle a live widget, so a theme switch renders anew.
  const theme = useTheme();

  useEffect(() => {
    const element = container.current;
    if (!scriptReady || !element || !window.turnstile || !siteKey) return;

    const widgetId = window.turnstile.render(element, {
      sitekey: siteKey,
      language: locale,
      theme,
      appearance: "interaction-only",
      // The normal widget is a fixed 300px; narrow phones get the compact one.
      size: element.clientWidth < 300 ? "compact" : "normal",
      "before-interactive-callback": () => setShown(true),
    });
    return () => window.turnstile?.remove(widgetId);
  }, [scriptReady, locale, theme]);

  return (
    <>
      {/* Must load from this exact URL: Cloudflare breaks proxied copies. */}
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        onReady={() => setScriptReady(true)}
      />
      {/* No line height, or the inline iframe sits on a text baseline with a
          gap beneath it. */}
      <div ref={container} className={shown ? "mb-5 leading-[0]" : undefined} />
    </>
  );
}
