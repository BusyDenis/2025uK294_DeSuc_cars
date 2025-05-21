import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Car } from './service';
import { getCars, updateCar } from './service';

export default function EditCar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Car>>({});

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const cars = await getCars();
        const foundCar = cars.find(c => c.id === Number(id));
        if (foundCar) {
          setCar(foundCar);
          setFormData(foundCar);
        } else {
          setError('Car not found');
        }
      } catch (err) {
        setError('Failed to fetch car details');
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'Year' ? value : 
              ['Miles_per_Gallon', 'Cylinders', 'Displacement', 'Horsepower', 'Weight_in_lbs', 'Acceleration'].includes(name) 
                ? Number(value) 
                : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!car) return;

    try {
      await updateCar(car.id, formData);
      navigate(`/cars/${car.id}`);
    } catch (err) {
      setError('Failed to update car');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!car) return <div>Car not found</div>;

  return (
    <div className="container-cars">
      <div className="header">
        Edit Car
        <button onClick={() => navigate(`/cars/${car.id}`)} className="back-button">Back</button>
      </div>
      <div className="edit-form-container">
        <form onSubmit={handleSubmit} className="edit-form">
          <div className="form-section">
            <h3>Basic Information</h3>
            <div className="form-group">
              <label htmlFor="Name">Car Name:</label>
              <input
                type="text"
                id="Name"
                name="Name"
                value={formData.Name || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="Year">Year:</label>
              <input
                type="date"
                id="Year"
                name="Year"
                value={formData.Year || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="Origin">Origin:</label>
              <input
                type="text"
                id="Origin"
                name="Origin"
                value={formData.Origin || ''}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Performance</h3>
            <div className="form-group">
              <label htmlFor="Horsepower">Horsepower:</label>
              <input
                type="number"
                id="Horsepower"
                name="Horsepower"
                value={formData.Horsepower || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="Acceleration">Acceleration (seconds):</label>
              <input
                type="number"
                id="Acceleration"
                name="Acceleration"
                step="0.1"
                value={formData.Acceleration || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="Miles_per_Gallon">Miles per Gallon:</label>
              <input
                type="number"
                id="Miles_per_Gallon"
                name="Miles_per_Gallon"
                step="0.1"
                value={formData.Miles_per_Gallon || ''}
                onChange={handleInputChange}
                required
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
                value={formData.Cylinders || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="Displacement">Displacement (cubic inches):</label>
              <input
                type="number"
                id="Displacement"
                name="Displacement"
                value={formData.Displacement || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="Weight_in_lbs">Weight (lbs):</label>
              <input
                type="number"
                id="Weight_in_lbs"
                name="Weight_in_lbs"
                value={formData.Weight_in_lbs || ''}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="save-button">Save Changes</button>
            <button 
              type="button" 
              onClick={() => navigate(`/cars/${car.id}`)}
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