export interface CreateCarInput {
    registrationNumber: string;
    brand: string;
    model: string;
    notes?: string;
}

export interface UpdateCarInput {
    registrationNumber?: string;
  brand?: string;
  model?: string;
  notes?: string;
}