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
    "A professional India-focused collection of calculators, finance tools, developer utilities, SEO tools and file tools.",

  robots: {
    index: false,
    follow: false,
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

        {children}

        <SiteFooter />

        <WhatsAppFloat />
      </body>
    </html>
  );
}