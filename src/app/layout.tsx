import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

/** The terminal: headings, labels, code and figures. Variable, so every weight comes in one file. */
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

/** Running text, which reads more easily in a proportional face. */
const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const title = "Tom Bonness — Software engineer: infrastructure, performance, systems";
const description =
  "Software engineer in Austin, Texas. Infrastructure as code and CI/CD on AWS, pinned and verified deployments, GPU inference engines in C++ and CUDA, and cross-platform tools in Rust and Swift.";

export const metadata: Metadata = {
  metadataBase: new URL("https://main.d2qcnlwngb2nrv.amplifyapp.com"),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Tom Bonness",
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
  // Opts the page in to the operating system's text size on browsers that support it.
  other: { "text-scale": "scale" },
};

/** A terminal is dark: one scheme, declared so the browser's own controls match it. */
export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#11111b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${mono.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
