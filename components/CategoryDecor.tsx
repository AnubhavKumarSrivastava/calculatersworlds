export default function CategoryDecor({
  category,
}: {
  category: "calculators" | "finance" | "dev" | "seo" | "files";
}) {
  const data = {
    calculators: {
      label: "CALCULATOR MODE",
      icons: ["🧮", "＋", "−", "×", "÷", "=", "%", "√"],
      className: "calc-decor",
    },
    finance: {
      label: "FINANCE MODE",
      icons: ["₹", "📈", "💰", "%", "＋", "−", "×", "⌁"],
      className: "finance-decor",
    },
    dev: {
      label: "DEVELOPER MODE",
      icons: ["</>", "{ }", "[ ]", "();", "=>", "#", "⌘", "01"],
      className: "dev-decor",
    },
    seo: {
      label: "SEO MODE",
      icons: ["⌕", "#", "↑", "✓", "<meta>", "/sitemap", "↗", "◎"],
      className: "seo-decor",
    },
    files: {
      label: "FILE TOOLS",
      icons: ["📄", "PDF", "JPG", "PNG", "WEBP", "⇩", "↗", "✦"],
      className: "files-decor",
    },
  }[category];

  return (
    <div aria-hidden className={`category-decor ${data.className}`}>
      <div className="decor-orb" />
      <div className="decor-grid" />
      <div className="decor-symbols">
        {data.icons.map((icon, index) => (
          <span
            key={`${icon}-${index}`}
            style={{ animationDelay: `${index * 0.35}s` }}
          >
            {icon}
          </span>
        ))}
      </div>
      <div className="decor-label">{data.label}</div>
    </div>
  );
}
