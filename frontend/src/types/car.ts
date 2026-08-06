export interface Car {
    registrationNumber: string;
    brand: string;
    model: string;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateCarInput {
    registrationNumber: string;
    brand: string;
    model: string;
    notes?: string;
}


export type UpdateCarInput =
    Partial<CreateCarInput>;