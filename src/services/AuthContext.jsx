import React, { createContext, useContext, useEffect, useState } from "react";
import { checkAuthApi } from "./apis/userAuth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // true while /me is in-flight

  useEffect(() => {
    checkAuthApi().then(({ authenticated, user }) => {
      setCurrentUser(authenticated ? user : null);
      setLoading(false);
    });
  }, []);

  const logout = () => setCurrentUser(null);
  const login = (user) => setCurrentUser(user);

  return (
    <AuthContext.Provider value={{ currentUser, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
