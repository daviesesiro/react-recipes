import React, { useState } from "react";
import { useQuery, useLazyQuery, useMutation } from "react-apollo";
import {
  GET_USER_RECIPES,
  DELETE_USER_RECIPE,
  GET_CURRENT_USER,
  GET_ALL_RECIPES,
  SEARCH_RECIPES,
} from "../../queries";
import { Link } from "react-router-dom";

export default () => {
  const [userRecipes, setUserRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [deletedRecipeId, setDeletedRecipeId] = useState(null);

  const handleQueryCompleted = (data) => {
    setUserRecipes(data.getUserRecipes);
    setLoading(false);
  };

  const handleQueryError = (err) => {
    console.log(err);
  };

  const handleDelete = (id) => {
    setDeletedRecipeId(id);
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this recipe?"
    );
    if (!confirmDelete) return;
    deleteUserRecipe({ variables: { id } });
  };

  const handleMutationUpdate = (cache) => {
    const { getUserRecipes } = cache.readQuery({ query: GET_USER_RECIPES });
    const recipes = getUserRecipes.filter(
      (recipe) => recipe._id !== deletedRecipeId
    );
    setUserRecipes(recipes);
    cache.writeQuery({
      query: GET_USER_RECIPES,
      data: {
        getUserRecipes: recipes,
      },
    });
  };

  const [deleteUserRecipe] = useMutation(DELETE_USER_RECIPE, {
    update: handleMutationUpdate,
    refetchQueries: () => [
      { query: GET_CURRENT_USER },
      { query: GET_ALL_RECIPES },
      { query: SEARCH_RECIPES },
    ],
  });

  useQuery(GET_USER_RECIPES, {
    onCompleted: handleQueryCompleted,
    onError: handleQueryError,
  });

  return (
    <>
      <h1>You Recipes</h1>
      {!loading ? (
        <div>
          <ul>
            {userRecipes.length > 0 ? (
              userRecipes.map((userRecipe) => (
                <li key={userRecipe._id}>
                  <Link to={`recipes/${userRecipe._id}`}>
                    {userRecipe.name}
                  </Link>
                  <p style={{ marginBottom: "0" }}>Likes: {userRecipe.likes}</p>
                  <p
                    className="delete-button"
                    onClick={() => handleDelete(userRecipe._id)}
                  >
                    X
                  </p>
                </li>
              ))
            ) : (
              <h6>You have no Recipes</h6>
            )}
          </ul>
        </div>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
};
