// import { NextResponse } from "next/server";
// import { cookies } from "next/headers";

// const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
// const AUTH_SECRET = process.env.AUTH_SECRET;

// export async function POST(request: Request) {
//   try {
//     if (!ADMIN_PASSWORD || !AUTH_SECRET) {
//       return NextResponse.json(
//         { error: "Auth not configured" },
//         { status: 503 }
//       );
//     }

//     const { password } = await request.json();

//     if (password === ADMIN_PASSWORD) {
//       // Set the secret as the cookie value - httpOnly prevents JS access
//       const cookieStore = await cookies();
//       cookieStore.set("h12_admin_auth", AUTH_SECRET, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "strict",
//         maxAge: 60 * 60 * 24 * 7, // 7 days
//         path: "/",
//       });

//       return NextResponse.json({ success: true });
//     }

//     return NextResponse.json({ error: "Invalid password" }, { status: 401 });
//   } catch {
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db"; // Ajustez le chemin selon votre structure
import bcrypt from "bcryptjs";

const AUTH_SECRET = process.env.AUTH_SECRET || "votre-secret-par-defaut";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email et mot de passe requis" },
        { status: 400 }
      );
    }

    // Chercher l'admin dans la base de données
    const admin = await prisma.admin.findUnique({
      where: { email: email.trim() },
      select: {
        id: true,
        email: true,
        password: true,
        name: true
      }
    });

    // Vérifier si l'admin existe
    if (!admin) {
      return NextResponse.json(
        { error: "Email ou mot de passe incorrect" },
        { status: 401 }
      );
    }

    // Vérifier le mot de passe
    const isValidPassword = await bcrypt.compare(password, admin.password);

    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Email ou mot de passe incorrect" },
        { status: 401 }
      );
    }

    // Créer la session
    const cookieStore = await cookies();
    cookieStore.set("h12_admin_session", AUTH_SECRET, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 jours
      path: "/",
    });

    // Optionnel : stocker aussi les infos de l'admin dans un cookie non-httpOnly
    cookieStore.set("h12_admin_info", JSON.stringify({
      id: admin.id,
      email: admin.email,
      name: admin.name
    }), {
      httpOnly: false, // Accessible par JavaScript
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return NextResponse.json({ 
      success: true,
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}