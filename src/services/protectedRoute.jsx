import React from "react";
import { Navigate } from "react-router-dom";
import { checkAuthApi, isAuthenticated } from "./apis/userAuth"; // reads isLoggedIn cookie

const ProtectedRoute = ({ children }) => {
  if (!checkAuthApi().authenticated) {
    return <Navigate to="/SignIn" replace />;
  }
  return children;
};

export default ProtectedRoute;
