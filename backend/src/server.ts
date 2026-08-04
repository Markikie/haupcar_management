import app from "./app";
import { env } from "./config/env";
import { prisma } from "./database/prisma";

async function startServer(): Promise<void> {
  try {
    await prisma.$connect();

    await prisma.$queryRaw`SELECT 1`;

    console.log("Database connected successfully");

    const server = app.listen(env.port, () => {
      console.log(`Server is running at http://localhost:${env.port}`);
    });

    function shutdown(signal: string): void {
      console.log(`${signal} received. Closing server...`);

      server.close(async () => {
        await prisma.$disconnect();

        console.log("HTTP server closed");
        console.log("Database connection closed");

        process.exit(0);
      });
    }

    process.on("SIGINT", () => {
      shutdown("SIGINT");
    });

    process.on("SIGTERM", () => {
      shutdown("SIGTERM");
    });
  } catch (error) {
    console.error("Unable to connect to database");
    console.error(error);

    await prisma.$disconnect();
    process.exit(1);
  }
}

void startServer();