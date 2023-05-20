import React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Navbar = ({ title }) => {
  return (
    <AppBar position="static" sx={{ top: "auto", bottom: 0, height: "100vh" }}>
      <Toolbar sx={{ flexDirection: "column" }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ textAlign: "center", color: "white" }}
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
      </Toolbar>
    </AppBar>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Navbar;
