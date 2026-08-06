export interface Car {
    id: string;
    registrationNumber: string;
    brand: string;
    model: string;
    notes?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateCarInput {
    registrationNumber: string;
    brand: string;
    model: string;
    notes?: string;
}


export type UpdateCarInput =
    Partial<CreateCarInput>;