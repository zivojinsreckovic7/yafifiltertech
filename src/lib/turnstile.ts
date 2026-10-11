import "server-only";

/**
 * Asks Cloudflare whether a Turnstile token is genuine. A token passes once
 * and expires after five minutes. The secret is read here and nowhere else.
 * Throws when Cloudflare can't be asked, so the caller can tell "no answer"
 * apart from "not a person".
 */
export async function verifyTurnstile(token: string, ip: string | null) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) throw new Error("TURNSTILE_SECRET_KEY is not set");

  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    { method: "POST", body, signal: AbortSignal.timeout(10_000) },
  );
  if (!response.ok) {
    throw new Error(`Turnstile answered ${response.status}: ${await response.text()}`);
  }

  const result = (await response.json()) as { success?: boolean };
  return result.success === true;
}
