"use client";
import { createContext, useState } from "react";
import jwt_decode from "jwt-decode";

export const UserContext = createContext();

const getUserFromToken = token => {
  try {
    const decoded = jwtDecode(token);
    return {
      _id: decoded._id,
      email: decoded.email,
    };
  } catch (error) {
    console.error("Error decoding token:", error.message);
    return null;
  }
};

export function UserProvider({ children }) {
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(null);

  const handleRegister = async user => {
    try {
      if (!user.email || !user.password) {
        throw new Error("Email y contraseña son obligatorios.");
      }

      const response = await fetch("http://localhost:3000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error("Hubo un problema al registrar al usuario.");
      }

      const data = await response.json();

      if (!data) {
        throw new Error("Hubo un problema al registrar al usuario.");
      }

      console.log("Register data: " + data);
      return { message: "Usuario registrado exitosamente." };
    } catch (error) {
      console.log("Fetch error: ", error.message);
      throw error;
    }
  };

  const handleLogin = async (email, password) => {
    try {
      if (!email || !password) {
        throw new Error("Email y contraseña son obligatorios.");
      }

      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("No se pudo iniciar sesión");
      }

      const data = await response.json();
      const authToken = data.token;
      console.log("Token:", authToken);

      // Almacenar el token en localStorage
      localStorage.setItem("authToken", authToken);

      // Obtener y almacenar los datos del usuario desde el token
      const userData = getUserFromToken(authToken);

      if (!userData) {
        throw new Error(
          "Error al decodificar el token o datos de usuario incorrectos."
        );
      }

      setUser(userData);
      setLogin(true);

      return { message: "Usuario logeado exitosamente." };
    } catch (error) {
      console.log("Fetch error: ", error.message);
      throw error;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setToken(null);
    setLogin(false);
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{ handleRegister, handleLogin, handleLogout, login, user }}
    >
      {children}
    </UserContext.Provider>
  );
}
