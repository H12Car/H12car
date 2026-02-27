import { prisma } from "@/lib/db";
import MotoClient from "./MotoClient";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

/* ✅ SEO METADATA — THIS IS THE MOST IMPORTANT PART */
export const metadata: Metadata = {
  title: "Location Moto Marrakech | Scooters, Motos - H12 Car",
  description: "Location de moto et scooter à Marrakech dès 300 MAD/jour. Harley Davidson, Honda Africa Twin, scooters. Assurance incluse, kilométrage illimité.",
  // ... rest
  keywords: [
    "location moto Marrakech",
    "location scooter Marrakech",
    "moto Marrakech",
    "scooter Marrakech",
    "rent moto Marrakech",
    "rent scooter Marrakech",
    "H12 Car Marrakech",
  ],
  alternates: {
    canonical: "https://h12car.com/moto",
  },
  openGraph: {
    title: "Location de Motos à Marrakech – H12 Car",
    description:
      "Découvrez notre collection de motos et scooters premium à Marrakech. Assurance incluse et réservation rapide.",
    url: "https://h12car.com/moto",
    siteName: "H12 Car",
    type: "website",
    images: [
      {
        url: "https://h12car.com/moto_h12/h12_moto_new.webp",
        width: 1200,
        height: 630,
        alt: "Location de motos premium à Marrakech – H12 Car",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

type JsonValue =
  | string
  | number
  | boolean
  | null
  | { [key: string]: JsonValue }
  | JsonValue[];

async function getMotos() {
  const motos = await prisma.vehicle.findMany({
    where: {
      type: "MOTO",
      available: true,
    },
    orderBy: [{ featured: "desc" }, { price: "desc" }],
  });

  return motos.map((moto) => ({
    ...moto,
    features: Array.isArray(moto.features)
      ? moto.features
      : typeof moto.features === "string"
      ? JSON.parse(moto.features)
      : [],
  }));
}

export default async function MotoPage() {
  const motos = await getMotos();
  return <MotoClient motos={motos} />;
}