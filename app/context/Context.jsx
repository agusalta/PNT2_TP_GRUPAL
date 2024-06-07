"use client";
import { createContext, useEffect, useState } from "react";

export const CocktailContext = createContext();

export function CocktailProvider({ children }) {
  const [cocktailsByFirstLetter, setCocktailsByFirstLetter] = useState([]);

  const handleCocktailByFirstLetter = async letter => {
    try {
      const response = await fetch(
        `http://localhost:3000/cocktails/letter/${letter}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setCocktailsByFirstLetter(data);
      return data;
    } catch (error) {
      console.log("Fetch error: ", error.message);
      setError(error.message);
      throw error;
    }
  };

  return (
    <CocktailContext.Provider
      value={{ handleCocktailByFirstLetter, cocktailsByFirstLetter }}
    >
      {children}
    </CocktailContext.Provider>
  );
}
