import type { NextConfig } from "next";
import { legacyRedirects } from "./src/data/legacyRedirects";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async redirects() {
    return legacyRedirects;
  },
  async rewrites() {
    // Browsers and crawlers still ask for `/favicon.ico` by name; serve the
    // generated app icon there instead of a 404.
    return [{ source: "/favicon.ico", destination: "/icon" }];
  },
};

export default nextConfig;
