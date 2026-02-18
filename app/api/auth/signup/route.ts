import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    // Validations
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Le mot de passe doit contenir au moins 8 caractères" },
        { status: 400 }
      );
    }

    // Vérifier si l'email existe déjà
    const existingAdmin = await prisma.admin.findUnique({
      where: { email: email.trim().toLowerCase() }
    });

    if (existingAdmin) {
      return NextResponse.json(
        { error: "Un administrateur avec cet email existe déjà" },
        { status: 409 }
      );
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer le nouvel admin
    const admin = await prisma.admin.create({
      data: {
        id: randomUUID(),
        email: email.trim().toLowerCase(),
        password: hashedPassword,
        name: name.trim(),
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true
      }
    });

    return NextResponse.json({
      success: true,
      message: "Administrateur créé avec succès",
      admin
    });

  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}