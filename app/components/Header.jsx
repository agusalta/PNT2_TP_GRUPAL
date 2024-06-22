"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

function Header() {
  const { login, user } = useContext(UserContext);

  return (
    <header className="sticky top-0 z-50 bg-white p-4 text-gray-800 shadow-md">
      <div className="flex items-center justify-around gap-5">
        <button className="text-lg font-bold hover:text-gray-600">HOME</button>
        <h1 className="text-3xl font-bold">COCKTAILS</h1>
        {login ? (
          <Link href={"/users"}>
            <Image
              className="rounded-full cursor-pointer"
              width={60}
              height={60}
              alt="profile picture"
              src="/profile.png"
            />
          </Link>
        ) : (
          <div className="flex gap-4">
            <Link href={"/users/register"}>Registrarse</Link>
            <Link href={"/users/login"}>Iniciar sesión</Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
