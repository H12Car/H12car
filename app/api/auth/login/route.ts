import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// Simple password - in production use environment variable
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "h12admin2024";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (password === ADMIN_PASSWORD) {
      // Set auth cookie
      const cookieStore = await cookies();
      cookieStore.set("h12_admin_auth", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
