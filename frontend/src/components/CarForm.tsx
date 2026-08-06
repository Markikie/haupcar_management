import { useState } from "react";

import type { CreateCarInput } from "../types/car";

interface CarFormProps {
  onSubmit: (input: CreateCarInput) => Promise<void>;
  onCancel: () => void;
  submitting?: boolean;
}

function CarForm({
  onSubmit,
  onCancel,
  submitting = false
}: CarFormProps) {
  const [form, setForm] = useState<CreateCarInput>({
    registrationNumber: "",
    brand: "",
    model: "",
    notes: ""
  });

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ): void {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value
    }));
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    await onSubmit(form);
  }

  return (
    <form className="car-form" onSubmit={handleSubmit}>
      <h2>Add New Car</h2>

      <label>
        Registration Number
        <input
          name="registrationNumber"
          value={form.registrationNumber}
          onChange={handleChange}
          placeholder="กก-1234"
          required
        />
      </label>

      <label>
        Brand
        <input
          name="brand"
          value={form.brand}
          onChange={handleChange}
          placeholder="Toyota"
          required
        />
      </label>

      <label>
        Model
        <input
          name="model"
          value={form.model}
          onChange={handleChange}
          placeholder="Yaris"
          required
        />
      </label>

      <label>
        Notes
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="หมายเหตุ"
          rows={4}
        />
      </label>

      <div className="form-actions">
        <button
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={submitting}
        >
          {submitting ? "Saving..." : "Save Car"}
        </button>
      </div>
    </form>
  );
}

export default CarForm;