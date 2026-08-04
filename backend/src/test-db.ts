import { prisma } from "./database/prisma"

async function testDatabaseConnection(): Promise<void> {
    try {
        const result = await prisma.$queryRaw<
            Array<{
                now: Date;
                databaseName: string;
            }>
        >`
            SELECT
                NOW() as now,
                current_database() AS "databaseName"
        `;

        console.log("Database connection successful")
        console.log("result[0]");
    } catch (error) {
        console.error("Database conection failed")
        console.error(error)
        process.exitCode = 1;
    } finally {
        await prisma.$disconnect
    }
}

void testDatabaseConnection();