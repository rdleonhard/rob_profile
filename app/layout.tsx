import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteName = "Robert D. Leonhard";
const pageTitle = "Robert D. Leonhard | Attorney, Advisor & Technologist";
const description =
  "Pennsylvania attorney, digital-asset counsel, fund general counsel, Army veteran, and technologist advising where law, capital, and emerging technology converge.";
const fallbackHost = "robert-leonhard.ethlawyer.chatgpt.site";

async function getSiteUrl() {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host")?.split(",")[0]?.trim() ||
    requestHeaders.get("host") ||
    fallbackHost;
  const protocol =
    requestHeaders.get("x-forwarded-proto")?.split(",")[0]?.trim() ||
    (host.startsWith("localhost") || host.startsWith("127.0.0.1")
      ? "http"
      : "https");

  try {
    return new URL(`${protocol}://${host}`);
  } catch {
    return new URL(`https://${fallbackHost}`);
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = await getSiteUrl();
  const socialImage = new URL("/og.png", siteUrl).toString();

  return {
    metadataBase: siteUrl,
    title: {
      default: pageTitle,
      template: `%s | ${siteName}`,
    },
    description,
    applicationName: siteName,
    authors: [{ name: siteName, url: siteUrl }],
    creator: siteName,
    publisher: siteName,
    category: "Professional Services",
    keywords: [
      "Robert Leonhard",
      "Pennsylvania attorney",
      "digital asset counsel",
      "securities law",
      "corporate law",
      "investment management",
      "emerging technology",
    ],
    alternates: { canonical: siteUrl },
    openGraph: {
      type: "profile",
      locale: "en_US",
      url: siteUrl,
      siteName,
      title: pageTitle,
      description,
      images: [
        {
          url: socialImage,
          width: 1536,
          height: 1024,
          alt: "Robert D. Leonhard — Attorney, Advisor, Builder",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [socialImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: "/favicon.png",
      shortcut: "/favicon.png",
      apple: "/favicon.png",
    },
  };
}

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#060a12",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteUrl = await getSiteUrl();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteName,
    url: siteUrl.toString(),
    image: new URL("/rob-suit-portrait.jpg", siteUrl).toString(),
    jobTitle: "Attorney and General Counsel",
    description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pittsburgh",
      addressRegion: "PA",
      addressCountry: "US",
    },
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "West Virginia University College of Law",
      },
      {
        "@type": "CollegeOrUniversity",
        name: "University of Pittsburgh School of Law",
      },
    ],
    knowsAbout: [
      "Corporate law",
      "Securities law",
      "Digital assets",
      "Investment management",
      "Emerging technology",
    ],
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
