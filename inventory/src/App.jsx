// src/App.jsx
import React from 'react';
import Login from './pages/Login/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from "./components/ProtectedRoute";
import Registro from "./pages/Registro/Sign_up";
import MenuComponent from './pages/Menu/Menu';
import { AuthProvider } from './components/AuthContext';
import AdminLogin from './pages/admin/LoginAdmin';
import Unauthorized from './pages/Login/Unauthorized';

function App() {
    return (
        <AuthProvider>
            {" "}
        <Router>
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/registro" element={<ProtectedRoute superUserOnly><Registro/></ProtectedRoute>} />
                <Route path="/dash" element={<ProtectedRoute><MenuComponent/></ProtectedRoute>}/>
                <Route path="/loginadm" element={<AdminLogin/>} />
                <Route path="/unauthorized" element={<Unauthorized/>}/>
            </Routes>
        </Router>
        </AuthProvider>
    );
}

export default App;
