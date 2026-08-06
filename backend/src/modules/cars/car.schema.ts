import { z } from "zod";

export const createCarSchema = z.object({
    registrationNumber: z
        .string()
        .trim()
        .min(1, "Registration number is required")
        .max(20, "Registration number must be at most 20 characters long"),

    brand: z
        .string()
        .trim()
        .min(1, "Brand is required")
        .max(100, "Brand is too long"),

    model: z
        .string()
        .trim()
        .min(1, "Model is required")
        .max(100, "Model is too long"),

    notes: z
        .string()
        .trim()
        .max(500, "Notes is too long")
        .optional()

});

export const updateCarSchema =
    createCarSchema
        .partial()
        .refine(
            (data) => Object.keys(data).length > 0,
            {
                message: "At least one field must be provided for update"
            }
        );