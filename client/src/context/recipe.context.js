import React, { createContext, useReducer } from "react";

export const recipeContext = createContext();

export const RecipeContextProvider = ({ children }) => {
  const [recipes, dispatch] = useReducer(recipeReducer, []);

  return (
    <recipeContext.Provider value={{ recipes, dispatch }}>
      {children}
    </recipeContext.Provider>
  );
};

const recipeReducer = (state, action) => {
  switch (action.type) {
    case "addRecipe":
      return [...state, action.recipe];
    case "setRecipes":
      return [...action.recipes];
    default:
      return state;
  }
};
