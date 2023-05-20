import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import Signup from "./Signup";
import Login from "./Login";

const Main = ({ isLoggedIn }) => {
  console.log(isLoggedIn);
  return (
    <Routes>
      {isLoggedIn ? (
        <Route path="/" element={<Home />} />
      ) : (
        <Route path="/" element={<Navigate to="/login" />} />
      )}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default Main;
