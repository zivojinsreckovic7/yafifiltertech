/**
 * Addresses from the sites this one replaced, sent to their closest page here
 * so search results, backlinks and bookmarks keep working. Loaded by
 * `next.config.ts`, so this file uses no `@/` imports.
 *
 * Two earlier sites lived on yafi.co.rs:
 * - a WordPress/WooCommerce shop (2022 – 2026): `/product/<slug>/`,
 *   `/product-category/<slug>/` and PDFs under `/wp-content/uploads/`;
 * - before it, a PHP site: `/<page>.php` in Serbian, `/en/` and `/ru/`, with
 *   PDFs under `/files/`.
 *
 * Products were matched on SKU and name, not slug — several old slugs name a
 * different variant than they suggest (`-2` and `-copy` duplicates).
 * Trailing slashes need no entries: Next strips them before these run.
 */

type Redirect = { source: string; destination: string; permanent: true };

/** Old WooCommerce product slug → `<category>/<variant>` under `/proizvodi`. */
const wooProducts: Record<string, string> = {
  // Filter media
  "filteri-impregnirani-aktivnim-ugljem": "filter-materijali/aktivni-ugalj-medija",
  "filteri-od-sintetickih-vlakana": "filter-materijali/sinteticka-vlakna-m5",
  "filteri-od-sintetickih-vlakana-2": "filter-materijali/sinteticka-vlakna",
  "filteri-od-staklenih-vlakana-yafi-fm": "filter-materijali/staklena-vlakna",
  "filteri-za-lakirnice": "filter-materijali/medija-za-lakirnice",
  "periva-pena-za-filtriranje": "filter-materijali/periva-pena",
  // Panel filters
  "filteri-za-visoke-temperature": "panelni-filteri/filteri-visoke-temperature",
  "predfilter-metalnog-okvira-i-ravne-povrsine": "panelni-filteri/predfilter-metalni-okvir-ravni",
  "predfilter-sa-zicanim-okvirom": "panelni-filteri/zicani-perivi-predfilter",
  "predfilter-sa-zicanim-okvirom-2": "panelni-filteri/predfilter-zicani-okvir",
  "ravni-i-perivi-predfilter-sa-metalnim-okvirom": "panelni-filteri/ravni-perivi-predfilter-metalni-okvir",
  // Cassette filters
  "kartonski-filter-sa-materijalom-bez-zice": "kasetni-filteri/kartonski-filter-bez-zice",
  "kartonski-filter-za-jednokratnu-upotrebu": "kasetni-filteri/kartonski-filter-jednokratni",
  "perivi-predfilter-sa-metalnim-okvirom": "kasetni-filteri/perivi-predfilter-metalni-okvir",
  "predfilter-sa-kartonskim-okvirom": "kasetni-filteri/predfilter-kartonski-okvir",
  "predfilter-sa-metalnim-okvirom": "kasetni-filteri/predfilter-metalni-okvir",
  // Bag filters
  "vrecasti-filteri-u-metalnom-limenom-ramu-g4-m5": "vrecasti-filteri/vrecasti-filter-metalni-ram-g4-m5",
  "vrecasti-filter-za-finu-prasinu-metalni-okvir-m6": "vrecasti-filteri/vrecasti-filter-fina-prasina-m6",
  "vrecasti-filter-za-finu-prasinu-metalni-okvir-f7": "vrecasti-filteri/vrecasti-filter-fina-prasina-f7",
  "vrecasti-filter-za-finu-prasinu-metalni-okvir-f8": "vrecasti-filteri/vrecasti-filter-fina-prasina-f8",
  "vrecasti-filter-za-finu-prasinu-metalni-okvir-f9": "vrecasti-filteri/vrecasti-filter-fina-prasina-f9",
  "vrecasti-filter-od-staklenih-vlakana-od-m6-do-f9": "vrecasti-filteri/vrecasti-filter-staklena-vlakna-m6-f9",
  // Rigid V-cell filters
  "aluminijumski-seperator-filteri": "rigidni-v-filteri/aluminijumski-separator-filteri",
  "rigidni-panelni-filter-aluminijumski-okvir": "rigidni-v-filteri/rigidni-panelni-aluminijumski-okvir",
  "rigidni-panelni-filter-metalni-okvir-sa-zaglavljem-yafi-rf": "rigidni-v-filteri/rigidni-panelni-metalni-okvir-zaglavlje",
  "rigidni-panelni-filter-plasticni-okvir": "rigidni-v-filteri/rigidni-panelni-plasticni-okvir",
  "rigidni-panelni-filter-plasticni-okvir-sa-zaglavljem-yafi-rf": "rigidni-v-filteri/rigidni-panelni-plasticni-okvir-zaglavlje",
  "rigidni-vrecasti-filter-metalni-okvir-4v": "rigidni-v-filteri/rigidni-vrecasti-metalni-okvir-4v",
  "rigidni-vrecasti-filter-plasticni-okvir-4v-energy": "rigidni-v-filteri/rigidni-vrecasti-plasticni-okvir-4v-energy",
  "rigidni-vrecasti-filter-plasticni-okvir-4v-max-flow": "rigidni-v-filteri/rigidni-vrecasti-plasticni-okvir-4v-max-flow",
  "rigidni-vrecasti-filter-plasticni-okvir-4v-standard": "rigidni-v-filteri/rigidni-vrecasti-plasticni-okvir-4v-standard",
  // Absolute filters – HEPA
  "apsolutni-hepa-filteri-mdf-okvir": "hepa-ulpa-filteri/hepa-mdf-78mm",
  "apsolutni-hepa-filteri-mn-mdf-okvir": "hepa-ulpa-filteri/hepa-mdf-mn",
  "apsolutni-hepa-filteri-mn-mdf-okvir-150mm": "hepa-ulpa-filteri/hepa-mdf-mn-150mm",
  "apsolutni-hepa-filteri-ml-mdf-okvir": "hepa-ulpa-filteri/hepa-mdf-ml-150mm",
  "apsolutni-hepa-filteri-mdf-okvir-hf-ml-xp-610-610-292-h13": "hepa-ulpa-filteri/hepa-mdf-292mm-hf-ml-xp",
  "apsolutni-hepa-filteri-mdf-okvir-hf-mx-xp-610-610-292-h13": "hepa-ulpa-filteri/hepa-mdf-hf-mx-xp",
  "apsolutni-hepa-filteri-mdf-okvir-hf-mh-xp-610-610-292-h13": "hepa-ulpa-filteri/hepa-mdf-hf-mh-xp",
  "apsolutni-hepa-filteri-hf-mn-xp": "hepa-ulpa-filteri/hepa-hf-mn-xp",
  "apsolutni-hepa-filter-galvanizovan-okvir-gx": "hepa-ulpa-filteri/hepa-galvanizovan-gx",
  "apsolutni-hepa-filter-galvanizovan-okvir-gh": "hepa-ulpa-filteri/hepa-galvanizovan-gh",
  "apsolutni-hepa-filter-galvanizovan-okvir-ax": "hepa-ulpa-filteri/hepa-galvanizovan-ax",
  "apsolutni-hepa-filter-galvanizovan-okvir-ah": "hepa-ulpa-filteri/hepa-galvanizovan-ah",
  "filter-od-pocinkovanog-lima-gs-gh": "hepa-ulpa-filteri/hepa-pocinkovani-lim-gs-gh",
  "rigidni-filter-ph-plasticni-okvir-4v-epa-hepa": "hepa-ulpa-filteri/hepa-rigidni-ph-plasticni-4v",
  "rigidni-filter-gh-metalni-okvir-4v-epa-hepa": "hepa-ulpa-filteri/hepa-rigidni-gh-metalni-4v",
  "rigidni-panelni-filter-metalni-okvir-2": "hepa-ulpa-filteri/hepa-rigidni-panelni-metalni",
  "apsolutni-hepa-filter-visokog-capaciteta-v-type-g30-standard": "hepa-ulpa-filteri/hepa-v-tip-g30",
  "apsolutni-hepa-filter-visokog-capaciteta-v-type-40": "hepa-ulpa-filteri/hepa-v-tip-40",
  "apsolutni-hepa-filter-visokog-kapaciteta-v-type-p30-standardni-plasticni-okvir": "hepa-ulpa-filteri/hepa-v-tip-p30",
  "apsolutni-hepa-filter-visokog-kapaciteta-v-type-p40-plasticni-okvir": "hepa-ulpa-filteri/hepa-v-tip-p40",
  "apsolutni-hepa-filter-visokog-kapaciteta-v-tip-nbc-grade": "hepa-ulpa-filteri/hepa-v-tip-nbc",
  "hepa-filter-sa-laminarnim-protokom-aluminijumski-okvir-as": "hepa-ulpa-filteri/hepa-laminarni-as",
  "hepa-filter-sa-laminarnim-protokom-aluminijumski-okvir-al-125mm": "hepa-ulpa-filteri/hepa-laminarni-al-125",
  "hepa-filter-sa-luminarnim-protokom-aluminijumski-okvir-al-150mm": "hepa-ulpa-filteri/hepa-laminarni-al-150",
  "hepa-filter-sa-luminarnim-protokom-aluminijumski-okvir-am-110mm": "hepa-ulpa-filteri/hepa-laminarni-am-110",
  "hepa-filter-sa-luminarnim-protokom-aluminijumski-okvir-an-66mm": "hepa-ulpa-filteri/hepa-laminarni-an-66",
  "hepa-filter-sa-luminarnim-protokom-aluminijumski-okvir-an-69mm": "hepa-ulpa-filteri/hepa-laminarni-an-69",
  "hepa-filter-sa-luminarnim-protokom-aluminijumski-okvir-an-78mm": "hepa-ulpa-filteri/hepa-laminarni-an-78",
  "hepa-filter-sa-luminarnim-protokom-aluminijumski-okvir-an-110mm": "hepa-ulpa-filteri/hepa-laminarni-an-110",
  "hepa-filter-sa-luminarnim-protokom-aluminijumski-okvir-an-125mm": "hepa-ulpa-filteri/hepa-laminarni-an-125",
  "hepa-filter-sa-luminarnim-protokom-aluminijumski-okvir-an-150mm": "hepa-ulpa-filteri/hepa-laminarni-an-150",
  "gelom-zaptivani-hepa-filteri-aluminijumski-okvir-an-80mm": "hepa-ulpa-filteri/hepa-gel-an-80",
  "gelom-zaptivani-hepa-filteri-aluminijumski-okvir-an-91mm": "hepa-ulpa-filteri/hepa-gel-an-91",
  "gel-seal-hepa-filters-hg-am-dg-610-610-104-h13": "hepa-ulpa-filteri/hepa-gel-an-104",
  // Odour and grease filters
  "filter-sa-aktivnim-ugljem-napunjen-ugljenicnim-peletom": "filteri-mirisi-masnoce/filter-aktivni-ugalj-pelet",
  "filter-sa-cvrstim-vrecama-i-aktivnim-ugljem": "filteri-mirisi-masnoce/filter-cvrste-vrece-aktivni-ugalj",
  "filter-sa-produzenom-povrsinom-od-aktivnog-uglja": "filteri-mirisi-masnoce/filter-produzena-povrsina-aktivni-ugalj",
  "filteri-za-masti-sa-mreznim-okvirom": "filteri-mirisi-masnoce/filteri-za-masti-mrezni-okvir",
  "kertridzi-sa-aktivnim-ugljem": "filteri-mirisi-masnoce/kertridzi-aktivni-ugalj",
  "kertridzi-sa-aktivnim-ugljem-copy": "filteri-mirisi-masnoce/kertridzi-aktivni-ugalj-model-b",
  "metalni-okvir-kuhinjske-nape-yafi-pf-592-592-48-g2": "filteri-mirisi-masnoce/metalni-okvir-kuhinjske-nape",
  // Filter frames
  "ramovi-za-filtere-predfiltere-i-fine-filtere": "ramovi-za-filtere/ramovi-iner-frejmovi",
};

/** Old WooCommerce category slug → category slug under `/proizvodi`. */
const wooCategories: Record<string, string> = {
  "filterski-materijali-yafi-fm": "filter-materijali",
  "panelni-filteri": "panelni-filteri",
  "kasetni-filteri-yafi-kf": "kasetni-filteri",
  "kartonski-kasetni-filter-yafi-kkf": "kasetni-filteri",
  "vrecasti-filteri-yafi-vf": "vrecasti-filteri",
  "rigidni-v-filteri-yafi-rf": "rigidni-v-filteri",
  "apsolutni-filteri-hepa-yafi-af": "hepa-ulpa-filteri",
  "filteri-za-masne-pare-yafi-mf": "filteri-mirisi-masnoce",
  "filteri-za-lakirnice": "filteri-za-lakirnice",
  "ramovi-za-filtere": "ramovi-za-filtere",
};

/** Other WordPress addresses. The blog, projects and services pages held theme demo content. */
const wordpressPages: Record<string, string> = {
  "/en/home-english": "/en",
  "/blog": "/",
  "/bills-can-only-be-paid-online": "/",
  "/led-light-bulbs-reduce-your-bill": "/",
  "/projects": "/",
  "/services": "/",
  "/sitemap_index.xml": "/sitemap.xml",
  "/page-sitemap.xml": "/sitemap.xml",
  "/post-sitemap.xml": "/sitemap.xml",
  "/product-sitemap.xml": "/sitemap.xml",
  "/product_cat-sitemap.xml": "/sitemap.xml",
};

/**
 * PHP-site page name → locale-agnostic path. Each one existed in Serbian at
 * the root and again under `/en/` and `/ru/`; Russian goes to English.
 */
const phpPages: Record<string, string> = {
  index: "/",
  "o-nama": "/o-nama",
  kontakt: "/kontakt",
  katalog: "/katalozi",
  catalog: "/katalozi",
  novosti: "/",
  "filter-materijali": "/proizvodi/filter-materijali",
  "panelni-filteri": "/proizvodi/panelni-filteri",
  "kasetni-filteri": "/proizvodi/kasetni-filteri",
  "kartonski-kasetni-filteri": "/proizvodi/kasetni-filteri",
  "vrecasti-filteri": "/proizvodi/vrecasti-filteri",
  "v-filteri": "/proizvodi/rigidni-v-filteri",
  "apsolutni-filteri": "/proizvodi/hepa-ulpa-filteri",
  "filteri-za-masne-pare": "/proizvodi/filteri-mirisi-masnoce",
  "filteri-za-industrijsko-otprasivanje": "/industrije/teska-industrija-i-energetika",
  "izrada-filtera-ultrazvucnom-masinom": "/o-nama",
  "dokument-o-kretanju-otpada": "/o-nama",
};

const sr = "/documents/katalozi/sr";
const en = "/documents/katalozi/en";

/**
 * Old PDFs → the current edition of the same catalogue. Company paperwork
 * (registration, tax ID, waste law) has no successor and goes to About us.
 * Names with spaces are written encoded, the way requests arrive.
 */
const documents: Record<string, string> = {
  "/wp-content/uploads/2023/03/FILTERI_WEB.pdf": `${sr}/yafi-katalog-proizvoda.pdf`,
  "/wp-content/uploads/2023/03/FILTER%20MATERIJALI_SR.pdf": `${sr}/yafi-filterski-materijali.pdf`,
  "/wp-content/uploads/2023/03/KASETNI_SR.pdf": `${sr}/yafi-kasetni-filteri.pdf`,
  "/wp-content/uploads/2023/03/PANELNI_SR.pdf": `${sr}/yafi-panelni-filteri.pdf`,
  "/wp-content/uploads/2023/03/HEPA_SR.pdf": `${sr}/yafi-hepa-filteri.pdf`,
  "/wp-content/uploads/2023/03/RAMOVI_SR.pdf": `${sr}/yafi-ramovi-za-filtere.pdf`,
  "/wp-content/uploads/2023/03/01_FILTER_MATERIALS.pdf": `${en}/yafi-filter-materials.pdf`,
  "/wp-content/uploads/2023/03/02_CASSETTE_FILTERS.pdf": `${en}/yafi-cassette-filters.pdf`,
  "/wp-content/uploads/2023/03/03_PANEL_FILTERS.pdf": `${en}/yafi-panel-filters.pdf`,
  "/wp-content/uploads/2023/03/04_BAG_FILTERS.pdf": `${en}/yafi-bag-filters.pdf`,
  "/wp-content/uploads/2023/03/05_RIGID_FILTERS.pdf": `${en}/yafi-rigid-filters.pdf`,
  "/wp-content/uploads/2023/03/06_HEPA_FILTERS.pdf": `${en}/yafi-hepa-filters.pdf`,
  "/wp-content/uploads/2023/03/07_ODORS-AND-FATTTY-VAPORS.pdf": `${en}/yafi-odour-and-fatty-vapour-filters.pdf`,
  "/wp-content/uploads/2023/03/08_FILTER_FRAMES.pdf": `${en}/yafi-filter-frames.pdf`,
  "/wp-content/uploads/2022/11/apr-resenje.pdf": "/o-nama",
  "/wp-content/uploads/2022/11/pib.pdf": "/o-nama",
  "/files/katalog.pdf": `${sr}/yafi-katalog-proizvoda.pdf`,
  "/files/Filterski%20materijali.pdf": `${sr}/yafi-filterski-materijali.pdf`,
  "/files/Kasetni%20filteri.pdf": `${sr}/yafi-kasetni-filteri.pdf`,
  "/files/Panelni%20filteri.pdf": `${sr}/yafi-panelni-filteri.pdf`,
  "/files/vrecasti%20filteri.pdf": `${sr}/yafi-vrecasti-filteri.pdf`,
  "/files/rigidni%20filteri.pdf": `${sr}/yafi-rigidni-filteri.pdf`,
  "/files/Hepa%20filteri.pdf": `${sr}/yafi-hepa-filteri.pdf`,
  "/files/Mirisi%20i%20masnoce.pdf": `${sr}/yafi-filteri-za-mirise-i-masne-pare.pdf`,
  "/files/Ramovi.pdf": `${sr}/yafi-ramovi-za-filtere.pdf`,
  "/files/apr-resenje.pdf": "/o-nama",
  "/files/pib.pdf": "/o-nama",
  "/files/Zakon%20o%20upravljanju%20otpadom.pdf": "/o-nama",
  "/en/files/catalog_en.pdf": `${en}/yafi-product-catalogue.pdf`,
  "/en/files/apr-resenje.pdf": "/en/o-nama",
  "/en/files/pib.pdf": "/en/o-nama",
  "/en/files/Zakon%20o%20upravljanju%20otpadom.pdf": "/en/o-nama",
};

function withPrefix(prefix: string, path: string) {
  return path === "/" ? prefix || "/" : `${prefix}${path}`;
}

function redirect(source: string, destination: string): Redirect {
  return { source, destination, permanent: true };
}

export const legacyRedirects: Redirect[] = [
  ...Object.entries(wooProducts).map(([slug, target]) =>
    redirect(`/product/${slug}`, `/proizvodi/${target}`)
  ),
  ...Object.entries(wooCategories).map(([slug, target]) =>
    redirect(`/product-category/${slug}`, `/proizvodi/${target}`)
  ),
  // Anything else from the shop — a product missing above, paginated or
  // filtered listings — lands on the range rather than a 404.
  redirect("/product/:path*", "/proizvodi"),
  redirect("/product-category/:path*", "/proizvodi"),
  ...Object.entries(wordpressPages).map(([source, target]) => redirect(source, target)),
  ...[
    ["", ""],
    ["/en", "/en"],
    ["/ru", "/en"],
  ].flatMap(([from, to]) =>
    Object.entries(phpPages).map(([page, path]) =>
      redirect(`${from}/${page}.php`, withPrefix(to, path))
    )
  ),
  redirect("/ru", "/en"),
  ...Object.entries(documents).map(([source, target]) => redirect(source, target)),
];
