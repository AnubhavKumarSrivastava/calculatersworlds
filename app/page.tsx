import Link from "next/link";
import { tools, categoryPath, type Tool } from "@/lib/tools";

const categoryInfo = [
  { key: "calculators", icon: "🧮", title: "Make numbers easier to understand.", description: "EMI, SIP, GST, salary, tax and everyday calculations." },
  { key: "finance", icon: "💰", title: "Plan money with clarity.", description: "FD, RD, PPF, NPS, EPF and long-term planning tools." },
  { key: "dev", icon: "</>", title: "Build and debug faster.", description: "JSON, Base64, URL, regex, HTML, CSS and JavaScript utilities." },
  { key: "seo", icon: "⌕", title: "Improve your search visibility.", description: "Meta tags, robots.txt and sitemap utilities." },
  { key: "files", icon: "📄", title: "Work with files more easily.", description: "Image and PDF conversion, compression and document utilities." },
] as const;

export default function Home() {
  const featuredByCategory = categoryInfo.map((category) => ({
    ...category,
    tools: Object.entries(tools).filter(([, tool]) => tool.category === category.key).slice(0, 8),
  }));

  return (
    <div>
      <section className="container" style={{ padding: "72px 0 45px" }}>
        <div className="glass" style={{ position: "relative", overflow: "hidden", borderRadius: 30, padding: "72px 34px 48px", textAlign: "center" }}>
          <div className="hero-badge" style={{ margin: "0 auto" }}>CALCINDIA · SMART DIGITAL TOOLS</div>
          <h1 style={{ maxWidth: 900, margin: "26px auto 0", color: "#172033", fontSize: "clamp(48px, 7vw, 86px)", lineHeight: .98, letterSpacing: "-.065em", fontWeight: 950 }}>
            Serious tools for everyday <span style={{ color: "#2563eb" }}>decisions.</span>
          </h1>
          <p style={{ maxWidth: 780, margin: "24px auto 0", color: "#667085", fontSize: 17, lineHeight: 1.8 }}>
            Calculate your EMI, plan SIP investments, compare financial scenarios, work with developer utilities, improve SEO and process common files — all from one clean, professional platform.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginTop: 30 }}>
            <Link href="/calculators" className="jungle-button">🧮 Explore Calculators →</Link>
            <Link href="/finance" className="back-link" style={{ marginTop: 0 }}>💰 Financial Planning</Link>
          </div>
          <div style={{ maxWidth: 620, margin: "42px auto 0", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
            {[['51+','Tools'],['5','Categories'],['100%','Browser-first']].map(([value,label]) => (
              <div key={label} style={{ padding: 16, border: "1px solid #e5eaf1", borderRadius: 16, background: "rgba(255,255,255,.85)" }}>
                <b style={{ display: "block", fontSize: 28, color: "#172033" }}>{value}</b>
                <small style={{ color: "#98a2b3", textTransform: "uppercase", letterSpacing: ".12em" }}>{label}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container" style={{ paddingBottom: 70 }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <span className="eyebrow">TOOLS BY PURPOSE</span>
          <h2 style={{ margin: "12px 0 8px", color: "#172033", fontSize: 38, fontWeight: 950 }}>Choose the tool you actually need</h2>
          <p style={{ color: "#667085" }}>Every page uses a visual language that matches its job.</p>
        </div>

        {featuredByCategory.map((category) => (
          <section key={category.key} className="jungle-section">
            <div className="section-heading">
              <span className="eyebrow">{category.icon} {category.key === "dev" ? "Developer Tools" : category.key === "seo" ? "SEO Tools" : category.key === "files" ? "File Tools" : category.key}</span>
              <h2>{category.title}</h2>
              <p>{category.description}</p>
            </div>
            <div className="related-grid">
              {category.tools.map(([slug, tool], index) => (
                <Link key={slug} href={categoryPath(tool as Tool, slug)} className="related-card hover-lift">
                  <span>{category.icon}</span>
                  <div><strong>{tool.title}</strong><small>{tool.description}</small></div>
                  <b>→</b>
                </Link>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 22 }}>
              <Link href={`/${category.key}`} style={{ color: "#2563eb", fontWeight: 900, textDecoration: "none", fontSize: 13 }}>View all →</Link>
            </div>
          </section>
        ))}
      </section>
    </div>
  );
}
