"use client";

import Link from "next/link";
import { useState } from "react";

const calculatorLinks = [
  ["🧮", "Salary Hike Calculator", "/calculators/salary-hike-calculator"],
  ["🧮", "EMI Calculator", "/calculators/emi-calculator"],
  ["🧮", "SIP Calculator", "/calculators/sip-calculator"],
  ["🧮", "GST Calculator", "/calculators/gst-calculator"],
  ["🧮", "Income Tax Calculator", "/calculators/income-tax-calculator"],
  ["🧮", "Age Calculator", "/calculators/age-calculator"],
  ["🧮", "Percentage Calculator", "/calculators/percentage-calculator"],
  ["🧮", "Loan Eligibility Calculator", "/calculators/loan-eligibility-calculator"],
] as const;

const menus = [
  { key: "finance", icon: "💰", label: "Finance", links: [["FD Calculator", "/finance/fd-calculator"], ["RD Calculator", "/finance/rd-calculator"], ["PPF Calculator", "/finance/ppf-calculator"], ["NPS Calculator", "/finance/nps-calculator"], ["Gratuity Calculator", "/finance/gratuity-calculator"], ["HRA Calculator", "/finance/hra-calculator"], ["EPF Calculator", "/finance/epf-calculator"]] },
  { key: "dev", icon: "</>", label: "Developer", links: [["JSON Formatter", "/dev/json-formatter"], ["JSON Validator", "/dev/json-validator"], ["Base64 Encoder", "/dev/base64-encoder"], ["URL Encoder", "/dev/url-encoder"], ["UUID Generator", "/dev/uuid-generator"], ["Password Generator", "/dev/password-generator"], ["Google Doc to HTML", "/dev/google-doc-to-html"]] },
  { key: "seo", icon: "⌕", label: "SEO", links: [["Meta Tag Generator", "/seo/meta-tag-generator"], ["Robots.txt Generator", "/seo/robots-txt-generator"], ["Sitemap Generator", "/seo/sitemap-generator"]] },
  { key: "files", icon: "📄", label: "Files", links: [["PDF Compressor", "/files/pdf-compressor"], ["PDF Merger", "/files/pdf-merger"], ["PDF Splitter", "/files/pdf-splitter"], ["JPG → PNG", "/files/jpg-to-png"], ["PNG → JPG", "/files/png-to-jpg"], ["Image Resizer", "/files/image-resizer"], ["JPG → PDF", "/files/jpg-to-pdf"]] },
] as const;

export default function SiteHeader() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);

  const closeMenus = () => {
    setOpen(null);
    setMobile(false);
  };

  return (
    <header className="site-header">
      <div className="container">
        <div className="site-header-main">
          <Link href="/" className="site-brand" onClick={closeMenus}>
            <span className="site-brand-mark">CI</span>
            <span>Calc<span className="site-brand-accent">India</span></span>
          </Link>

          <nav className="site-desktop-nav" aria-label="Primary navigation">
            <NavDropdown
              label="Calculators"
              icon="🧮"
              links={calculatorLinks.map((x) => [x[1], x[2]])}
              open={open === "calculators"}
              onClick={() => setOpen(open === "calculators" ? null : "calculators")}
              onClose={() => setOpen(null)}
              wide
            />

            {menus.map((menu) => (
              <NavDropdown
                key={menu.key}
                label={menu.label}
                icon={menu.icon}
                links={menu.links.map((x) => [x[0], x[1]])}
                open={open === menu.key}
                onClick={() => setOpen(open === menu.key ? null : menu.key)}
                onClose={() => setOpen(null)}
              />
            ))}

            <Link className="site-nav-link" href="/about">About</Link>
            <Link className="site-header-cta" href="/calculators">Start Calculating →</Link>
          </nav>

          <button
            type="button"
            className="site-mobile-button"
            onClick={() => { setMobile(!mobile); setOpen(null); }}
            aria-label={mobile ? "Close navigation" : "Open navigation"}
            aria-expanded={mobile}
          >
            {mobile ? "✕" : "☰"}
          </button>
        </div>

        {mobile && (
          <div className="site-mobile-menu">
            <Link href="/calculators" className="site-mobile-link" onClick={closeMenus}>🧮 Calculators</Link>
            <Link href="/finance" className="site-mobile-link" onClick={closeMenus}>💰 Finance</Link>
            <Link href="/dev" className="site-mobile-link" onClick={closeMenus}>&lt;/&gt; Developer</Link>
            <Link href="/seo" className="site-mobile-link" onClick={closeMenus}>⌕ SEO Tools</Link>
            <Link href="/files" className="site-mobile-link" onClick={closeMenus}>📄 File Tools</Link>
            <Link href="/about" className="site-mobile-link" onClick={closeMenus}>ℹ About</Link>
            <Link href="/calculators" className="site-mobile-cta" onClick={closeMenus}>Start Calculating →</Link>
          </div>
        )}
      </div>
    </header>
  );
}

function NavDropdown({
  label,
  icon,
  links,
  open,
  onClick,
  onClose,
  wide = false,
}: {
  label: string;
  icon: string;
  links: string[][];
  open: boolean;
  onClick: () => void;
  onClose: () => void;
  wide?: boolean;
}) {
  return (
    <div className="site-dropdown">
      <button type="button" onClick={onClick} className={`site-dropdown-button ${open ? "is-open" : ""}`} aria-expanded={open}>
        <span>{icon}</span>
        <span>{label}</span>
        <span className="site-dropdown-arrow">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className={`site-dropdown-panel ${wide ? "site-dropdown-wide" : ""}`}>
          <div className="site-dropdown-grid">
            {links.map(([title, href]) => (
              <Link href={href} key={href} onClick={onClose} className="site-dropdown-link">
                {title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
