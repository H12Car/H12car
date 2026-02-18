import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { QuoteStatus } from "@prisma/client";

// Generate a unique reference code like "H12-ABC123"
function generateReference(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // Exclude confusing chars: I, O, 0, 1
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `H12-${code}`;
}

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
        transferRoute: {
          select: {
            id: true,
            name: true,
            category: true,
            distance: true,
            duration: true,
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
// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();

//     // Generate unique reference with retry logic
//     let reference = generateReference();
//     let attempts = 0;
//     while (attempts < 5) {
//       const existing = await prisma.quote.findUnique({ where: { reference } });
//       if (!existing) break;
//       reference = generateReference();
//       attempts++;
//     }

//     // Create quote WITHOUT include to avoid transaction issues in HTTP mode
//     const quote = await prisma.quote.create({
//       data: {
//         reference,
//         serviceType: body.serviceType,
//         vehicleId: body.vehicleId,
//         vehicleName: body.vehicleName,
//         vehiclePrice: body.vehiclePrice,
//         pickupDate: body.pickupDate ? new Date(body.pickupDate) : null,
//         pickupTime: body.pickupTime,
//         returnDate: body.returnDate ? new Date(body.returnDate) : null,
//         pickupLocation: body.pickupLocation,
//         pickupZone: body.pickupZone,
//         dropoffLocation: body.dropoffLocation,
//         deliveryCity: body.deliveryCity,
//         wantsDriver: body.wantsDriver || false,
//         numberOfPeople: body.numberOfPeople,
//         excursions: body.excursions,
//         // Transfer relation
//         transferRouteId: body.transferId || null,
//         fullName: body.fullName,
//         phone: body.phone,
//         email: body.email,
//         notes: body.notes,
//         rentalDays: body.rentalDays,
//         totalPrice: body.totalPrice,
//       },
//       // Removed include to avoid transaction issues
//     });

//     // If you need the transferRoute data, fetch it separately
//     let transferRoute = null;
//     if (quote.transferRouteId) {
//       transferRoute = await prisma.transferRoute.findUnique({
//         where: { id: quote.transferRouteId },
//       });
//     }

//     // Return quote with transferRoute if needed
//     const response = {
//       ...quote,
//       transferRoute,
//       // These are the important fields for your BookingWizard
//       reference: quote.reference,
//       id: quote.id,
//     };

//     return NextResponse.json(response, { status: 201 });
//   } catch (error) {
//     console.error("Failed to create quote:", error);
//     return NextResponse.json(
//       { 
//         error: "Failed to create quote",
//         details: error instanceof Error ? error.message : "Unknown error"
//       },
//       { status: 500 }
//     );
//   }
// }

// POST /api/quotes - Create a new quote (from booking wizard)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Vérifier si vehicleId existe dans la base
    if (body.vehicleId) {
      const vehicle = await prisma.vehicle.findUnique({
        where: { id: body.vehicleId },
        select: { id: true, name: true }
      });
      console.log("Véhicule trouvé en base?", vehicle);
      
      if (!vehicle) {
        console.log(`⚠️ ATTENTION: Vehicle ID ${body.vehicleId} n'existe pas!`);
      }
    } else {
      console.log("Pas de vehicleId fourni");
    }
    
    // Generate unique reference with retry logic
    let reference = generateReference();
    let attempts = 0;
    while (attempts < 5) {
      const existing = await prisma.quote.findUnique({ where: { reference } });
      if (!existing) break;
      reference = generateReference();
      attempts++;
    }

    // Essayer de créer la quote même si vehicleId est invalide
    // en le mettant à null s'il n'existe pas
    let vehicleIdToUse = body.vehicleId;
    if (body.vehicleId) {
      const exists = await prisma.vehicle.findUnique({
        where: { id: body.vehicleId },
        select: { id: true }
      });
      if (!exists) {
        vehicleIdToUse = null;
      }
    }

    // Create quote
    const quote = await prisma.quote.create({
      data: {
        reference,
        serviceType: body.serviceType,
        vehicleId: vehicleIdToUse, // Utilise la version validée
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
        transferRouteId: body.transferId || null,
        fullName: body.fullName,
        phone: body.phone,
        email: body.email,
        notes: body.notes,
        rentalDays: body.rentalDays,
        totalPrice: body.totalPrice,
      },
    });

    // If you need the transferRoute data, fetch it separately
    let transferRoute = null;
    if (quote.transferRouteId) {
      transferRoute = await prisma.transferRoute.findUnique({
        where: { id: quote.transferRouteId },
      });
    }

    // Return quote with transferRoute if needed
    const response = {
      ...quote,
      transferRoute,
      reference: quote.reference,
      id: quote.id,
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error("❌ Failed to create quote:", error);
    return NextResponse.json(
      { 
        error: "Failed to create quote",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}