import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { tools, categoryPath, getToolsByCategory } from "@/lib/tools";
import ToolShell from "@/components/ToolShell";
import ToolContent from "@/components/ToolContent";
import FileEngine from "@/components/FileEngine";
import ResumeBuilder from "@/components/ResumeBuilder";

export const revalidate = 3600;
const CATEGORY = "files" as const;

export function generateStaticParams() {
  return getToolsByCategory(CATEGORY).map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = tools[slug];
  if (!tool || tool.category !== CATEGORY) return { title: "File Tool", description: "Free online file tool." };
  return { title: tool.title, description: tool.description, alternates: { canonical: categoryPath(tool, slug) }, openGraph: { title: tool.title, description: tool.description, url: categoryPath(tool, slug), type: "website" } };
}

export default async function FileToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = tools[slug];
  if (!tool || tool.category !== CATEGORY) notFound();
  return <>
    <ToolShell title={tool.title} description={tool.description} category={CATEGORY}>
      {tool.kind === "resume" ? <ResumeBuilder /> : <FileEngine kind={tool.kind} slug={slug} />}
    </ToolShell>
    <ToolContent slug={slug} tool={tool} />
  </>;
}
