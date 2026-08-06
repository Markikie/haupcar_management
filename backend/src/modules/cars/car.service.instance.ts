import { carRepository } from "./car.repostiory.instance";
import { CarService } from "./car.service";

export const carService = new CarService(
  carRepository
);