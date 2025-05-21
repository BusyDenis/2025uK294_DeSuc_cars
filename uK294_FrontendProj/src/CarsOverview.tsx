import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import type { Car } from './service'
import { deleteCar, getCars } from './service'

export default function CarsOverview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const cars = await getCars();
        const foundCar = cars.find(c => c.id === Number(id));
        if (foundCar) {
          setCar(foundCar);
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!car) return <div>Car not found</div>;

  return (
    <div className="container-cars">
      <div className="header">
        Car Details
        <button onClick={() => navigate('/cars')} className="back-button">Back to Cars</button>
      </div>
      <div className="car-details">
        <h2>{car.Name}</h2>
        <div className="car-info">
          <div className="info-section">
            <h3>Basic Information</h3>
            <p><strong>Year:</strong> {new Date(car.Year).getFullYear()}</p>
            <p><strong>Origin:</strong> {car.Origin}</p>
            <p><strong>Weight:</strong> {car.Weight_in_lbs} lbs</p>
          </div>
          
          <div className="info-section">
            <h3>Performance</h3>
            <p><strong>Horsepower:</strong> {car.Horsepower}hp</p>
            <p><strong>Acceleration:</strong> {car.Acceleration} seconds</p>
            <p><strong>Miles per Gallon:</strong> {car.Miles_per_Gallon} mpg</p>
          </div>
          
          <div className="info-section">
            <h3>Engine Specifications</h3>
            <p><strong>Cylinders:</strong> {car.Cylinders}</p>
            <p><strong>Displacement:</strong> {car.Displacement} cubic inches</p>
          </div>
        </div>

      <div className="car-actions">
        <h3>Actions</h3>
        <div className="action-buttons">
          <button 
            onClick={() => navigate(`/cars/${car.id}/edit`)} 
            className="edit-button"
            style={{
              backgroundColor: '#1D63DC',
              color: 'white',
              padding: '12px 24px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              marginRight: '12px'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1551b3'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1D63DC'}
          >
            Edit Car
          </button>
          <button 
            onClick={async () => {
              if (window.confirm('Are you sure you want to delete this car?')) {
                try {
                  await deleteCar(car.id);
                  navigate('/cars');
                } catch (err) {
                  setError('Failed to delete car');
                }
              }
            }}
            className="delete-button"
            style={{
              backgroundColor: '#dc1d1d',
              color: 'white',
              padding: '12px 24px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#b31515'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#dc1d1d'}
          >
            Delete Car
          </button>
        </div>
      </div>
      </div>
    </div>
  )
}
