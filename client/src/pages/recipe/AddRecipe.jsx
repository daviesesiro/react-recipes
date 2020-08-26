import React, { useState, useContext } from "react";
import { useMutation } from "react-apollo";
import { ADD_RECIPE } from "../../queries";
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

  const [addRecipe, { loading, error }] = useMutation(ADD_RECIPE, {
    onCompleted: (data) => {
      dispatch({ type: "addRecipe", recipe: data.addRecipe });
      setRecipe({
        name: "",
        category: "Breakfast",
        description: "",
        instructions: "",
      });
      history.push("/");
    },
  });

  const handleChange = async (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await addRecipe({ variables: recipe });
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
