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

import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkAuthApi } from "./apis/userAuth";

const ProtectedRoute = ({ children }) => {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    checkAuthApi().then(({ authenticated }) => {
      setStatus(authenticated ? "auth" : "unauth");
    });
  }, []);

  if (status === "loading") return null;
  if (status === "unauth") return <Navigate to="/SignIn" replace />;
  return children;
};

export default ProtectedRoute;