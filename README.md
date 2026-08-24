# CalcIndia — Category Structure v4

## Canonical URL architecture

- /calculators/salary-hike-calculator
- /calculators/emi-calculator
- /calculators/sip-calculator
- /calculators/gst-calculator
- /calculators/income-tax-calculator
- /calculators/age-calculator
- /calculators/percentage-calculator
- /finance/fd-calculator
- /finance/rd-calculator
- /finance/ppf-calculator
- /finance/nps-calculator
- /dev/json-formatter
- /dev/json-validator
- /dev/base64-encoder
- /dev/uuid-generator
- /seo/meta-tag-generator
- /seo/robots-txt-generator
- /seo/sitemap-generator
- /files/*

## Page content structure

Every inner page has:
1. Category-specific hero heading + short description
2. Interactive tool
3. What is this tool?
4. How it works / step-by-step
5. Formula or technical logic
6. Important points / assumptions
7. FAQ
8. Related internal links
9. Category CTA

## Visual system

Home keeps its existing jungle identity and does not add moving animals.
Inner calculator pages use mathematical symbols and calculation visuals.
Finance pages use money/finance symbols.
Developer pages use code/terminal symbols.
SEO pages use search/metadata symbols.
File pages use PDF/image/upload symbols.

## Run

npm install
npm run dev

Replace https://www.calcindia.example in sitemap/metadata with the production domain.

## URL architecture
All tools use /calculators, /finance, /dev, /seo and /files canonical routes. Legacy developer/file-tools routes redirect permanently. Pages use static generation/revalidation and cache headers. Set NEXT_PUBLIC_SITE_URL to the real production domain.
