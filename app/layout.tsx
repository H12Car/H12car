import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navBar";
import Footer from "@/components/footer";
import BookingWizard from "@/components/BookingWizard";
import { BookingProvider } from "@/context/bookingContext";
import Script from "next/script";
import { 
  carRentalServiceSchema, 
  websiteSchema, 
  organizationSchema, 
  serviceSchema 
} from "@/app/components/schemas";  // ← FIX THIS LINE

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://h12car.com"),
  
  title: {
    default: "Location Voiture Marrakech | H12 Car — Kilométrage Illimité, Livraison Incluse",
    template: "%s | H12 Car Marrakech"
  },
  
  description:
    "Location de voiture, moto et excursions à Marrakech. Kilométrage illimité, assurance incluse, livraison à l'hôtel ou à l'aéroport Menara. Réservez en ligne — 2000+ clients satisfaits.",

  keywords: [
    "location voiture marrakech",
    "louer voiture marrakech",
    "car rental marrakech",
    "location moto marrakech",
    "location voiture marrakech aéroport",
    "location voiture marrakech kilométrage illimité",
    "h12 car",
    "kechstraw"
  ],

  authors: [{ name: "H12 Car" }],
  creator: "H12 Car",
  publisher: "H12 Car",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  openGraph: {
    title: "H12 Car | Location de Voiture Premium à Marrakech",
    description:
      "Location voiture & moto à Marrakech. Kilométrage illimité, assurance incluse, livraison hôtel ou aéroport Menara.",
    url: "https://h12car.com",
    siteName: "H12 Car",
    images: [
      {
        url: "https://h12car.com/h12_hero_new.webp",
        width: 1200,
        height: 630,
        alt: "H12 Car — Location de voiture premium Marrakech",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "H12 Car | Location de Voiture Premium à Marrakech",
    description:
      "Location voiture & moto Marrakech — kilométrage illimité, livraison incluse.",
    images: ["https://h12car.com/h12_hero_new.webp"],
    creator: "@h12car",
  },

  alternates: {
    canonical: "https://h12car.com",
  },

  manifest: "/site.webmanifest",
  
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#3b82f6' },
    { media: '(prefers-color-scheme: dark)', color: '#1e40af' }
  ],
  
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="bg-white" suppressHydrationWarning>
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900 min-h-screen`}
        suppressHydrationWarning
      >
        {/* Enhanced Schema Markup for SEO */}
        <Script
          id="car-rental-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(carRentalServiceSchema) }}
          strategy="beforeInteractive"
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
          strategy="beforeInteractive"
        />
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
          strategy="beforeInteractive"
        />
        <Script
          id="service-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
          strategy="beforeInteractive"
        />

        <BookingProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <BookingWizard />
        </BookingProvider>
      </body>
    </html>
  );
}