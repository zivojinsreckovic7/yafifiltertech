"use client";

import { useEffect } from "react";

const REVEAL_SELECTOR = "[data-reveal], [data-reveal-group]";

function findRevealElements(root: ParentNode) {
  const elements = Array.from(root.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));

  if (root instanceof HTMLElement && root.matches(REVEAL_SELECTOR)) {
    elements.unshift(root);
  }

  return elements;
}

export default function RevealManager() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observed = new WeakSet<HTMLElement>();

    const reveal = (element: HTMLElement) => {
      element.classList.add("is-revealed");
    };

    const inViewport = (element: HTMLElement) => {
      const box = element.getBoundingClientRect();
      return box.bottom > 0 && box.top < window.innerHeight;
    };

    /*
     * The entrance choreography is for arriving at the site, and the loading
     * screen covers it. A client-side navigation back to a page has no such
     * cover, so anything already on screen when it mounts is shown at once
     * instead of fading in behind the content that rendered instantly.
     */
    let firstPass = true;

    const observer = reducedMotion || !("IntersectionObserver" in window)
      ? null
      : new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              const element = entry.target as HTMLElement;
              reveal(element);
              observer?.unobserve(element);
            });
          },
          {
            rootMargin: "0px 0px -9% 0px",
            threshold: 0.08,
          },
        );

    const register = (root: ParentNode) => {
      const elements = findRevealElements(root);

      elements
        .filter((element) => element.hasAttribute("data-reveal-group"))
        .forEach((group) => {
          const baseDelay = Number(group.dataset.revealDelay ?? 0);
          Array.from(group.children).forEach((child, index) => {
            if (!(child instanceof HTMLElement)) return;
            if (!child.matches("[data-hero-item], [data-reveal]")) return;
            const delay = Math.min(baseDelay + index * 0.07, 0.3);
            child.style.setProperty("--reveal-delay", `${delay}s`);
          });
        });

      elements.forEach((element) => {
        if (observed.has(element)) return;

        const parent = element.parentElement;
        const insideGroup =
          element.hasAttribute("data-reveal") &&
          Boolean(parent?.closest("[data-reveal-group]"));
        const insideReveal =
          element.hasAttribute("data-reveal") &&
          Boolean(parent?.closest("[data-reveal]"));

        observed.add(element);

        if (insideGroup || insideReveal) return;
        if (!observer) {
          reveal(element);
          return;
        }
        if (!firstPass && inViewport(element)) {
          element.setAttribute("data-reveal-instant", "");
          reveal(element);
          return;
        }
        observer.observe(element);
      });
    };

    register(document);
    firstPass = false;

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) register(node);
        });
        mutation.removedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement) || !observer) return;
          findRevealElements(node).forEach((element) => observer.unobserve(element));
        });
      });
    });

    const main = document.querySelector("main");
    if (main) mutationObserver.observe(main, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      observer?.disconnect();
    };
  }, []);

  return null;
}
