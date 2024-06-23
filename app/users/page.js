"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

function UsersPage() {
    const { user } = useContext(UserContext);

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
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 6a1 1 0 112 0v5a1 1 0 11-2 0V6zm1 1a1 1 0 00-1 1v3a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
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
                </div>
                <div className="mt-6 text-center">
                    <Link href={"/"} className="text-blue-500 hover:underline">Volver</Link>
                </div>
            </div>
        </div>
    );
}

export default UsersPage;
