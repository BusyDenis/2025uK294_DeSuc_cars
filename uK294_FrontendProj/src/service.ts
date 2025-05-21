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

export interface LoginCredentials {
    email: string;
    password: string;
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

export const logout = (): void => {
    localStorage.removeItem('jwt_token');
};

export const getCars = async (): Promise<Car[]> => {
    const response = await axios.get<Car[]>(`${API_URL}/cars`);
    return response.data;
};

export const addCar = async (car: Omit<Car, 'id'>): Promise<Car> => {
    const response = await axios.post<Car>(`${API_URL}/cars`, car);
    return response.data;
};

export const updateCar = async (id: number, car: Partial<Car>): Promise<Car> => {
    const response = await axios.patch<Car>(`${API_URL}/cars/${id}`, car);
    return response.data;
};

export const deleteCar = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/cars/${id}`);
};
