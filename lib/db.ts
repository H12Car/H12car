import { PrismaClient } from "@prisma/client";
import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeonHttp } from "@prisma/adapter-neon";
import ws from "ws";

// Required for Neon serverless in Node.js
neonConfig.webSocketConstructor = ws;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  // Use the neon http adapter
  const adapter = new PrismaNeonHttp(connectionString, {
    arrayMode: false,
    fullResults: true,
  });

  return new PrismaClient({ adapter });
}

// Lazy initialization - creates client on first access
export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
