import Reveal from "@/components/Reveal";
import type { ProductSection } from "@/data/products";

/**
 * Catalogue tables are narrow but their labels are long, so the table gets its
 * own horizontal scroll container — the page body must never scroll sideways.
 */
function SectionTable({
  table,
}: {
  table: NonNullable<ProductSection["table"]>;
}) {
  const columns =
    table.head?.length ?? Math.max(...table.rows.map((r) => r.length));

  return (
    <div
      /* Three-column tables read better held in; a full range listing needs
         the whole column, and scrolls inside this box below that width. */
      className={`mt-6 overflow-x-auto rounded-2xl border border-navy-700/70 bg-navy-900/50 ${
        columns >= 6 ? "" : "max-w-4xl"
      }`}
    >
      {/* Wide ranges get a proportionally wider floor, so a six-type table
          scrolls rather than squeezing every label into one word per line. */}
      <table
        className="w-full border-collapse text-left text-sm"
        style={{ minWidth: `${Math.max(34, columns * 9)}rem` }}
      >
        {table.head && (
          <thead>
            <tr className="border-b border-navy-700/70">
              {table.head.map((cell, i) => (
                <th
                  key={i}
                  scope="col"
                  className="px-5 py-3.5 text-xs font-semibold uppercase tracking-widest text-orange-400"
                >
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody className="divide-y divide-navy-800">
          {table.rows.map((row, i) =>
            /* A lone cell in a multi-column table is a block heading inside
               the range — the "6-G3", "8-G3" bands of the panel listings. */
            row.length === 1 && columns > 1 ? (
              <tr key={i} className="bg-navy-800/40">
                <td
                  colSpan={columns}
                  className="px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-orange-400"
                >
                  {row[0]}
                </td>
              </tr>
            ) : (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td
                    key={j}
                    /* A short row's last cell carries the rest of the width. */
                    colSpan={j === row.length - 1 ? columns - j : 1}
                    className={
                      j === 0
                        ? "px-5 py-3.5 align-top font-medium text-ink-200"
                        : "px-5 py-3.5 align-top text-ink-400"
                    }
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  );
}

/**
 * The long-form catalogue copy that runs full width below the hero columns.
 * Each block renders only the parts the data file supplies.
 */
export default function ProductSections({
  sections,
  className = "",
}: {
  sections: ProductSection[];
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-14 ${className}`}>
      {sections.map((section, i) => (
        <Reveal key={section.heading ?? i} delay={0.05}>
          {section.heading && (
            <h2 className="font-display text-xl font-extrabold leading-snug text-ink-100 md:text-2xl">
              {section.heading}
            </h2>
          )}

          {section.body?.map((paragraph) => (
            <p
              key={paragraph}
              className="mt-5 max-w-3xl text-base leading-relaxed text-ink-400"
            >
              {paragraph}
            </p>
          ))}

          {section.list && (
            <ul className="mt-6 flex max-w-3xl flex-col gap-3">
              {section.list.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-base text-ink-200"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" />
                  {point}
                </li>
              ))}
            </ul>
          )}

          {section.table && <SectionTable table={section.table} />}
        </Reveal>
      ))}
    </div>
  );
}
