import Link from "next/link";

const columns = [
  { title: "Calculators", icon: "🧮", links: [["Salary Hike", "/calculators/salary-hike-calculator"], ["EMI", "/calculators/emi-calculator"], ["SIP", "/calculators/sip-calculator"], ["GST", "/calculators/gst-calculator"], ["Income Tax", "/calculators/income-tax-calculator"]] },
  { title: "Finance", icon: "💰", links: [["FD", "/finance/fd-calculator"], ["RD", "/finance/rd-calculator"], ["PPF", "/finance/ppf-calculator"], ["NPS", "/finance/nps-calculator"], ["EPF", "/finance/epf-calculator"]] },
  { title: "Developer", icon: "</>", links: [["JSON Formatter", "/dev/json-formatter"], ["JSON Validator", "/dev/json-validator"], ["Base64", "/dev/base64-encoder"], ["URL Encoder", "/dev/url-encoder"], ["Regex Tester", "/dev/regex-tester"]] },
  { title: "Files", icon: "📄", links: [["JPG → PNG", "/files/jpg-to-png"], ["PNG → JPG", "/files/png-to-jpg"], ["PDF Merger", "/files/pdf-merger"], ["PDF Splitter", "/files/pdf-splitter"], ["JPG → PDF", "/files/jpg-to-pdf"]] },
];

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container site-footer-inner">
        <div className="site-footer-grid">
          <div className="site-footer-brand">
            <Link href="/" className="site-brand">
              <span className="site-brand-mark">CI</span>
              <span>Calc<span className="site-brand-accent">India</span></span>
            </Link>
            <p>Practical calculators, finance planning tools, developer utilities, SEO tools and browser-based file processing.</p>
            <Link href="/calculators" className="site-footer-button">Explore Tools →</Link>
          </div>
          {columns.map((column) => (
            <div key={column.title}>
              <h3>{column.icon} {column.title}</h3>
              <div className="site-footer-links">
                {column.links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
              </div>
            </div>
          ))}
        </div>
        <div className="site-footer-bottom">
          <span>© {new Date().getFullYear()} CalcIndia. All rights reserved.</span>
          <div>
            <Link href="/about">About</Link>
            <Link href="/calculators">Calculators</Link>
            <Link href="/finance">Finance</Link>
            <Link href="/dev">Developer</Link>
            <Link href="/seo">SEO</Link>
            <Link href="/files">Files</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
