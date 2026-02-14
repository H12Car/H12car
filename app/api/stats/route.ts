import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET /api/stats - Dashboard statistics (admin only)
export async function GET() {
  try {
    // Run all count queries in parallel
    const [
      totalQuotes,
      pendingQuotes,
      confirmedQuotes,
      completedQuotes,
      cancelledQuotes,
      totalVehicles,
      availableCars,
      availableMotos,
      totalTransfers,
      activeTransfers,
      totalExcursions,
      activeExcursions,
      revenueResult,
      recentQuotes,
      todayQuotes,
    ] = await Promise.all([
      prisma.quote.count(),
      prisma.quote.count({ where: { status: "PENDING" } }),
      prisma.quote.count({ where: { status: "CONFIRMED" } }),
      prisma.quote.count({ where: { status: "COMPLETED" } }),
      prisma.quote.count({ where: { status: "CANCELLED" } }),
      prisma.vehicle.count(),
      prisma.vehicle.count({ where: { type: "CAR", available: true } }),
      prisma.vehicle.count({ where: { type: "MOTO", available: true } }),
      prisma.transferRoute.count(),
      prisma.transferRoute.count({ where: { isActive: true } }),
      prisma.excursion.count(),
      prisma.excursion.count({ where: { isActive: true } }),
      prisma.quote.aggregate({
        _sum: { totalPrice: true },
        where: { status: { in: ["CONFIRMED", "COMPLETED"] } },
      }),
      prisma.quote.findMany({
        take: 8,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          reference: true,
          status: true,
          serviceType: true,
          vehicleName: true,
          fullName: true,
          phone: true,
          totalPrice: true,
          createdAt: true,
        },
      }),
      prisma.quote.count({
        where: {
          createdAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
          },
        },
      }),
    ]);

    return NextResponse.json({
      quotes: {
        total: totalQuotes,
        pending: pendingQuotes,
        confirmed: confirmedQuotes,
        completed: completedQuotes,
        cancelled: cancelledQuotes,
        today: todayQuotes,
      },
      vehicles: {
        total: totalVehicles,
        availableCars,
        availableMotos,
      },
      transfers: {
        total: totalTransfers,
        active: activeTransfers,
      },
      excursions: {
        total: totalExcursions,
        active: activeExcursions,
      },
      revenue: revenueResult._sum.totalPrice || 0,
      recentQuotes,
    });
  } catch (error) {
    console.error("Failed to fetch stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
