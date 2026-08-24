import type { Metadata } from "next";
import "./globals.css";

import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.calcindia.example"
  ),

  title: {
    default: "CalcIndia — Smart Calculators & Tools",
    template: "%s | CalcIndia",
  },

  description:
    "A jungle-themed India-focused collection of calculators, developer utilities, SEO tools and file tools.",

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />

        <main>{children}</main>

        <SiteFooter />

        <WhatsAppFloat />
      </body>
    </html>
  );
}