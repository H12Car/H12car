import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET /api/excursions/[id] - Get a single excursion
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const excursion = await prisma.excursion.findUnique({
      where: { id },
    });

    if (!excursion) {
      return NextResponse.json(
        { error: "Excursion not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(excursion);
  } catch (error) {
    console.error("Failed to fetch excursion:", error);
    return NextResponse.json(
      { error: "Failed to fetch excursion" },
      { status: 500 }
    );
  }
}

// PUT /api/excursions/[id] - Update an excursion
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const excursion = await prisma.excursion.update({
      where: { id },
      data: {
        ...(body.name !== undefined && { name: body.name }),
        ...(body.category !== undefined && { category: body.category }),
        ...(body.price !== undefined && { price: body.price }),
        ...(body.period !== undefined && { period: body.period }),
        ...(body.image !== undefined && { image: body.image }),
        ...(body.description !== undefined && { description: body.description }),
        ...(body.features !== undefined && { features: body.features }),
        ...(body.highlights !== undefined && { highlights: body.highlights }),
        ...(body.duration !== undefined && { duration: body.duration }),
        ...(body.groupSize !== undefined && { groupSize: body.groupSize }),
        ...(body.departure !== undefined && { departure: body.departure }),
        ...(body.difficulty !== undefined && { difficulty: body.difficulty }),
        ...(body.rating !== undefined && { rating: body.rating }),
        ...(body.reviews !== undefined && { reviews: body.reviews }),
        ...(body.favorite !== undefined && { favorite: body.favorite }),
        ...(body.isActive !== undefined && { isActive: body.isActive }),
        ...(body.sortOrder !== undefined && { sortOrder: body.sortOrder }),
      },
    });

    return NextResponse.json(excursion);
  } catch (error) {
    console.error("Failed to update excursion:", error);
    return NextResponse.json(
      { error: "Failed to update excursion" },
      { status: 500 }
    );
  }
}

// DELETE /api/excursions/[id] - Delete an excursion
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.excursion.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete excursion:", error);
    return NextResponse.json(
      { error: "Failed to delete excursion" },
      { status: 500 }
    );
  }
}
