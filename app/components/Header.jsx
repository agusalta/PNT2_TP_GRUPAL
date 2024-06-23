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
        <button className="text-lg font-bold hover:text-gray-600">HOME</button>
        <h1 className="text-3xl font-bold">COCKTAILS</h1>
        {login ? (
          <div className="flex gap-4">
            <Link href={"/users"}>
              {user && user.profilePhoto ? (
                <Image
                  className="rounded-full cursor-pointer"
                  width={60}
                  height={60}
                  alt="profile picture"
                  src={user.profilePhoto}
                />
              ) : (
                <Image
                  className="rounded-full cursor-pointer"
                  width={60}
                  height={60}
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
          <div className="flex gap-4">
            <Link href={"/users/register"}>Sign Up</Link>
            <Link href={"/users/login"}>Sign In</Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
