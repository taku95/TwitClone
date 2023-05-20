import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Box, Typography } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const { email, password } = data;
      await signInWithEmailAndPassword(auth, email, password);
      console.log("ログインに成功しました");
    } catch (error) {
      console.log("ログインエラー:", error);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "0 auto", padding: 2 }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        ログイン
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
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
            type="password"
            label="パスワード"
            fullWidth
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
          />
        </Box>
        <Button type="submit" variant="contained" fullWidth>
          ログイン
        </Button>
      </form>
    </Box>
  );
};

export default Login;
