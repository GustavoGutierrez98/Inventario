// src/App.jsx
import React from 'react';
import Login from './pages/Login/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./components/AuthContext"; // Asegúrate de importar AuthProvider correctamente
import ProtectedRoute from "./ProtectedRoute";
import Registro from "./pages/Registro/Sign_up";
import MenuComponent from './pages/Menu/Menu';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/registro" element={<Registro/>} />
                <Route path='/dash' element={<ProtectedRoute><MenuComponent/></ProtectedRoute>}/>
            </Routes>
        </Router>
    );
}

export default App;
