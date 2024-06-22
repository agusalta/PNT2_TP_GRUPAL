"use client";
import React, { useContext, useState, useEffect } from 'react';
import CocktailList from './CocktailList';
import { CocktailContext } from '../context/CocktailContext';

export default function PageCocktails() {
  const [cocktails, setCocktails] = useState({});
  const [categories, setCategories] = useState([]);
  const { handleCocktailByFirstLetter, getCategories, handleCocktailByCategory } = useContext(CocktailContext);
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getCategories();
      setCategories(res);
    };
    fetchCategories();
  }, [getCategories]);

  const handleLetterClick = async (letter) => {
    const res = await handleCocktailByFirstLetter(letter);
    setCocktails(res);
  };

  const handleCategoryClick = async (category) => {
    const res = await handleCocktailByCategory(category);
    setCocktails(res);
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row w-full">
      <aside className="hidden lg:block w-full lg:w-1/4 bg-customRed text-black p-4 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4 text-center">Buscar por Categoría</h2>
        <ul className="space-y-2">
          {categories && categories?.drinks?.map((drink, index) => (
            <li key={index} className="cursor-pointer hover:shadow text-xl" >
              <button onClick={() => handleCategoryClick(drink.strCategory)} className="block w-full py-2 px-4 bg-customRed text-black rounded hover:uppercase transition-colors duration-200">
                {drink.strCategory}
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <div className="w-full lg:w-3/4 p-8">
        <div className="flex justify-center mb-8 flex-wrap">
          {alphabet.map(letter => (
            <button
              key={letter}
              onClick={() => handleLetterClick(letter)}
              className="m-1 px-3 py-2 bg-black text-white rounded hover:bg-white hover:text-black transition-colors duration-200"
            >
              {letter.toUpperCase()}
            </button>
          ))}
        </div>
        <CocktailList Cocktails={cocktails} />
      </div>
    </div>
  );
}
