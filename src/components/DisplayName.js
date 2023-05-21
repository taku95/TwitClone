import React from "react";

import { TextField, Box } from "@mui/material";

const DisplayName = ({ register, errors }) => {
  return (
    <Box sx={{ mb: 2 }}>
      <TextField
        {...register("displayName", { required: "表示名は必須です" })}
        label="表示名"
        placeholder="Display Name"
        fullWidth
        error={Boolean(errors.displayName)}
        helperText={errors.displayName?.message}
      />
    </Box>
  );
};

export default DisplayName;
