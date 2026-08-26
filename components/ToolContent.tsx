import Link from "next/link";
import { tools, type Tool, categoryPath, type Category } from "@/lib/tools";
import ToolIcon from "@/components/ToolIcon";

const themes = {
  calculators: { label: "CALCULATOR", how: "How the calculator works", related: "More calculators", icon: "🧮" },
  finance: { label: "FINANCE", how: "How the financial calculation works", related: "More finance tools", icon: "💰" },
  dev: { label: "DEVELOPER", how: "How this developer tool works", related: "More developer tools", icon: "</>" },
  seo: { label: "SEO", how: "How this SEO tool works", related: "More SEO tools", icon: "⌕" },
  files: { label: "FILE TOOL", how: "How this file tool works", related: "More file tools", icon: "📄" },
} as const;

const categoryNames: Record<Category, string> = {
  calculators: "Calculators",
  finance: "Finance",
  dev: "Developer Tools",
  seo: "SEO Tools",
  files: "File Tools",
};

const genericSteps = [
  "Enter or upload the required input.",
  "Run the tool and review the generated result.",
  "Check assumptions, formatting and output before using it elsewhere.",
];

const cross: Record<Category, Category[]> = {
  calculators: ["finance", "dev", "seo", "files"],
  finance: ["calculators", "dev", "seo", "files"],
  dev: ["calculators", "finance", "seo", "files"],
  seo: ["calculators", "finance", "dev", "files"],
  files: ["calculators", "finance", "dev", "seo"],
};

export default function ToolContent({
  slug,
  tool,
}: {
  slug: string;
  tool: Tool;
}) {
  const theme = themes[tool.category];

  const related = Object.entries(tools).filter(
    ([s, t]) => s !== slug && t.category === tool.category,
  );

  const crossLinks = cross[tool.category].map((category) => [
    category,
    Object.entries(tools)
      .filter(([, t]) => t.category === category)
      .slice(0, 4),
  ] as const);

  return (
    <div className={`container content-${tool.category}`} style={{ paddingBottom: 70 }}>
      <section className="content-section">
        <ToolIcon kind={tool.kind} />
        <span className="eyebrow">{theme.icon} 01 · {theme.label}</span>
        <h2>What is {tool.title}?</h2>
        <p>{tool.intro}</p>
      </section>

      <section className="content-section">
        <span className="eyebrow">{theme.icon} 02 · UNDERSTAND</span>
        <h2>{theme.how}</h2>

        <div className="step-grid">
          {genericSteps.map((step, index) => (
            <article className="info-card" key={step}>
              <span>0{index + 1}</span>
              <h3>{step}</h3>
              <p>
                {index === 0
                  ? "Use the fields in the interactive tool above. Keep numbers, dates, URLs or files in the expected format."
                  : index === 1
                    ? "The result updates in the browser and is presented in a clear output card."
                    : "Important decisions should be checked against the latest official or authoritative information."}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section">
        <span className="eyebrow">{theme.icon} 03 · FORMULA / LOGIC</span>
        <h2>Which formula or logic is used?</h2>

        <div className="formula-panel">
          <span>{theme.icon}</span>
          <code>{tool.formula}</code>
        </div>

        <p className="muted">
          The formula above describes the core logic of this version. Real-world
          financial, tax, exchange-rate and file-processing rules can have
          additional conditions.
        </p>
      </section>

      <section className="content-section">
        <span className="eyebrow">✦ 04 · IMPORTANT</span>
        <h2>Things to know before using {tool.title}</h2>

        <div className="tips-grid">
          {tool.tips.map((tip, index) => (
            <article className="tip-card" key={tip}>
              <b>0{index + 1}</b>
              <p>{tip}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section">
        <span className="eyebrow">? 05 · FAQ</span>
        <h2>Frequently Asked Questions</h2>

        <div className="faq-list">
          {tool.faq.map((question, index) => (
            <details key={question} className="faq-item" open={index === 0}>
              <summary>
                {question}
                <span>+</span>
              </summary>
              <p>
                {index === 0
                  ? tool.description
                  : index === 1
                    ? tool.formula
                    : index === 2
                      ? "Yes. The page is responsive and optimized for desktop, tablet and mobile."
                      : "Browser-first interactions process data locally where possible. Sensitive files should be handled according to your privacy requirements."}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section className="content-section">
        <span className="eyebrow">→ 06 · SAME CATEGORY</span>
        <h2>{theme.related}</h2>
        <p>Continue through the complete {categoryNames[tool.category]} collection.</p>

        <div className="related-grid">
          {related.map(([s, t]) => (
            <Link href={categoryPath(t, s)} key={s} className="related-card">
              <ToolIcon kind={t.kind} />
              <div>
                <strong>{t.title}</strong>
                <small>{t.description}</small>
              </div>
              <b>→</b>
            </Link>
          ))}
        </div>
      </section>

      <section className="content-section">
        <span className="eyebrow">✦ 07 · DISCOVER MORE</span>
        <h2>Related Tools Across CalcIndia</h2>
        <p>
          Move naturally between calculators, finance, developer, SEO and file tools.
        </p>

        <div style={{ display: "grid", gap: 28, marginTop: 25 }}>
          {crossLinks.map(([category, items]) => (
            <div key={category}>
              <h3 style={{ fontSize: 20, fontWeight: 900 }}>
                {categoryNames[category]}
              </h3>

              <div className="related-grid">
                {items.map(([s, t]) => (
                  <Link href={categoryPath(t, s)} key={s} className="related-card">
                    <ToolIcon kind={t.kind} />
                    <div>
                      <strong>{t.title}</strong>
                      <small>{t.description}</small>
                    </div>
                    <b>→</b>
                  </Link>
                ))}
              </div>

              <Link
                href={`/${category}`}
                style={{
                  display: "inline-block",
                  marginTop: 12,
                  color: "#2563eb",
                  fontSize: 14,
                  fontWeight: 800,
                }}
              >
                View all {categoryNames[category]} →
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
