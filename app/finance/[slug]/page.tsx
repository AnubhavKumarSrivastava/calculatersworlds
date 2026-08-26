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

const CATEGORY = "finance" as const;

export function generateStaticParams() {
  return getToolsByCategory(CATEGORY).map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const tool = tools[slug];

  if (!tool || tool.category !== CATEGORY) {
    return {
      title: "Finance Calculator",
      description: "Free online finance calculator.",
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

export default async function FinanceToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const tool = tools[slug];

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