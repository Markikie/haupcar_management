import { prisma } from './../../database/prisma';
import { PrismaClient } from '@prisma/client';

import type {
    CreateCarInput,
    UpdateCarInput
} from "./car.types"

export class CarRepository {
    constructor(private readonly prisma: PrismaClient) {}

    async findAll() {
        return this.prisma.car.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });
    }

    async findById(id: string) {
        return this.prisma.car.findUnique({
            where: {
                id
            }
        })
    }

    async findByRegistrationNumber(registrationNumber: string) {
        return this.prisma.car.findUnique({
            where: {
                registrationNumber
            }
        })
    }

    async update(id:string, data: UpdateCarInput) {
        return this.prisma.car.update({
            where: {
                id
            },
            data
        }) 
    }
        
    async delete(id: string) {
        return this.prisma.car.delete({
            where: {
                id
            }
        })
    }
}