import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-apollo";
import { GET_RECIPE } from "../../queries";
import LikeRecipe from "./LikeRecipe";

export default () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_RECIPE, { variables: { id } });
  return !loading ? (
    <div>
      <h2>Name: {data.getRecipe.name}</h2>
      <p>Category: {data.getRecipe.category}</p>
      <p>Description: {data.getRecipe.description}</p>
      <p>Instructions: {data.getRecipe.instructions}</p>
      <p>Username: {data.getRecipe.username}</p>
      <p>Likes: {data.getRecipe.likes}</p>
      <LikeRecipe id={data.getRecipe._id} />
    </div>
  ) : (
    <div>loadin</div>
  );
};
