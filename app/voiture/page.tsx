// import { prisma } from "@/lib/db";
// import VoitureClient from "./VoitureClient";

// export const dynamic = "force-dynamic";

// async function getCars() {
//   const cars = await prisma.vehicle.findMany({
//     where: {
//       type: "CAR",
//       available: true
//     },
//     orderBy: [
//       { featured: "desc" },
//       { price: "desc" }
//     ],
//   });
//   return cars;
// }

// export default async function VoiturePage() {
//   const cars = await getCars();
//   return <VoitureClient cars={cars} />;
// }


import { prisma } from "@/lib/db";
import VoitureClient from "./VoitureClient";
import { JsonValue } from "@prisma/client/runtime/library";

export const dynamic = "force-dynamic";

// Définir un type pour les véhicules avec features en Json
type VehicleWithJson = {
  id: string;
  type: "CAR" | "MOTO";
  name: string;
  category: string;
  price: number;
  period: string;
  image: string;
  description: string | null;
  features: JsonValue;
  fuel: string | null;
  seats: number | null;
  transmission: string | null;
  year: number | null;
  power: string | null;
  available: boolean;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
};

async function getCars() {
  const cars = await prisma.vehicle.findMany({
    where: {
      type: "CAR",
      available: true
    },
    orderBy: [
      { featured: "desc" },
      { price: "desc" }
    ],
  });
  
  // Convertir les features JSON en tableau pour le client
  const carsConverties = cars.map(car => ({
    ...car,
    // S'assurer que features est un tableau
    features: Array.isArray(car.features) 
      ? car.features 
      : typeof car.features === 'string' 
        ? JSON.parse(car.features) 
        : []
  }));
  
  return carsConverties;
}

export default async function VoiturePage() {
  const cars = await getCars();
  return <VoitureClient cars={cars} />;
}