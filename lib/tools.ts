export const CATEGORIES = [
  "calculators",
  "finance",
  "dev",
  "seo",
  "files",
] as const;

export type Category = (typeof CATEGORIES)[number];

export type Tool = {
  slug: string;
  title: string;
  description: string;
  kind: string;
  phase: number;
  category: Category;
  intro: string;
  formula: string;
  tips: string[];
  faq: string[];
};

const make = (
  title: string,
  description: string,
  kind: string,
  phase: number,
  category: Category,
  formula: string,
  intro?: string,
): Omit<Tool, "slug"> => ({
  title,
  description,
  kind,
  phase,
  category,
  intro: intro || description,
  formula,
  tips: [
    "Use accurate inputs and keep units consistent.",
    "Review the assumptions before using the result for a decision.",
    "Compare important results with an independent or official source.",
  ],
  faq: [
    `What is ${title}?`,
    "How is the result calculated?",
    "Can I use this tool on mobile?",
    "Is my data uploaded?",
  ],
});

const toolDefinitions: Record<string, Omit<Tool, "slug">> = {
  // ============================================================
  // PHASE 1 — CALCULATORS
  // ============================================================

  "salary-hike-calculator": make(
    "Salary Hike Calculator",
    "Calculate revised salary after a hike.",
    "salary",
    1,
    "calculators",
    "New salary = Current salary × (1 + Hike ÷ 100).",
    "See your revised annual salary, increase amount and hike percentage in seconds.",
  ),

  "emi-calculator": make(
    "EMI Calculator",
    "Calculate monthly EMI and total loan interest.",
    "emi",
    1,
    "calculators",
    "EMI = P × r × (1+r)^n ÷ ((1+r)^n − 1).",
    "Plan a loan by comparing monthly EMI, tenure and total interest.",
  ),

  "sip-calculator": make(
    "SIP Calculator",
    "Estimate SIP maturity and investment gain.",
    "sip",
    1,
    "calculators",
    "Future value is estimated using monthly contributions, monthly return and compounding periods.",
    "Estimate how regular monthly investing can grow over time.",
  ),

  "gst-calculator": make(
    "GST Calculator",
    "Calculate GST amount and invoice value.",
    "gst",
    1,
    "calculators",
    "GST = Taxable amount × GST rate ÷ 100; invoice value = amount + GST.",
    "Calculate GST instantly for common Indian invoice scenarios.",
  ),

  "income-tax-calculator": make(
    "Income Tax Calculator",
    "Estimate income tax with an illustrative slab calculation.",
    "tax",
    1,
    "calculators",
    "Tax is estimated from taxable income and an illustrative slab model.",
    "Get a quick planning estimate for annual income and deductions.",
  ),

  "age-calculator": make(
    "Age Calculator",
    "Calculate exact age from date of birth.",
    "age",
    1,
    "calculators",
    "The difference between the birth date and current date is calculated in years, months and days.",
    "Calculate your exact age from your date of birth.",
  ),

  "percentage-calculator": make(
    "Percentage Calculator",
    "Calculate percentages quickly.",
    "percentage",
    1,
    "calculators",
    "Percentage = Value × Rate ÷ 100.",
    "Calculate percentages, increases and percentage-based values quickly.",
  ),

  "loan-eligibility-calculator": make(
    "Loan Eligibility Calculator",
    "Estimate borrowing capacity.",
    "eligibility",
    1,
    "calculators",
    "Estimated loan capacity is based on income, obligations, rate and tenure.",
    "Get a quick estimate of possible borrowing capacity.",
  ),

  // ============================================================
  // PHASE 2 — FINANCE
  // ============================================================

  "fd-calculator": make(
    "FD Calculator",
    "Estimate fixed deposit maturity.",
    "fd",
    2,
    "finance",
    "Maturity is estimated using principal, annual rate and quarterly compounding.",
    "Estimate fixed-deposit maturity and interest from your deposit, rate and tenure.",
  ),

  "rd-calculator": make(
    "RD Calculator",
    "Estimate recurring deposit maturity.",
    "rd",
    2,
    "finance",
    "Maturity is estimated from recurring monthly deposits and assumed compounding.",
    "Estimate recurring-deposit maturity from monthly contributions and tenure.",
  ),

  "ppf-calculator": make(
    "PPF Calculator",
    "Estimate PPF maturity.",
    "ppf",
    2,
    "finance",
    "PPF estimate uses annual contributions and an assumed annual rate compounded across tenure.",
    "Plan long-term PPF contributions with a simple maturity estimate.",
  ),

  "nps-calculator": make(
    "NPS Calculator",
    "Estimate NPS corpus.",
    "nps",
    2,
    "finance",
    "NPS estimate uses monthly contributions and an assumed annualized return compounded monthly.",
    "Estimate potential NPS corpus from regular contributions.",
  ),

  "gratuity-calculator": make(
    "Gratuity Calculator",
    "Estimate gratuity.",
    "gratuity",
    2,
    "finance",
    "Estimated gratuity = Last drawn eligible salary × 15 ÷ 26 × completed years.",
    "Estimate gratuity using salary and completed years of service.",
  ),

  "hra-calculator": make(
    "HRA Calculator",
    "Estimate HRA exemption.",
    "hra",
    2,
    "finance",
    "Common HRA exemption is the least of eligible HRA, rent minus 10% of salary, and the applicable salary percentage.",
    "Estimate HRA exemption using salary, HRA and rent inputs.",
  ),

  "epf-calculator": make(
    "EPF Calculator",
    "Estimate EPF corpus.",
    "epf",
    2,
    "finance",
    "Illustrative EPF corpus uses contribution × monthly compounding with an assumed annual interest rate.",
    "Estimate how EPF contributions can grow over a selected period.",
  ),

  "compound-interest-calculator": make(
    "Compound Interest Calculator",
    "Calculate compound interest.",
    "compound",
    2,
    "finance",
    "A = P(1 + r/n)^(nt).",
    "Calculate how principal grows when interest compounds.",
  ),

  "inflation-calculator": make(
    "Inflation Calculator",
    "Estimate future cost after inflation.",
    "inflation",
    2,
    "finance",
    "Future cost = Current cost × (1 + inflation rate)^years.",
    "Understand how inflation can change the future value of money.",
  ),

  "bmi-calculator": make(
    "BMI Calculator",
    "Calculate BMI.",
    "bmi",
    2,
    "finance",
    "BMI = Weight in kilograms ÷ Height in metres².",
    "Calculate BMI from your height and weight.",
  ),

  "date-calculator": make(
    "Date Calculator",
    "Add or subtract days from a date.",
    "date",
    2,
    "finance",
    "Calendar-day arithmetic is applied to the selected start date.",
    "Find a future or past date by adding or subtracting days.",
  ),

  "time-calculator": make(
    "Time Calculator",
    "Add hours and minutes to a time.",
    "time",
    2,
    "finance",
    "Hours and minutes are converted to total minutes and wrapped at 24 hours.",
    "Quickly add or subtract time values.",
  ),

  "discount-calculator": make(
    "Discount Calculator",
    "Calculate discount and final price.",
    "discount",
    2,
    "finance",
    "Discount = Price × Discount rate ÷ 100; final price = Price − Discount.",
    "Calculate savings and final price after a discount.",
  ),

  "profit-loss-calculator": make(
    "Profit & Loss Calculator",
    "Calculate profit or loss.",
    "profit",
    2,
    "finance",
    "Profit/Loss = Selling price − Cost price; percentage = absolute difference ÷ cost price × 100.",
    "Calculate profit, loss and percentage from cost and selling price.",
  ),

  "currency-converter": make(
    "Currency Converter",
    "Convert currencies with demo rates.",
    "currency",
    2,
    "finance",
    "Converted amount = Amount × source-to-base rate ÷ target-to-base rate.",
    "Convert currencies with a starter rate model. Connect live FX data for production.",
  ),

  // ============================================================
  // PHASE 3 — DEVELOPER
  // ============================================================

  "json-formatter": make(
    "JSON Formatter",
    "Format JSON.",
    "json-format",
    3,
    "dev",
    "JSON is parsed and serialized with consistent indentation.",
    "Format JSON into a readable developer-friendly structure.",
  ),

  "json-validator": make(
    "JSON Validator",
    "Validate JSON.",
    "json-validate",
    3,
    "dev",
    "The input is parsed as JSON; parsing success means valid JSON.",
    "Quickly check whether a JSON payload is syntactically valid.",
  ),

  "base64-encoder": make(
    "Base64 Encoder / Decoder",
    "Encode text to Base64.",
    "base64",
    3,
    "dev",
    "UTF-8 text is encoded to Base64.",
    "Convert text to a Base64 representation.",
  ),

  "uuid-generator": make(
    "UUID Generator",
    "Generate UUIDs.",
    "uuid",
    3,
    "dev",
    "A browser cryptographic UUID is generated with crypto.randomUUID().",
    "Generate unique identifiers directly in your browser.",
  ),

  "url-encoder": make(
    "URL Encoder / Decoder",
    "Encode URL components.",
    "url",
    3,
    "dev",
    "URL components are encoded with encodeURIComponent.",
    "Safely encode URL query components.",
  ),

  "password-generator": make(
    "Password Generator",
    "Generate strong random passwords.",
    "password",
    3,
    "dev",
    "Cryptographically secure random values select characters from a strong alphabet.",
    "Generate strong random passwords locally.",
  ),

  "qr-code-generator": make(
    "QR Code Generator",
    "Generate QR codes.",
    "qr",
    3,
    "dev",
    "The supplied text is encoded into a QR image.",
    "Turn a URL or text string into a scannable QR code.",
  ),

  "html-formatter": make(
    "HTML Formatter",
    "Beautify HTML.",
    "html",
    3,
    "dev",
    "HTML tags and whitespace are normalized for a simple readable format.",
    "Make compact HTML easier to inspect.",
  ),

  "css-minifier": make(
    "CSS Minifier",
    "Minify CSS.",
    "css",
    3,
    "dev",
    "Comments and unnecessary whitespace are removed from CSS.",
    "Reduce CSS whitespace for quick testing and sharing.",
  ),

  "js-minifier": make(
    "JS Minifier",
    "Minify basic JavaScript.",
    "js",
    3,
    "dev",
    "Comments and excess whitespace are removed from basic JavaScript.",
    "Quickly minify simple JavaScript snippets.",
  ),

  "regex-tester": make(
    "Regex Tester",
    "Test regular expressions.",
    "regex",
    3,
    "dev",
    "The first line is treated as the regular expression and remaining lines as test text.",
    "Test regular expressions against sample text.",
  ),

  "timestamp-converter": make(
    "Timestamp Converter",
    "Convert Unix timestamps.",
    "timestamp",
    3,
    "dev",
    "Unix seconds are converted to a JavaScript Date and rendered as ISO-8601.",
    "Convert Unix timestamps into readable dates.",
  ),

  "color-converter": make(
    "Color Converter",
    "Convert HEX to RGB.",
    "color",
    3,
    "dev",
    "A six-digit HEX color is converted into RGB channels.",
    "Convert HEX colors to RGB values.",
  ),

  "google-doc-to-html": make(
    "Google Doc to HTML",
    "Convert copied Google Docs content into clean HTML.",
    "google-doc-html",
    3,
    "dev",
    "Google Docs rich text is converted from pasted content into semantic HTML.",
    "Paste content copied from Google Docs and generate cleaner HTML for websites.",
  ),

  // ============================================================
  // PHASE 3 — SEO
  // ============================================================

  "meta-tag-generator": make(
    "Meta Tag Generator",
    "Generate SEO meta tags.",
    "meta",
    3,
    "seo",
    "Title and description values are transformed into basic HTML meta tags.",
    "Create starter title and description tags for SEO.",
  ),

  "robots-txt-generator": make(
    "Robots.txt Generator",
    "Generate robots.txt.",
    "robots",
    3,
    "seo",
    "A standard crawler rule set and sitemap line are generated.",
    "Create a simple robots.txt for a website.",
  ),

  "sitemap-generator": make(
    "Sitemap Generator",
    "Generate XML sitemap.",
    "sitemap",
    3,
    "seo",
    "Each supplied URL becomes a sitemap <url><loc> entry.",
    "Create a starter XML sitemap from your URLs.",
  ),

  // ============================================================
  // PHASE 4 — FILE TOOLS
  // ============================================================

  "image-compressor": make(
    "Image Compressor",
    "Compress images in the browser.",
    "image-compress",
    4,
    "files",
    "The browser reads the image, draws it to canvas and exports an optimized format.",
    "Reduce image size before uploading or sharing.",
  ),

  "image-resizer": make(
    "Image Resizer",
    "Resize images before upload.",
    "image-resize",
    4,
    "files",
    "The image is drawn to a target canvas dimension while preserving its aspect ratio.",
    "Resize images quickly without leaving the browser.",
  ),

  "jpg-to-png": make(
    "JPG → PNG",
    "Convert JPG images to PNG.",
    "jpg-to-png",
    4,
    "files",
    "The source JPG image is decoded and exported as PNG.",
    "Convert JPG images to PNG format.",
  ),

  "png-to-jpg": make(
    "PNG → JPG",
    "Convert PNG images to JPG.",
    "png-to-jpg",
    4,
    "files",
    "The source image is decoded and exported as JPEG.",
    "Convert PNG images to JPG format.",
  ),

  "webp-converter": make(
    "WebP Converter",
    "Convert images to WebP.",
    "image-webp",
    4,
    "files",
    "The image is decoded and exported using the WebP image format.",
    "Create lightweight WebP images for modern websites.",
  ),

  "pdf-compressor": make(
    "PDF Compressor",
    "Re-save PDFs with object streams.",
    "pdf-compress",
    4,
    "files",
    "PDF pages are loaded and written into a new PDF document.",
    "Reduce some PDF overhead with browser-side rewriting.",
  ),

  "pdf-merger": make(
    "PDF Merger",
    "Merge PDFs.",
    "pdf-merge",
    4,
    "files",
    "Pages from selected PDF documents are copied into one PDF.",
    "Combine multiple PDF documents into one file.",
  ),

  "pdf-splitter": make(
    "PDF Splitter",
    "Split a PDF into separate pages.",
    "pdf-split",
    4,
    "files",
    "Each PDF page is copied into a separate output document.",
    "Split a PDF into individual page files.",
  ),

  "pdf-to-jpg": make(
    "PDF → JPG",
    "PDF rasterization integration point.",
    "pdf-jpg",
    4,
    "files",
    "True PDF rasterization requires a dedicated renderer.",
    "Prepare the UI for a production PDF-to-image renderer.",
  ),

  "jpg-to-pdf": make(
    "JPG → PDF",
    "Create a PDF from JPG images.",
    "jpg-pdf",
    4,
    "files",
    "JPG images are embedded as PDF pages.",
    "Turn one or more JPG images into a PDF.",
  ),

  "resume-builder": make(
    "Resume Builder",
    "Create an ATS-friendly resume preview.",
    "resume",
    4,
    "files",
    "Resume fields are rendered into a structured document preview.",
    "Build a clean starter resume layout in your browser.",
  ),
};

/* ============================================================
   PUBLIC TOOL REGISTRY
============================================================ */

export const tools: Record<string, Tool> = Object.fromEntries(
  Object.entries(toolDefinitions).map(([slug, tool]) => [
    slug,
    {
      ...tool,
      slug,
    },
  ]),
) as Record<string, Tool>;

/* ============================================================
   SLUGS
============================================================ */

export const slugs = Object.keys(tools);

/* ============================================================
   TOOL HELPERS
============================================================ */

export function getToolBySlug(slug: string): Tool | undefined {
  return tools[slug];
}

export function getToolsByCategory(
  category: Category,
): Tool[] {
  return Object.values(tools).filter(
    (tool) => tool.category === category,
  );
}

export function getRelatedTools(
  category: Category,
  currentSlug?: string,
): Tool[] {
  return getToolsByCategory(category).filter(
    (tool) => tool.slug !== currentSlug,
  );
}

export function getCrossCategoryTools(
  category: Category,
  currentSlug?: string,
): Tool[] {
  return Object.values(tools).filter(
    (tool) =>
      tool.category !== category &&
      tool.slug !== currentSlug,
  );
}

/* ============================================================
   CATEGORY HELPERS
============================================================ */

export const CATEGORY_LABELS: Record<Category, string> = {
  calculators: "Calculators",
  finance: "Finance",
  dev: "Developer Tools",
  seo: "SEO Tools",
  files: "File Tools",
};

export const CATEGORY_PATHS: Record<Category, string> = {
  calculators: "/calculators",
  finance: "/finance",
  dev: "/dev",
  seo: "/seo",
  files: "/files",
};

export function isCategory(
  value: string,
): value is Category {
  return CATEGORIES.includes(value as Category);
}

/* ============================================================
   URL HELPERS
============================================================ */

export function categoryPath(
  tool: Tool,
  slug: string = tool.slug,
): string {
  return `${CATEGORY_PATHS[tool.category]}/${slug}`;
}

export function toolPath(
  slug: string,
): string | null {
  const tool = getToolBySlug(slug);

  if (!tool) {
    return null;
  }

  return categoryPath(tool);
}

/* ============================================================
   STATIC PARAM HELPERS
============================================================ */

export function getCategorySlugs(
  category: Category,
) {
  return getToolsByCategory(category).map(
    (tool) => ({
      slug: tool.slug,
    }),
  );
}

/* ============================================================
   CATEGORY COUNTS
============================================================ */

export const categoryCounts: Record<Category, number> = {
  calculators: getToolsByCategory("calculators").length,
  finance: getToolsByCategory("finance").length,
  dev: getToolsByCategory("dev").length,
  seo: getToolsByCategory("seo").length,
  files: getToolsByCategory("files").length,
};