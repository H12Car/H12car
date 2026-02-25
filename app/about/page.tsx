import type { Metadata } from "next";
import AboutPage from "./AboutPage";

export const metadata: Metadata = {
  title: "À Propos de H12 Car | Location Voiture Premium Marrakech",
  description:
    "Découvrez H12 Car, votre partenaire de confiance pour la location de voiture, moto et excursions à Marrakech. Plus de 10 ans d'expérience, 2000+ clients satisfaits, service personnalisé.",

  openGraph: {
    title: "À Propos de H12 Car | Location Voiture Premium Marrakech",
    description:
      "H12 Car — location voiture & moto à Marrakech depuis plus de 10 ans. Service fiable, transparent et flexible pour touristes et résidents.",
    url: "https://h12car.com/about",
    siteName: "H12 Car",
    images: [
      {
        url: "https://h12car.com/h12_hero_new.webp",
        width: 1200,
        height: 630,
        alt: "H12 Car — équipe et flotte de location à Marrakech",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "À Propos de H12 Car | Location Voiture Marrakech",
    description:
      "Votre partenaire de confiance pour la location de voiture et moto à Marrakech.",
    images: ["https://h12car.com/h12_hero_new.webp"],
  },

  alternates: {
    canonical: "https://h12car.com/about",
  },
};

export default function Page() {
  return <AboutPage />;
}