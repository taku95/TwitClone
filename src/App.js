import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Grid } from "@mui/material";

import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";

const App = () => {
  return (
    <Router>
      <Grid container sx={{ height: "100vh" }}>
        <Grid item xs={3}>
          <Navbar title="My Twitter App" />
        </Grid>
        <Grid item xs={6}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Grid>
        <Grid item xs={3}>
          <Sidebar />
        </Grid>
      </Grid>
    </Router>
  );
};

export default App;
