import { useEffect, useState } from 'react'
import type { Car } from './service'
import { getCars, logout } from './service'
import { useNavigate } from 'react-router-dom'

function CarsPage() {
  const navigate = useNavigate();
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchCars = async () => {
    try {
      const data = await getCars();
      setCars(data);
      setFilteredCars(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch cars.');
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  useEffect(() => {
    const filtered = cars.filter(car => {
      const searchLower = searchTerm.toLowerCase();
      return (
        car.Name.toLowerCase().includes(searchLower) ||
        car.Origin.toLowerCase().includes(searchLower) ||
        new Date(car.Year).getFullYear().toString().includes(searchTerm)
      );
    });
    setFilteredCars(filtered);
  }, [searchTerm, cars]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleCarClick = (carId: number) => {
    navigate(`/cars/${carId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className='container-cars'>
      <div className='header'>
        Cars
        <div className="header-buttons">
          <button 
            onClick={() => navigate('/cars/create')} 
            className="create-button"
          >
            Add New Car
          </button>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      </div>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search by name, origin, or year..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

      </div>
      <div className="car-list">
        {filteredCars.map(car => (
          <div 
            key={car.id} 
            className='car-card'
            onClick={() => handleCarClick(car.id)}
            style={{ cursor: 'pointer' }}
          >
            <h3>{car.Name}</h3>
            <div className="car-card-info">
              <p>Year: {new Date(car.Year).getFullYear()}</p>
              <p>Horsepower: {car.Horsepower}hp</p>
            </div>
          </div>
        ))}
        {filteredCars.length === 0 && searchTerm && (
          <div className="no-results">
            No cars found matching "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  )
}

export default CarsPage
