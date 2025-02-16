import AuthInitializer from "@/app/features/auth/AuthInitializer";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Mento - #1 AI Lesson Planning for Teachers",
  description:
    "Mento is the #1 AI-powered teaching tool for teachers. Easily create lesson plans, analogies, and science labs in minutes. Save time and improve student engagement.",
  keywords: [
    "AI lesson planning",
    "teacher tools",
    "lesson plans generator",
    "best AI for teachers",
    "educational AI",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        {/* SEO Essentials */}
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.mentoteaching.com/" />

        {/* Structured Data (Google Schema for SEO) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            name: "Mento",
            url: "https://www.mentoteaching.com/",
            description:
              "Mento helps teachers create AI-powered lesson plans, analogies, and labs to save time and improve teaching.",
            logo: "https://www.mentoteaching.com/icon.png",
          })}
        </script>
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthInitializer />
        <Analytics />
        {children}
      </body>
    </html>
  );
}
