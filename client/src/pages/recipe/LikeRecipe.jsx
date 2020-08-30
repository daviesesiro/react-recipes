import React, { useContext, useState } from "react";
import { authContext } from "../../context/auth.context";
import { useMutation } from "react-apollo";
import { LIKE_RECIPE, GET_CURRENT_USER, UNLIKE_RECIPE } from "../../queries";

export default ({ id }) => {
  const { auth } = useContext(authContext);
  const [liked, setLiked] = useState(
    auth.user.favourites.some((rec) => rec._id === id)
  );

  const handleClick = async () => {
    if (liked) {
      await unLikeRecipe({ variables: { id } });
      setLiked(false);
      return;
    }
    await likeRecipe({ variables: { id } });
    setLiked(true);
  };

  const [likeRecipe] = useMutation(LIKE_RECIPE, {
    refetchQueries: () => [{ query: GET_CURRENT_USER }],
  });
  const [unLikeRecipe] = useMutation(UNLIKE_RECIPE, {
    refetchQueries: () => [{ query: GET_CURRENT_USER }],
  });
  return auth.user ? (
    <button onClick={handleClick}>{!liked ? "Like" : "Unliked"}</button>
  ) : null;
};
