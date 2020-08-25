import React from "react";
import "./App.css";

import { Switch, Route } from "react-router-dom";

import Signup from "../pages/auth/Signup";
import Signin from "../pages/auth/Signin";
import Home from "../pages/Home";

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
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
