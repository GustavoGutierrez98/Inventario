// Importa Firebase y los módulos que necesitas
import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAq-TykOi2_lg_7YsweONePmB7Gi5hB5ag",
  authDomain: "loginmoviles.firebaseapp.com",
  projectId: "loginmoviles",
  storageBucket: "loginmoviles.appspot.com", // Corregido
  messagingSenderId: "745183367991",
  appId: "1:745183367991:web:0f986aaee4308476b780b2"
};

const app = initializeApp(firebaseConfig);

// Inicializar Auth y Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);

// Exporta signOut para facilitar el cierre de sesión
export { signOut };
