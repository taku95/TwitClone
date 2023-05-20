/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Grid } from "@mui/material";

import Home from "./Home";
import Signup from "./Signup";
import Login from "./Login";

const Main = () => {
  return (
    <Router>
      <Grid item xs={6}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Grid>
    </Router>
  );
};

export default Main;
