import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis;
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL ?? "",
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : undefined
});

export const prisma =
  globalForPrisma.__nodiexPrisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"]
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.__nodiexPrisma = prisma;
}
