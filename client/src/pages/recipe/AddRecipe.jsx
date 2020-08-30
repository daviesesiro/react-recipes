import React, { useState, useContext } from "react";
import { useMutation } from "react-apollo";
import { ADD_RECIPE, GET_ALL_RECIPES, SEARCH_RECIPES } from "../../queries";
import Error from "../../components/Error";
import { recipeContext } from "../../context/recipe.context";
import { useHistory } from "react-router-dom";

export default () => {
  const history = useHistory();

  const { dispatch } = useContext(recipeContext);
  const [recipe, setRecipe] = useState({
    name: "",
    category: "Breakfast",
    description: "",
    instructions: "",
  });

  // run this when the cache updates
  const handleMutationUpdate = (cache, { data: { addRecipe } }) => {
    const { getAllRecipes } = cache.readQuery({ query: GET_ALL_RECIPES });
    console.log(getAllRecipes);
    //adding the added recipe to the cache manually
    cache.writeQuery({
      query: GET_ALL_RECIPES,
      data: {
        getAllRecipes: [addRecipe, ...getAllRecipes],
      },
    });
  };

  // run this when the mutation has ended
  const handleMutationCompleted = (data) => {
    dispatch({ type: "addRecipe", recipe: data.addRecipe });
    setRecipe({
      name: "",
      category: "Breakfast",
      description: "",
      instructions: "",
    });
    history.push("/");
  };

  const [addRecipe, { loading, error }] = useMutation(ADD_RECIPE, {
    update: handleMutationUpdate,
    onCompleted: handleMutationCompleted,
    refetchQueries: () => [{ query: SEARCH_RECIPES }],
  });

  const handleChange = async (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addRecipe({ variables: recipe });
    } catch (error) {
      console.error(error);
    }
  };

  const { name, category, description, instructions } = recipe;

  return (
    <>
      <h2>Add Recipe</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Recipe Name"
          onChange={handleChange}
          value={name}
        />
        <select value={category} name="category" onChange={handleChange}>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Snack">Snack</option>
        </select>
        <input
          type="text"
          name="description"
          placeholder="Add description"
          onChange={handleChange}
          value={description}
        />
        <textarea
          name="instructions"
          placeholder="Add Instructions"
          onChange={handleChange}
          value={instructions}
        ></textarea>
        <button disabled={loading} type="submit" className="button-primary">
          Submit
        </button>
      </form>

      {error && <Error error={error} />}
    </>
  );
};
