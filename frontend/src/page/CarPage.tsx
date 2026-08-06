import { useEffect, useState } from "react";

import { getCars, createCar } from "../api/car.api";

import type { Car, CreateCarInput } from "../types/car";

import CarForm from "../components/CarForm";

function CarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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
            error instanceof Error ? error.message : "Unable to load cars",
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

  if (loading) {
    return <p>กำลังโหลดข้อมูลรถ...</p>;
  }

  async function handleCreateCar(
    input: CreateCarInput
): Promise<void> {
    try {
      setSubmitting(true);
      setError("");

      const createdCar = await createCar(input);

      setCars((current) => [createdCar, ...current]);

      setShowForm(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unable to create car");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section>
      <div className="page-header">
        <div>
          <h1>Car Management</h1>
          <p>จัดการข้อมูลรถยนต์ของบริษัท</p>
        </div>

        <button type="button" onClick={() => setShowForm(true)}>
          Add New Car
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}
    
    {showForm && (
      <CarForm
        onSubmit={handleCreateCar}
        onCancel={() => setShowForm(false)}
        submitting={submitting}
      />
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
                    <button type="button">Edit</button>

                    <button type="button">Delete</button>
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
