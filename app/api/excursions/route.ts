import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET /api/excursions - List all excursions
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get("active") !== "false";

    const excursions = await prisma.excursion.findMany({
      where: {
        ...(activeOnly && { isActive: true }),
      },
      orderBy: [
        { sortOrder: "asc" },
        { createdAt: "asc" },
      ],
    });

    // Vérifier que nous avons bien un tableau
    if (!Array.isArray(excursions)) {
      console.error("Prisma n'a pas retourné un tableau:", excursions);
      return NextResponse.json([], { status: 200 }); // Retourner un tableau vide
    }

    return NextResponse.json(excursions);
  } catch (error) {
    console.error("Failed to fetch excursions:", error);
    // Retourner un tableau vide avec un statut 200 pour éviter les erreurs côté client
    return NextResponse.json([], { status: 200 });
  }
}


// POST /api/excursions - Create a new excursion (admin only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const excursion = await prisma.excursion.create({
      data: {
        name: body.name,
        category: body.category,
        price: body.price,
        period: body.period ?? "personne",
        image: body.image,
        description: body.description,
        features: body.features ?? [],
        highlights: body.highlights ?? [],
        duration: body.duration || null,
        groupSize: body.groupSize || null,
        departure: body.departure || null,
        difficulty: body.difficulty || null,
        rating: body.rating ?? 5.0,
        reviews: body.reviews ?? 0,
        favorite: body.favorite ?? false,
        isActive: body.isActive ?? true,
        sortOrder: body.sortOrder ?? 0,
      },
    });

    return NextResponse.json(excursion, { status: 201 });
  } catch (error) {
    console.error("Failed to create excursion:", error);
    return NextResponse.json(
      { error: "Failed to create excursion" },
      { status: 500 }
    );
  }
}