import React, { useState } from "react";
import { Box, IconButton, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Pssword = ({ register, errors }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <Box sx={{ mb: 2 }}>
      <TextField
        {...register("password", { required: "パスワードは必須です" })}
        type={showPassword ? "text" : "password"}
        label="パスワード"
        fullWidth
        error={Boolean(errors.password)}
        helperText={errors.password?.message}
        InputProps={{
          endAdornment: (
            <IconButton onClick={togglePasswordVisibility} edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          ),
        }}
      />
    </Box>
  );
};

export default Pssword;
