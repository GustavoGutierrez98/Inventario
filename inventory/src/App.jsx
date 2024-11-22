// src/App.jsx
import React from 'react';
import Login from './pages/Login/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registro from "./pages/Registro/Sign_up";
import MenuComponent from './pages/Menu/Menu';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Registro />} />
                <Route path='/dash' element={<MenuComponent/>}/>
            </Routes>
        </Router>
    );
}

export default App;

