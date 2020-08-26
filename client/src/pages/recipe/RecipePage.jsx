import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-apollo";
import { GET_RECIPE } from "../../queries";

export default () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_RECIPE, { variables: { id } });
  return !loading ? (
    <div>
      <h2>{data.getRecipe.name}</h2>
      <p>{data.getRecipe.category}</p>
      <p>{data.getRecipe.description}</p>
      <p>{data.getRecipe.instructions}</p>
      <p>{data.getRecipe.username}</p>
      <button>Like</button>
    </div>
  ) : (
    <div>loadin</div>
  );
};
