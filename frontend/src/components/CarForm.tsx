import { useState } from "react";

import type { CreateCarInput } from "../types/car";

interface CarFormProps {
  initialValue?: CreateCarInput;
  submitLabel?: string;
  onSubmit: (input: CreateCarInput) => Promise<void>;
  onCancel: () => void;
  submitting?: boolean;
}

const emptyForm: CreateCarInput = {
  registrationNumber: "",
  brand: "",
  model: "",
  notes: ""
};

function CarForm({
  initialValue = emptyForm,
  submitLabel = "Save Car",
  onSubmit,
  onCancel,
  submitting = false
}: CarFormProps) {
  const [form, setForm] =
    useState<CreateCarInput>(initialValue);

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

      <label>
        Registration Number
        <input
          name="registrationNumber"
          value={form.registrationNumber}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Brand
        <input
          name="brand"
          value={form.brand}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Model
        <input
          name="model"
          value={form.model}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Notes
        <textarea
          name="notes"
          value={form.notes ?? ""}
          onChange={handleChange}
          rows={4}
        />
      </label>

      <div className="form-actions">
        <button type="button" onClick={onCancel}>
          Cancel
        </button>

        <button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}

export default CarForm;