import Image from "next/image";
import Link from "next/link";
import React from "react";

function Cocktail(props) {
  const { name, thumb } = props;

  return (
    <div className="p-3 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <h2 className="uppercase font-bold text-center text-xl mb-2">{name}</h2>
      <div className="flex justify-center mb-4">
        <Link href={`/cocktails/${name}`}>
          <Image
            width="500"
            height="500"
            src={thumb}
            alt={name}
            className="rounded-lg"
          />
        </Link>
      </div>
    </div>
  );
}

export default Cocktail;
