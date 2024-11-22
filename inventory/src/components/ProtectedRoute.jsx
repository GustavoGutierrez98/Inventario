import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Asegúrate de tener la ruta correcta al contexto

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth(); // Obtén el usuario y el estado de carga desde el contexto

  if (loading) {
    return (
      <div>
        <p>Cargando...</p> {/* Puedes poner un spinner o mensaje más sofisticado */}
      </div>
    );
  }

  // Si no hay usuario o no es el superusuario, redirige a la página de login
  if (!user) {
    return <Navigate to="/" />;
  }

  // Si es el superusuario o un usuario autenticado permitido, renderiza el contenido protegido
  if (user.email !== "tucakike@gmail.com") {
    return <Navigate to="/unauthorized" />; // Redirige a una página de "No autorizado"
  }

  return children; // Si el usuario está autenticado y es el superusuario, renderiza el contenido de la ruta protegida
};

export default ProtectedRoute;
