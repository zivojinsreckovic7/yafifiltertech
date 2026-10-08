"use client";

import { startTransition, useActionState } from "react";
import { MagneticButton } from "./Magnetic";
import { sendQuote, type QuoteState } from "@/actions/quote";
import { contact } from "@/data/contact";
import { quoteLimits } from "@/data/quoteForm";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/sr";

const initialState: QuoteState = { status: "idle" };

export default function QuoteForm({
  dict,
  locale,
  products,
}: {
  dict: Dictionary["quoteForm"];
  locale: Locale;
  products: { slug: string; name: string }[];
}) {
  const [state, formAction, pending] = useActionState(sendQuote, initialState);

  // Submitting by hand keeps what the visitor typed when sending fails — a
  // form `action` clears the fields once it settles. Without JavaScript the
  // form still posts straight to the same action.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(() => formAction(formData));
  };

  if (state.status === "sent") {
    return (
      <div
        className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-2xl border border-orange-500/30 bg-navy-900/60 p-10 text-center"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-navy-950">
          ✓
        </span>
        <h3 className="mt-6 font-display text-2xl font-bold text-ink-100">
          {dict.sentTitle}
        </h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-400">
          {dict.sentText}
        </p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-5 rounded-2xl border border-navy-700 bg-navy-900/60 p-8 sm:grid-cols-2"
    >
      <input type="hidden" name="locale" value={locale} />

      {/* Honeypot: off-screen and skipped by keyboard and screen readers, so
          only bots fill it in. */}
      <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
        <label>
          Website
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <Field label={dict.name} name="name" maxLength={quoteLimits.name} required />
      <Field label={dict.company} name="company" maxLength={quoteLimits.company} />
      <Field
        label={dict.email}
        name="email"
        type="email"
        maxLength={quoteLimits.email}
        required
      />
      <Field label={dict.phone} name="phone" type="tel" maxLength={quoteLimits.phone} />

      <label className="flex flex-col gap-2 text-sm sm:col-span-2">
        <span className="font-medium text-ink-200">{dict.filterType}</span>
        <select
          name="filterType"
          className="rounded-lg border border-navy-600 bg-navy-950/60 px-4 py-3 text-ink-100 outline-none transition-colors focus:border-orange-400"
          defaultValue=""
        >
          <option value="" disabled>
            {dict.selectCategory}
          </option>
          {products.map((product) => (
            <option key={product.slug} value={product.slug}>
              {product.name}
            </option>
          ))}
          <option value="deltrian">{dict.deltrianOption}</option>
          <option value="ostalo">{dict.otherOption}</option>
        </select>
      </label>

      <label className="flex flex-col gap-2 text-sm sm:col-span-2">
        <span className="font-medium text-ink-200">{dict.message}</span>
        <textarea
          name="message"
          rows={4}
          maxLength={quoteLimits.message}
          placeholder={dict.messagePlaceholder}
          className="resize-none rounded-lg border border-navy-600 bg-navy-950/60 px-4 py-3 text-ink-100 placeholder:text-ink-400 outline-none transition-colors focus:border-orange-400"
        />
      </label>

      <div className="sm:col-span-2">
        {(state.status === "invalid" || state.status === "error") && (
          <p
            role="alert"
            className="mb-5 rounded-lg border border-orange-500/40 bg-orange-500/10 px-4 py-3 text-sm leading-relaxed text-ink-100"
          >
            {state.status === "invalid" ? (
              dict.invalidText
            ) : (
              <>
                {dict.errorText}{" "}
                <a
                  href={`mailto:${contact.email}`}
                  className="font-medium text-orange-400 underline underline-offset-2"
                >
                  {contact.email}
                </a>
                .
              </>
            )}
          </p>
        )}
        <MagneticButton
          type="submit"
          disabled={pending}
          className="btn-primary w-full disabled:cursor-wait disabled:opacity-70 sm:w-auto"
        >
          {pending ? dict.sending : dict.submit}
        </MagneticButton>
        <p className="mt-4 text-xs text-ink-400">{dict.note}</p>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  maxLength,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  maxLength: number;
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
        maxLength={maxLength}
        required={required}
        className="rounded-lg border border-navy-600 bg-navy-950/60 px-4 py-3 text-ink-100 placeholder:text-ink-400 outline-none transition-colors focus:border-orange-400"
      />
    </label>
  );
}
