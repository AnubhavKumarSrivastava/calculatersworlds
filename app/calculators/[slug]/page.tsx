import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  tools,
  categoryPath,
  getToolsByCategory,
} from "@/lib/tools";

import ToolShell from "@/components/ToolShell";
import ToolContent from "@/components/ToolContent";
import CalculatorEngine from "@/components/CalculatorEngine";

export const revalidate = 3600;

const CATEGORY = "calculators" as const;

/**
 * Generate all calculator URLs at build time.
 *
 * /calculators/salary-hike-calculator
 * /calculators/emi-calculator
 * /calculators/sip-calculator
 * etc.
 */
export function generateStaticParams() {
  return getToolsByCategory(CATEGORY).map((tool) => ({
    slug: tool.slug,
  }));
}

/**
 * SEO metadata for each calculator page.
 *
 * title       = calculator page title
 * description = calculator page description
 * canonical   = canonical calculator URL
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const tool = tools[slug];

  if (!tool || tool.category !== CATEGORY) {
    return {
      title: "Calculator",
      description: "Free online calculator.",
    };
  }

  return {
    title: tool.title,
    description: tool.description,
    alternates: {
      canonical: categoryPath(tool, slug),
    },
    openGraph: {
      title: tool.title,
      description: tool.description,
      url: categoryPath(tool, slug),
      type: "website",
    },
  };
}

/**
 * Calculator detail page.
 */
export default async function CalculatorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const tool = tools[slug];

  /*
   * This route is ONLY for calculator tools.
   *
   * Do not compare tool.category with:
   * "dev"
   * "seo"
   * "files"
   *
   * after this check. TypeScript correctly knows that
   * those categories are impossible here.
   */
  if (!tool || tool.category !== CATEGORY) {
    notFound();
  }

  return (
    <>
      <ToolShell
        title={tool.title}
        description={tool.description}
        category={CATEGORY}
      >
        <CalculatorEngine kind={tool.kind} />
      </ToolShell>

      <ToolContent
        slug={slug}
        tool={tool}
      />
    </>
  );
}