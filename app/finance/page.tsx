import type { Metadata } from "next";
import Link from "next/link";

import { getToolsByCategory } from "@/lib/tools";

export const revalidate = 3600;

const CATEGORY = "finance" as const;

export const metadata: Metadata = {
  title: "Finance Calculators",
  description:
    "Free finance calculators for FD, RD, PPF, NPS, gratuity, HRA, EPF, compound interest, inflation and more.",
  alternates: {
    canonical: "/finance",
  },
};

export default function FinancePage() {
  const financeTools = getToolsByCategory(CATEGORY);

  return (
    <main className="min-h-screen">
      <section className="container py-16">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-400">
            Finance Hub
          </p>

          <h1 className="mt-4 text-4xl font-black text-white md:text-6xl">
            Finance Calculators
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-400">
            Explore FD, RD, PPF, NPS, gratuity, HRA, EPF, compound interest,
            inflation and other financial planning tools.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {financeTools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/finance/${tool.slug}`}
              className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:-translate-y-1 hover:border-emerald-400/30"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-white group-hover:text-emerald-300">
                    {tool.title}
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {tool.description}
                  </p>
                </div>

                <span className="text-emerald-400">→</span>
              </div>
            </Link>
          ))}
        </div>

        <section className="mt-20">
          <h2 className="text-2xl font-black text-white">
            Explore Other Categories
          </h2>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/calculators" className="category-link">
              🧮 Calculators
            </Link>

            <Link href="/dev" className="category-link">
              {"{}"} Developer
            </Link>

            <Link href="/seo" className="category-link">
              # SEO
            </Link>

            <Link href="/files" className="category-link">
              📁 Files
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}