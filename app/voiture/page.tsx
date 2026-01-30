import { prisma } from "@/lib/db";
import VoitureClient from "./VoitureClient";

export const dynamic = "force-dynamic";

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
  return cars;
}

export default async function VoiturePage() {
  const cars = await getCars();
  return <VoitureClient cars={cars} />;
}
