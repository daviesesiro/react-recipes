import React from "react";
import { useQuery } from "react-apollo";
import { GET_CURRENT_USER } from "../../queries";

export default () => {
  const { loading, data } = useQuery(GET_CURRENT_USER);
  return (
    !loading && (
      <h1>Profile, {data.getCurrentUser && data.getCurrentUser.username}</h1>
    )
  );
};
