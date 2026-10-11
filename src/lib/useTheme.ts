import { useSyncExternalStore } from "react";

export type Theme = "dark" | "light";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

function getSnapshot(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";
}

/**
 * The site theme, read from `data-theme` on <html> and kept current when the
 * visitor flips the toggle. The server renders the dark default.
 */
export function useTheme() {
  return useSyncExternalStore(subscribe, getSnapshot, () => "dark" as Theme);
}
