import type { Locale } from "@/i18n/config";

/**
 * The company's contact details — one source for the footer, the contact page,
 * the CTA blocks and the structured data, so a change lands in a single place.
 */
export const contact = {
  street: "Peščarska 10",
  postalCode: "11070",
  city: "Novi Beograd",
  email: "office@yafifilteri.co.rs",
  /** `label` is how the number is printed; `tel` is the dialable form. */
  phones: [
    { label: "+381 11 2144 940", tel: "+381112144940" },
    { label: "+381 11 2147 600", tel: "+381112147600" },
  ],
} as const;

const country: Record<Locale, string> = { sr: "Srbija", en: "Serbia" };

/** The full postal address on one line. */
export function addressLine(locale: Locale) {
  return `${contact.street}, ${contact.postalCode} ${contact.city}, ${country[locale]}`;
}
