import type { Metadata } from "next";
import Link from "next/link";

import { getToolsByCategory } from "@/lib/tools";

export const revalidate = 3600;

const CATEGORY = "seo" as const;

export const metadata: Metadata = {
  title: "SEO Tools",
  description:
    "Free SEO tools including meta tag generator, robots.txt generator and XML sitemap generator.",
  alternates: {
    canonical: "/seo",
  },
};

export default function SeoPage() {
  const seoTools = getToolsByCategory(CATEGORY);

  return (
    <main className="min-h-screen">
      <section className="container py-16">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-[#2563eb]">
            SEO Hub
          </p>

          <h1 className="mt-4 text-4xl font-black text-[#172033] md:text-6xl">
            SEO Tools
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-400">
            Generate meta tags, robots.txt files and XML sitemaps with simple
            browser-based SEO utilities.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {seoTools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/seo/${tool.slug}`}
              className="group rounded-3xl border border-[#e5eaf1] bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,.035)] transition duration-300 hover:-translate-y-1 hover:border-[#bfdbfe] hover:shadow-[0_18px_50px_rgba(37,99,235,.09)]"
            >
              <h2 className="text-lg font-bold text-[#172033] group-hover:text-[#2563eb]">
                {tool.title}
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                {tool.description}
              </p>

              <div className="mt-5 text-sm font-bold text-[#2563eb]">
                Open Tool →
              </div>
            </Link>
          ))}
        </div>

        <section className="mt-20">
          <h2 className="text-2xl font-black text-[#172033]">
            Explore More
          </h2>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/calculators" className="rounded-xl border border-[#e5eaf1] bg-white px-4 py-3 text-sm text-[#667085] transition hover:border-[#bfdbfe] hover:text-[#2563eb]">
              🧮 Calculators
            </Link>

            <Link href="/finance" className="rounded-xl border border-[#e5eaf1] bg-white px-4 py-3 text-sm text-[#667085] transition hover:border-[#bfdbfe] hover:text-[#2563eb]">
              ₹ Finance
            </Link>

            <Link href="/dev" className="rounded-xl border border-[#e5eaf1] bg-white px-4 py-3 text-sm text-[#667085] transition hover:border-[#bfdbfe] hover:text-[#2563eb]">
              {"{}"} Developer
            </Link>

            <Link href="/files" className="rounded-xl border border-[#e5eaf1] bg-white px-4 py-3 text-sm text-[#667085] transition hover:border-[#bfdbfe] hover:text-[#2563eb]">
              📁 Files
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}
