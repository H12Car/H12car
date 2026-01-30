import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { QuoteStatus } from "@prisma/client";

// GET /api/quotes - List all quotes
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") as QuoteStatus | null;
    const limit = searchParams.get("limit");

    const quotes = await prisma.quote.findMany({
      where: {
        ...(status && { status }),
      },
      include: {
        vehicle: {
          select: {
            id: true,
            name: true,
            image: true,
            category: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      ...(limit && { take: parseInt(limit) }),
    });

    return NextResponse.json(quotes);
  } catch (error) {
    console.error("Failed to fetch quotes:", error);
    return NextResponse.json(
      { error: "Failed to fetch quotes" },
      { status: 500 }
    );
  }
}

// POST /api/quotes - Create a new quote (from booking wizard)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const quote = await prisma.quote.create({
      data: {
        serviceType: body.serviceType,
        vehicleId: body.vehicleId,
        vehicleName: body.vehicleName,
        vehiclePrice: body.vehiclePrice,
        pickupDate: body.pickupDate ? new Date(body.pickupDate) : null,
        pickupTime: body.pickupTime,
        returnDate: body.returnDate ? new Date(body.returnDate) : null,
        pickupLocation: body.pickupLocation,
        pickupZone: body.pickupZone,
        dropoffLocation: body.dropoffLocation,
        deliveryCity: body.deliveryCity,
        wantsDriver: body.wantsDriver || false,
        numberOfPeople: body.numberOfPeople,
        excursions: body.excursions,
        fullName: body.fullName,
        phone: body.phone,
        email: body.email,
        notes: body.notes,
        rentalDays: body.rentalDays,
        totalPrice: body.totalPrice,
      },
    });

    return NextResponse.json(quote, { status: 201 });
  } catch (error) {
    console.error("Failed to create quote:", error);
    return NextResponse.json(
      { error: "Failed to create quote" },
      { status: 500 }
    );
  }
}
