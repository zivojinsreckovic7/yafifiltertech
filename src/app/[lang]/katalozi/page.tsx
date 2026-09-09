import { redirect } from "next/navigation";
import { routes } from "@/data/nav";
import { localePath, resolveLocale } from "@/i18n/config";

/**
 * Placeholder: the Katalozi nav item has its own URL already, but the page
 * itself is still to be built, so for now it lands on the product catalogue.
 */
export default async function KataloziPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const locale = resolveLocale((await params).lang);
  redirect(localePath(locale, routes.products));
}
