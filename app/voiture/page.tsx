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

export const dynamic = "force-dynamic";

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
      available: true
    },
    orderBy: [
      { featured: "desc" },
      { price: "desc" }
    ],
  });
  
  const carsConverties = cars.map(car => ({
    ...car,
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