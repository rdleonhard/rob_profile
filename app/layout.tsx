import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://rdleonhard.github.io/rob_profile/";
const portraitUrl = new URL("rob-suit-portrait.jpg", siteUrl).toString();

const title = "Robert D. Leonhard — Attorney · Digital Assets · Emerging Technology";
const description =
  "Pennsylvania attorney and fund general counsel working where law, capital, and technology converge: corporate and securities law, digital assets, investment management, and regulatory strategy.";

export const metadata: Metadata = {
  title,
  description,
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: `${basePath}/favicon.svg`,
    shortcut: `${basePath}/favicon.svg`,
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Robert D. Leonhard",
    type: "profile",
    images: [
      {
        url: portraitUrl,
        alt: "Robert D. Leonhard in a dark suit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [portraitUrl],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Robert D. Leonhard",
  jobTitle: "Attorney & General Counsel",
  worksFor: {
    "@type": "Organization",
    name: "CW Digital Funds",
  },
  url: siteUrl,
  image: portraitUrl,
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
    {
      "@type": "CollegeOrUniversity",
      name: "West Virginia University",
    },
  ],
  knowsAbout: [
    "Corporate law",
    "Securities regulation",
    "Digital assets",
    "Investment management",
    "Regulatory strategy",
    "Blockchain technology",
  ],
  sameAs: ["https://github.com/rdleonhard"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
