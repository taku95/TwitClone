import React from "react";
import { useForm } from "react-hook-form";
import { Box, Typography, Link } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import Password from "../components/Pssword";
import Email from "../components/Email";
import SubmitButton from "../components/SubmitButton";

const Login = () => {
  const navigate = useNavigate();

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
      navigate("/"); // ログイン後に/（Home.js）へリダイレクト
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
        <Email errors={errors} register={register} />
        <Password errors={errors} register={register} />
        <SubmitButton title="ログイン" />
      </form>
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        アカウントをお持ちでないですか？{" "}
        <Link component={RouterLink} to="/signup">
          こちらからサインアップ
        </Link>
      </Typography>
    </Box>
  );
};

export default Login;
