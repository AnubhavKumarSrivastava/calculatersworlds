import Link from "next/link";

const columns = [
  { title: "Calculators", links: [["Salary Hike", "/calculators/salary-hike-calculator"], ["EMI", "/calculators/emi-calculator"], ["SIP", "/calculators/sip-calculator"], ["GST", "/calculators/gst-calculator"], ["Income Tax", "/calculators/income-tax-calculator"]] },
  { title: "Finance", links: [["FD", "/finance/fd-calculator"], ["RD", "/finance/rd-calculator"], ["PPF", "/finance/ppf-calculator"], ["NPS", "/finance/nps-calculator"], ["EPF", "/finance/epf-calculator"]] },
  { title: "Developer", links: [["JSON Formatter", "/dev/json-formatter"], ["Base64", "/dev/base64-encoder"], ["UUID", "/dev/uuid-generator"], ["Password", "/dev/password-generator"], ["URL Encoder", "/dev/url-encoder"]] },
  { title: "SEO & Files", links: [["Meta Tags", "/seo/meta-tag-generator"], ["Robots.txt", "/seo/robots-txt-generator"], ["JPG → PNG", "/files/jpg-to-png"], ["PDF Merger", "/files/pdf-merger"], ["PDF Splitter", "/files/pdf-splitter"]] },
];

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-grid">
          <div>
            <Link href="/" className="site-logo">
              <span className="site-logo-mark">CI</span>
              <span className="site-logo-text">Calc<span>India</span></span>
            </Link>
            <p style={{ marginTop: 18, maxWidth: 360, lineHeight: 1.8, fontSize: 14 }}>
              Practical calculators, finance planning tools, developer utilities, SEO tools and browser-based file processing.
            </p>
            <Link href="/calculators" className="header-cta !text-white" style={{ margin: "18px 0 0", display: "inline-flex" }}>
              Explore Tools →
            </Link>
          </div>
          {columns.map((column) => (
            <div key={column.title}>
              <h3>{column.title}</h3>
              <div style={{ display: "grid", gap: 10, marginTop: 15 }}>
                {column.links.map(([label, href]) => (
                  <Link key={href} href={href} style={{ textDecoration: "none", fontSize: 13, fontWeight: 650 }}>{label}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 38, paddingTop: 18, borderTop: "1px solid #eef2f6", display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap", fontSize: 12 }}>
          <span style={{ color: "#98a2b3" }}>© {new Date().getFullYear()} CalcIndia. All rights reserved.</span>
          <div style={{ display: "flex", gap: 18 }}>
            <Link href="/about" style={{ textDecoration: "none" }}>About</Link>
            <Link href="/calculators" style={{ textDecoration: "none" }}>Calculators</Link>
            <Link href="/finance" style={{ textDecoration: "none" }}>Finance</Link>
            <Link href="/dev" style={{ textDecoration: "none" }}>Developer</Link>
            <Link href="/files" style={{ textDecoration: "none" }}>Files</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
