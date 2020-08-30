import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "react-apollo";
import { SIGNIN_USER } from "../../queries";
import Error from "../../components/Error";
import { authContext } from "../../context/auth.context";

const Signup = () => {
  const { dispatch } = useContext(authContext);
  const [cred, setCred] = useState({
    username: "",
    password: "",
  });
  const history = useHistory();
  const { username, password } = cred;
  const [signinUser, { loading, error }] = useMutation(SIGNIN_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data;
    try {
      data = await signinUser({
        variables: { username, password },
      });
      setCred({
        username: "",
        password: "",
      });
      dispatch({ type: "setToken", token: data.data.signinUser.token });
      history.push("/");
    } catch (error) {}
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCred({ ...cred, [name]: value });
  };

  const validateForm = () => {
    const isInvalid = !username || !password;
    return isInvalid;
  };

  return (
    <div>
      <h2>Signin</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={handleChange}
          autoComplete="off"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
          autoComplete="off"
          required
        />
        <button
          disabled={loading || validateForm()}
          type="submit"
          className="button-primary"
        >
          {loading ? "Submiting" : "Submit"}
        </button>{" "}
        {error && <Error error={error} />}
      </form>
    </div>
  );
};

export default Signup;
