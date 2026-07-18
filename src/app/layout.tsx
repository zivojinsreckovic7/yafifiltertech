import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import RevealManager from "@/components/RevealManager";
import LoadingScreen from "@/components/LoadingScreen";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yafi.co.rs"),
  title: {
    default: "Yafi Filtertech | Industrijska filtracija vazduha",
    template: "%s | Yafi Filtertech",
  },
  description:
    "Yafi Filtertech projektuje i isporučuje industrijske sisteme filtracije vazduha za Ex-Yu tržište — HEPA, kasetni i džepasti filteri, usklađeni sa ISO 16890. Regionalni distributer Deltrian programa.",
  keywords: [
    "industrijski filteri",
    "hepa filteri",
    "kasetni filteri za ventilaciju",
    "dzepasti filteri",
    "filtracija vazduha",
    "Deltrian",
    "ISO 16890",
  ],
  openGraph: {
    title: "Yafi Filtertech | Industrijska filtracija vazduha",
    description:
      "Regionalni distributer Deltrian programa filtera za Ex-Yu tržište. Rešenja za farmaciju, hotelijerstvo, auto-industriju i aerodrome.",
    url: "https://yafi.co.rs",
    siteName: "Yafi Filtertech",
    locale: "sr_RS",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Yafi Filtertech",
  description:
    "Industrijska filtracija vazduha i regionalni distributer Deltrian programa filtera za Ex-Yu tržište.",
  url: "https://yafi.co.rs",
  email: "info@yafi.co.rs",
  areaServed: [
    "Srbija",
    "Bosna i Hercegovina",
    "Hrvatska",
    "Crna Gora",
    "Severna Makedonija",
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "RS",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sr"
      className={`${poppins.variable} ${inter.variable}`}
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
        <LoadingScreen />
        <div className="grain" />
        <ScrollProgress />
        <RevealManager />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
