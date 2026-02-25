import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Excursions & Transfert Aéroport Marrakech | H12 Car",
  description:
    "Réservez vos excursions guidées à Marrakech : Atlas, désert, cascades, quad. Service de transfert aéroport Menara avec chauffeur privé. Prix fixes, véhicules climatisés.",
  keywords: [
    "excursion Marrakech",
    "excursion Atlas Marrakech",
    "excursion désert Marrakech",
    "quad Marrakech",
    "transfert aéroport Marrakech",
    "navette aéroport Menara",
    "transfert privé Marrakech",
    "H12 Car excursion",
  ],
  alternates: {
    canonical: "https://h12car.com/excursion",
  },
  openGraph: {
    title: "Excursions & Transfert Aéroport Marrakech | H12 Car",
    description:
      "Découvrez les trésors du Maroc avec nos excursions guidées. Transfert aéroport Menara avec chauffeur privé, prix fixes et véhicules climatisés.",
    url: "https://h12car.com/excursion",
    siteName: "H12 Car",
    locale: "fr_MA",
    type: "website",
    images: [
      {
        url: "https://h12car.com/excursions/h12_excursion_new.webp",
        width: 1200,
        height: 630,
        alt: "Excursions guidées et transfert aéroport Marrakech - H12 Car",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Excursions & Transfert Aéroport Marrakech | H12 Car",
    description:
      "Excursions guidées Atlas, désert, quad. Transfert privé depuis l'aéroport Menara. Prix fixes, chauffeurs professionnels.",
    images: ["https://h12car.com/excursions/h12_excursion_new.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ExcursionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}