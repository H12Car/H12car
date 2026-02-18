// import { prisma } from "@/lib/db";
// import MotoClient from "./MotoClient";

// export const dynamic = "force-dynamic";

// async function getMotos() {
//   const motos = await prisma.vehicle.findMany({
//     where: {
//       type: "MOTO",
//       available: true
//     },
//     orderBy: [
//       { featured: "desc" },
//       { price: "desc" }
//     ],
//   });
//   return motos;
// }

// export default async function MotoPage() {
//   const motos = await getMotos();
//   return <MotoClient motos={motos} />;
// }


import { prisma } from "@/lib/db";
import MotoClient from "./MotoClient";

export const dynamic = "force-dynamic";

// Définir localement le type JsonValue (sans import)
type JsonValue = 
  | string
  | number
  | boolean
  | null
  | { [key: string]: JsonValue }
  | JsonValue[];

// Type pour les véhicules avec features en Json
type VehicleWithJson = {
  id: string;
  type: "MOTO" | "CAR";
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

async function getMotos() {
  const motos = await prisma.vehicle.findMany({
    where: {
      type: "MOTO",
      available: true
    },
    orderBy: [
      { featured: "desc" },
      { price: "desc" }
    ],
  });
  
  // Convertir les features JSON en tableau pour le client
  const motosConverties = motos.map(moto => ({
    ...moto,
    features: Array.isArray(moto.features) 
      ? moto.features 
      : typeof moto.features === 'string' 
        ? JSON.parse(moto.features) 
        : []
  }));
  
  return motosConverties;
}

export default async function MotoPage() {
  const motos = await getMotos();
  return <MotoClient motos={motos} />;
}