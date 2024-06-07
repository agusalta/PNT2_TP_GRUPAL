import Image from "next/image";
import React from "react";

function Cocktail(props) {
  const { name, inst, thumb, ingredients, glass, category, alc } = props;

  return (
    <div>
      <h2>{name}</h2>
      <Image width="300" height="300" src={thumb} alt={name} />
      <p>{inst}</p>
      <h3>Ingredients:</h3>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <p>Glass: {glass}</p>
      <p>Category: {category}</p>
      <p>Alcoholic: {alc}</p>
    </div>
  );
}

export default Cocktail;
