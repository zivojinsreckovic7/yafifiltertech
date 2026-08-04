"use client";

import { useEffect, useRef } from "react";
import { Logo } from "./Logo";

const MINIMUM_DURATION = 1100;
const EXIT_HOLD = 180;
const EXIT_DURATION = 680;

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

export default function LoadingScreen({
  aria,
  label,
}: {
  aria: string;
  label: string;
}) {
  const screenRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const screen = screenRef.current;
    const progress = progressRef.current;
    const bar = barRef.current;
    if (!screen || !progress || !bar) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();
    let ready = document.readyState === "complete";
    let completionStart = ready ? start : 0;
    let completionFrom = 0;
    let displayed = 0;
    let frame = 0;
    let exitTimer = 0;
    let removeTimer = 0;

    const markReady = () => {
      ready = true;
    };

    if (!ready) window.addEventListener("load", markReady, { once: true });

    const finish = () => {
      progress.textContent = "100%";
      bar.style.transform = "scaleX(1)";
      screen.classList.add("is-complete");

      exitTimer = window.setTimeout(() => {
        screen.classList.add("is-exiting");
        removeTimer = window.setTimeout(() => {
          document.documentElement.removeAttribute("data-loader-ready");
        }, reducedMotion ? 20 : EXIT_DURATION);
      }, reducedMotion ? 20 : EXIT_HOLD);
    };

    const update = (now: number) => {
      if (reducedMotion) {
        finish();
        return;
      }

      const elapsed = now - start;
      let next: number;

      if (!ready) {
        const waitingProgress = Math.min(elapsed / 1600, 1);
        next = easeOutCubic(waitingProgress) * 94;
      } else {
        if (!completionStart) {
          completionStart = now;
          completionFrom = displayed;
        }
        const remainingDuration = Math.max(320, MINIMUM_DURATION - (completionStart - start));
        const completionProgress = Math.min((now - completionStart) / remainingDuration, 1);
        next = completionFrom + (100 - completionFrom) * easeOutCubic(completionProgress);
      }

      displayed = Math.max(displayed, Math.min(next, 100));
      const rounded = Math.min(Math.floor(displayed), 100);
      progress.textContent = `${rounded}%`;
      bar.style.transform = `scaleX(${displayed / 100})`;

      if (displayed >= 99.95) {
        finish();
        return;
      }

      frame = requestAnimationFrame(update);
    };

    frame = requestAnimationFrame(update);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.clearTimeout(exitTimer);
      window.clearTimeout(removeTimer);
      window.removeEventListener("load", markReady);
    };
  }, []);

  return (
    <div
      ref={screenRef}
      className="site-loader"
      role="status"
      aria-label={aria}
    >
      <div className="site-loader__content">
        <Logo className="site-loader__logo" markClassName="h-14 w-14" />

        <div className="site-loader__meter" aria-hidden="true">
          <div className="site-loader__track">
            <span ref={barRef} className="site-loader__bar" />
          </div>
          <div className="site-loader__meta">
            <span>{label}</span>
            <span ref={progressRef} className="site-loader__progress">
              0%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
