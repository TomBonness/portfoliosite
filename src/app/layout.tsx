import type { Metadata, Viewport } from "next";
import {
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  Instrument_Serif,
} from "next/font/google";
import "./globals.css";

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600"],
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
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
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f3ec" },
    { media: "(prefers-color-scheme: dark)", color: "#121310" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} ${mono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
