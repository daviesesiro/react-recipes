import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { authContext } from "../context/auth.context";

export default ({ children: Component, ...others }) => {
  const {
    auth: { user },
  } = useContext(authContext);
  return user ? <Route {...others}>{Component}</Route> : <Redirect to="/" />;
};
