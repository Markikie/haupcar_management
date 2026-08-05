import type {
    NextFunction,
    Request,
    Response
} from "express"

import type {
    CreateCarInput,
    UpdateCarInput
} from "./car.types"

import type { CarService } from "./car.service"

export class CarController {
    constructor(
        private readonly carService: CarService
    ) {}

    getAll = async (
        _req: Request,
        res: Response,
        next: NextFunction

    ): Promise<void> => {
        try {
            const cars = await this.carService.getAll();

            res.status(200).json({
                success: true,
                data: cars
            });
        } catch (error) {
            next(error);
        }
    };

    getById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {

            const id = req.params.id;

            if (typeof id !== "string") {
                res.status(400).json({
                    success: false,
                    message: "Invalid car ID"
                });
                return;
            }
            const car = await this.carService.getById(id);

            res.status(200).json({
                success: true,
                data: car
            });
        } catch (error) {
            next(error);
        }
    };

    update = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const input = req.body as UpdateCarInput;
            const id = req.params.id;

            if (typeof id !== "string") {
                res.status(400).json({
                    success: false,
                    message: "Invalid car ID"
                });
                return;
            }

            const car = await this.carService.update(
                id,
                input
            );

            res.status(200).json({
                success: true,
                data: car
            });
        } catch (error) {
            next(error);
        }
    };

    delete = async (
        req: Request,
        res: Response,
        next: NextFunction

    ): Promise<void> => {
        try {
            const id = req.params.id;

            if (typeof id !== "string") {
                res.status(400).json({
                    success: false,
                    message: "Invalid car ID"
                });
                return;
            }

            await this.carService.delete(id);

            res.status(200).json({
                success: true,
                message: "Car deleted successfully"
            });
        } catch (error) {
            next(error);
        }
    };
}