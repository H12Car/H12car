import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET /api/vehicles/[id] - Get a single vehicle
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const vehicle = await prisma.vehicle.findUnique({
      where: { id },
    });

    if (!vehicle) {
      return NextResponse.json(
        { error: "Vehicle not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(vehicle);
  } catch (error) {
    console.error("Failed to fetch vehicle:", error);
    return NextResponse.json(
      { error: "Failed to fetch vehicle" },
      { status: 500 }
    );
  }
}

// PATCH /api/vehicles/[id] - Update a vehicle
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const vehicle = await prisma.vehicle.update({
      where: { id },
      data: {
        ...(body.type !== undefined && { type: body.type }),
        ...(body.name !== undefined && { name: body.name }),
        ...(body.category !== undefined && { category: body.category }),
        ...(body.price !== undefined && { price: body.price }),
        ...(body.period !== undefined && { period: body.period }),
        ...(body.image !== undefined && { image: body.image }),
        ...(body.description !== undefined && { description: body.description }),
        ...(body.features !== undefined && { features: body.features }),
        ...(body.fuel !== undefined && { fuel: body.fuel }),
        ...(body.seats !== undefined && { seats: body.seats }),
        ...(body.transmission !== undefined && { transmission: body.transmission }),
        ...(body.year !== undefined && { year: body.year }),
        ...(body.power !== undefined && { power: body.power }),
        ...(body.available !== undefined && { available: body.available }),
        ...(body.featured !== undefined && { featured: body.featured }),
      },
    });

    return NextResponse.json(vehicle);
  } catch (error) {
    console.error("Failed to update vehicle:", error);
    return NextResponse.json(
      { error: "Failed to update vehicle" },
      { status: 500 }
    );
  }
}

// DELETE /api/vehicles/[id] - Delete a vehicle
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.vehicle.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete vehicle:", error);
    return NextResponse.json(
      { error: "Failed to delete vehicle" },
      { status: 500 }
    );
  }
}
