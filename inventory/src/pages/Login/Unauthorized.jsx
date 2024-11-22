import React from "react";
import { useNavigate } from "react-router-dom";
import "./Unauthorized.css"; // Importamos el archivo de estilos

const Unauthorized = () => {
  const navigate = useNavigate();

  const redirectToLogin = () => {
    navigate("/"); // Redirige al login
  };

  return (
    <div className="unauthorized-container">
      <div className="unauthorized-content">
        <h1 className="title">Acceso Denegado</h1>
        <p className="message">Lo sentimos, no tienes permisos para acceder a esta página.</p>
        <button className="login-button" onClick={redirectToLogin}>
          Volver al Login
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
