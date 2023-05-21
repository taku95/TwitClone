/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Grid } from "@mui/material";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { auth } from "./firebase";
import Main from "./pages/Main";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUser(user);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Grid container sx={{ height: "100vh" }}>
        <Grid item xs={3}>
          <Navbar title="Twit" isLoggedIn={isLoggedIn} />
        </Grid>
        <Grid item xs={6}>
          <Main isLoggedIn={isLoggedIn} user={user} />
        </Grid>
        <Grid item xs={3} sx={{ backgroundColor: "primary.main" }}>
          <Sidebar />
        </Grid>
      </Grid>
    </Router>
  );
};

export default App;
