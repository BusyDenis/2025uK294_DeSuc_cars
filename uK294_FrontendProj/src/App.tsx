import './App.css'
import React from 'react'
import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom'
import CarsPage from "./CarsPage"
import { Login } from './Login'
import { Register } from './Register'
import CarsOverview from './CarsOverview'
import EditCar from './EditCar'
import CreateCar from './CreateCar'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/cars" element={<CarsPage/>}/>
        <Route path="/cars/:id" element={<CarsOverview/>}/>
        <Route path="/cars/:id/edit" element={<EditCar/>}/>
        <Route path="/cars/create" element={<CreateCar/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App