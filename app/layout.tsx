import type { Metadata } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "SignalMatch | Beat The AI Screen Without Faking Anything",
  description:
    "SignalMatch compares a resume against a job description, surfaces keyword gaps, rewrites weak bullets, and builds a truthful interview prep pack.",
  metadataBase: new URL(siteConfig.githubPagesUrl),
  openGraph: {
    title: "SignalMatch",
    description:
      "Truth-first ATS matching, bullet tightening, proof prompts, and interview prep without fake achievements.",
    url: siteConfig.githubPagesUrl,
    siteName: "SignalMatch",
    images: [
      {
        url: `${siteConfig.githubPagesUrl}/generated/signalmatch-hero.png`,
        width: 1536,
        height: 1024,
        alt: "SignalMatch resume to job description proof-lines visual",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SignalMatch",
    description:
      "Beat the AI screen without faking anything.",
    images: [`${siteConfig.githubPagesUrl}/generated/signalmatch-hero.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
