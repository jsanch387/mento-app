import AuthInitializer from "@/app/features/auth/AuthInitializer";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";
import Script from "next/script"; // Import next/script

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
            logo: "https://www.mentoteaching.com/favicon.ico",
          })}
        </script>
      </Head>

      {/* Meta Pixel Code - OUTSIDE Head */}
      <Script
        id="facebook-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1164238438526373'); 
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=1164238438526373&ev=PageView&noscript=1"
          alt="" // Decorative image for accessibility
        />
      </noscript>
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
