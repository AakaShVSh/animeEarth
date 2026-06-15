// import React from "react";
// import { Navigate } from "react-router-dom";
// import { isAuthenticated } from "./apis/userAuth"; // reads isLoggedIn cookie

// const ProtectedRoute = ({ children }) => {
//   if (!isAuthenticated()) {
//     return <Navigate to="/SignIn" replace />;
//   }
//   return children;
// };

// export default ProtectedRoute;

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) return null; // or a spinner while /me resolves

  if (!currentUser) return <Navigate to="/SignIn" replace />;

  return children;
};

export default ProtectedRoute;