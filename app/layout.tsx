import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navBar";
import Footer from "@/components/footer";
// import WhatsAppButton from "@/components/WhatsAppButton";
import BookingWizard from "@/components/BookingWizard";
import { BookingProvider } from "@/context/bookingContext";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Location Voiture Marrakech | H12 Car — Kilométrage Illimité, Livraison Incluse",
  description:
    "Location de voiture, moto et excursions à Marrakech. Kilométrage illimité, assurance incluse, livraison à l'hôtel ou à l'aéroport Menara. Réservez en ligne — 2000+ clients satisfaits.",

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
  },

  metadataBase: new URL("https://h12car.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="bg-white" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900 min-h-screen`}
        suppressHydrationWarning
      >
        <BookingProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          {/* <WhatsAppButton /> */}
          <BookingWizard />
        </BookingProvider>
      </body>
    </html>
  );
}