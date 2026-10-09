import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  const baseClient = new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

  return baseClient.$extends({
    query: {
      $allModels: {
        async $allOperations({ args, query }) {
          try {
            return await query(args);
          } catch (error: any) {
            const msg = String(error?.message || "");
            const isTransientDisconnect =
              msg.includes("ConnectionReset") ||
              msg.includes("10054") ||
              msg.includes("closed by the remote host") ||
              msg.includes("Server has closed the connection") ||
              msg.includes("Closed") ||
              error?.code === "P1017" ||
              error?.code === "P1001";

            if (isTransientDisconnect) {
              // Neon serverless compute auto-suspension or PgBouncer idle socket recycle:
              // Wait briefly for fresh socket connection, then retry once
              await new Promise((res) => setTimeout(res, 500));
              return await query(args);
            }
            throw error;
          }
        },
      },
    },
  }) as unknown as PrismaClient;
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
