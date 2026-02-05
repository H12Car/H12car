import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET /api/transfers/[id] - Get a single transfer route
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const route = await prisma.transferRoute.findUnique({
      where: { id },
    });

    if (!route) {
      return NextResponse.json(
        { error: "Transfer route not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(route);
  } catch (error) {
    console.error("Failed to fetch transfer route:", error);
    return NextResponse.json(
      { error: "Failed to fetch transfer route" },
      { status: 500 }
    );
  }
}

// PUT /api/transfers/[id] - Update a transfer route
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const route = await prisma.transferRoute.update({
      where: { id },
      data: {
        ...(body.name !== undefined && { name: body.name }),
        ...(body.category !== undefined && { category: body.category }),
        ...(body.price1to4 !== undefined && { price1to4: body.price1to4 }),
        ...(body.price5to8 !== undefined && { price5to8: body.price5to8 }),
        ...(body.price9to17 !== undefined && { price9to17: body.price9to17 }),
        ...(body.price18to48 !== undefined && { price18to48: body.price18to48 }),
        ...(body.distance !== undefined && { distance: body.distance }),
        ...(body.duration !== undefined && { duration: body.duration }),
        ...(body.popular !== undefined && { popular: body.popular }),
        ...(body.isActive !== undefined && { isActive: body.isActive }),
        ...(body.sortOrder !== undefined && { sortOrder: body.sortOrder }),
      },
    });

    return NextResponse.json(route);
  } catch (error) {
    console.error("Failed to update transfer route:", error);
    return NextResponse.json(
      { error: "Failed to update transfer route" },
      { status: 500 }
    );
  }
}

// DELETE /api/transfers/[id] - Delete a transfer route
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.transferRoute.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete transfer route:", error);
    return NextResponse.json(
      { error: "Failed to delete transfer route" },
      { status: 500 }
    );
  }
}
