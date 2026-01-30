import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET /api/quotes/[id] - Get a single quote
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const quote = await prisma.quote.findUnique({
      where: { id },
      include: {
        vehicle: true,
      },
    });

    if (!quote) {
      return NextResponse.json(
        { error: "Quote not found" },
        { status: 404 }
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

// PATCH /api/quotes/[id] - Update a quote (mainly for status changes)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updateData: Record<string, unknown> = {};

    if (body.status !== undefined) {
      updateData.status = body.status;
      // Mark as reviewed when status changes from PENDING
      if (body.status !== "PENDING") {
        updateData.reviewedAt = new Date();
      }
    }

    // Allow updating other fields if needed
    if (body.notes !== undefined) updateData.notes = body.notes;

    const quote = await prisma.quote.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(quote);
  } catch (error) {
    console.error("Failed to update quote:", error);
    return NextResponse.json(
      { error: "Failed to update quote" },
      { status: 500 }
    );
  }
}

// DELETE /api/quotes/[id] - Delete a quote
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.quote.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete quote:", error);
    return NextResponse.json(
      { error: "Failed to delete quote" },
      { status: 500 }
    );
  }
}
