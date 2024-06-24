"use client";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import { UserContext } from "../context/UserContext";
import { CocktailContext } from "../context/CocktailContext";

function UsersPage() {
    const { user, handleDeleteFavouriteCocktail, handleGetFavouriteCocktails } = useContext(UserContext);
    const [cocktails, setCocktails] = useState([]);
    const [cocktailToDelete, setCocktailToDelete] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { handleCocktailByName } = useContext(CocktailContext);
    const [favoriteCategory, setFavoriteCategory] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const favouriteCocktails = await handleGetFavouriteCocktails();

                if (favouriteCocktails) {
                    const cocktailsPromises = favouriteCocktails.map(cocktail => handleCocktailByName(cocktail));
                    const cocktailsResults = await Promise.all(cocktailsPromises);

                    const validCocktails = cocktailsResults
                        .filter(result => result && result.drinks && result.drinks.length > 0)
                        .map(result => result.drinks[0]);

                    setCocktails(validCocktails);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [handleGetFavouriteCocktails, handleCocktailByName]);

    useEffect(() => {
        if (cocktails) {
            const categoryCounts = {};

            cocktails.forEach(cocktail => {
                const category = cocktail.strCategory;
                if (categoryCounts[category]) {
                    categoryCounts[category]++;
                } else {
                    categoryCounts[category] = 1;
                }
            });

            let mostCommonCategory = null;
            let maxCount = 0;

            Object.entries(categoryCounts).forEach(([category, count]) => {
                if (count > maxCount) {
                    mostCommonCategory = category;
                    maxCount = count;
                }
            });

            setFavoriteCategory(mostCommonCategory);
        }
    }, [cocktails]);

    useEffect(() => {
        if (!user) {
            router.push('/');
        }
    }, [user, router]);

    const openModal = (cocktail) => {
        setCocktailToDelete(cocktail);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCocktailToDelete(null);
    };

    const handleDelete = async () => {
        if (cocktailToDelete) {
            try {
                const deleted = await handleDeleteFavouriteCocktail(cocktailToDelete);

                if (deleted) {
                    setCocktails(prevCocktails => prevCocktails.filter(cocktail => cocktail.idDrink !== cocktailToDelete.idDrink));
                }

                closeModal();
            } catch (error) {
                console.error("Error al eliminar cóctel favorito:", error);
            }
        }
    };

    const handleChange = (cocktail) => {
        openModal(cocktail);
    };

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
                            <span className="absolute bottom-0 right-0 bg-customDarkRed rounded-full p-2">
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
                                <p className="text-gray-600">
                                    {user?.username || "El usuario "}
                                    <span >
                                        {cocktails?.length > 0
                                            ? cocktails.length === 1
                                                ? " tiene una bebida favorita"
                                                : ` tiene ${cocktails.length} bebidas favoritas`
                                            : " no tiene bebidas favoritas"}
                                    </span>
                                </p>
                            </div>
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 3a7 7 0 100 14 7 7 0 000-14zM2 10a8 8 0 1116 0 8 8 0 01-16 0z" clipRule="evenodd" />
                                    <path d="M9 4a1 1 0 011-1h1a1 1 0 110 2H9a1 1 0 01-1-1zm0 4a1 1 0 100 2h2a1 1 0 100-2H9zm0 4a1 1 0 011-1h1a1 1 0 110 2H9a1 1 0 01-1-1z" />
                                </svg>
                                <div>
                                    <p className="text-gray-600">Su categoria favorita es <span className="underline">{favoriteCategory || "No definida"}</span></p>
                                </div>
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
                                        <button className="p-3 hover:scale-110" onClick={() => handleChange(cocktail)}>Eliminar</button>

                                        {isModalOpen && (
                                            <div className="fixed z-10 inset-0 overflow-y-auto">
                                                <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                                    <div className="fixed inset-0 transition-opacity">
                                                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                                                    </div>

                                                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
                                                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                                            <div className="sm:flex sm:items-start">
                                                                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                                    <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                                    </svg>
                                                                </div>
                                                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                                    <h3 className="text-lg leading-6 font-medium text-gray-900">Eliminar cóctel</h3>
                                                                    <div className="mt-2">
                                                                        <p className="text-sm text-gray-500">¿Estás seguro de que quieres eliminar este cóctel de tus favoritos?</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                                            <button onClick={handleDelete} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                                                                Eliminar
                                                            </button>
                                                            <button onClick={closeModal} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                                                Cancelar
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
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
        </div >
    );
}

export default UsersPage;
