import type { Metadata } from "next";
import ContactPage from "./ContactPage";

export const metadata: Metadata = {
  title: "Contact H12 Car | Location Voiture Marrakech — Réservez par WhatsApp",
  description:
    "Contactez H12 Car pour louer une voiture, moto ou réserver une excursion à Marrakech. Réponse rapide par WhatsApp. Livraison à l'aéroport Menara et en centre-ville.",

  openGraph: {
    title: "Contact H12 Car | Location Voiture Marrakech",
    description:
      "Contactez-nous pour louer voiture, moto ou excursion à Marrakech. Réponse rapide WhatsApp, livraison aéroport incluse.",
    url: "https://h12car.com/contact",
    siteName: "H12 Car",
    images: [
      {
        url: "https://h12car.com/h12_hero_new.webp",
        width: 1200,
        height: 630,
        alt: "Contactez H12 Car — location voiture Marrakech",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Contact H12 Car | Location Voiture Marrakech",
    description:
      "Réservez votre voiture ou moto à Marrakech — réponse rapide par WhatsApp.",
    images: ["https://h12car.com/h12_hero_new.webp"],
  },

  alternates: {
    canonical: "https://h12car.com/contact",
  },
};

export default function Page() {
  return <ContactPage />;
}