import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { TextField, Button, Box, Typography, IconButton } from "@mui/material";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";

import { Visibility, VisibilityOff } from "@mui/icons-material";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // useNavigate フックを使用して navigate 関数を取得

  const onSubmit = async (data) => {
    try {
      const { email, password, displayName } = data; // 表示名を取得
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // 表示名を設定
      await updateProfile(user, {
        displayName: displayName,
      });

      console.log("ユーザーのサインアップに成功しました");
      navigate("/"); // サインアップに成功したら "/" へ遷移
    } catch (error) {
      console.log("サインアップエラー:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "0 auto", padding: 2 }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Sign up
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <Button type="submit" variant="contained" fullWidth>
          登録
        </Button>
      </form>
    </Box>
  );
};

export default Signup;
