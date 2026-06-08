import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis;

function getPrismaClient() {
  if (globalForPrisma.__nodiexPrisma) {
    return globalForPrisma.__nodiexPrisma;
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL ?? "",
    max: 3,
    idleTimeoutMillis: 20000,
    ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : undefined
  });
  
  const adapter = new PrismaPg(pool);
  
  const prisma = new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"]
  });

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.__nodiexPrisma = prisma;
  }

  return prisma;
}

export const prisma = getPrismaClient();
