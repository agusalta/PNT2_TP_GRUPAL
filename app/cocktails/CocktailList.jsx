import React from "react";
import Cocktail from "./Cocktail";

function CocktailList(props) {
  const { Cocktails } = props;

  return (
    <div>
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
              glass={cocktail.srtGlass}
              category={cocktail.strCategory}
              alc={cocktail.strAlcoholic}
            />
          );
        })}
    </div>
  );
}

export default CocktailList;
