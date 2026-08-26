"use client";

import Link from "next/link";
import { useState } from "react";

type MenuName = "calculators" | "finance" | "dev" | "seo" | "files" | null;

type MenuItem = { title: string; href: string };

const menus: Record<Exclude<MenuName, null>, { icon: string; label: string; links: MenuItem[] }> = {
  calculators: {
    icon: "🧮",
    label: "Calculators",
    links: [
      ["Salary Hike Calculator", "/calculators/salary-hike-calculator"],
      ["EMI Calculator", "/calculators/emi-calculator"],
      ["SIP Calculator", "/calculators/sip-calculator"],
      ["GST Calculator", "/calculators/gst-calculator"],
      ["Income Tax Calculator", "/calculators/income-tax-calculator"],
      ["Age Calculator", "/calculators/age-calculator"],
      ["Percentage Calculator", "/calculators/percentage-calculator"],
      ["Loan Eligibility Calculator", "/calculators/loan-eligibility-calculator"],
    ].map(([title, href]) => ({ title, href })),
  },
  finance: {
    icon: "💰",
    label: "Finance",
    links: [
      ["FD Calculator", "/finance/fd-calculator"],
      ["RD Calculator", "/finance/rd-calculator"],
      ["PPF Calculator", "/finance/ppf-calculator"],
      ["NPS Calculator", "/finance/nps-calculator"],
      ["Gratuity Calculator", "/finance/gratuity-calculator"],
      ["HRA Calculator", "/finance/hra-calculator"],
      ["EPF Calculator", "/finance/epf-calculator"],
      ["Compound Interest Calculator", "/finance/compound-interest-calculator"],
    ].map(([title, href]) => ({ title, href })),
  },
  dev: {
    icon: "</>",
    label: "Developer",
    links: [
      ["JSON Formatter", "/dev/json-formatter"],
      ["JSON Validator", "/dev/json-validator"],
      ["Base64 Encoder", "/dev/base64-encoder"],
      ["URL Encoder", "/dev/url-encoder"],
      ["UUID Generator", "/dev/uuid-generator"],
      ["Password Generator", "/dev/password-generator"],
      ["Google Doc to HTML", "/dev/google-doc-to-html"],
    ].map(([title, href]) => ({ title, href })),
  },
  seo: {
    icon: "⌕",
    label: "SEO",
    links: [
      ["Meta Tag Generator", "/seo/meta-tag-generator"],
      ["Robots.txt Generator", "/seo/robots-txt-generator"],
      ["Sitemap Generator", "/seo/sitemap-generator"],
    ].map(([title, href]) => ({ title, href })),
  },
  files: {
    icon: "📄",
    label: "Files",
    links: [
      ["PDF Compressor", "/files/pdf-compressor"],
      ["PDF Merger", "/files/pdf-merger"],
      ["PDF Splitter", "/files/pdf-splitter"],
      ["Image Compressor", "/files/image-compressor"],
      ["Image Resizer", "/files/image-resizer"],
      ["JPG to PDF", "/files/jpg-to-pdf"],
    ].map(([title, href]) => ({ title, href })),
  },
};

export default function SiteHeader() {
  const [activeMenu, setActiveMenu] = useState<MenuName>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="site-header" onMouseLeave={() => setActiveMenu(null)}>
      <div className="site-header-inner">
        <Link href="/" className="site-logo" onClick={() => setMobileOpen(false)}>
          <span className="site-logo-mark">CI</span>
          <span className="site-logo-text">Calc<span>India</span></span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {(Object.entries(menus) as [Exclude<MenuName, null>, (typeof menus)[Exclude<MenuName, null>]][]).map(([name, menu]) => (
            <div
              key={name}
              className="nav-menu"
              onMouseEnter={() => setActiveMenu(name)}
            >
              <Link
                href={`/${name === "dev" ? "dev" : name}`}
                className={`nav-trigger ${activeMenu === name ? "is-active" : ""}`}
              >
                <span>{menu.icon}</span>
                <span>{menu.label}</span>
                <span className="nav-chevron">▼</span>
              </Link>

              <div className={`nav-dropdown ${activeMenu === name ? "is-open" : ""}`}>
                <div className="nav-dropdown-title">
                  <div>
                    <span className="nav-dropdown-kicker">CALCINDIA</span>
                    <strong>{menu.label} Tools</strong>
                  </div>
                  <Link href={`/${name}`} onClick={() => setActiveMenu(null)}>View all →</Link>
                </div>
                <div className={name === "calculators" ? "nav-dropdown-grid" : "nav-dropdown-list"}>
                  {menu.links.map((item) => (
                    <Link key={item.href} href={item.href} onClick={() => setActiveMenu(null)} className="nav-dropdown-item">
                      <span>{item.title}</span>
                      <b>→</b>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}

          <Link href="/about" className="nav-link">About</Link>
        </nav>

        <Link href="/calculators" className="header-cta">Start Calculating <span>→</span></Link>

        <button
          type="button"
          className="mobile-menu-button"
          onClick={() => setMobileOpen((value) => !value)}
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {mobileOpen && (
        <div className="mobile-nav">
          {(Object.entries(menus) as [Exclude<MenuName, null>, (typeof menus)[Exclude<MenuName, null>]][]).map(([name, menu]) => (
            <div key={name} className="mobile-nav-group">
              <Link href={`/${name}`} onClick={() => setMobileOpen(false)} className="mobile-nav-title">
                <span>{menu.icon}</span>{menu.label}<b>→</b>
              </Link>
              <div className="mobile-nav-links">
                {menu.links.slice(0, 6).map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>{item.title}</Link>
                ))}
              </div>
            </div>
          ))}
          <Link href="/about" onClick={() => setMobileOpen(false)} className="mobile-nav-title">About <b>→</b></Link>
          <Link href="/calculators" onClick={() => setMobileOpen(false)} className="mobile-nav-cta">Start Calculating →</Link>
        </div>
      )}
    </header>
  );
}
