import React, { useContext, useState, useEffect } from "react";
import "./App.css";

import { Switch, Route } from "react-router-dom";

import Navbar from "./Navbar";
import Signup from "../pages/auth/Signup";
import Signin from "../pages/auth/Signin";
import Home from "../pages/Home";
import Search from "../pages/recipe/Search";
import AddRecipe from "../pages/recipe/AddRecipe";
import Profile from "../pages/profile/Profile";
import RecipePage from "../pages/recipe/RecipePage";
import { RecipeContextProvider } from "../context/recipe.context";
import { GET_CURRENT_USER } from "../queries";
import { useQuery } from "react-apollo";
import { authContext } from "../context/auth.context";
import AuthRoute from "./AuthRoute";

const App = () => {
  const { dispatch, auth } = useContext(authContext);
  const [loading, setLoading] = useState(true);

  const onCompleted = async (data) => {
    if (data.getCurrentUser) {
      setLoading(false);
      dispatch({ type: "setUser", user: data.getCurrentUser });
      dispatch({ type: "setUserRefetch", refetch: refetch });
    }
    return setLoading(false);
  };

  const onError = (error) => {
    setLoading(false);
  };

  const { refetch } = useQuery(GET_CURRENT_USER, {
    onCompleted,
    onError,
  });

  useEffect(
    () => {
      if (auth.refetch) {
        auth.refetch().then(({ data: { getCurrentUser } }) => {
          dispatch({ type: "setUser", user: getCurrentUser });
        });
      }
    }, // eslint-disable-next-line
    [auth.token, dispatch]
  );

  return loading ? (
    <div>Loading</div>
  ) : (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/">
          <RecipeContextProvider>
            <Home />
          </RecipeContextProvider>
        </Route>
        <AuthRoute exact path="/recipes/add">
          <RecipeContextProvider>
            <AddRecipe />
          </RecipeContextProvider>
        </AuthRoute>
        <Route path="/recipes/:id" component={RecipePage} />
        <Route exact path="/search" component={Search} />
        <AuthRoute exact path="/profile">
          <Profile />
        </AuthRoute>
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route>
          <div>404</div>
        </Route>
      </Switch>
    </div>
  );
};
export default App;
