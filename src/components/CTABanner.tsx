import Reveal from "@/components/Reveal";
import TrustSignals from "@/components/TrustSignals";
import { MagneticLink } from "@/components/Magnetic";
import { routes } from "@/data/nav";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

/**
 * Closing call-to-action card so every route ends with one clear next step.
 */
export default function CTABanner({
  locale,
  dict,
  title,
  text,
  action,
}: {
  locale: Locale;
  dict: Dictionary;
  title: string;
  text: string;
  action?: string;
}) {
  return (
    <Reveal className="flex flex-col items-start gap-8 rounded-3xl border border-orange-500/25 bg-gradient-to-br from-navy-900 to-navy-950 p-10 sm:flex-row sm:items-center sm:justify-between md:p-14">
      <div className="max-w-lg">
        <h2 className="font-display text-2xl font-bold text-ink-100 md:text-3xl">
          {title}
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-ink-300">{text}</p>
        <TrustSignals dict={dict} className="mt-6" />
      </div>
      <MagneticLink
        href={localePath(locale, routes.contact)}
        className="btn-primary shrink-0"
      >
        {action ?? dict.ctaBanner.action}
      </MagneticLink>
    </Reveal>
  );
}
