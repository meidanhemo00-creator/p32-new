import type { Metadata } from "next";
import { Archivo, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

// Interim self-hosted display face standing in for Key Grotesk until its
// licensed files arrive (see public/fonts/README.md) — chosen for a
// matching grotesque character, not left as a bare system-font fallback.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

// True on this local dev server and on every Vercel preview deployment;
// automatically false only on the eventual production deployment (Vercel
// sets VERCEL_ENV="production" there) — no manual flag to remember to flip.
const isNonProduction = process.env.VERCEL_ENV !== "production";

export const metadata: Metadata = {
  title: "P32. Sentinel - Intelligence. Security. Peace of mind.",
  description:
    "P32 designs and operates a unified, intelligence-led security architecture for individuals, families, Jewish communities and institutions, and organizations with complex global exposure.",
  ...(isNonProduction && {
    robots: { index: false, follow: false, nocache: true },
  }),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${jetbrainsMono.variable} ${archivo.variable} h-full`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
