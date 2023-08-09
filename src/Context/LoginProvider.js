import React, { createContext, useContext, useState } from "react";

// Create the context
const LoginContext = createContext();

// Create a custom hook to use the context
export function useLoginContext() {
  return useContext(LoginContext);
}

// Create the LoginProvider component
export function LoginProvider({ children }) {
  const [loginCred, setLoginCred] = useState({
    // Initial values
    username: "",
    password: "",
  });

  const updateLoginCred = (updatedCred) => {
    setLoginCred((prevCred) => ({
      ...prevCred,
      ...updatedCred,
    }));
  };

  const value = {
    loginCred,
    updateLoginCred,
  };

  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
}
