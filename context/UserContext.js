import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);

  const login = (newUser, accessToken) => {
    setUser(newUser);
    setToken(accessToken);

    try {
      newUser.password = undefined;
      localStorage.setItem("user", JSON.stringify(newUser));
      localStorage.setItem("token", accessToken);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    try {
      setUser(null);
      setToken(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    } catch (err) {}
  };

  useEffect(() => {
    try {
      setUser(JSON.parse(localStorage.getItem("user")));
      setToken(localStorage.getItem("token"));
    } catch (err) {
      console.error(err);
    }
    setCheckingSession(false);
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout, token }}>
      {!checkingSession && children}
    </UserContext.Provider>
  );
}
