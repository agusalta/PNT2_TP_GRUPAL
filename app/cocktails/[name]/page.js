"use client";
import React, { useContext, useEffect, useState } from 'react';
import { CocktailContext } from '../../context/CocktailContext';
import { UserContext } from "../../context/UserContext";
import Link from 'next/link';
import Image from 'next/image';

export default function PageDetails({ params }) {
    const { name } = params;
    const { handleCocktailByName } = useContext(CocktailContext);
    const { handleFavouriteCocktail, login } = useContext(UserContext);
    const [cocktail, setCocktail] = useState(null);
    const [message, setMessage] = useState(null);

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

    const handleClick = async () => {
        try {
            const added = await handleFavouriteCocktail(cocktail);

            if (added) {
                setMessage("Bebida añadida a favoritos correctamente");
            } else {
                setMessage("No se pudo añadir la bebida a favoritos");
            }
        } catch (error) {
            console.error("Error al añadir bebida a favoritos:", error.message);
            setMessage("Error al añadir la bebida a favoritos");
        }
    };

    return (
        <section className='bg-gray-100 min-h-screen flex items-center justify-center'>
            <div className='container mx-auto px-4'>
                {cocktail ? (
                    <div className='flex flex-col md:flex-row max-w-5xl mx-auto bg-white rounded-lg overflow-hidden shadow-lg'>
                        <div className='md:w-1/2'>
                            <Image
                                src={cocktail.strDrinkThumb}
                                alt={cocktail.strDrink}
                                width={500}
                                height={500}
                                className='object-cover'
                            />
                        </div>
                        <div className='p-4 md:w-1/2'>
                            <h2 className='text-3xl text-center md:text-right italic font-bold mb-2'>{cocktail.strDrink}</h2>
                            <p className='mb-1'><strong>Categoría:</strong> {cocktail.strCategory}</p>
                            <p className='mb-1'><strong>Tipo de bebida:</strong> {cocktail.strAlcoholic}</p>
                            <p className='mb-1'><strong>Vaso recomendado:</strong> {cocktail.strGlass}</p>
                            <p className='mb-1'>
                                <strong>Instrucciones:</strong> {cocktail.strInstructionsES || cocktail.strInstructions}
                            </p>
                            <div className='mt-4'>
                                <strong>Ingredientes:</strong>
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
                    </div>
                ) : (
                    <p className='text-center'>Cargando...</p>
                )}
                <div className='flex flex-col md:flex-row justify-center items-center mt-6'>
                    <Link href="/" passHref>
                        <button className='bg-customDarkRed hover:bg-red-600 transform ease-in delay-75 text-white px-6 py-2 rounded-md mb-2 md:mb-0 md:mr-4'>
                            Volver
                        </button>
                    </Link>

                    {login &&
                        <button className='bg-customDarkRed hover:bg-red-600 transform ease-in delay-75 text-white px-6 py-2 rounded-md' onClick={handleClick}>
                            Favorito
                        </button>}
                </div>
                {message && (
                    <div className="mt-4 p-3 text-black rounded-md text-center">
                        {message}
                    </div>
                )}
            </div>
        </section>
    );
}
