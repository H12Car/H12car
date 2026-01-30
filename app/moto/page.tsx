import { prisma } from "@/lib/db";
import MotoClient from "./MotoClient";

export const dynamic = "force-dynamic";

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
  return motos;
}

export default async function MotoPage() {
  const motos = await getMotos();
  return <MotoClient motos={motos} />;
}
