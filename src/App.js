/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Grid } from "@mui/material";

// components and pages
import Main from "./pages/Main";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
//auth
import { auth } from "./firebase";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // ユーザーがログインしている場合
        setIsLoggedIn(true);
        setUser(user);
      } else {
        // ユーザーがログアウトしている場合
        setIsLoggedIn(false);
      }
    });

    // コンポーネントがアンマウントされた時にunsubscribeする
    return () => unsubscribe();
  }, []);

  console.log(user);
  return (
    <Router>
      <div>
        {isLoggedIn ? (
          <div>ユーザーはログインしています</div>
        ) : (
          <div>ユーザーはログインしていません</div>
        )}
      </div>
      <Grid container sx={{ height: "100vh" }}>
        <Grid item xs={3}>
          <Navbar title="My Twitter App" isLoggedIn={isLoggedIn} />
        </Grid>

        <Grid item xs={6}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Grid>
        {/* <Main /> */}

        <Grid item xs={3} sx={{ backgroundColor: "primary.main" }}>
          <Sidebar />
        </Grid>
      </Grid>
    </Router>
  );
};

export default App;
