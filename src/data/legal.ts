import { routes } from "./nav";
import { company, contact } from "./contact";
import { localePath, type Locale } from "@/i18n/config";

/**
 * A paragraph, or a bulleted list when it is an array. Links are written
 * `[text](href)`, where `href` is a site path, a full URL, `mailto:` or
 * `tel:`.
 */
export type LegalBlock = string | string[];

export type LegalSection = {
  /** Anchor for the table of contents. */
  id: string;
  heading: string;
  blocks: LegalBlock[];
};

export type LegalDocument = {
  /** ISO date of the last change, shown under the heading. */
  updated: string;
  lead: string;
  /** Shown under the lead, e.g. which language version prevails. */
  note?: string;
  sections: LegalSection[];
};

export type LegalKind = "privacy" | "terms";

const updated = "2026-10-12";

const email = `[${contact.email}](mailto:${contact.email})`;
const phone = `[${contact.phones[0].label}](tel:${contact.phones[0].tel})`;
const address = `${contact.street}, ${contact.postalCode} ${contact.city}`;
const poverenik =
  "Bulevar kralja Aleksandra 15, 11120 Beograd, [www.poverenik.rs](https://www.poverenik.rs)";
const turnstilePolicy = "https://www.cloudflare.com/turnstile-privacy-policy/";
const osmPolicy = "https://osmfoundation.org/wiki/Privacy_Policy";

const translationNote =
  "This is a translation of the Serbian original. If the two versions differ, the Serbian version prevails.";

const documents: Record<Locale, Record<LegalKind, LegalDocument>> = {
  sr: {
    privacy: {
      updated,
      lead: "Ova politika objašnjava koje podatke o ličnosti prikupljamo preko sajta www.yafi.co.rs, zašto ih prikupljamo, koliko dugo ih čuvamo i koja prava imate. Pisana je u skladu sa Zakonom o zaštiti podataka o ličnosti („Službeni glasnik RS“, br. 87/2018).",
      sections: [
        {
          id: "rukovalac",
          heading: "Ko obrađuje vaše podatke",
          blocks: [
            "Rukovalac podacima o ličnosti je:",
            [
              `${company.name}, ${address}, Srbija`,
              `Matični broj: ${company.registrationNumber} · PIB: ${company.taxId}`,
              `Email: ${email} · Telefon: ${phone}`,
            ],
            `Za sva pitanja o vašim podacima i za ostvarivanje prava iz ove politike pišite nam na ${email}.`,
          ],
        },
        {
          id: "podaci",
          heading: "Koje podatke prikupljamo",
          blocks: [
            [
              "Upit preko forme na sajtu: ime i prezime i email adresu (obavezno), kao i naziv kompanije, broj telefona, tip filtera i poruku, ako ih unesete. Uz upit beležimo i na kom jeziku ste koristili sajt.",
              "Kada nam pišete ili nas pozovete direktno: podatke koje sami navedete u poruci ili razgovoru.",
              "Tehničke podatke pri poseti sajtu: IP adresu, tip pregledača i uređaja, vreme pristupa i adresu stranice koju ste otvorili. Njih automatski beleži server na kom je sajt smešten.",
              "Proveru protiv botova: na stranicama sa formom servis Cloudflare Turnstile obrađuje IP adresu i tehničke podatke o pregledaču i vezi, da bi proverio da formu šalje osoba, a ne automatizovani program.",
            ],
            "Ne koristimo alate za analitiku posećenosti ni oglašavanje, ne pratimo vas na drugim sajtovima, ne pravimo profile i ne donosimo automatizovane odluke koje se na vas odnose.",
          ],
        },
        {
          id: "svrhe",
          heading: "Zašto koristimo podatke i na kom osnovu",
          blocks: [
            [
              "Da odgovorimo na vaš upit i pripremimo ponudu. Osnov je preduzimanje radnji na vaš zahtev pre zaključenja ugovora, a kada pišete u ime kompanije, naš legitimni interes da odgovorimo na poslovni upit (član 12, stav 1, tačke 2 i 6 Zakona).",
              "Da zaštitimo sajt i formu od neželjenih poruka i zloupotrebe i obezbedimo rad sajta. Osnov je naš legitimni interes (član 12, stav 1, tačka 6).",
              "Da ispunimo zakonske obaveze, na primer u oblasti računovodstva i poreza, ako upit preraste u poslovnu saradnju (član 12, stav 1, tačka 3).",
            ],
            "Podatke iz upita ne koristimo za slanje reklamnih poruka ni biltena.",
          ],
        },
        {
          id: "obavezni-podaci",
          heading: "Da li morate da nam date podatke",
          blocks: [
            "Ne postoji zakonska ni ugovorna obaveza da nam pošaljete upit. Ime i email adresa su nam potrebni da bismo vam odgovorili, pa bez njih forma ne može da se pošalje. Ostala polja su neobavezna.",
          ],
        },
        {
          id: "primaoci",
          heading: "Ko još ima pristup podacima",
          blocks: [
            "Podatke ne prodajemo, ne iznajmljujemo i ne ustupamo drugima za njihov marketing. Upite ne prosleđujemo proizvođačima ni drugim dobavljačima.",
            "Podatke obrađuju samo naši zaposleni koji odgovaraju na upite i pružaoci usluga koji nam omogućavaju rad sajta i komunikaciju, isključivo po našim uputstvima:",
            [
              "Vercel Inc. (SAD): smeštaj sajta (hosting) i serverski zapisi.",
              `Cloudflare, Inc. (SAD): provera protiv botova (Turnstile). Deo tehničkih podataka Cloudflare koristi i da unapredi svoju zaštitu od botova, kao samostalni rukovalac; više u [Cloudflare politici privatnosti za Turnstile](${turnstilePolicy}).`,
              "Resend (SAD): dostava upita sa sajta na našu email adresu.",
              "Pružalac usluge na kom je smeštena naša elektronska pošta.",
            ],
            `Mapa sa lokacijom naše kancelarije učitava se sa servera fondacije OpenStreetMap (Velika Britanija). Kada se mapa prikaže, vaš pregledač toj fondaciji šalje IP adresu i tehničke podatke, u skladu sa [njenom politikom privatnosti](${osmPolicy}).`,
            "Podatke možemo dostaviti državnim organima kada nas na to obavezuje zakon.",
          ],
        },
        {
          id: "prenos",
          heading: "Prenos podataka van Srbije",
          blocks: [
            "Vercel, Cloudflare i Resend su kompanije iz SAD, pa se podaci mogu obrađivati i van Srbije. Ovi pružaoci usluga su ugovorima o obradi podataka obavezani da podatke koriste samo za pružanje usluge nama i da ih štite odgovarajućim tehničkim i organizacionim merama, uključujući standardne ugovorne klauzule za prenos podataka.",
          ],
        },
        {
          id: "cuvanje",
          heading: "Koliko dugo čuvamo podatke",
          blocks: [
            [
              "Upite na koje ne usledi saradnja čuvamo najduže dve godine od poslednje komunikacije, a zatim ih brišemo.",
              "Ako upit preraste u saradnju, podatke čuvamo dok saradnja traje i onoliko dugo koliko nalažu propisi, na primer o računovodstvu.",
              "Serverske zapise i podatke za proveru protiv botova pružaoci usluga čuvaju kratko, u skladu sa svojim pravilima.",
            ],
          ],
        },
        {
          id: "kolacici",
          heading: "Kolačići i lokalno skladištenje",
          blocks: [
            "Sajt ne koristi kolačiće za analitiku, oglašavanje ili praćenje, pa vas zato i ne pitamo za saglasnost.",
            "U vašem pregledaču pamtimo samo da li ste izabrali svetlu ili tamnu temu sajta (lokalno skladište, ključ „yafi-theme“). Taj podatak ostaje na vašem uređaju i ne šalje se nama.",
            "Cloudflare Turnstile i mapa OpenStreetMap učitavaju se sa servera tih pružalaca i u vašem pregledaču mogu da koriste tehnički neophodne podatke, prema svojim pravilima.",
          ],
        },
        {
          id: "prava",
          heading: "Vaša prava",
          blocks: [
            "U vezi sa podacima koje o vama obrađujemo imate pravo na:",
            [
              "pristup podacima i njihovu kopiju (član 26);",
              "ispravku i dopunu netačnih ili nepotpunih podataka (član 29);",
              "brisanje podataka (član 30);",
              "ograničenje obrade (član 31);",
              "prenosivost podataka (član 36);",
              "prigovor na obradu zasnovanu na legitimnom interesu (član 37).",
            ],
            `Zahtev pošaljite na ${email}. Odgovorićemo bez odlaganja, a najkasnije u roku od 30 dana. Ako je potrebno, zatražićemo dodatne informacije da bismo potvrdili vaš identitet.`,
            `Ako smatrate da obrada vaših podataka nije u skladu sa Zakonom, imate pravo da podnesete pritužbu Povereniku za informacije od javnog značaja i zaštitu podataka o ličnosti, ${poverenik} (član 82), kao i pravo na sudsku zaštitu (član 84).`,
          ],
        },
        {
          id: "bezbednost",
          heading: "Bezbednost podataka",
          blocks: [
            "Sajt koristi šifrovanu vezu (HTTPS). Upitima pristupaju samo zaposleni kojima su potrebni za posao, a pružaoci usluga su ugovorno obavezani da podatke štite. Nijedan sistem nije potpuno bezbedan, ali preduzimamo razumne mere da podatke zaštitimo od neovlašćenog pristupa, gubitka i zloupotrebe.",
          ],
        },
        {
          id: "izmene",
          heading: "Izmene politike",
          blocks: [
            "Politiku menjamo kada se promeni način na koji obrađujemo podatke ili propisi. Važeća verzija je uvek na ovoj stranici, sa datumom poslednje izmene na vrhu.",
          ],
        },
      ],
    },

    terms: {
      updated,
      lead: "Ovi uslovi uređuju korišćenje sajta www.yafi.co.rs. Korišćenjem sajta prihvatate ove uslove; ako se sa njima ne slažete, molimo vas da sajt ne koristite.",
      sections: [
        {
          id: "o-nama",
          heading: "Ko stoji iza sajta",
          blocks: [
            `Sajt vodi ${company.name}, ${address}, Srbija, upisano u Registar privrednih subjekata Agencije za privredne registre, matični broj ${company.registrationNumber}, PIB ${company.taxId}. Kontakt: ${email}, ${phone}.`,
          ],
        },
        {
          id: "namena",
          heading: "Namena sajta",
          blocks: [
            "Sajt predstavlja našu kompaniju, program filtera i usluge, pre svega poslovnim korisnicima: projektantima, izvođačima, službama održavanja i industriji. Preko sajta se ništa ne prodaje i ne naplaćuje.",
          ],
        },
        {
          id: "informacije",
          heading: "Informacije o proizvodima i ponude",
          blocks: [
            "Opisi, tehnički podaci, klase filtracije, slike i katalozi na sajtu služe za informisanje. Trudimo se da budu tačni i ažurni, ali proizvođači menjaju proizvode i dokumentaciju, pa se pojedini podaci mogu razlikovati od stanja u trenutku vašeg upita. Slike mogu biti ilustrativne.",
            "Sadržaj sajta, uključujući kataloge, nije ponuda već poziv da se učini ponuda. Obavezuje samo pisana ponuda koju vam pošaljemo ili ugovor koji zaključimo, i tek u njima potvrđujemo specifikacije, cene, rokove i dostupnost.",
          ],
        },
        {
          id: "katalozi",
          heading: "Katalozi i dokumentacija",
          blocks: [
            "Kataloge i tehničku dokumentaciju sa sajta možete preuzeti, odštampati i proslediti unutar svoje organizacije ili partnerima na projektu, radi izbora i nabavke filtera. Nije dozvoljeno menjati ih, predstavljati kao svoje ili ih komercijalno distribuirati bez naše pisane saglasnosti. Deltrian katalog je vlasništvo kompanije Deltrian.",
          ],
        },
        {
          id: "autorska-prava",
          heading: "Autorska prava i žigovi",
          blocks: [
            `Tekstovi, fotografije, grafika, logotip YAFI i izgled sajta zaštićeni su autorskim pravom i drugim pravima intelektualne svojine i pripadaju kompaniji ${company.name} ili njenim partnerima. Naziv i logotip Deltrian su žigovi kompanije Deltrian, koje koristimo kao njen regionalni distributer. Ostali nazivi proizvoda i kompanija pripadaju svojim vlasnicima.`,
            "Sadržaj sajta možete pregledati i citirati uz navođenje izvora. Za svako drugo korišćenje potrebna je naša pisana saglasnost.",
          ],
        },
        {
          id: "upiti",
          heading: "Upiti i komunikacija",
          blocks: [
            "Kada nam pišete preko forme ili emailom, navedite tačne podatke i ne šaljite sadržaj koji je nezakonit, uvredljiv, reklamni ili zlonameran; na takve poruke ne odgovaramo. Upit nas ne obavezuje na ponudu ni saradnju.",
            `Podatke iz upita obrađujemo u skladu sa [Politikom privatnosti](${localePath("sr", routes.privacy)}).`,
          ],
        },
        {
          id: "zabranjeno",
          heading: "Zabranjeno korišćenje",
          blocks: [
            "Nije dozvoljeno:",
            [
              "ometati rad sajta ili servera, ili mu pristupati na način koji ga preopterećuje;",
              "zaobilaziti zaštitu sajta, uključujući proveru protiv botova, ili pokušavati neovlašćen pristup;",
              "automatski slati upite ili masovno preuzimati sadržaj sajta;",
              "postavljati ili slati zlonamerni softver.",
            ],
          ],
        },
        {
          id: "linkovi",
          heading: "Linkovi ka drugim sajtovima",
          blocks: [
            "Sajt sadrži linkove i ugrađen sadržaj sa drugih sajtova, kao što su mapa OpenStreetMap i stranice proizvođača. Za njihov sadržaj i pravila o privatnosti ne odgovaramo.",
          ],
        },
        {
          id: "odgovornost",
          heading: "Ograničenje odgovornosti",
          blocks: [
            "Sajt i njegov sadržaj pružamo „kakvi jesu“. U meri u kojoj to zakon dozvoljava, ne odgovaramo za štetu nastalu korišćenjem sajta ili oslanjanjem na informacije sa njega, niti za privremenu nedostupnost sajta. Ovo ograničenje ne važi za štetu prouzrokovanu namerno ili krajnjom nepažnjom.",
          ],
        },
        {
          id: "izmene",
          heading: "Izmene sajta i uslova",
          blocks: [
            "Sajt i ove uslove možemo menjati bez prethodne najave. Važeća verzija uslova je uvek na ovoj stranici, sa datumom poslednje izmene na vrhu.",
          ],
        },
        {
          id: "merodavno-pravo",
          heading: "Merodavno pravo",
          blocks: ["Na ove uslove primenjuje se pravo Republike Srbije."],
        },
      ],
    },
  },

  en: {
    privacy: {
      updated,
      lead: "This policy explains what personal data we collect through www.yafi.co.rs, why we collect it, how long we keep it and what rights you have. It follows the Serbian Personal Data Protection Act (Official Gazette of the Republic of Serbia No. 87/2018).",
      note: translationNote,
      sections: [
        {
          id: "controller",
          heading: "Who processes your data",
          blocks: [
            "The controller of your personal data is:",
            [
              `${company.name}, ${address}, Serbia`,
              `Company registration number: ${company.registrationNumber} · Tax ID (PIB): ${company.taxId}`,
              `Email: ${email} · Phone: ${phone}`,
            ],
            `For any question about your data, or to exercise the rights described here, write to us at ${email}.`,
          ],
        },
        {
          id: "data",
          heading: "What data we collect",
          blocks: [
            [
              "Enquiries sent through the form on this site: your name and email address (required), plus your company name, phone number, filter type and message if you enter them. We also record which language you used the site in.",
              "When you email or call us directly: whatever you choose to tell us in the message or call.",
              "Technical data when you visit: your IP address, browser and device type, the time of the visit and the address of the page you opened. The server hosting the site records these automatically.",
              "Bot check: on pages with the form, Cloudflare Turnstile processes your IP address and technical details of your browser and connection to confirm that the form is being sent by a person, not an automated program.",
            ],
            "We use no visitor analytics or advertising tools, do not track you across other sites, build no profiles and make no automated decisions about you.",
          ],
        },
        {
          id: "purposes",
          heading: "Why we use your data and on what basis",
          blocks: [
            [
              "To answer your enquiry and prepare a quote. The basis is taking steps at your request before entering into a contract and, when you write on behalf of a company, our legitimate interest in answering a business enquiry (Article 12(1), points 2 and 6 of the Act).",
              "To protect the site and the form from spam and abuse, and to keep the site running. The basis is our legitimate interest (Article 12(1), point 6).",
              "To meet legal obligations, such as accounting and tax rules, if an enquiry turns into business (Article 12(1), point 3).",
            ],
            "We never use enquiry details to send advertising or newsletters.",
          ],
        },
        {
          id: "required",
          heading: "Do you have to give us your data",
          blocks: [
            "There is no legal or contractual obligation to send us an enquiry. We need your name and email address to reply, so the form cannot be sent without them. All other fields are optional.",
          ],
        },
        {
          id: "recipients",
          heading: "Who else has access to your data",
          blocks: [
            "We do not sell or rent your data or pass it on to others for their marketing. We do not forward enquiries to manufacturers or other suppliers.",
            "Your data is handled only by our staff who answer enquiries and by the service providers that run the site and our communication, strictly on our instructions:",
            [
              "Vercel Inc. (USA): website hosting and server logs.",
              `Cloudflare, Inc. (USA): the bot check (Turnstile). Cloudflare also uses part of the technical data to improve its bot protection, as an independent controller; see [Cloudflare's Turnstile privacy policy](${turnstilePolicy}).`,
              "Resend (USA): delivers enquiries from the site to our email address.",
              "The provider that hosts our email.",
            ],
            `The map showing our office is loaded from the servers of the OpenStreetMap Foundation (United Kingdom). When the map appears, your browser sends the foundation your IP address and technical details, under [its privacy policy](${osmPolicy}).`,
            "We may disclose data to public authorities when the law requires us to.",
          ],
        },
        {
          id: "transfers",
          heading: "Transfers outside Serbia",
          blocks: [
            "Vercel, Cloudflare and Resend are US companies, so your data may be processed outside Serbia. Data processing agreements require these providers to use the data only to provide their service to us and to protect it with appropriate technical and organisational measures, including standard contractual clauses for data transfers.",
          ],
        },
        {
          id: "retention",
          heading: "How long we keep your data",
          blocks: [
            [
              "Enquiries that do not lead to business are kept for at most two years after our last contact, then deleted.",
              "If an enquiry turns into business, we keep the data for as long as we work together and for as long as the law requires, for example under accounting rules.",
              "Server logs and bot-check data are kept briefly by the service providers, under their own rules.",
            ],
          ],
        },
        {
          id: "cookies",
          heading: "Cookies and local storage",
          blocks: [
            "This site uses no cookies for analytics, advertising or tracking, which is why we don't ask for your consent.",
            "Your browser only remembers whether you chose the light or dark theme (local storage, key “yafi-theme”). It stays on your device and is never sent to us.",
            "Cloudflare Turnstile and the OpenStreetMap map are loaded from those providers' servers and may use strictly necessary data in your browser, under their own rules.",
          ],
        },
        {
          id: "rights",
          heading: "Your rights",
          blocks: [
            "With regard to the data we hold about you, you have the right to:",
            [
              "access your data and get a copy (Article 26);",
              "have inaccurate or incomplete data corrected or completed (Article 29);",
              "have your data erased (Article 30);",
              "restrict processing (Article 31);",
              "data portability (Article 36);",
              "object to processing based on legitimate interest (Article 37).",
            ],
            `Send your request to ${email}. We will reply without undue delay and within 30 days at the latest. If needed, we will ask for additional information to confirm your identity.`,
            `If you believe your data is processed in breach of the Act, you have the right to lodge a complaint with the Commissioner for Information of Public Importance and Personal Data Protection, ${poverenik} (Article 82), and the right to judicial protection (Article 84).`,
          ],
        },
        {
          id: "security",
          heading: "Data security",
          blocks: [
            "The site uses an encrypted connection (HTTPS). Only staff who need enquiries for their work can access them, and our service providers are contractually bound to protect the data. No system is completely secure, but we take reasonable measures to protect data against unauthorised access, loss and misuse.",
          ],
        },
        {
          id: "changes",
          heading: "Changes to this policy",
          blocks: [
            "We update this policy when the way we process data or the law changes. The current version is always on this page, with the date of the last change at the top.",
          ],
        },
      ],
    },

    terms: {
      updated,
      lead: "These terms govern the use of www.yafi.co.rs. By using the site you accept them; if you do not agree, please do not use the site.",
      note: translationNote,
      sections: [
        {
          id: "about",
          heading: "Who runs this site",
          blocks: [
            `The site is run by ${company.name}, ${address}, Serbia, entered in the Business Register of the Serbian Business Registers Agency (APR), company registration number ${company.registrationNumber}, tax ID (PIB) ${company.taxId}. Contact: ${email}, ${phone}.`,
          ],
        },
        {
          id: "purpose",
          heading: "Purpose of the site",
          blocks: [
            "The site presents our company, filter range and services, mainly to business users: designers, contractors, facility maintenance and industry. Nothing is sold or charged for through the site.",
          ],
        },
        {
          id: "information",
          heading: "Product information and offers",
          blocks: [
            "Descriptions, technical data, filtration classes, images and catalogues on the site are for information. We work to keep them accurate and current, but manufacturers change their products and documentation, so some details may differ by the time you enquire. Images may be illustrative.",
            "The content of the site, catalogues included, is not an offer but an invitation to make one. Only a written offer we send you or a contract we sign is binding, and specifications, prices, lead times and availability are confirmed only there.",
          ],
        },
        {
          id: "catalogues",
          heading: "Catalogues and documentation",
          blocks: [
            "You may download and print the catalogues and technical documentation on this site, and share them within your organisation or with partners on a project, to select and procure filters. You may not alter them, present them as your own or distribute them commercially without our written consent. The Deltrian catalogue is the property of Deltrian.",
          ],
        },
        {
          id: "copyright",
          heading: "Copyright and trademarks",
          blocks: [
            `The texts, photographs, graphics, the YAFI logo and the design of this site are protected by copyright and other intellectual property rights and belong to ${company.name} or its partners. The Deltrian name and logo are trademarks of Deltrian, used by us as its regional distributor. Other product and company names belong to their owners.`,
            "You may view the content of the site and quote it with attribution. Any other use requires our written consent.",
          ],
        },
        {
          id: "enquiries",
          heading: "Enquiries and communication",
          blocks: [
            "When you contact us through the form or by email, give accurate details and do not send content that is unlawful, offensive, promotional or malicious; we do not answer such messages. An enquiry does not oblige us to make an offer or to work with you.",
            `We process enquiry details under our [Privacy Policy](${localePath("en", routes.privacy)}).`,
          ],
        },
        {
          id: "prohibited",
          heading: "Prohibited use",
          blocks: [
            "You may not:",
            [
              "disrupt the site or its servers, or access it in a way that overloads it;",
              "bypass the site's protections, including the bot check, or attempt unauthorised access;",
              "send enquiries automatically or download the site's content in bulk;",
              "upload or send malicious software.",
            ],
          ],
        },
        {
          id: "links",
          heading: "Links to other sites",
          blocks: [
            "The site contains links to, and embedded content from, other sites, such as the OpenStreetMap map and manufacturers' pages. We are not responsible for their content or privacy practices.",
          ],
        },
        {
          id: "liability",
          heading: "Limitation of liability",
          blocks: [
            "The site and its content are provided “as is”. To the extent permitted by law, we are not liable for damage arising from use of the site or reliance on its information, or for the site being temporarily unavailable. This limitation does not apply to damage caused intentionally or through gross negligence.",
          ],
        },
        {
          id: "changes",
          heading: "Changes to the site and these terms",
          blocks: [
            "We may change the site and these terms without prior notice. The current version of the terms is always on this page, with the date of the last change at the top.",
          ],
        },
        {
          id: "law",
          heading: "Governing law",
          blocks: ["These terms are governed by the law of the Republic of Serbia."],
        },
      ],
    },
  },
};

export function getLegalDocument(locale: Locale, kind: LegalKind): LegalDocument {
  return documents[locale][kind];
}
