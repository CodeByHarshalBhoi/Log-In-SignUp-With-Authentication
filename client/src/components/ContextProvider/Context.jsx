import { createContext, useState } from "react";

export const LoginContext = createContext("");

// eslint-disable-next-line react/prop-types
const Context = ({ children }) => {
  const [loginData, setLoginData] = useState("");
  return (
    <>
      <LoginContext.Provider value={{ loginData, setLoginData }}>
        {children}
      </LoginContext.Provider>
    </>
  );
};
export default Context;
