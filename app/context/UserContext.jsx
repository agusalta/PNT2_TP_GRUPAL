"use client";
import { createContext, useState, useEffect } from "react";
export const UserContext = createContext();

const getUserFromEmail = async (token, email) => {
  try {
    if (!email) {
      throw new Error("El email es un campo necesario.");
    }

    const response = await fetch(`http://localhost:3000/users/find/${email}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("No se pudo obtener la información del usuario.");
    }

    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error("Error al obtener datos del usuario:", error.message);
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

      // Almacenar el token en localStorage
      localStorage.setItem("authToken", authToken);

      // Obtener y almacenar los datos del usuario desde el token
      const userData = await getUserFromEmail(authToken, email);
      setUser(userData);
      setLogin(true);

      console.log(userData);

      return { message: "Usuario logeado exitosamente." };
    } catch (error) {
      console.log("Fetch error: ", error.message);
      throw error;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setLogin(false);
    setUser(null);
    setToken(null);
  };

  return (
    <UserContext.Provider
      value={{ handleRegister, handleLogin, handleLogout, login, user }}
    >
      {children}
    </UserContext.Provider>
  );
}
