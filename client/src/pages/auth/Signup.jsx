import React, { useState, useRef } from "react";
import { useMutation } from "react-apollo";
import { SIGNUP_USER } from "../../queries";
import Error from "../../components/Error";

const Signup = () => {
  const formRef = useRef();
  const [cred, setCred] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { username, email, password, confirmPassword } = cred;
  const [signupUser, { loading, error }] = useMutation(SIGNUP_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data;
    try {
      data = await signupUser({
        variables: { username, email, password },
      });
      setCred({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      console.log(data.data.signupUser.token);
      localStorage.setItem("token", data.data.signupUser.token);
    } catch (error) {
      console.log(error);
    }

    // if (error) console.log(error);
    if (data) console.log(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCred({ ...cred, [name]: value });
  };

  const validateForm = () => {
    const isInvalid =
      !email || !username || !password || password !== confirmPassword;
    return isInvalid;
  };

  return (
    <div>
      <h2>Signup</h2>
      <form className="form" onSubmit={handleSubmit} ref={formRef}>
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
          type="email"
          name="email"
          placeholder="Email Adress"
          value={email}
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
        <input
          type="password"
          name="confirmPassword"
          placeholder="Comfirm Password"
          value={confirmPassword}
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
