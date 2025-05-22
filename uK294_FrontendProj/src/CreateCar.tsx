import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Car } from "./service";
import { addCar } from "./service";

export default function CreateCar() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Car, "id">>({
    Name: "",
    Miles_per_Gallon: 0,
    Cylinders: 0,
    Displacement: 0,
    Horsepower: 0,
    Weight_in_lbs: 0,
    Acceleration: 0,
    Year: new Date().toISOString().split("T")[0],
    Origin: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "Year"
          ? value
          : [
              "Miles_per_Gallon",
              "Cylinders",
              "Displacement",
              "Horsepower",
              "Weight_in_lbs",
              "Acceleration",
            ].includes(name)
          ? Number(value) || 0
          : value || "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newCar = await addCar(formData);
      navigate(`/cars/${newCar.id}`);
    } catch (err) {
      setError("Failed to create car");
    }
  };

  return (
    <div className="container-cars">
      <div className="header">
        Add New Car
        <button onClick={() => navigate("/cars")} className="back-button">
          Back to Cars
        </button>
      </div>
      <div className="edit-form-container">
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit} className="edit-form">
          <div className="form-section">
            <h3>Basic Information</h3>
            <div className="form-group">
              <label htmlFor="Name">Car Name:</label>
              <input
                type="text"
                id="Name"
                name="Name"
                value={formData.Name}
                onChange={handleInputChange}
                placeholder="Enter car name (will be 'Unknown' if empty)"
              />
            </div>
            <div className="form-group">
              <label htmlFor="Year">Year:</label>
              <input
                type="date"
                id="Year"
                name="Year"
                value={formData.Year}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="Origin">Origin:</label>
              <input
                type="text"
                id="Origin"
                name="Origin"
                value={formData.Origin}
                onChange={handleInputChange}
                placeholder="Enter country of origin (will be 'Unknown' if empty)"
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Performance</h3>
            <div className="form-group">
              <label htmlFor="Miles_per_Gallon">Miles per Gallon:</label>
              <input
                type="number"
                id="Miles_per_Gallon"
                name="Miles_per_Gallon"
                value={formData.Miles_per_Gallon}
                onChange={handleInputChange}
                min="0"
                step="0.1"
              />
            </div>
            <div className="form-group">
              <label htmlFor="Horsepower">Horsepower:</label>
              <input
                type="number"
                id="Horsepower"
                name="Horsepower"
                value={formData.Horsepower}
                onChange={handleInputChange}
                min="0"
              />
            </div>
            <div className="form-group">
              <label htmlFor="Acceleration">Acceleration (seconds):</label>
              <input
                type="number"
                id="Acceleration"
                name="Acceleration"
                value={formData.Acceleration}
                onChange={handleInputChange}
                min="0"
                step="0.1"
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Engine Specifications</h3>
            <div className="form-group">
              <label htmlFor="Cylinders">Cylinders:</label>
              <input
                type="number"
                id="Cylinders"
                name="Cylinders"
                value={formData.Cylinders}
                onChange={handleInputChange}
                min="0"
              />
            </div>
            <div className="form-group">
              <label htmlFor="Displacement">Displacement (cubic inches):</label>
              <input
                type="number"
                id="Displacement"
                name="Displacement"
                value={formData.Displacement}
                onChange={handleInputChange}
                min="0"
                step="0.1"
              />
            </div>
            <div className="form-group">
              <label htmlFor="Weight_in_lbs">Weight (lbs):</label>
              <input
                type="number"
                id="Weight_in_lbs"
                name="Weight_in_lbs"
                value={formData.Weight_in_lbs}
                onChange={handleInputChange}
                min="0"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="save-button">
              Create Car
            </button>
            <button
              type="button"
              onClick={() => navigate("/cars")}
              className="cancel-button"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
