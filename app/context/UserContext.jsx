"use client";
import { createContext, useState } from "react";

export const UserContext = createContext();

const getUserFromEmail = async (token, email) => {
  try {
    if (!email) {
      throw new Error("El email es un campo necesario.");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/find/${email}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

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

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

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

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

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

      return { message: "Usuario logeado exitosamente." };
    } catch (error) {
      throw error;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setLogin(false);
    setUser(null);
  };

  const handleFavouriteCocktail = async cocktail => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        throw new Error("No se pudo obtener el token de autenticación.");
      }

      if (!user || !user.email) {
        throw new Error("El usuario o el email son inválidos.");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${user.email}/favorites`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ strDrink: cocktail?.strDrink }),
        }
      );

      if (!response.ok) {
        throw new Error("No se pudo obtener la información del usuario.");
      }

      const data = await response.json();
      console.log(data);

      return data;
    } catch (error) {
      console.log("Fetch error: ", error.message);
      throw error;
    }
  };

  const handleDeleteFavouriteCocktail = async cocktail => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        throw new Error("No se pudo obtener el token de autenticación.");
      }

      if (!user || !user.email) {
        throw new Error("El usuario o el email son inválidos.");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${user.email}/favorites`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ strDrink: cocktail?.strDrink }),
        }
      );

      if (!response.ok) {
        throw new Error("No se pudo obtener la información del usuario.");
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log("Fetch error: ", error.message);
      throw error;
    }
  };

  const handleGetFavouriteCocktails = async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        throw new Error("No se pudo obtener el token de autenticación.");
      }

      if (!user || !user.email) {
        throw new Error("El usuario o el email son inválidos.");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${user.email}/favorites`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("No se pudo obtener la información del usuario.");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Fetch error: ", error.message);
      throw error;
    }
  };

  return (
    <UserContext.Provider
      value={{
        handleRegister,
        handleLogin,
        handleLogout,
        login,
        user,
        handleFavouriteCocktail,
        handleDeleteFavouriteCocktail,
        handleGetFavouriteCocktails,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
