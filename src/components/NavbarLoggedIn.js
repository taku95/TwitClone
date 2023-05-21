import { Avatar, Box, Typography, Button } from "@mui/material";

import { Link, useNavigate } from "react-router-dom";

import { auth } from "../firebase";

import React from "react";

const NavbarLoggedIn = ({ user }) => {
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
      <Button component={Link} to="/" variant="text" sx={{ color: "white" }}>
        Home
      </Button>

      <Button onClick={handleLogout} variant="text" sx={{ color: "white" }}>
        Logout
      </Button>
    </Box>
  );
};

export default NavbarLoggedIn;
