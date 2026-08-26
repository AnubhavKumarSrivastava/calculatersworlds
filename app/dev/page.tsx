import type { Metadata } from "next";
import Link from "next/link";

import { getToolsByCategory } from "@/lib/tools";

export const revalidate = 3600;

const CATEGORY = "dev" as const;

export const metadata: Metadata = {
  title: "Developer Tools",
  description:
    "Free developer tools including JSON formatter, JSON validator, Base64 encoder, UUID generator, URL encoder and Google Doc to HTML.",
  alternates: {
    canonical: "/dev",
  },
};

export default function DeveloperPage() {
  const developerTools = getToolsByCategory(CATEGORY);

  return (
    <main className="min-h-screen">
      <section className="container py-16">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-400">
            Developer Hub
          </p>

          <h1 className="mt-4 text-4xl font-black text-white md:text-6xl">
            Developer Tools
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-400">
            Useful browser-based utilities for JSON, Base64, URLs, UUIDs,
            HTML, CSS, JavaScript, regex and more.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {developerTools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/dev/${tool.slug}`}
              className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30"
            >
              <h2 className="text-lg font-bold text-white group-hover:text-cyan-300">
                {tool.title}
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                {tool.description}
              </p>

              <div className="mt-5 text-sm font-bold text-cyan-400">
                Open Tool →
              </div>
            </Link>
          ))}
        </div>

        <section className="mt-20">
          <h2 className="text-2xl font-black text-white">
            Explore Other Tools
          </h2>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/calculators" className="category-link">
              🧮 Calculators
            </Link>

            <Link href="/finance" className="category-link">
              ₹ Finance
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