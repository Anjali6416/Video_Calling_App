import { createContext, useState } from "react";

export const MyContext = createContext();

function ContextProvider({ children }) {
  const [isAuth, setIsAuth] = useState(
    sessionStorage.getItem("accessToken") ? true : false
  );
  const toggleIsAuth = (value) => {
    setIsAuth(value);
  };

  return (
    <MyContext.Provider value={{ isAuth, toggleIsAuth }}>
      {children}
    </MyContext.Provider>
  );
}
export default ContextProvider;
