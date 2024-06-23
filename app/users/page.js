"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { CocktailContext } from "../context/CocktailContext";

function UsersPage() {
    const { user } = useContext(UserContext);
    const { handleCocktailByName } = useContext(CocktailContext);
    const [cocktails, setCocktails] = useState([]);

    useEffect(() => {
        const fetchCocktails = async () => {
            if (user?.favoriteCocktails && user.favoriteCocktails.length > 0) {
                try {
                    const cocktailsPromises = user.favoriteCocktails.map(cocktail => handleCocktailByName(cocktail));
                    const resolvedCocktails = await Promise.all(cocktailsPromises);

                    const validCocktails = resolvedCocktails
                        .filter(result => result.drinks != null)
                        .flatMap(result => result.drinks);
                    setCocktails(validCocktails);
                } catch (error) {
                    console.error("Error fetching cocktails:", error);
                }
            }
        };

        fetchCocktails();
    }, [user?.favoriteCocktails, handleCocktailByName, user]);

    console.log(cocktails);

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
                    <div className="flex items-center justify-center mb-6">
                        <div className="relative">
                            <Image
                                src={user?.profilePhoto || "/profile.png"}
                                alt="Imagen de perfil"
                                width={150}
                                height={150}
                                className="rounded-full"
                            />
                            <span className="absolute bottom-0 right-0 bg-green-500 rounded-full p-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 6a1 1 0 112 0v5a1 1 0 11-2 0V6zm1 1a1 0 00-1 1v3a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </span>
                        </div>
                        <div className="ml-4">
                            <h1 className="text-3xl font-bold">{user?.username}</h1>
                            <p className="text-gray-600">{user?.email}</p>
                        </div>
                    </div>
                    <div className="border-t border-gray-200 mt-6 pt-6">
                        <h2 className="text-xl font-semibold mb-4">Información adicional</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M12 6a2 2 0 100-4 2 2 0 000 4zM4 6a2 2 0 100-4 2 2 0 000 4zm0 7a2 2 0 100-4 2 2 0 000 4zm12 2a2 2 0 11-4 0 2 2 0 014 0zM8 15a2 2 0 100-4 2 2 0 000 4zm8-2a2 2 0 11-4 0 2 2 0 014 0zM8 3a2 2 0 100-4 2 2 0 000 4zm12 0a2 2 0 100-4 2 2 0 000 4zm0 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                                <span className="text-gray-600">Miembro desde 2024</span>
                            </div>
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 3a7 7 0 100 14 7 7 0 000-14zM2 10a8 8 0 1116 0 8 8 0 01-16 0z" clipRule="evenodd" />
                                    <path d="M9 4a1 1 0 011-1h1a1 1 0 110 2H9a1 1 0 01-1-1zm0 4a1 1 0 100 2h2a1 1 0 100-2H9zm0 4a1 1 0 011-1h1a1 1 0 110 2H9a1 1 0 01-1-1z" />
                                </svg>
                                <span className="text-gray-600">Usuario</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <h2 className="text-xl font-semibold mb-4">Cócteles favoritos</h2>
                        {cocktails.length > 0 ? (
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {cocktails.map(cocktail => (
                                    <li key={cocktail.idDrink} className="bg-gray-200 p-4 rounded-md">
                                        <h3 className="text-lg font-semibold">{cocktail.strDrink}</h3>
                                        <p className="text-gray-600">Categoría: {cocktail.strCategory}</p>
                                        <p className="text-gray-600">Tipo: {cocktail.strAlcoholic}</p>
                                        <p className="text-gray-600">Vaso: {cocktail.strGlass}</p>
                                        <p className="text-gray-600">Instrucciones: {cocktail.strInstructions}</p>
                                        <Image width={192} height={192} src={cocktail.strDrinkThumb} alt={cocktail.strDrink} className="w-full h-48 object-cover mt-4 rounded-md" />

                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-600">No tienes cócteles favoritos.</p>
                        )}
                    </div>
                </div>
                <div className="mt-6 text-center">
                    <Link href={"/"} className="text-sm text-customDarkRed hover:underline dark:text-customDarkRed">Volver</Link>
                </div>
            </div>
        </div>
    );
}

export default UsersPage;
