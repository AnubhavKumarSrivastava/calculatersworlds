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
          <p className="text-sm font-black uppercase tracking-[0.2em] text-[#2563eb]">
            Finance Hub
          </p>

          <h1 className="mt-4 text-4xl font-black text-[#172033] md:text-6xl">
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
              className="group rounded-3xl border border-[#e5eaf1] bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,.035)] transition duration-300 hover:-translate-y-1 hover:border-[#bfdbfe] hover:shadow-[0_18px_50px_rgba(37,99,235,.09)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-[#172033] group-hover:text-[#2563eb]">
                    {tool.title}
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {tool.description}
                  </p>
                </div>

                <span className="text-[#2563eb]">→</span>
              </div>
            </Link>
          ))}
        </div>

        <section className="mt-20">
          <h2 className="text-2xl font-black text-[#172033]">
            Explore Other Categories
          </h2>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/calculators" className="rounded-xl border border-[#e5eaf1] bg-white px-4 py-3 text-sm text-[#667085] transition hover:border-[#bfdbfe] hover:text-[#2563eb]">
              🧮 Calculators
            </Link>

            <Link href="/dev" className="rounded-xl border border-[#e5eaf1] bg-white px-4 py-3 text-sm text-[#667085] transition hover:border-[#bfdbfe] hover:text-[#2563eb]">
              {"{}"} Developer
            </Link>

            <Link href="/seo" className="rounded-xl border border-[#e5eaf1] bg-white px-4 py-3 text-sm text-[#667085] transition hover:border-[#bfdbfe] hover:text-[#2563eb]">
              # SEO
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
