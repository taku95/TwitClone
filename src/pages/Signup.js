import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Password from "../components/Pssword";
import Email from "../components/Email";
import DisplayName from "../components/DisplayName";
import SubmitButton from "../components/SubmitButton";

import { Box, Typography } from "@mui/material";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

  return (
    <Box sx={{ maxWidth: 400, margin: "0 auto", padding: 2 }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Sign up
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DisplayName errors={errors} register={register} />
        <Email errors={errors} register={register} />
        <Password errors={errors} register={register} />
        <SubmitButton title="登録" />
      </form>
    </Box>
  );
};

export default Signup;
