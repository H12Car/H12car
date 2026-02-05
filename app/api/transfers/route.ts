import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { TransferCategory } from "@prisma/client";

// GET /api/transfers - List all transfer routes
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") as TransferCategory | null;
    const activeOnly = searchParams.get("active") !== "false"; // Default to active only

    const routes = await prisma.transferRoute.findMany({
      where: {
        ...(category && { category }),
        ...(activeOnly && { isActive: true }),
      },
      orderBy: [
        { sortOrder: "asc" },
        { createdAt: "asc" },
      ],
    });

    return NextResponse.json(routes);
  } catch (error) {
    console.error("Failed to fetch transfer routes:", error);
    return NextResponse.json(
      { error: "Failed to fetch transfer routes" },
      { status: 500 }
    );
  }
}

// POST /api/transfers - Create a new transfer route (admin only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const route = await prisma.transferRoute.create({
      data: {
        name: body.name,
        category: body.category,
        price1to4: body.price1to4,
        price5to8: body.price5to8,
        price9to17: body.price9to17,
        price18to48: body.price18to48,
        distance: body.distance,
        duration: body.duration,
        popular: body.popular ?? false,
        isActive: body.isActive ?? true,
        sortOrder: body.sortOrder ?? 0,
      },
    });

    return NextResponse.json(route, { status: 201 });
  } catch (error) {
    console.error("Failed to create transfer route:", error);
    return NextResponse.json(
      { error: "Failed to create transfer route" },
      { status: 500 }
    );
  }
}
