"use client"
import React, { useContext, useEffect, useState } from 'react';
import { CocktailContext } from '../../context/Context';
import Cocktail from '../Cocktail';
import Link from 'next/link';

export default function Page({ params }) {
    const { name } = params;
    const { handleCocktailByName } = useContext(CocktailContext);
    const [cocktail, setCocktail] = useState(null);

    useEffect(() => {
        const fetchCocktail = async (n) => {
            try {
                const res = await handleCocktailByName(n);
                console.log(res)

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

    console.log(cocktail)

    return (
        <section>
            <div>
                {cocktail && (
                    <Cocktail name={cocktail.strDrink} thumb={cocktail.strDrinkThumb} />
                )}
            </div>
            <Link href="/">Volver</Link>
        </section>
    );
}
