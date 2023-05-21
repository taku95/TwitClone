import React from "react";

import { TextField, Box } from "@mui/material";

const Email = ({ register, errors }) => {
  return (
    <Box sx={{ mb: 2 }}>
      <TextField
        {...register("email", { required: "メールアドレスは必須です" })}
        label="メールアドレス"
        placeholder="Email"
        fullWidth
        error={Boolean(errors.email)}
        helperText={errors.email?.message}
      />
    </Box>
  );
};

export default Email;
