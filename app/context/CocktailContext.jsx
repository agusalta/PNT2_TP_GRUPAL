"use client";
import { createContext, useState } from "react";

export const CocktailContext = createContext();

export function CocktailProvider({ children }) {
  const [cocktailsByFirstLetter, setCocktailsByFirstLetter] = useState([]);

  const handleCocktailByFirstLetter = async letter => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/cocktails/letter/${letter}`
      );
      const data = await response.json();
      setCocktailsByFirstLetter(data);
      return data;
    } catch (error) {
      console.log("Fetch error: ", error.message);
      throw error;
    }
  };

  const handleCocktailByCategory = async category => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/cocktails/category/search/${category}`
      );

      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Fetch error: ", error.message);
      throw error;
    }
  };

  const getCategories = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/cocktails/cocktail/categories`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Fetch error: ", error.message);
      throw error;
    }
  };

  const handleCocktailByName = async name => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/cocktails/${name}`
      );

      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Fetch error: ", error.message);
      throw error;
    }
  };

  return (
    <CocktailContext.Provider
      value={{
        handleCocktailByFirstLetter,
        cocktailsByFirstLetter,
        getCategories,
        handleCocktailByCategory,
        handleCocktailByName,
      }}
    >
      {children}
    </CocktailContext.Provider>
  );
}
