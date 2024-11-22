import React, { useState } from "react";
import { auth } from "../../config/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import '../Login/Login.css'
import { FaLock} from 'react-icons/fa'
import { FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
  
    const handleLogin = async (e) => {
      e.preventDefault();
  
      // Check if both fields are filled
      if (!email || !password) {
        toast.warn("Por favor, llena todos los campos.", {
          position: "top-right", // You can adjust the position
          autoClose: 3000, // Time in milliseconds before the toast disappears
          hideProgressBar: true,
        });
        return; // Prevent form submission if fields are empty
      }
  
      try {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Inicio de sesión exitoso!"); // Success toast
        navigate("/registro");
      } catch (err) {
        toast.error("Error al iniciar sesión: " + err.message); // Error toast
        setError(err.message); // Optionally, set error message to display below the form
      }
    };
    return (
        <div id="Login">
          <div className='wrapper'>
          <form onSubmit={handleLogin}>
            <h1>ADMIN LOGIN</h1>
            {error && <p className="error">{error}</p>}
            <div className='input-box'>
              <input
                type="text"
                placeholder='Correo'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <FaRegUser className='icon' />
            </div>
            <div className='input-box'>
              <input
                type="password"
                placeholder='Contraseña'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <FaLock className='icon' />
            </div>
            <div className="remember-forgot">
              <label>
                <input type="checkbox" name="" id="" />
                Recuerdame
              </label>
            </div>
            <div>
              <button type='submit'>Iniciar</button>
            </div>
          </form>
        </div>
        </div>
      );
}

export default AdminLogin;