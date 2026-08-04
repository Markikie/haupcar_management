import app from "./app"

import { env } from "./config/env"


const server = app.listen(env.port, () => {
    console.log(`Server is running at http://localhost:${env.port}`)
})

const db = app.listen(env.databaseUrl, () => {
    console.log(`Database is connected`)
})

function shutdown(signal: string): void {
  console.log(`${signal} received. Closing server...`);

  server.close(() => {
    console.log("HTTP server closed");
    process.exit(0);
  });
}

process.on("SIGINT", () => {
  shutdown("SIGINT");
});

process.on("SIGTERM", () => {
  shutdown("SIGTERM");
});