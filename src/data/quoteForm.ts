/**
 * Longest value each quote-form field accepts. The form uses these as
 * `maxLength`, and the server action rejects anything longer, so the two can
 * never drift apart.
 */
export const quoteLimits = {
  name: 100,
  company: 150,
  email: 254,
  phone: 40,
  message: 5000,
} as const;

export type QuoteField = keyof typeof quoteLimits;
