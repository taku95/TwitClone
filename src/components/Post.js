import React from "react";
import { db } from "../firebase";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";

import { IconButton, TextField, Box } from "@mui/material";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

const Post = ({ setRefreshFlag, user }) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { post } = event.target.elements;
    const content = post.value.trim();

    if (content === "") {
      return;
    }

    try {
      const postsCollectionRef = collection(db, "posts");
      const newPostRef = doc(postsCollectionRef); // ランダムなIDを持つ新しいドキュメントの参照を作成
      const timestamp = new Date();
      await setDoc(newPostRef, {
        content: content,
        createdAt: timestamp,
        userId: user.uid,
        postId: newPostRef.id,
      }); // ドキュメントにデータをセット
      console.log("New post created with ID:", newPostRef.id);
      post.value = "";
      setRefreshFlag(true);
    } catch (error) {
      console.log("Error creating post:", error);
    }
  };

  return (
    <Box
      sx={{
        margin: "0.5vh",
      }}
    >
      <form onSubmit={handleSubmit}>
        <TextField
          name="post"
          label="What's on your mind, Elon?"
          type="text"
          placeholder="What's on your mind, Elon?"
          fullWidth
          InputProps={{
            endAdornment: (
              <IconButton type="submit">
                <RocketLaunchIcon />
              </IconButton>
            ),
          }}
        />
      </form>
    </Box>
  );
};

export default Post;
