import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /panel routes (except login and logout)
  if (pathname.startsWith("/panel") && !pathname.startsWith("/panel/login") && !pathname.startsWith("/panel/logout")) {
    const authCookie = request.cookies.get("h12_admin_auth");

    if (!authCookie || authCookie.value !== "authenticated") {
      // Redirect to login
      return NextResponse.redirect(new URL("/panel/login", request.url));
    }
  }

  // If already logged in and trying to access login page, redirect to dashboard
  if (pathname === "/panel/login") {
    const authCookie = request.cookies.get("h12_admin_auth");

    if (authCookie && authCookie.value === "authenticated") {
      return NextResponse.redirect(new URL("/panel/dashboard", request.url));
    }
  }

  // Add pathname header for layout to use
  const response = NextResponse.next();
  response.headers.set("x-pathname", pathname);
  return response;
}

export const config = {
  matcher: ["/panel/:path*"],
};
