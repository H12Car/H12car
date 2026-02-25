import { prisma } from "@/lib/db";
import VoitureClient from "./VoitureClient";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Location Voiture Marrakech | H12 Car — SUV, Berlines, Kilométrage Illimité",
  description:
    "Louez une voiture à Marrakech avec H12 Car. Large choix de SUV, berlines et citadines. Kilométrage illimité, assurance incluse, livraison à l'hôtel ou à l'aéroport Menara. Réservez en ligne.",
  
  openGraph: {
    title: "Location Voiture Marrakech | H12 Car",
    description:
      "Large choix de voitures à Marrakech — SUV, berlines, citadines. Kilométrage illimité, assurance incluse, livraison incluse.",
    url: "https://h12car.com/voiture",
    siteName: "H12 Car",
    images: [
      {
        url: "https://h12car.com/voiture_h12/h12_car_new.webp",
        width: 1200,
        height: 630,
        alt: "Location voiture Marrakech — flotte H12 Car",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Location Voiture Marrakech | H12 Car",
    description:
      "Louez une voiture à Marrakech — kilométrage illimité, livraison incluse.",
    images: ["https://h12car.com/voiture_h12/h12_car_new.webp"],
  },

  alternates: {
    canonical: "https://h12car.com/voiture",
  },
};

// Définir le type JsonValue localement
type JsonValue =
  | string
  | number
  | boolean
  | null
  | { [key: string]: JsonValue }
  | JsonValue[];

async function getCars() {
  const cars = await prisma.vehicle.findMany({
    where: {
      type: "CAR",
      available: true,
    },
    orderBy: [{ featured: "desc" }, { price: "desc" }],
  });

  const carsConverties = cars.map((car) => {
    let features: JsonValue[] = [];
    try {
      features = Array.isArray(car.features)
        ? car.features
        : typeof car.features === "string" && car.features.trim() !== ""
        ? JSON.parse(car.features)
        : [];
    } catch {
      // Malformed JSON in DB — default to empty array
      features = [];
    }
    return { ...car, features };
  });

  return carsConverties;
}

export default async function VoiturePage() {
  const cars = await getCars();
  return <VoitureClient cars={cars} />;
}