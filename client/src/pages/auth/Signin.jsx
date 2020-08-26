import React, { useState, useRef } from "react";
import { useMutation } from "react-apollo";
import { SIGNIN_USER } from "../../queries";
import Error from "../../components/Error";

const Signup = () => {
  const formRef = useRef();
  const [cred, setCred] = useState({
    username: "",
    password: "",
  });

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
      console.log(data.data.signinUser.token);
      localStorage.setItem("token", data.data.signinUser.token);
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
    const isInvalid = !username || !password;
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
