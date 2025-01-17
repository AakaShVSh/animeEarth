import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ProtectedRoute from "../services/protectedRoute";
import UserShow from "./UserShow";

const ProfileRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<UserShow/>}></Route>
        <Route path="/SignIn" element={<SignIn />}></Route>
        <Route path="/SignUp" element={<SignUp />}></Route>
        <Route
          path="/Dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        ></Route>
     
      </Routes>
    </>
  );
};

export default ProfileRoute;
