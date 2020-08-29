import React, { useState } from "react";
import { useQuery } from "react-apollo";
import { GET_USER_RECIPES } from "../../queries";
import { Link } from "react-router-dom";

export default () => {
  const [userRecipes, setUserRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleQueryCompleted = (data) => {
    console.log(data);
    setUserRecipes(data.getUserRecipes);
    setLoading(false);
  };
  const handleQueryError = (err) => {
    console.log(err);
  };
  const {} = useQuery(GET_USER_RECIPES, {
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
                  <p>Likes: {userRecipe.likes}</p>
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
