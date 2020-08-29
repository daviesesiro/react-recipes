import React, { createContext, useReducer, useEffect } from "react";

export const authContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [auth, dispatch] = useReducer(authReducer, {}, () => {
    const token = localStorage.getItem("token");
    return token ? { token: token } : { token: "" };
  });

  const { token } = auth;
  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <authContext.Provider value={{ auth, dispatch }}>
      {children}
    </authContext.Provider>
  );
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "setUser":
      return {
        ...state,
        user: action.user,
      };
    case "setToken":
      return {
        ...state,
        token: action.token,
      };
    case "setUserRefect":
      return {
        ...state,
        refetch: action.refetch,
      };
    default:
      return state;
  }
};
