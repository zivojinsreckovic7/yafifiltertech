"use client";

import { useId, useRef, useState, type ReactNode } from "react";

export type GroupTab = { label: string; count: number };

/**
 * Switcher for long catalogue ranges: one group of variants on screen at a
 * time. Every panel stays in the DOM (inactive ones carry `hidden`), so the
 * full range is still in the served HTML for search engines and in-page find.
 *
 * Panels arrive pre-rendered from the server component so the cards — and
 * their reveal animations — stay server-side.
 */
export default function ProductGroupTabs({
  tabs,
  panels,
  label,
}: {
  tabs: GroupTab[];
  panels: ReactNode[];
  /** Accessible name for the tab row. */
  label: string;
}) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const tabId = (index: number) => `${baseId}-tab-${index}`;
  const panelId = (index: number) => `${baseId}-panel-${index}`;

  const select = (index: number) => {
    const next = (index + tabs.length) % tabs.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") select(active + 1);
    else if (event.key === "ArrowLeft") select(active - 1);
    else if (event.key === "Home") select(0);
    else if (event.key === "End") select(tabs.length - 1);
    else return;
    event.preventDefault();
  };

  return (
    <>
      <div
        role="tablist"
        aria-label={label}
        onKeyDown={onKeyDown}
        className="mt-10 flex flex-wrap gap-2.5"
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            ref={(node) => {
              tabRefs.current[index] = node;
            }}
            type="button"
            role="tab"
            id={tabId(index)}
            aria-selected={index === active}
            aria-controls={panelId(index)}
            tabIndex={index === active ? 0 : -1}
            onClick={() => setActive(index)}
            className="group-tab"
          >
            {tab.label}
            <span className="group-tab__count">{tab.count}</span>
          </button>
        ))}
      </div>

      {panels.map((panel, index) => (
        <div
          key={tabs[index]?.label ?? index}
          role="tabpanel"
          id={panelId(index)}
          aria-labelledby={tabId(index)}
          hidden={index !== active}
          className="mt-10"
        >
          {panel}
        </div>
      ))}
    </>
  );
}
