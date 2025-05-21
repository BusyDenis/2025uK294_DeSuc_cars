import axios from 'axios';

const API_URL = 'http://localhost:3030';

export interface Car {
    id: number;
    Name: string;
    Miles_per_Gallon: number;
    Cylinders: number;
    Displacement: number;
    Horsepower: number;
    Weight_in_lbs: number;
    Acceleration: number;
    Year: string;
    Origin: string;
}

const DEFAULT_CAR_VALUES: Omit<Car, 'id'> = {
    Name: 'Unknown',
    Miles_per_Gallon: 0,
    Cylinders: 0,
    Displacement: 0,
    Horsepower: 0,
    Weight_in_lbs: 0,
    Acceleration: 0,
    Year: 'Unknown',
    Origin: 'Unknown'
};

const setDefaultValues = (car: Partial<Car>): Omit<Car, 'id'> => {
    return {
        ...DEFAULT_CAR_VALUES,
        ...car,
        Name: car.Name || DEFAULT_CAR_VALUES.Name,
        Year: car.Year || DEFAULT_CAR_VALUES.Year,
        Origin: car.Origin || DEFAULT_CAR_VALUES.Origin
    };
};

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials extends LoginCredentials {
    confirmPassword: string;
}

// Add token to all requests
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('jwt_token');
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const login = async (credentials: LoginCredentials): Promise<void> => {
    const response = await axios.post<{ accessToken: string }>(`${API_URL}/login`, credentials);
    localStorage.setItem('jwt_token', response.data.accessToken);
};

export const register = async (credentials: RegisterCredentials): Promise<void> => {
    const response = await axios.post<{ accessToken: string }>(`${API_URL}/register`, credentials);
    localStorage.setItem('jwt_token', response.data.accessToken);
};

export const logout = (): void => {
    localStorage.removeItem('jwt_token');
};

export const getCars = async (): Promise<Car[]> => {
    const response = await axios.get<Car[]>(`${API_URL}/cars`);
    return response.data;
};

export const addCar = async (car: Omit<Car, 'id'>): Promise<Car> => {
    const carWithDefaults = setDefaultValues(car);
    const response = await axios.post<Car>(`${API_URL}/cars`, carWithDefaults);
    return response.data;
};

export const updateCar = async (id: number, car: Partial<Car>): Promise<Car> => {
    const carWithDefaults = setDefaultValues(car);
    const response = await axios.patch<Car>(`${API_URL}/cars/${id}`, carWithDefaults);
    return response.data;
};

export const deleteCar = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/cars/${id}`);
};
