import React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import Avatar from "@mui/material/Avatar";
import { Box } from "@mui/material";

const Navbar = ({ title, isLoggedIn, user }) => {
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
  console.log(user);
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
        {isLoggedIn && user && (
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <Avatar
                alt="User Avatar"
                src={user.photoURL}
                sx={{ width: 32, height: 32 }}
              />
              <Typography variant="body2" sx={{ color: "white" }}>
                {user.displayName}
              </Typography>
            </Box>
            <Button
              component={Link}
              to="/"
              variant="text"
              sx={{ color: "white" }}
            >
              Home
            </Button>

            <Button
              onClick={handleLogout}
              variant="text"
              sx={{ color: "white" }}
            >
              Logout
            </Button>
          </Box>
        )}

        {!isLoggedIn && (
          <React.Fragment>
            <Button
              component={Link}
              to="/login"
              variant="text"
              sx={{ color: "white" }}
            >
              Login
            </Button>
            <Button
              component={Link}
              to="/signup"
              variant="text"
              sx={{ color: "white" }}
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
