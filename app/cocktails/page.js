"use client";
import React, { useContext, useState } from 'react';
import CocktailList from './CocktailList';
import { CocktailContext } from '../context/Context';

export default function PageCocktails() {
  const [cocktails, setCoctkails] = useState({});
  const { handleCocktailByFirstLetter } = useContext(CocktailContext);
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

  const handleClick = async (letter) => {
    const res = await handleCocktailByFirstLetter(letter);
    console.log("letra", letter)
    console.log("res", res)
    setCoctkails(res);
  };

  return (
    <div>
      <div>
        {alphabet.map(letter => (
          <button
            key={letter}
            onClick={() => handleClick(letter)}
            className='p-3'
          >
            {letter.toUpperCase()}
          </button>
        ))}
      </div>
      <div>
        <CocktailList Cocktails={cocktails} />
      </div>
    </div>
  );
}
