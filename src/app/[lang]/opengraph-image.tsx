import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getDictionary } from "@/i18n/dictionaries";
import { locales, resolveLocale } from "@/i18n/config";

/**
 * Social share card (WhatsApp, Viber, iMessage, LinkedIn, Facebook…): the
 * wordmark and one line of copy on navy.
 *
 * Lives in `[lang]` rather than at the app root for two reasons: the tagline
 * follows the page's language, and metadata merges per field, so the
 * layout's `openGraph` config would otherwise replace a root-level image.
 * Sharing a segment with the layout means the file is merged after that
 * config and picks up its `metadataBase`. `src/proxy.ts` knows to leave
 * `/sr/opengraph-image` alone.
 *
 * Satori (the renderer behind `next/og`) reads PNG/JPEG but not WebP, and
 * only TTF/OTF/WOFF for fonts, so the wordmark and Space Grotesk are kept as
 * build-time assets under `src/assets/og/`.
 */

export const alt = "Yafi Filtertech";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

// The wordmark asset is 1200×275 (~4.36:1).
const WORDMARK_WIDTH = 600;
const WORDMARK_HEIGHT = Math.round(WORDMARK_WIDTH / (1200 / 275));

export default async function Image({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const locale = resolveLocale((await params).lang);
  const { meta } = getDictionary(locale);

  const assets = join(process.cwd(), "src/assets/og");
  const [wordmark, spaceGrotesk] = await Promise.all([
    readFile(join(assets, "yafi-wordmark.png"), "base64"),
    readFile(join(assets, "SpaceGrotesk-Medium.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at 50% 42%, #0a2c56 0%, #001e42 55%, #001229 100%)",
        }}
      >
        <img
          src={`data:image/png;base64,${wordmark}`}
          width={WORDMARK_WIDTH}
          height={WORDMARK_HEIGHT}
          alt=""
        />
        <div
          style={{
            marginTop: 44,
            fontFamily: "Space Grotesk",
            fontSize: 40,
            letterSpacing: 0.5,
            color: "#dde5ef",
          }}
        >
          {meta.ogImageTagline}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Space Grotesk",
          data: spaceGrotesk,
          style: "normal",
          weight: 500,
        },
      ],
    }
  );
}
