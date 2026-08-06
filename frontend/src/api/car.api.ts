import type {
    Car,
    CreateCarInput,
    UpdateCarInput,
} from "../types/car";

const API_URL = "http://localhost:3000/api/v1"

interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

async function request<T>(
    path: string,
    options?: RequestInit
): Promise<T> {
    const response = await fetch(
        `${API_URL}${path}`,
        {
            headers: {
                "Content-Type": "application/json",
                ...options?.headers,
            },
            ...options,
        }
    );

    const result =
    (await response.json()) as ApiResponse<T>;

    if (!response.ok) {
        throw new Error(
            result.message ?? `Request failed`
        );
    }

    return result.data;
}

export function getCars(): Promise<Car[]> {
    return request<Car[]>("/cars");
}

export function createCar(
    input: CreateCarInput
): Promise<Car> {
    return request<Car>("/cars", {
        method: "POST",
        body: JSON.stringify(input),
    });
}

export function updateCar(
    id: string,
    input: UpdateCarInput
): Promise<Car> {
    return request<Car>(`/cars/${id}`, {
        method: "PUT",
        body: JSON.stringify(input),
    });
}

export async function deleteCar(
  id: string
): Promise<void> {
  await request<unknown>(`/cars/${id}`, {
    method: "DELETE"
  });
}