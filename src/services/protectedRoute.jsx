import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./apis/userAuth"; // reads isLoggedIn cookie

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/SignIn" replace />;
  }
  return children;
};

export default ProtectedRoute;
