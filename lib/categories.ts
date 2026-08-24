export const CATEGORIES = [
  "calculators",
  "finance",
  "dev",
  "seo",
  "files",
] as const;

export type Category = (typeof CATEGORIES)[number];

export function isCategory(value: string): value is Category {
  return CATEGORIES.includes(value as Category);
}

export const CATEGORY_LABELS: Record<Category, string> = {
  calculators: "Calculators",
  finance: "Finance",
  dev: "Developer Tools",
  seo: "SEO Tools",
  files: "File Tools",
};