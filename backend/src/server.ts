import express, {
    type Request,
    type Response
} from "express"

import { env } from "./config/env"

const app = express();

app.get("/health", (_req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "HAUPCAR API is running"
    });
});

const server = app.listen(env.port, () => {
    console.log(`Server is running at http://localhost:${env.port}`)
})

const db = app.listen(env.databaseUrl, () => {
    console.log(`Database is connected`)
})