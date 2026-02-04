import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Simple token check - the token itself is the secret, set httpOnly so it can't be stolen via JS
const VALID_TOKEN = process.env.AUTH_SECRET || "h12-secret-key-change-in-production";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authCookie = request.cookies.get("h12_admin_auth");
  const isAuthenticated = authCookie?.value === VALID_TOKEN;

  // Protect admin API routes (vehicles and quotes management)
  // Allow public access only to: POST /api/quotes (for reservations), POST /api/contact, POST /api/email_reservation
  if (pathname.startsWith("/api/vehicles") || pathname.startsWith("/api/quotes")) {
    // Allow POST to /api/quotes without auth (public reservation form)
    if (pathname === "/api/quotes" && request.method === "POST") {
      return NextResponse.next();
    }

    // All other vehicle/quotes API calls require auth
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 401 }
      );
    }
  }

  // Protect /panel routes (except login and logout)
  if (pathname.startsWith("/panel") && !pathname.startsWith("/panel/login") && !pathname.startsWith("/panel/logout")) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/panel/login", request.url));
    }
  }

  // If already logged in and trying to access login page, redirect to dashboard
  if (pathname === "/panel/login" && isAuthenticated) {
    return NextResponse.redirect(new URL("/panel/dashboard", request.url));
  }

  // Add pathname header for layout to use
  const response = NextResponse.next();
  response.headers.set("x-pathname", pathname);
  return response;
}

export const config = {
  matcher: ["/panel/:path*", "/api/vehicles/:path*", "/api/quotes/:path*"],
};
