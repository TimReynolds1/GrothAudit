import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { brand } from "@/lib/brand";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display"
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body"
});

export const metadata: Metadata = {
  title: `${brand.firmName} | ${brand.productName}`,
  description: `${brand.productName} from ${brand.firmName}. ${brand.tagline}`
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${manrope.variable} font-[family-name:var(--font-body)]`}
      >
        {children}
      </body>
    </html>
  );
}
