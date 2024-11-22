import React, { useState } from "react";
import { auth } from "../../config/firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // Para usar Firestore
import { db } from "../../config/firebaseConfig"; // Importa tu configuración de Firestore
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './Sign_up.css';

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [photoURL, setPhotoURL] = useState(""); // URL de la imagen opcional

  // Función para manejar el registro
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Crear usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Obtener el usuario
      const user = userCredential.user;
      
      // Actualizar el perfil del usuario con el nombre de usuario y la foto
      await updateProfile(user, {
        displayName: username,
        photoURL: photoURL || "https://example.com/default-avatar.png", // Usar imagen predeterminada si no se sube ninguna
      });

      // Guardar información adicional del usuario en Firestore
      await setDoc(doc(db, "usuarios", user.uid), {
        email: email,
        username: username,
        photoURL: photoURL || "https://example.com/default-avatar.png", // Guardar la URL de la imagen en Firestore
      });

      // Mostrar mensaje de éxito
      toast.success("Registro exitoso. ¡Bienvenido!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
    } catch (error) {
      // Manejar errores
      toast.error("Error al registrar: " + error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  };

  // Función para manejar la carga de la imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Obtener el archivo seleccionado
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoURL(reader.result); // Actualizar el estado con la URL de la imagen cargada
      };
      reader.readAsDataURL(file); // Leer la imagen como URL
    }
  };

  return (
    <div id="Sign">
      <div className="wrapper">
        <form onSubmit={handleRegister}>
          <h1>Regístrate</h1>

          {/* Nombre de usuario */}
          <div className="input-box">
            <input
              type="text"
              placeholder="Nombre de Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Correo electrónico */}
          <div className="input-box">
            <input
              type="text"
              placeholder="Correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Contraseña */}
          <div className="input-box">
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Cargar imagen (Avatar) */}
          <div className="input-box">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}  // Llamar a handleImageChange cuando el usuario seleccione una imagen
            />
          </div>

          {/* Botón de registro */}
          <div>
            <button type="submit">Crear Cuenta</button>
          </div>

          <div className="register-link">
            <p>¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a></p>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default SignUp;
