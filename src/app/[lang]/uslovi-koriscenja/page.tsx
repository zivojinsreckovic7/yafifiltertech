import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { getLegalDocument } from "@/data/legal";
import { routes } from "@/data/nav";
import { resolveLocale } from "@/i18n/config";
import { alternatesFor, getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const locale = resolveLocale((await params).lang);
  const { meta } = getDictionary(locale);
  return {
    title: meta.terms.title,
    description: meta.terms.description,
    alternates: alternatesFor(locale, routes.terms),
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const locale = resolveLocale((await params).lang);
  const dict = getDictionary(locale);

  return (
    <LegalPage
      locale={locale}
      title={dict.meta.terms.title}
      labels={dict.legalPage}
      document={getLegalDocument(locale, "terms")}
    />
  );
}
