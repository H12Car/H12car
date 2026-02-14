import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET /api/devis/[reference]?phone=xxx - Get quote by reference with phone verification
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ reference: string }> }
) {
  try {
    const { reference } = await params;
    const { searchParams } = new URL(request.url);
    const phone = searchParams.get("phone");

    if (!phone) {
      return NextResponse.json(
        { error: "Phone number required for verification" },
        { status: 400 }
      );
    }

    // Normalize phone number (remove spaces, dashes, etc.)
    const normalizedPhone = phone.replace(/[\s\-\(\)]/g, "");

    const quote = await prisma.quote.findUnique({
      where: { reference: reference.toUpperCase() },
      include: {
        vehicle: {
          select: {
            id: true,
            name: true,
            image: true,
            category: true,
          },
        },
        transferRoute: true,
      },
    });

    if (!quote) {
      return NextResponse.json(
        { error: "Devis non trouvé" },
        { status: 404 }
      );
    }

    // Verify phone matches (normalize both for comparison)
    const quotePhone = quote.phone.replace(/[\s\-\(\)]/g, "");

    // Require minimum 8 digits to prevent trivial partial matches
    const digitsOnly = normalizedPhone.replace(/\D/g, "");
    if (digitsOnly.length < 8) {
      return NextResponse.json(
        { error: "Numéro de téléphone trop court" },
        { status: 400 }
      );
    }

    // Normalize country code: strip leading +212 or 0 prefix for comparison
    const stripPrefix = (p: string) => {
      const d = p.replace(/\D/g, "");
      if (d.startsWith("212")) return d.slice(3);
      if (d.startsWith("0")) return d.slice(1);
      return d;
    };

    const phoneMatches =
      quotePhone === normalizedPhone ||
      stripPrefix(quotePhone) === stripPrefix(normalizedPhone);

    if (!phoneMatches) {
      return NextResponse.json(
        { error: "Numéro de téléphone incorrect" },
        { status: 403 }
      );
    }

    return NextResponse.json(quote);
  } catch (error) {
    console.error("Failed to fetch quote:", error);
    return NextResponse.json(
      { error: "Failed to fetch quote" },
      { status: 500 }
    );
  }
}
