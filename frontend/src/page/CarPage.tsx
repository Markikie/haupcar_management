import { useEffect, useState } from "react";

import {
  createCar,
  deleteCar,
  getCars,
  updateCar
} from "../api/car.api";

import CarForm from "../components/CarForm";
import Modal from "../components/Modal";

import type {
  Car,
  CreateCarInput
} from "../types/car";

function CarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingCar, setEditingCar] =
    useState<Car | null>(null);

  useEffect(() => {
    let ignore = false;

    async function loadCars(): Promise<void> {
      try {
        const result = await getCars();

        if (!ignore) {
          setCars(result);
        }
      } catch (error) {
        if (!ignore) {
          setError(
            error instanceof Error
              ? error.message
              : "Unable to load cars"
          );
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    void loadCars();

    return () => {
      ignore = true;
    };
  }, []);

  async function handleSubmitCar(
    input: CreateCarInput
  ): Promise<void> {
    try {
      setSubmitting(true);
      setError("");

      if (editingCar) {
        const updatedCar = await updateCar(
          editingCar.id,
          input
        );

        setCars((current) =>
          current.map((car) =>
            car.id === updatedCar.id
              ? updatedCar
              : car
          )
        );
      } else {
        const createdCar = await createCar(input);

        setCars((current) => [
          createdCar,
          ...current
        ]);
      }

      setShowForm(false);
      setEditingCar(null);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to save car"
      );
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDeleteCar(
    id: string
  ): Promise<void> {
    const confirmed = window.confirm(
      "ต้องการลบข้อมูลรถคันนี้หรือไม่?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await deleteCar(id);

      setCars((current) =>
        current.filter((car) => car.id !== id)
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to delete car"
      );
    }
  }

  if (loading) {
    return <p>กำลังโหลดข้อมูลรถ...</p>;
  }

  return (
    <section>
      <div className="page-header">
        <div>
          <h1>Car Management</h1>
          <p>จัดการข้อมูลรถยนต์ของบริษัท</p>
        </div>

        <button
          type="button"
          onClick={() => {
            setEditingCar(null);
            setShowForm(true);
          }}
        >
          Add New Car
        </button>
      </div>

      {error && (
        <p className="error-message">
          {error}
        </p>
      )}

      {showForm && (
  <Modal
  
    onClose={() => {
      setShowForm(false);
      setEditingCar(null);
    }}
  >
    <CarForm
      key={editingCar?.id ?? "new"}
      initialValue={
        editingCar
          ? {
              registrationNumber:
                editingCar.registrationNumber,
              brand: editingCar.brand,
              model: editingCar.model,
              notes: editingCar.notes ?? ""
            }
          : undefined
      }
      submitLabel={
        editingCar
          ? "Update Car"
          : "Save Car"
      }
      onSubmit={handleSubmitCar}
      onCancel={() => {
        setShowForm(false);
        setEditingCar(null);
      }}
      submitting={submitting}
    />
  </Modal>
)}

      {cars.length === 0 ? (
        <p>ยังไม่มีข้อมูลรถยนต์</p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Registration Number</th>
                <th>Brand</th>
                <th>Model</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {cars.map((car) => (
                <tr key={car.id}>
                  <td>{car.registrationNumber}</td>
                  <td>{car.brand}</td>
                  <td>{car.model}</td>
                  <td>{car.notes ?? "-"}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingCar(car);
                        setShowForm(true);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDeleteCar(car.id)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default CarsPage;