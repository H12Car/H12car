import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const AUTH_SECRET = process.env.AUTH_SECRET;

export async function POST(request: Request) {
  try {
    if (!ADMIN_PASSWORD || !AUTH_SECRET) {
      return NextResponse.json(
        { error: "Auth not configured" },
        { status: 503 }
      );
    }

    const { password } = await request.json();

    if (password === ADMIN_PASSWORD) {
      // Set the secret as the cookie value - httpOnly prevents JS access
      const cookieStore = await cookies();
      cookieStore.set("h12_admin_auth", AUTH_SECRET, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
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
