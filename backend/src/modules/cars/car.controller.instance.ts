import { carService } from "./car.service.instance";
import { CarController } from "./car.controller";

export const carController = new CarController(
  carService
);