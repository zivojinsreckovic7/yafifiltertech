import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "../globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import RevealManager from "@/components/RevealManager";
import LoadingScreen from "@/components/LoadingScreen";
import { alternatesFor, getDictionary } from "@/i18n/dictionaries";
import { localePath, locales, localeTags, resolveLocale } from "@/i18n/config";
import { contact } from "@/data/contact";
import { getProducts } from "@/data/products";
import { productPath } from "@/data/nav";

// Variable fonts: one self-hosted woff2 per subset covers the whole weight
// range, so headings cost one preloaded file instead of one per weight.
// No `fallback` array on purpose — passing one replaces Next's generated
// `<family> Fallback` face (Arial with ascent/descent/size-adjust overrides),
// which is what keeps `display: "swap"` from shifting layout on swap-in.
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

/**
 * Base for canonical, hreflang and social image URLs. Vercel exposes the
 * project's production hostname — the `*.vercel.app` one until a custom
 * domain is attached, then the shortest custom domain — so share previews of
 * the deployment link resolve against the host that actually serves the
 * site, and flip to `yafi.co.rs` on their own once the domain moves over.
 */
const siteUrl = new URL(
  process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://yafi.co.rs"
);

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const locale = resolveLocale((await params).lang);
  const dict = getDictionary(locale);

  return {
    metadataBase: siteUrl,
    title: {
      default: dict.meta.siteTitle,
      template: dict.meta.titleTemplate,
    },
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    alternates: alternatesFor(locale, "/"),
    openGraph: {
      title: dict.meta.siteTitle,
      description: dict.meta.ogDescription,
      url: localePath(locale, "/"),
      siteName: "Yafi Filtertech",
      locale: dict.meta.ogLocale,
      alternateLocale: locales
        .filter((candidate) => candidate !== locale)
        .map((candidate) => getDictionary(candidate).meta.ogLocale),
      type: "website",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const locale = resolveLocale((await params).lang);
  const dict = getDictionary(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Yafi Filtertech",
    description: dict.meta.jsonLdDescription,
    url: "https://yafi.co.rs",
    email: contact.email,
    telephone: contact.phones.map((phone) => phone.tel),
    areaServed: dict.meta.areaServed,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.street,
      postalCode: contact.postalCode,
      addressLocality: contact.city,
      addressCountry: "RS",
    },
  };

  return (
    <html
      lang={localeTags[locale]}
      className={`${spaceGrotesk.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-navy-950 font-sans text-ink-100 antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){document.documentElement.setAttribute("data-reveal-ready","");document.documentElement.setAttribute("data-loader-ready","");try{var t=localStorage.getItem("yafi-theme");if(t==="light"||(t!=="dark"&&window.matchMedia("(prefers-color-scheme: light)").matches))document.documentElement.setAttribute("data-theme","light")}catch(e){}})()`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LoadingScreen aria={dict.loader.aria} label={dict.loader.label} />
        <div className="grain" />
        <ScrollProgress />
        <RevealManager />
        <Nav
          locale={locale}
          nav={dict.nav}
          theme={dict.theme}
          products={getProducts(locale).map((product) => ({
            href: localePath(locale, productPath(product.slug)),
            label: product.name,
          }))}
        />
        <main>{children}</main>
        <Footer locale={locale} dict={dict} />
      </body>
    </html>
  );
}
