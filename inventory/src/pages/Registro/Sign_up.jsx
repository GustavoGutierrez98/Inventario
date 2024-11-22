import React, { useState } from "react";
import { auth } from "../../config/firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // Para usar Firestore
import { db } from "../../config/firebaseConfig"; // Importa tu configuración de Firestore
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './Sign_up.css'

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [photoURL, setPhotoURL] = useState(""); // URL de la imagen opcional

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Crear usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Actualizar perfil del usuario
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: username,
        photoURL: photoURL || "https://example.com/default-avatar.png", // URL de imagen por defecto
      });

      // Guardar información adicional en Firestore (opcional)
      await setDoc(doc(db, "usuarios", user.uid), {
        email: email,
        username: username,
        photoURL: photoURL || "https://example.com/default-avatar.png",
      });

      toast.success("Registro exitoso. ¡Bienvenido!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
    } catch (error) {
      toast.error("Error al registrar: " + error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  };

  return (
    <div id="Sign">
       <div className="wrapper">
      <form onSubmit={handleRegister}>
        <h1>Regístrate</h1>
        <div className="input-box">
          <input
            type="text"
            placeholder="Nombre de Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-box">
          <input
            type="text"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-box">
          <input
            type="text"
            placeholder="URL de Imagen (opcional)"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Crear Cuenta</button>
        </div>
        <div className="register-link">
          <p>¿Ya tienes una cuenta? <a href="/">Inicia sesión</a></p>
        </div>
      </form>
      <ToastContainer />
    </div>
    </div>
  );
}

export default SignUp;
