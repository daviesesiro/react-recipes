import React, { useContext } from "react";

import { ApolloConsumer } from "react-apollo";
import { authContext } from "../../context/auth.context";
import { useHistory } from "react-router-dom";
export default () => {
  const { dispatch } = useContext(authContext);
  const history = useHistory();
  const handleSignOut = (client) => {
    dispatch({ type: "setToken", token: "" });
    dispatch({ type: "setUser", user: null });
    client.clearStore();
    history.push("/signin");
  };
  return (
    <ApolloConsumer>
      {(client) => {
        return <button onClick={() => handleSignOut(client)}>Signout</button>;
      }}
    </ApolloConsumer>
  );
};
