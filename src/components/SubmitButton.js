import React from "react";
import { Button } from "@mui/material";

const SubmitButton = ({ title }) => {
  return (
    <Button type="submit" variant="contained" fullWidth>
      {title}
    </Button>
  );
};

export default SubmitButton;
