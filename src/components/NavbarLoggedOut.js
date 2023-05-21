import React from "react";
import { Link } from "react-router-dom";

import { Box, Button } from "@mui/material";

const NavbarLoggedOut = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
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
    </Box>
  );
};

export default NavbarLoggedOut;
