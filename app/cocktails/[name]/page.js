"use client"
import React, { useContext, useEffect, useState } from 'react';
import { CocktailContext } from '../../context/CocktailContext';
import Cocktail from '../Cocktail';
import Link from 'next/link';
import Image from 'next/image';

export default function PageDetails({ params }) {
    const { name } = params;
    const { handleCocktailByName } = useContext(CocktailContext);
    const [cocktail, setCocktail] = useState(null);

    useEffect(() => {
        const fetchCocktail = async (n) => {
            try {
                const res = await handleCocktailByName(n);

                if (res.drinks) {
                    setCocktail(res.drinks[0]);
                } else {
                    console.log("No se encontraron bebidas para el nombre proporcionado")
                }
            } catch (error) {
                console.log("Fetch error: ", error.message);
                throw error;
            }
        };

        fetchCocktail(name);
    }, [handleCocktailByName, name]);

    return (
        <section className='flex items-center justify-center flex-col h-screen bg-white text-black p-4'>
            {cocktail ? (
                <div className='flex flex-col md:flex-row w-full max-w-5xl shadow-md rounded-lg '>
                    <div className='md:w-1/3'>
                        <Image width={500} height={500} src={cocktail.strDrinkThumb} alt={cocktail.strDrink} className='w-full h-full object-cover' />
                    </div>
                    <div className='p-4 md:w-2/3'>
                        <h2 className='text-2xl font-bold mb-2'>{cocktail.strDrink}</h2>
                        <p className='mb-1'><strong>Categoría:</strong> {cocktail.strCategory}</p>
                        <p className='mb-1'><strong>Tipo de bebida:</strong> {cocktail.strAlcoholic}</p>
                        <p className='mb-1'><strong>Vaso recomendado:</strong> {cocktail.strGlass}</p>
                        <p className='mb-1'>
                            <strong>Instrucciones:</strong> {cocktail.strInstructionsES !== null ? cocktail.strInstructionsES : cocktail.strInstructions}
                        </p>
                        <p className='mt-4'><strong>Ingredientes:</strong></p>
                        <ul className='list-disc list-inside'>
                            {Array.from({ length: 15 }, (_, i) => i + 1).map(index => {
                                const ingredient = cocktail[`strIngredient${index}`];
                                const measure = cocktail[`strMeasure${index}`];
                                return ingredient ? (
                                    <li key={index}>{measure} {ingredient}</li>
                                ) : null;
                            })}
                        </ul>
                    </div>
                </div>
            ) : (
                <p>Cargando...</p>
            )}
            <div className=''>
                <Link href="/" className='uppercase p-2 mt-4 bg-black text-white rounded-md hover:bg-gray-700'>
                    Volver
                </Link>
                <button className='uppercase p-2 mt-4 bg-black text-white rounded-md hover:bg-gray-700'>
                    Favorito
                </button>
            </div>
        </section>
    );
}
