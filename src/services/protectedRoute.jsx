import React from "react";
import { Navigate } from "react-router-dom";
import { getCookies } from "./cookies";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = getCookies("AuthToken"); // Replace with your authentication logic

  if (isAuthenticated===null) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
