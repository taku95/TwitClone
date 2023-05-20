import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Signup from "./Signup";
import Login from "./Login";

const Main = ({ isLoggedIn }) => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default Main;
