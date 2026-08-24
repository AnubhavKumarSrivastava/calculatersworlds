"use client";

import Link from "next/link";
import { useState } from "react";

type MenuName =
  | "calculators"
  | "finance"
  | "dev"
  | "seo"
  | "files"
  | null;

const calculatorLinks = [
  {
    title: "Salary Hike Calculator",
    href: "/calculators/salary-hike-calculator",
  },
  {
    title: "EMI Calculator",
    href: "/calculators/emi-calculator",
  },
  {
    title: "SIP Calculator",
    href: "/calculators/sip-calculator",
  },
  {
    title: "GST Calculator",
    href: "/calculators/gst-calculator",
  },
  {
    title: "Income Tax Calculator",
    href: "/calculators/income-tax-calculator",
  },
  {
    title: "Age Calculator",
    href: "/calculators/age-calculator",
  },
  {
    title: "Percentage Calculator",
    href: "/calculators/percentage-calculator",
  },
  {
    title: "Loan Eligibility Calculator",
    href: "/calculators/loan-eligibility-calculator",
  },
];

const financeLinks = [
  ["FD Calculator", "/finance/fd-calculator"],
  ["RD Calculator", "/finance/rd-calculator"],
  ["PPF Calculator", "/finance/ppf-calculator"],
  ["NPS Calculator", "/finance/nps-calculator"],
  ["Gratuity Calculator", "/finance/gratuity-calculator"],
  ["HRA Calculator", "/finance/hra-calculator"],
  ["EPF Calculator", "/finance/epf-calculator"],
];

const developerLinks = [
  ["JSON Formatter", "/dev/json-formatter"],
  ["JSON Validator", "/dev/json-validator"],
  ["Base64 Encoder", "/dev/base64-encoder"],
  ["URL Encoder", "/dev/url-encoder"],
  ["UUID Generator", "/dev/uuid-generator"],
  ["Password Generator", "/dev/password-generator"],
  ["Google Doc to HTML", "/dev/google-doc-to-html"],
];

const seoLinks = [
  ["Meta Tag Generator", "/seo/meta-tag-generator"],
  ["Robots.txt Generator", "/seo/robots-txt-generator"],
  ["Sitemap Generator", "/seo/sitemap-generator"],
];

const fileLinks = [
  ["PDF Compressor", "/files/pdf-compressor"],
  ["PDF Merger", "/files/pdf-merger"],
  ["PDF Splitter", "/files/pdf-splitter"],
  ["Image Compressor", "/files/image-compressor"],
  ["Image Resizer", "/files/image-resizer"],
  ["JPG to PDF", "/files/jpg-to-pdf"],
];

export default function SiteHeader() {
  const [activeMenu, setActiveMenu] = useState<MenuName>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMenu = (menu: MenuName) => {
    setActiveMenu((current) => (current === menu ? null : menu));
  };

  const closeMenu = () => {
    setActiveMenu(null);
  };

  return (
    <header className="sticky top-0 z-[100] border-b border-white/10 bg-[#020a07]/95 backdrop-blur-2xl">
      <div className="container">
        {/* ================= HEADER ================= */}

        <div className="flex h-[76px] items-center justify-between gap-6">
          {/* LOGO */}

          <Link
            href="/"
            onClick={closeMenu}
            className="group flex shrink-0 items-center gap-3"
          >
            <span
              className="
                relative grid h-11 w-11 place-items-center
                overflow-hidden rounded-2xl
                bg-gradient-to-br from-emerald-400
                via-green-500 to-cyan-500
                shadow-[0_0_30px_rgba(16,185,129,.25)]
                transition duration-300
                group-hover:scale-105
                group-hover:rotate-3
              "
            >
              <span className="relative text-lg">🌴</span>
            </span>

            <span className="text-xl font-black tracking-tight text-white">
              Calc<span className="text-emerald-400">India</span>
            </span>
          </Link>

          {/* ================= DESKTOP NAV ================= */}

          <nav className="hidden items-center gap-1 lg:flex">
            {/* CALCULATORS */}

            <CalculatorMenu
              open={activeMenu === "calculators"}
              onClick={() => toggleMenu("calculators")}
              onClose={closeMenu}
            />

            {/* FINANCE */}

            <HeaderDropdown
              name="finance"
              icon="₹"
              label="Finance"
              links={financeLinks}
              activeMenu={activeMenu}
              setActiveMenu={setActiveMenu}
            />

            {/* DEV */}

            <HeaderDropdown
              name="dev"
              icon="{}"
              label="Dev"
              links={developerLinks}
              activeMenu={activeMenu}
              setActiveMenu={setActiveMenu}
            />

            {/* SEO */}

            <HeaderDropdown
              name="seo"
              icon="#"
              label="SEO"
              links={seoLinks}
              activeMenu={activeMenu}
              setActiveMenu={setActiveMenu}
            />

            {/* FILES */}

            <HeaderDropdown
              name="files"
              icon="📁"
              label="Files"
              links={fileLinks}
              activeMenu={activeMenu}
              setActiveMenu={setActiveMenu}
            />
          </nav>

          {/* ================= MOBILE BUTTON ================= */}

          <button
            type="button"
            onClick={() => {
              setMobileOpen((value) => !value);
              setActiveMenu(null);
            }}
            className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-white lg:hidden"
            aria-label="Toggle navigation"
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* ================= MOBILE MENU ================= */}

        {mobileOpen && (
          <div className="border-t border-white/10 py-4 lg:hidden">
            <div className="grid gap-2">
              <MobileLink
                href="/calculators"
                label="🧮 Calculators"
                onClick={() => setMobileOpen(false)}
              />

              <MobileLink
                href="/finance"
                label="₹ Finance"
                onClick={() => setMobileOpen(false)}
              />

              <MobileLink
                href="/dev"
                label="{} Developer"
                onClick={() => setMobileOpen(false)}
              />

              <MobileLink
                href="/seo"
                label="# SEO Tools"
                onClick={() => setMobileOpen(false)}
              />

              <MobileLink
                href="/files"
                label="📁 File Tools"
                onClick={() => setMobileOpen(false)}
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

/* ============================================================
   CALCULATOR MENU
============================================================ */

function CalculatorMenu({
  open,
  onClick,
  onClose,
}: {
  open: boolean;
  onClick: () => void;
  onClose: () => void;
}) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onClick}
        className={`
          flex items-center gap-2 rounded-xl px-4 py-2.5
          text-sm font-semibold transition
          ${
            open
              ? "bg-emerald-400/10 text-emerald-300"
              : "text-slate-300 hover:bg-white/5 hover:text-white"
          }
        `}
      >
        <span>🧮</span>

        <span>Calculators</span>

        <span
          className={`text-xs transition-transform ${
            open ? "rotate-180" : ""
          }`}
        >
          ▾
        </span>
      </button>

      {open && (
        <div className="absolute right-0 top-[58px] w-[650px] animate-pop">
          <div
            className="
              rounded-3xl
              border border-emerald-400/20
              bg-[#07130f]/98
              p-5
              shadow-[0_25px_80px_rgba(0,0,0,.65)]
              backdrop-blur-2xl
            "
          >
            {/* Heading */}

            <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[.18em] text-emerald-400">
                  Calculator Hub
                </p>

                <h3 className="mt-1 text-lg font-bold text-white">
                  Popular Calculators
                </h3>
              </div>

              <Link
                href="/calculators"
                onClick={onClose}
                className="rounded-xl bg-emerald-400/10 px-3 py-2 text-xs font-bold text-emerald-300 transition hover:bg-emerald-400/20"
              >
                View All →
              </Link>
            </div>

            {/* Calculator links */}

            <div className="grid grid-cols-2 gap-2">
              {calculatorLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="
                    group rounded-xl
                    border border-white/5
                    bg-white/[0.025]
                    p-3
                    transition duration-200
                    hover:border-emerald-400/20
                    hover:bg-emerald-400/[0.06]
                  "
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-slate-300 group-hover:text-white">
                      {item.title}
                    </span>

                    <span className="translate-x-1 text-emerald-400 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100">
                      →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   GENERIC HEADER DROPDOWN
============================================================ */

function HeaderDropdown({
  name,
  icon,
  label,
  links,
  activeMenu,
  setActiveMenu,
}: {
  name: Exclude<MenuName, "calculators" | null>;
  icon: string;
  label: string;
  links: string[][];
  activeMenu: MenuName;
  setActiveMenu: (menu: MenuName) => void;
}) {
  const open = activeMenu === name;

  const toggle = () => {
    setActiveMenu(open ? null : name);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={toggle}
        className={`
          flex items-center gap-2 rounded-xl px-4 py-2.5
          text-sm font-semibold transition
          ${
            open
              ? "bg-emerald-400/10 text-emerald-300"
              : "text-slate-300 hover:bg-white/5 hover:text-white"
          }
        `}
      >
        <span>{icon}</span>

        <span>{label}</span>

        <span
          className={`text-xs transition-transform ${
            open ? "rotate-180" : ""
          }`}
        >
          ▾
        </span>
      </button>

      {open && (
        <div className="absolute right-0 top-[58px] w-72 animate-pop">
          <div
            className="
              rounded-2xl
              border border-white/10
              bg-[#07130f]/98
              p-3
              shadow-[0_25px_70px_rgba(0,0,0,.65)]
              backdrop-blur-2xl
            "
          >
            {links.map(([title, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setActiveMenu(null)}
                className="
                  group flex items-center justify-between
                  rounded-xl px-3 py-3
                  text-sm text-slate-400
                  transition
                  hover:bg-emerald-400/10
                  hover:text-white
                "
              >
                <span>{title}</span>

                <span
                  className="
                    translate-x-1 text-emerald-400
                    opacity-0 transition
                    group-hover:translate-x-0
                    group-hover:opacity-100
                  "
                >
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   MOBILE LINK
============================================================ */

function MobileLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="
        rounded-xl
        border border-white/5
        bg-white/[0.03]
        px-4 py-3
        text-sm font-semibold
        text-slate-300
        transition
        hover:bg-emerald-400/10
        hover:text-emerald-300
      "
    >
      {label}
    </Link>
  );
}