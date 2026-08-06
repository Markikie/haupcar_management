import { prisma } from "../../database/prisma";
import { CarRepository } from "./car.repository";

export const carRepository = new CarRepository(prisma);