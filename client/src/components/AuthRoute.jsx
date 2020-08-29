import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { authContext } from "../context/auth.context";

export default ({ children: Component, ...others }) => {
  const {
    auth: { user },
  } = useContext(authContext);
  console.log(user);
  if (user) {
    return (
      <Route {...others}>
        <Component />
      </Route>
    );
  } else {
    return <Redirect to="/" />;
  }
};
