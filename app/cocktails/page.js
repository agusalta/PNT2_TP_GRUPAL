"use client";
import React, { useContext, useState, useEffect } from 'react';
import CocktailList from './CocktailList';
import { CocktailContext } from '../context/CocktailContext';

export default function PageCocktails() {
  const [cocktails, setCocktails] = useState({});
  const [categories, setCategories] = useState([]);
  const [isAsideCollapsed, setIsAsideCollapsed] = useState(false);
  const { handleCocktailByFirstLetter, getCategories, handleCocktailByCategory } = useContext(CocktailContext);
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getCategories();
      setCategories(res);
    };
    fetchCategories();
  }, [getCategories]);

  useEffect(() => {
    const fetchCocktails = async () => {
      const res = await handleCocktailByFirstLetter('a');
      setCocktails(res);
    };
    fetchCocktails();
  }, [handleCocktailByFirstLetter]);

  const handleLetterClick = async (letter) => {
    const res = await handleCocktailByFirstLetter(letter);
    setCocktails(res);
  };

  const handleCategoryClick = async (category) => {
    const res = await handleCocktailByCategory(category);
    setCocktails(res);
  };

  const toggleAside = () => {
    setIsAsideCollapsed(!isAsideCollapsed);
  };

  if (!categories.drinks) return (
    <div role="status">
      <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
      </svg>
      <span class="sr-only">Loading...</span>
    </div>);

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <button
        onClick={toggleAside}
        className="lg:hidden p-2 m-4 bg-customRed text-white rounded-full shadow-lg hover:bg-red-700 transition-colors duration-200 fixed bottom-4 right-4 z-50"
      >
        {isAsideCollapsed ? 'Show Categories' : 'Hide Categories'}
      </button>

      <aside className={`w-full bg-gray-300 bg-opacity-50 lg:w-1/4 text-white p-4 rounded-lg shadow-lg transition-transform duration-300 ${isAsideCollapsed ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'} fixed lg:sticky h-full overflow-y-auto`}>
        <div className="bg-opacity-75 lg:bg-transparent">
          <h2 className="text-3xl font-bold mb-4 text-black text-center">Buscar por Categoría</h2>
          <ul className="space-y-2">
            {categories && categories.drinks.map((drink, index) => (
              <li key={index} className="cursor-pointer hover:shadow-lg text-xl">
                <button onClick={() => handleCategoryClick(drink.strCategory)} className="block w-full py-2 px-4 bg-customRed bg:text-white rounded hover:bg-red-700 transition-colors duration-200">
                  {drink.strCategory}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <div className="w-full lg:w-3/4 p-8 flex flex-col ">
        <div className="flex justify-center mb-8 flex-wrap">
          {alphabet.map(letter => (
            <button
              key={letter}
              onClick={() => handleLetterClick(letter)}
              className="m-1 px-3 py-2 bg-customRed text-white rounded-full hover:bg-red-700 transition-colors duration-200 shadow-lg"
            >
              {letter.toUpperCase()}
            </button>
          ))}
        </div>

        <div>
          <CocktailList Cocktails={cocktails} />
        </div>
      </div>
    </div>
  );
}
