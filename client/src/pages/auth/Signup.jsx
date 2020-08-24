import React from "react";
import { Query } from "react-apollo";
import { GET_ALL_RECIPES } from "../queries";

const Signup = () => {
  return (
    <div>
      <h2>Signup</h2>
      <form className="form">
        <input type="text" name="usernmae" placeholder="Username" />
        <input type="email" name="email" placeholder="User Email Adress" />
        <input type="password" name="password" placeholder="User Password" />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Comfirm Password"
        />
        <button type="submit" className="button-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
