import React from "react";
import Image from "next/image";
import Link from "next/link";

function UsersPage() {

    return (
        <div className="container mx-auto mt-8 text-center">
            <h1 className="text-3xl font-bold mb-4">Perfil de Usuario</h1>
            <div className="flex flex-col items-center">
                <div className="mb-4">
                    <Image
                        src={"/profile.png"}
                        alt="Imagen de perfil"
                        width={150}
                        height={150}
                        className="rounded-full"
                    />
                </div>
                <p className="text-lg font-semibold">NOMBRE</p>
                <p className="text-lg font-semibold">EMAIL</p>
            </div>
            <Link href={"/"}>Volver</Link>
        </div>
    );
}

export default UsersPage;
