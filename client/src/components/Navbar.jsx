import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { authContext } from "../context/auth.context";
import Signout from "../pages/auth/Signout";

const Navbar = () => {
  const { auth } = useContext(authContext);
  return <nav>{auth && auth.token ? <NavbarAuth /> : <NavbarUnAuth />}</nav>;
};

const NavbarUnAuth = () => (
  <ul>
    <li>
      <NavLink exact to="/">
        Home
      </NavLink>
    </li>
    <li>
      <NavLink to="/search">Search</NavLink>
    </li>
    <li>
      <NavLink exact to="/signup">
        Signup
      </NavLink>
    </li>
    <li>
      <NavLink exact to="/signin">
        Signin
      </NavLink>
    </li>
  </ul>
);

const NavbarAuth = () => (
  <ul>
    <li>
      <NavLink exact to="/">
        Home
      </NavLink>
    </li>
    <li>
      <NavLink to="/search">Search</NavLink>
    </li>
    <li>
      <NavLink exact to="/recipes/add">
        Add Recipe
      </NavLink>
    </li>
    <li>
      <NavLink exact to="/profile">
        Profile
      </NavLink>
    </li>
    <li>
      <Signout />
    </li>
  </ul>
);

export default Navbar;
