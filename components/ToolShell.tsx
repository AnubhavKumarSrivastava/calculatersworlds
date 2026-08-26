import Link from "next/link";
import CategoryDecor from "@/components/CategoryDecor";
import ToolIcon from "@/components/ToolIcon";
import type { Category } from "@/lib/tools";

const meta: Record<Category, { badge: string }> = {
  calculators: { badge: "Calculator" },
  finance: { badge: "Finance Calculator" },
  dev: { badge: "Developer Tool" },
  seo: { badge: "SEO Tool" },
  files: { badge: "File Tool" },
};

export default function ToolShell({
  title,
  description,
  children,
  category,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  category: Category;
}) {
  const m = meta[category];

  return (
    <>
      <CategoryDecor category={category} />

      <section className={`container tool-hero category-${category}`}>
        <div className="hero-badge">
          <span>
            {category === "calculators"
              ? "🧮"
              : category === "finance"
                ? "💰"
                : category === "dev"
                  ? "</>"
                  : category === "seo"
                    ? "⌕"
                    : "📄"}
          </span>
          {m.badge} · Interactive
        </div>

        <Link href={`/${category}`} className="back-link">
          ← Back to {category === "dev" ? "Developer Tools" : category}
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 24 }}>
          <ToolIcon kind={category} />
          <h1 style={{ margin: 0 }}>{title}</h1>
        </div>

        <p>{description}</p>
      </section>

      <section className={`container tool-zone category-${category}`}>
        <div className="tool-card">
          <div className="tool-top">
            <span>
              {category === "calculators"
                ? "🧮 Calculator"
                : category === "finance"
                  ? "💰 Finance"
                  : category === "dev"
                    ? "</> Developer"
                    : category === "seo"
                      ? "⌕ SEO"
                      : "📄 File"}
            </span>
            <span>✓ Browser-first</span>
          </div>

          {children}
        </div>
      </section>
    </>
  );
}
