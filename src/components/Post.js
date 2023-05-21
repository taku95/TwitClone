import React from "react";
import { Typography, ListItem, Avatar, Box } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { db } from "../firebase";

import { doc, updateDoc, getDoc } from "firebase/firestore";

const Post = ({ posts, setRefreshFlag }) => {
  const handleLikeClick = async (post) => {
    try {
      // Firestoreから対象の投稿を取得
      const postRef = doc(db, "posts", post.postId);
      const postSnapshot = await getDoc(postRef);

      if (postSnapshot.exists()) {
        // 投稿が存在する場合
        const postData = postSnapshot.data();
        const currentLikes = postData.likes || 0;
        const updatedLikes = currentLikes + 1;

        // いいね数を更新
        await updateDoc(postRef, {
          likes: updatedLikes,
        });

        console.log("Liked post with ID:", post.postId);
        setRefreshFlag(true); // 投稿一覧の再取得
      } else {
        console.log("Post does not exist.");
      }
    } catch (error) {
      console.log("Error liking post:", error);
    }
  };

  return (
    <Box>
      {posts.map((post, index) => (
        <ListItem
          key={index}
          style={{
            display: "flex",
            alignItems: "flex-start",
            marginBottom: "16px",
          }}
        >
          <Avatar alt="User Avatar" style={{ marginRight: "8px" }}></Avatar>
          <div>
            <Typography>{post.userDisplayName}</Typography>
            <Typography>{post.content}</Typography>
            <Typography
              variant="caption"
              onClick={() => handleLikeClick(post)}
              style={{ cursor: "pointer" }}
            >
              <FavoriteBorderIcon color="action" fontSize="small" />
              {post.likes !== undefined ? post.likes : ""}
            </Typography>
          </div>
        </ListItem>
      ))}
    </Box>
  );
};

export default Post;
