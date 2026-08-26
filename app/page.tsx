import Link from "next/link";
import { tools, categoryPath, type Category } from "@/lib/tools";
import ToolIcon from "@/components/ToolIcon";

const categoryMeta: Record<Category, { icon: string; label: string; description: string }> = {
  calculators: {
    icon: "🧮",
    label: "Calculators",
    description: "EMI, SIP, GST, salary, tax and everyday calculations.",
  },
  finance: {
    icon: "💰",
    label: "Finance",
    description: "FD, RD, PPF, NPS, EPF and long-term planning tools.",
  },
  dev: {
    icon: "</>",
    label: "Developer Tools",
    description: "JSON, Base64, URL, regex, HTML, CSS and JavaScript utilities.",
  },
  seo: {
    icon: "⌕",
    label: "SEO Tools",
    description: "Meta tags, robots.txt and sitemap utilities.",
  },
  files: {
    icon: "📄",
    label: "File Tools",
    description: "Image and PDF conversion, compression and document utilities.",
  },
};

export default function Home() {
  const groups = (Object.keys(categoryMeta) as Category[]).map((category) => [
    category,
    Object.entries(tools)
      .filter(([, tool]) => tool.category === category)
      .slice(0, 8),
  ] as const);

  return (
    <div className="animate-pop">
      <section className="container" style={{ padding: "64px 0 40px" }}>
        <div className="home-hero" style={{ padding: "58px 7%" }}>
          <div style={{ maxWidth: 850, margin: "auto", textAlign: "center" }}>
            <span className="hero-badge">CALCINDIA · SMART DIGITAL TOOLS</span>

            <h1
              style={{
                fontSize: "clamp(42px,7vw,76px)",
                lineHeight: 1,
                letterSpacing: "-.055em",
                margin: "22px 0",
                fontWeight: 950,
              }}
            >
              Serious tools for everyday{" "}
              <span className="gradient-text">decisions.</span>
            </h1>

            <p
              style={{
                maxWidth: 720,
                margin: "0 auto",
                fontSize: 18,
                lineHeight: 1.8,
                color: "#667085",
              }}
            >
              Calculate your EMI, plan SIP investments, compare financial
              scenarios, work with developer utilities, improve SEO and
              process common files — all from one clean, professional
              platform.
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 12,
                flexWrap: "wrap",
                marginTop: 28,
              }}
            >
              <Link href="/calculators" className="primary-button">
                🧮 Explore Calculators →
              </Link>

              <Link href="/finance" className="secondary-button">
                💰 Financial Planning
              </Link>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: 12,
                maxWidth: 680,
                margin: "32px auto 0",
              }}
            >
              <div className="kpi">
                <b style={{ fontSize: 27 }}>{Object.keys(tools).length}+</b>
                <div className="muted">Tools</div>
              </div>
              <div className="kpi">
                <b style={{ fontSize: 27 }}>5</b>
                <div className="muted">Categories</div>
              </div>
              <div className="kpi">
                <b style={{ fontSize: 27 }}>100%</b>
                <div className="muted">Browser-first</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container" style={{ padding: "20px 0 70px" }}>
        <div style={{ textAlign: "center", maxWidth: 760, margin: "auto" }}>
          <span className="eyebrow">TOOLS BY PURPOSE</span>
          <h2 style={{ fontSize: 40, margin: "13px 0", fontWeight: 900 }}>
            Choose the tool you actually need
          </h2>
          <p className="muted" style={{ margin: "auto" }}>
            Every page uses a visual language that matches its job: calculator
            symbols for calculations, file symbols for documents and code
            symbols for developer tools.
          </p>
        </div>

        {groups.map(([category, items]) => {
          const meta = categoryMeta[category];

          return (
            <section key={category} style={{ marginTop: 48 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 20,
                  alignItems: "end",
                  marginBottom: 18,
                }}
              >
                <div>
                  <span className="eyebrow">
                    {meta.icon} {meta.label}
                  </span>
                  <h2 style={{ fontSize: 30, margin: "10px 0 5px", fontWeight: 900 }}>
                    {category === "calculators"
                      ? "Make numbers easier to understand."
                      : category === "finance"
                        ? "Plan money with clarity."
                        : category === "dev"
                          ? "Build and debug faster."
                          : category === "seo"
                            ? "Improve your search visibility."
                            : "Work with files more easily."}
                  </h2>
                  <p className="muted" style={{ margin: 0 }}>
                    {meta.description}
                  </p>
                </div>

                <Link
                  href={`/${category}`}
                  className="category-link"
                  style={{ flexShrink: 0 }}
                >
                  View all →
                </Link>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))",
                  gap: 14,
                }}
              >
                {items.map(([slug, tool]) => (
                  <Link
                    key={slug}
                    href={categoryPath(tool, slug)}
                    className="home-card"
                  >
                    <ToolIcon kind={tool.kind} />

                    <h3 style={{ margin: "15px 0 7px", fontSize: 18, fontWeight: 850 }}>
                      {tool.title}
                    </h3>

                    <p
                      style={{
                        margin: 0,
                        color: "#667085",
                        fontSize: 14,
                        lineHeight: 1.65,
                      }}
                    >
                      {tool.description}
                    </p>

                    <span
                      style={{
                        display: "block",
                        marginTop: 14,
                        color: "#2563eb",
                        fontSize: 13,
                        fontWeight: 850,
                      }}
                    >
                      Open tool →
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </section>
    </div>
  );
}
