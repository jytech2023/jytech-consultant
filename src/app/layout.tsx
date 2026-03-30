import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Auth0ProviderClient from "@/components/Auth0ProviderClient";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "JY Consulting | Human + AI Business Consulting",
    template: "%s | JY Consulting",
  },
  description:
    "Human + AI business consulting platform providing intelligent insights for customer discovery, competitor analysis, strategy planning, market intelligence, and supply chain optimization across restaurant, cosmetic, manufacturing, robotics, medical, and education industries.",
  keywords: [
    "AI business consulting",
    "market analysis",
    "competitor analysis",
    "business strategy",
    "supply chain optimization",
    "customer discovery",
    "market intelligence",
    "AI consultant",
    "行业咨询",
    "JY Consulting",
    "市场分析",
  ],
  authors: [{ name: "JY Consulting" }],
  openGraph: {
    type: "website",
    siteName: "JY Consulting",
    title: "JY Consulting | Human + AI Business Consulting",
    description:
      "Intelligent insights for customer discovery, competitor analysis, strategy planning, and market intelligence — across every industry.",
    locale: "en_US",
    alternateLocale: "zh_CN",
  },
  twitter: {
    card: "summary_large_image",
    title: "JY Consulting | Human + AI Business Consulting",
    description:
      "Human + AI business consulting platform providing intelligent insights across every industry.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    languages: {
      en: "/en",
      zh: "/zh",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem("theme")==="light")document.documentElement.classList.remove("dark")}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Auth0ProviderClient>{children}</Auth0ProviderClient>
      </body>
    </html>
  );
}
