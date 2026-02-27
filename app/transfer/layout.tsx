import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transfert Aéroport Marrakech | Service VIP - H12 Car",
  description: "Service de transfert aéroport Menara Marrakech. Chauffeur privé, véhicules premium, suivi de vol, attente gratuite. Réservation 24h/24.",
  // ... rest
  keywords: [
    "transfert aéroport Marrakech",
    "navette aéroport Menara",
    "transfert privé Marrakech",
    "taxi aéroport Marrakech",
    "transport groupe Marrakech",
    "navette hôtel aéroport Marrakech",
    "prix transfert Marrakech",
    "H12 Car transfert",
  ],
  alternates: {
    canonical: "https://h12car.com/transfer",
  },
  openGraph: {
    title: "Transfert Aéroport Marrakech Menara | Prix Fixes | H12 Car",
    description:
      "Navette privée depuis l'aéroport Menara vers votre hôtel ou riad. De 1 à 48 personnes, véhicules climatisés, chauffeurs professionnels. Réservation rapide en ligne.",
    url: "https://h12car.com/transfer",
    siteName: "H12 Car",
    locale: "fr_MA",
    type: "website",
    images: [
      {
        url: "https://h12car.com/voiture_h12/h12_transporttouristicmerco.png",
        width: 1200,
        height: 630,
        alt: "Transfert aéroport Marrakech Menara - H12 Car",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Transfert Aéroport Marrakech Menara | Prix Fixes | H12 Car",
    description:
      "Navette privée aéroport Menara. 1 à 48 personnes, prix fixes, disponible 24h/24. Berline, minivan, minibus et bus.",
    images: ["https://h12car.com/voiture_h12/h12_transporttouristicmerco.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TransferLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}