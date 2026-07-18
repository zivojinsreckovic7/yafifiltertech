"use client";

import { useState } from "react";
import { MagneticButton } from "./Magnetic";
import { productCategories } from "@/data/products";

export default function QuoteForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    window.setTimeout(() => {
      setStatus("sent");
    }, 250);
  };

  if (status === "sent") {
    return (
      <div
        className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-2xl border border-orange-500/30 bg-navy-900/60 p-10 text-center"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-navy-950">
          ✓
        </span>
        <h3 className="mt-6 font-display text-2xl font-extrabold text-ink-100">
          Upit je poslat
        </h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-400">
          Hvala na interesovanju. Naš tim će vam odgovoriti sa predlogom
          rešenja u najkraćem roku.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-5 rounded-2xl border border-navy-700 bg-navy-900/60 p-8 sm:grid-cols-2"
    >
      <Field label="Ime i prezime" name="name" required />
      <Field label="Kompanija" name="company" />
      <Field label="Email" name="email" type="email" required />
      <Field label="Telefon" name="phone" type="tel" />

      <label className="flex flex-col gap-2 text-sm sm:col-span-2">
        <span className="font-medium text-ink-200">Tip filtera</span>
        <select
          name="filterType"
          className="rounded-lg border border-navy-600 bg-navy-950/60 px-4 py-3 text-ink-100 outline-none transition-colors focus:border-orange-400"
          defaultValue=""
        >
          <option value="" disabled>
            Izaberite kategoriju
          </option>
          {productCategories.map((p) => (
            <option key={p.slug} value={p.name}>
              {p.name}
            </option>
          ))}
          <option value="deltrian">Deltrian program</option>
          <option value="ostalo">Nisam siguran / drugo</option>
        </select>
      </label>

      <label className="flex flex-col gap-2 text-sm sm:col-span-2">
        <span className="font-medium text-ink-200">Poruka</span>
        <textarea
          name="message"
          rows={4}
          placeholder="Opišite objekat, protok vazduha ili trenutni sistem ventilacije..."
          className="resize-none rounded-lg border border-navy-600 bg-navy-950/60 px-4 py-3 text-ink-100 placeholder:text-ink-400 outline-none transition-colors focus:border-orange-400"
        />
      </label>

      <div className="sm:col-span-2">
        <MagneticButton
          type="submit"
          className="btn-primary w-full sm:w-auto"
        >
          {status === "sending" ? "Slanje..." : "Pošaljite upit"}
        </MagneticButton>
        <p className="mt-4 text-xs text-ink-400">
          Odgovaramo u roku od 24 časa radnim danima. Slanjem upita
          saglasni ste da vas kontaktiramo radi pripreme ponude.
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-2 text-sm">
      <span className="font-medium text-ink-200">
        {label}
        {required && <span className="text-orange-400"> *</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        className="rounded-lg border border-navy-600 bg-navy-950/60 px-4 py-3 text-ink-100 placeholder:text-ink-400 outline-none transition-colors focus:border-orange-400"
      />
    </label>
  );
}
