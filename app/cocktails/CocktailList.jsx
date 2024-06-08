import React from "react";
import Cocktail from "./Cocktail";

function CocktailList(props) {
  const { Cocktails } = props;

  return (
    <div className="grid sm:grid-cols-1 sm:w-full md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {Cocktails &&
        Cocktails.drinks &&
        Cocktails.drinks.map(cocktail => {
          const ingredients = [];
          for (let i = 1; i <= 15; i++) {
            const ingredient = cocktail[`strIngredient${i}`];
            if (ingredient !== null && ingredient !== "") {
              ingredients.push(ingredient);
            }
          }

          return (
            <Cocktail
              key={cocktail.idDrink}
              id={cocktail.idDrink}
              name={cocktail.strDrink}
              inst={cocktail.strInstructionsES}
              thumb={cocktail.strDrinkThumb}
              ingredients={ingredients}
              glass={cocktail.strGlass}
              category={cocktail.strCategory}
              alc={cocktail.strAlcoholic}
            />
          );
        })}
    </div>
  );
}

export default CocktailList;
