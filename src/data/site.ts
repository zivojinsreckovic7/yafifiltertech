/**
 * The site's public address — the base for canonical, hreflang, `og:url`,
 * social image and sitemap URLs. Fixed rather than read from the deployment,
 * so preview and `*.vercel.app` builds still advertise the real domain and
 * search engines only ever index this host.
 */
export const siteUrl = new URL("https://www.yafi.co.rs");

/** Absolute URL for a path on the public site. */
export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).href;
}
