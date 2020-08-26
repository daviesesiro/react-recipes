import React from "react";
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

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/">
          <RecipeContextProvider>
            <Home />
          </RecipeContextProvider>
        </Route>
        <Route exact path="/recipes/add">
          <RecipeContextProvider>
            <AddRecipe />
          </RecipeContextProvider>
        </Route>
        <Route path="/recipes/:id" component={RecipePage} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/profile" component={Profile} />
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
