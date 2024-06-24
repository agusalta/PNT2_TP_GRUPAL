"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

function Header() {
  const { login, handleLogout, user } = useContext(UserContext);

  const handleClick = () => {
    handleLogout();
  };

  return (
    <header className="sticky top-0 z-50 bg-white p-4 text-gray-800 shadow-md">
      <div className="flex items-center justify-around gap-5">
        <Link href="/">
          <Image
            className="rounded-full cursor-pointer"
            width={120}
            height={120}
            alt="Logo Sour"
            src={"/Logo.png"}
          />
        </Link>
        <h1 className="text-5xl font-extrabold uppercase italic text-center">
          Sour.
        </h1>
        {login ? (
          <div className="flex items-center gap-4">
            <Link href={"/users"}>
              {user && user.profilePhoto ? (
                <Image
                  className="rounded-full cursor-pointer"
                  width={40}
                  height={40}
                  alt="profile picture"
                  src={user.profilePhoto}
                />
              ) : (
                <Image
                  className="rounded-full cursor-pointer"
                  width={40}
                  height={40}
                  alt="profile picture"
                  src="/profile.png"
                />
              )}
            </Link>
            <button
              className="text-lg font-bold hover:text-gray-600 hover:scale-90 transition ease-in-out delay-150"
              onClick={handleClick}
            >
              Sign out
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4 uppercase">
            <Link
              className="text-lg font-bold hover:text-gray-600 hover:scale-90 transition ease-in-out delay-150"
              href={"/users/register"}
            >
              Sign Up
            </Link>
            <Link
              className="text-lg font-bold hover:text-gray-600 hover:scale-90 transition ease-in-out delay-150"
              href={"/users/login"}
            >
              Sign In
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
