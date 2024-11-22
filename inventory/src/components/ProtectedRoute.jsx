import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children, superUserOnly = false }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div>
        <p>Cargando...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" />; // Redirige al login si no hay usuario
  }

  if (superUserOnly && user.email !== "tucakike@gmail.com") {
    return <Navigate to="/unauthorized" />; // Página de "No autorizado"
  }

  return children; // Renderiza el contenido protegido
};

export default ProtectedRoute;
