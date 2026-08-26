import type { Metadata } from "next";
import Link from "next/link";
import { getToolsByCategory, categoryPath } from "@/lib/tools";
import ToolIcon from "@/components/ToolIcon";

export const revalidate = 3600;

const CATEGORY = "seo" as const;

export const metadata: Metadata = {
  title: "SEO Tools",
  description: "Create meta tags, robots.txt files and XML sitemaps with simple browser-based SEO utilities.",
  alternates: { canonical: "/seo" },
};

export default function Page() {
  const items = getToolsByCategory(CATEGORY);

  return (
    <main>
      <section className="container" style={{ padding: "56px 0 30px" }}>
        <span className="hero-badge">⌕ SEO Tools</span>
        <h1 style={{ fontSize: "clamp(40px,6vw,66px)", margin: "16px 0 10px", fontWeight: 950, letterSpacing: "-.05em" }}>
          SEO Tools
        </h1>
        <p className="muted" style={{ maxWidth: 780, fontSize: 18 }}>Create meta tags, robots.txt files and XML sitemaps with simple browser-based SEO utilities.</p>
      </section>

      <section className="container" style={{ paddingBottom: 70 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 16 }}>
          {items.map((tool) => (
            <Link key={tool.slug} href={categoryPath(tool)} className="home-card">
              <ToolIcon kind={tool.kind} />
              <h2 style={{ margin: "15px 0 8px", fontSize: 19, fontWeight: 850 }}>{tool.title}</h2>
              <p style={{ margin: 0, color: "#667085", lineHeight: 1.7, fontSize: 14 }}>{tool.description}</p>
              <span style={{ display: "block", marginTop: 15, color: "#2563eb", fontWeight: 850 }}>Open tool →</span>
            </Link>
          ))}
        </div>

        <div style={{ marginTop: 50 }}>
          <h2 style={{ fontSize: 28, fontWeight: 900 }}>Explore other CalcIndia sections</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 15 }}>
            <Link className="category-link" href="/calculators">🧮 Calculators</Link>
            <Link className="category-link" href="/finance">💰 Finance</Link>
            <Link className="category-link" href="/dev">&lt;/&gt; Developer</Link>
            <Link className="category-link" href="/seo">⌕ SEO</Link>
            <Link className="category-link" href="/files">📄 Files</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
