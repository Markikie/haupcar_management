import express from "express"
import cors from "cors"

import { errorMiddleware } from "./middlewares/error.middleware"
import { carRouter } from "./modules/cars/car.routes"

const app =  express()
app.use(cors({
  origin: "http://localhost:5173",
}));

app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "HAUPCAR API is running"
  });
});

app.use("/api/v1/cars", carRouter);

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

app.use(errorMiddleware);

export default app;