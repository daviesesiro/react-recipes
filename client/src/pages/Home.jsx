import React, { useContext } from "react";

import { useQuery } from "react-apollo";
import { GET_ALL_RECIPES } from "../queries";
import RecipeItem from "./recipe/RecipeItem";
import { recipeContext } from "../context/recipe.context";
const Home = () => {
  const { recipes, dispatch } = useContext(recipeContext);
  const { loading } = useQuery(GET_ALL_RECIPES, {
    onCompleted: (data) => {
      dispatch({ type: "setRecipes", recipes: data.getAllRecipes });
    },
  });
  return !loading ? (
    <div>
      {recipes.length > 0 ? (
        <ul>
          {recipes.map((recipe) => (
            <RecipeItem key={recipe._id} {...recipe} />
          ))}
        </ul>
      ) : (
        <h3>No Recipes available</h3>
      )}
    </div>
  ) : (
    <div>Loading</div>
  );
};
export default Home;
