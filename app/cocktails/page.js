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

  useEffect(()=>{
    const fetchCocktails = async () => {
      const res = await handleCocktailByFirstLetter('a');
      setCocktails(res);
    };
    fetchCocktails();
  },[]);  

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
if (!categories.drinks) return(<>Loading</>);
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Toggle Button for smaller screens*/}
      <button
        onClick={toggleAside}
        className="lg:hidden p-2 m-4 bg-customRed text-white rounded-full shadow-lg hover:bg-red-700 transition-colors duration-200 fixed bottom-4 right-4 z-50"
      >
        {isAsideCollapsed ? 'Show Categories' : 'Hide Categories'}
      </button>

      {/* Aside Menu */}
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

      {/* Main Content */}
      <div className="w-full lg:w-3/4 p-8 flex flex-col ">
        {/* Alphabet Filters */}
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

        {/* Cocktail List */}
        <div>

        <CocktailList Cocktails={cocktails}/>
        </div>
      </div>
    </div>
  );
}
