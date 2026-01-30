import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { VehicleType } from "@prisma/client";

// GET /api/vehicles - List all vehicles
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") as VehicleType | null;
    const available = searchParams.get("available");

    const vehicles = await prisma.vehicle.findMany({
      where: {
        ...(type && { type }),
        ...(available !== null && { available: available === "true" }),
      },
      orderBy: [
        { featured: "desc" },
        { createdAt: "desc" },
      ],
    });

    return NextResponse.json(vehicles);
  } catch (error) {
    console.error("Failed to fetch vehicles:", error);
    return NextResponse.json(
      { error: "Failed to fetch vehicles" },
      { status: 500 }
    );
  }
}

// POST /api/vehicles - Create a new vehicle
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const vehicle = await prisma.vehicle.create({
      data: {
        type: body.type,
        name: body.name,
        category: body.category,
        price: body.price,
        period: body.period || "jour",
        image: body.image,
        description: body.description,
        features: body.features || [],
        fuel: body.fuel,
        seats: body.seats,
        transmission: body.transmission,
        year: body.year,
        power: body.power,
        available: body.available ?? true,
        featured: body.featured ?? false,
      },
    });

    return NextResponse.json(vehicle, { status: 201 });
  } catch (error) {
    console.error("Failed to create vehicle:", error);
    return NextResponse.json(
      { error: "Failed to create vehicle" },
      { status: 500 }
    );
  }
}
