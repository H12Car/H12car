import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete("h12_admin_auth");

  return NextResponse.json({ success: true });
}
