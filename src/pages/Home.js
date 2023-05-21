import React, { useEffect, useState } from "react";
import { Typography, List, ListItem, Avatar, Box } from "@mui/material";
import {
  orderBy,
  query,
  collection,
  getDocs,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import Post from "../components/Post";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const Home = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsCollectionRef = collection(db, "posts");
      const postsQuery = query(
        postsCollectionRef,
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(postsQuery);
      const postData = querySnapshot.docs.map((doc) => doc.data());
      setPosts(postData);
    };
    fetchPosts();
    setRefreshFlag(false);
  }, [refreshFlag]);

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
      <Box
        sx={{
          height: "5vh",
        }}
      >
        <Post user={user} setRefreshFlag={setRefreshFlag} />
      </Box>
      <Box
        sx={{
          overflow: "auto",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none", // Chrome, Safari用
          },
          height: "94vh",
        }}
      >
        <List>
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
        </List>
      </Box>
    </Box>
  );
};

export default Home;
