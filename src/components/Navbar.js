import React from "react";
import PropTypes from "prop-types";

import NavbarLoggedOut from "./NavbarLoggedOut";
import NavbarLoggedIn from "./NavbarLoggedIn";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const Navbar = ({ title, isLoggedIn, user }) => {
  return (
    <AppBar position="static" sx={{ top: "auto", bottom: 0, height: "100vh" }}>
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{ textAlign: "center", color: "white", paddingTop: "0.5vh" }}
        >
          {title}
        </Typography>
        {isLoggedIn && user && <NavbarLoggedIn user={user} />}

        {!isLoggedIn && <NavbarLoggedOut />}
      </Toolbar>
    </AppBar>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Navbar;
