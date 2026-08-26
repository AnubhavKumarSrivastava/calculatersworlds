import Link from "next/link";

const calculatorLinks = [
  ["Salary Hike Calculator", "/calculators/salary-hike-calculator"],
  ["EMI Calculator", "/calculators/emi-calculator"],
  ["SIP Calculator", "/calculators/sip-calculator"],
  ["GST Calculator", "/calculators/gst-calculator"],
  ["Income Tax Calculator", "/calculators/income-tax-calculator"],
  ["Age Calculator", "/calculators/age-calculator"],
  ["Percentage Calculator", "/calculators/percentage-calculator"],
  ["Loan Eligibility Calculator", "/calculators/loan-eligibility-calculator"],
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
  ["UUID Generator", "/dev/uuid-generator"],
  ["URL Encoder", "/dev/url-encoder"],
  ["Password Generator", "/dev/password-generator"],
  ["Google Doc to HTML", "/dev/google-doc-to-html"],
];

const seoLinks = [
  ["Meta Tag Generator", "/seo/meta-tag-generator"],
  ["Robots.txt Generator", "/seo/robots-txt-generator"],
  ["Sitemap Generator", "/seo/sitemap-generator"],
];

const fileLinks = [
  ["Image Compressor", "/files/image-compressor"],
  ["Image Resizer", "/files/image-resizer"],
  ["PDF Compressor", "/files/pdf-compressor"],
  ["PDF Merger", "/files/pdf-merger"],
  ["PDF Splitter", "/files/pdf-splitter"],
  ["JPG to PDF", "/files/jpg-to-pdf"],
  ["Resume Builder", "/files/resume-builder"],
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: string[][];
}) {
  return (
    <div>
      <h3 className="text-sm font-bold uppercase tracking-wider text-white">
        {title}
      </h3>

      <ul className="mt-4 space-y-2.5">
        {links.map(([label, href]) => (
          <li key={href}>
            <Link
              href={href}
              className="text-sm text-slate-500 transition-colors duration-200 hover:text-cyan-300"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SiteFooter() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-white/10 bg-[#020617]">
      {/* Animated jungle/background decorations */}
      <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 animate-float rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 top-20 h-96 w-96 animate-float rounded-full bg-violet-500/10 blur-3xl" />

      <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-emerald-500/5 blur-3xl" />

      {/* Decorative symbols */}
      <div className="pointer-events-none absolute left-[5%] top-12 hidden text-3xl opacity-20 md:block">
        🌿
      </div>

      <div className="pointer-events-none absolute right-[8%] top-20 hidden text-3xl opacity-20 md:block">
        🍃
      </div>

      <div className="container relative py-14">
        {/* Main footer grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="group inline-flex items-center gap-3"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-cyan-300 via-blue-500 to-violet-600 font-black text-white shadow-[0_0_35px_rgba(34,211,238,0.2)] transition duration-300 group-hover:rotate-3 group-hover:scale-105">
                CI
              </span>

              <span className="text-xl font-black text-white">
                Calc<span className="text-cyan-300">India</span>
              </span>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-slate-500">
              Smart calculators, finance tools, developer utilities, SEO tools
              and file tools — all in one place.
            </p>

            <Link
              href="/calculators"
              className="mt-6 inline-flex rounded-xl border border-cyan-400/20 bg-cyan-400/5 px-4 py-2.5 text-sm font-semibold text-cyan-300 transition hover:border-cyan-300/40 hover:bg-cyan-400/10"
            >
              Explore Tools →
            </Link>
          </div>

          {/* Calculators */}
          <FooterColumn
            title="Calculators"
            links={calculatorLinks}
          />

          {/* Finance */}
          <FooterColumn
            title="Finance"
            links={financeLinks}
          />

          {/* Developer */}
          <FooterColumn
            title="Developer"
            links={developerLinks}
          />

          {/* SEO + Files */}
          <div>
            <FooterColumn title="SEO" links={seoLinks} />

            <div className="mt-8">
              <FooterColumn title="Files" links={fileLinks} />
            </div>
          </div>
        </div>

        {/* Category navigation */}
        <div className="mt-12 grid gap-3 border-y border-white/10 py-6 sm:grid-cols-2 lg:grid-cols-5">
          <Link
            href="/calculators"
            className="rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-center text-sm font-semibold text-slate-400 transition hover:border-cyan-400/20 hover:bg-cyan-400/5 hover:text-cyan-300"
          >
            🧮 All Calculators
          </Link>

          <Link
            href="/finance"
            className="rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-center text-sm font-semibold text-slate-400 transition hover:border-cyan-400/20 hover:bg-cyan-400/5 hover:text-cyan-300"
          >
            💰 Finance
          </Link>

          <Link
            href="/dev"
            className="rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-center text-sm font-semibold text-slate-400 transition hover:border-cyan-400/20 hover:bg-cyan-400/5 hover:text-cyan-300"
          >
            👨‍💻 Developer
          </Link>

          <Link
            href="/seo"
            className="rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-center text-sm font-semibold text-slate-400 transition hover:border-cyan-400/20 hover:bg-cyan-400/5 hover:text-cyan-300"
          >
            🔎 SEO
          </Link>

          <Link
            href="/files"
            className="rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-center text-sm font-semibold text-slate-400 transition hover:border-cyan-400/20 hover:bg-cyan-400/5 hover:text-cyan-300"
          >
            📁 File Tools
          </Link>
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-4 pt-7 text-xs text-slate-600 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} CalcIndia. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-5">
            <Link
              href="/about"
              className="transition hover:text-cyan-300"
            >
              About
            </Link>

            <Link
              href="/calculators"
              className="transition hover:text-cyan-300"
            >
              Calculators
            </Link>

            <Link
              href="/dev"
              className="transition hover:text-cyan-300"
            >
              Developer Tools
            </Link>

            <Link
              href="/seo"
              className="transition hover:text-cyan-300"
            >
              SEO Tools
            </Link>

            <Link
              href="/files"
              className="transition hover:text-cyan-300"
            >
              File Tools
            </Link>
          </div>
        </div>

        {/* Small animated decoration */}
        <div className="pointer-events-none mt-8 flex justify-center text-2xl opacity-40">
          🌱 ─── 🌿 ─── 🍃 ─── 🌿 ─── 🌱
        </div>
      </div>
    </footer>
  );
}