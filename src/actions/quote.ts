"use server";

import { headers } from "next/headers";
import { contact } from "@/data/contact";
import { getProduct } from "@/data/products";
import { quoteLimits, type QuoteField } from "@/data/quoteForm";
import { defaultLocale, isLocale, localeNames } from "@/i18n/config";
import { sr } from "@/i18n/dictionaries/sr";
import { sendEmail } from "@/lib/resend";

export type QuoteState = { status: "idle" | "sent" | "invalid" | "error" };

/** Sent from the domain verified in Resend; replies go to the visitor. */
const sender = "YAFI sajt <upit@yafi.co.rs>";

/**
 * One address and nothing else: no display name, comma, angle bracket or
 * whitespace that could turn the Reply-To into something other than the
 * visitor's own address.
 */
const emailPattern = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]+$/;

/**
 * At most `maxPerWindow` enquiries per IP per window. The count lives in the
 * function instance's memory, so it slows a scripted flood down rather than
 * guaranteeing a hard cap across every instance.
 */
const windowMs = 10 * 60 * 1000;
const maxPerWindow = 5;
const recent = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((at) => now - at < windowMs);
  const limited = hits.length >= maxPerWindow;
  if (!limited) hits.push(now);
  recent.set(ip, hits);

  if (recent.size > 1000) {
    for (const [key, times] of recent) {
      if (times.every((at) => now - at >= windowMs)) recent.delete(key);
    }
  }
  return limited;
}

/** One line of text with control characters (CR/LF included) removed. */
function line(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value.replace(/\p{Cc}+/gu, " ").trim() : "";
}

/** Multi-line text: line breaks kept, every other control character removed. */
function paragraph(formData: FormData, name: string) {
  const value = formData.get(name);
  if (typeof value !== "string") return "";
  return value
    .split(/\r\n?|\n/)
    .map((row) => row.replace(/\p{Cc}+/gu, " ").trimEnd())
    .join("\n")
    .trim();
}

/** The office reads every enquiry in Serbian, whichever language was used. */
function filterLabel(value: string) {
  if (value === "") return "";
  if (value === "deltrian") return sr.quoteForm.deltrianOption;
  if (value === "ostalo") return sr.quoteForm.otherOption;
  return getProduct("sr", value)?.name ?? null;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Emails a quote request to the office. Everything the browser sends is
 * treated as untrusted: the recipient and sender are fixed here, every field
 * is length-checked and stripped of control characters, and all of it is
 * escaped before it goes into the HTML body.
 */
export async function sendQuote(
  _previous: QuoteState,
  formData: FormData,
): Promise<QuoteState> {
  // Honeypot: a field people never see. Bots that fill it are told the
  // enquiry went through, so they have no reason to try again.
  if (line(formData, "website") !== "") return { status: "sent" };

  const fields = {
    name: line(formData, "name"),
    company: line(formData, "company"),
    email: line(formData, "email"),
    phone: line(formData, "phone"),
    message: paragraph(formData, "message"),
  };
  const filter = filterLabel(line(formData, "filterType"));
  const localeValue = line(formData, "locale");
  const locale = isLocale(localeValue) ? localeValue : defaultLocale;

  const tooLong = (Object.keys(quoteLimits) as QuoteField[]).some(
    (key) => fields[key].length > quoteLimits[key],
  );
  if (
    !fields.name ||
    !emailPattern.test(fields.email) ||
    filter === null ||
    tooLong
  ) {
    return { status: "invalid" };
  }

  const requestHeaders = await headers();
  const ip =
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    requestHeaders.get("x-real-ip") ||
    "unknown";
  if (rateLimited(ip)) return { status: "error" };

  const labels = sr.quoteForm;
  const rows: [string, string][] = [
    [labels.name, fields.name],
    [labels.company, fields.company],
    [labels.email, fields.email],
    [labels.phone, fields.phone],
    [labels.filterType, filter],
    ["Jezik sajta", localeNames[locale]],
  ];
  const filled = rows.filter(([, value]) => value !== "");
  const signoff = "Odgovorom na ovu poruku pišete direktno pošiljaocu upita.";

  const text = [
    ...filled.map(([label, value]) => `${label}: ${value}`),
    "",
    `${labels.message}:`,
    fields.message || "—",
    "",
    "--",
    signoff,
  ].join("\n");

  const cell = "padding:6px 16px 6px 0;vertical-align:top";
  const html = `<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5;color:#1a2330">
<h2 style="font-size:18px;margin:0 0 16px">Novi upit sa sajta</h2>
<table style="border-collapse:collapse">${filled
    .map(
      ([label, value]) =>
        `<tr><td style="${cell};color:#5b6675">${escapeHtml(label)}</td><td style="${cell}">${escapeHtml(value)}</td></tr>`,
    )
    .join("")}</table>
<p style="margin:20px 0 4px;color:#5b6675">${escapeHtml(labels.message)}</p>
<p style="margin:0;white-space:pre-wrap">${escapeHtml(fields.message || "—")}</p>
<p style="margin:24px 0 0;font-size:12px;color:#5b6675">${escapeHtml(signoff)}</p>
</div>`;

  const subject = `Upit sa sajta: ${fields.name}${fields.company ? `, ${fields.company}` : ""}`;

  try {
    await sendEmail({
      from: sender,
      // `CONTACT_TO` lets preview deployments send somewhere other than the
      // office; production uses the published address.
      to: process.env.CONTACT_TO || contact.email,
      replyTo: fields.email,
      subject: subject.slice(0, 200),
      text,
      html,
    });
    return { status: "sent" };
  } catch (error) {
    console.error("Quote email was not sent:", error);
    return { status: "error" };
  }
}
