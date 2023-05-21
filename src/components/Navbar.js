import React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const Navbar = ({ title, isLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log("Logged out");
      navigate("/login");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  return (
    <AppBar position="static" sx={{ top: "auto", bottom: 0, height: "100vh" }}>
      <Toolbar sx={{ flexDirection: "column" }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ textAlign: "center", color: "white", paddingTop: "0.5vh" }}
        >
          {title}
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="text"
          sx={{ my: 1, color: "white" }}
        >
          Home
        </Button>
        {isLoggedIn ? (
          <React.Fragment>
            <Button
              onClick={handleLogout}
              variant="text"
              sx={{ my: 1, color: "white" }}
            >
              Logout
            </Button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Button
              component={Link}
              to="/login"
              variant="text"
              sx={{ my: 1, color: "white" }}
            >
              Login
            </Button>
            <Button
              component={Link}
              to="/signup"
              variant="text"
              sx={{ my: 1, color: "white" }}
            >
              Sign Up
            </Button>
          </React.Fragment>
        )}
      </Toolbar>
    </AppBar>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Navbar;
