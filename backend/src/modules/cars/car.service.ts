import { AppError } from "../../utils/app.error";

import type {
    CreateCarInput,
    UpdateCarInput
} from "./car.types"

import type { CarRepository} from "./car.repository"

export class CarService {
    constructor(
        private readonly carRepository: CarRepository
    ) {}

    async getAll() {
    return this.carRepository.findAll();
}
    async getById(id: string) {
        const car = await this.carRepository.findById(id);

        if (!car) {
            throw new AppError(404, "Car not found");
        }
        return car;
    }
    
    async create(input: CreateCarInput) {
        const registrationNumber = input.registrationNumber.trim();
        const brand = input.brand.trim();
        const model = input.model.trim();
        const notes = input.notes?.trim();

        if (!registrationNumber) {
            throw new AppError(400, "Registration number is required");
        }
        if (!brand) {
            throw new AppError(400, "Brand is required");
        }
        if (!model) {
            throw new AppError(400, "Model is required");
        }

        const existingCar =
        await this.carRepository.findByRegistrationNumber(
            registrationNumber
        );
        if (existingCar) {
            throw new AppError(
                400,
                "registration number already exists"
            );
        }
        return this.carRepository.create({
            registrationNumber,
            brand,
            model,
            notes
        });
        
    }

    async update(id: string, input: UpdateCarInput) {
        const existingCar = await this.carRepository.findById(id);
        
        if (!existingCar) {
            throw new AppError(404, "Car not found");
        }

        const updateData: UpdateCarInput = {};

        if (input.registrationNumber !== undefined) {
             const registrationNumber = 
             input.registrationNumber.trim()

             if (!registrationNumber) {
                throw new AppError(
                    400,
                    "Registration number is required"
                );
             }

             if (registrationNumber !== 
                existingCar.registrationNumber
            ) {
                const duplicateCar =
                await this.carRepository.findByRegistrationNumber(
                    registrationNumber
                );
                
                if (duplicateCar) {
                    throw new AppError(
                        400,
                        "Registration number already exists"
                    );
                }
            }

            updateData.registrationNumber = 
registrationNumber;
        }

        if (input.brand !== undefined) {
            const brand = input.brand.trim();

            if (!brand) {
                throw new AppError(400, "Brand is required");
            }
            updateData.brand = brand;
        }

        if (input.model !== undefined) {
            const model = input.model.trim();

            if (!model) {
                throw new AppError(400, "Model is required");
            }
            updateData.model = model;
        }

        if (input.notes !== undefined) {
            updateData.notes = input.notes.trim();
        }

        if (Object.keys(updateData).length === 0) {
            throw new AppError(
                400,
                "At least one field is required for update"
            );
        }

        return this.carRepository.update(id, updateData);

    }

    async delete(id: string) {
        const existingCar = 
        await this.carRepository.findById(id);

        if (!existingCar) {
            throw new AppError(404, "Car not found");
        }

        return this.carRepository.delete(id);
    }
}

