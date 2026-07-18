"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProductSearch({ className = "" }: { className?: string }) {
  const [value, setValue] = useState("");
  const router = useRouter();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = value.trim();
    router.push(q ? `/proizvodi?q=${encodeURIComponent(q)}` : "/proizvodi");
  };

  return (
    <form
      onSubmit={onSubmit}
      className={`flex items-center gap-2 rounded-full border border-navy-600 bg-navy-900/60 p-1.5 pl-5 backdrop-blur-sm transition-colors focus-within:border-orange-400 ${className}`}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        className="shrink-0 text-ink-400"
      >
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
        <path
          d="M21 21L16.65 16.65"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Pretražite filtere (HEPA, kasetni, džepasti...)"
        className="w-full bg-transparent py-2.5 text-sm text-ink-100 outline-none placeholder:text-ink-400"
      />
      <button
        type="submit"
        className="shrink-0 rounded-full bg-orange-500 px-5 py-2.5 text-xs font-semibold text-navy-950 transition-colors hover:bg-orange-400"
      >
        Pretraži
      </button>
    </form>
  );
}
