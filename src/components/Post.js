import React from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { IconButton, TextField, Box } from "@mui/material";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

const Post = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { post } = event.target.elements;
    const content = post.value.trim();

    if (content === "") {
      return;
    }

    try {
      const postsCollectionRef = collection(db, "posts");
      const newPostRef = await addDoc(postsCollectionRef, {
        content: content,
      });
      console.log("New post created with ID:", newPostRef.id);
      post.value = "";
    } catch (error) {
      console.log("Error creating post:", error);
    }
  };

  return (
    <Box sx={{ margin: "50px" }}>
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
