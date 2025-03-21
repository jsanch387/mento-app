import AuthInitializer from "@/app/features/auth/AuthInitializer";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script"; // Import Next.js Script

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
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* ✅ SEO Essentials */}
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://www.mentoteaching.com/" />

        {/* ✅ Favicon Links */}
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/icon.png" />

        {/* ✅ Prevent Hydration Error: Move <noscript> Inside <head> */}
        <noscript>
          This website requires JavaScript to function properly. Please enable
          it in your browser.
        </noscript>

        {/* ✅ Structured Data (Google Schema for SEO) */}
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
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* ✅ Auth Session Initialization */}
        <AuthInitializer />

        {/* ✅ Meta Pixel Code (Facebook Tracking) */}
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

        {/* ✅ Meta Pixel Image Fallback */}
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1164238438526373&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        {/* ✅ Vercel Analytics */}
        <Analytics />

        {/* ✅ Render Children (Main App Content) */}
        {children}
      </body>
    </html>
  );
}
