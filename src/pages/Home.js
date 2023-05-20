import React, { useEffect, useState } from "react";
import { Typography, List, ListItem, Avatar } from "@mui/material";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsCollectionRef = collection(db, "posts");
      const querySnapshot = await getDocs(postsCollectionRef);
      const postData = querySnapshot.docs.map((doc) => doc.data());
      setPosts(postData);
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        ホーム
      </Typography>
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
            <Avatar alt="User Avatar" style={{ marginRight: "8px" }}>
              {/* ユーザーアバター画像 */}
            </Avatar>
            <div>
              <Typography>{post.content}</Typography>
              <Typography variant="caption">{post.comments}</Typography>
              <Typography variant="caption">{post.likes} Likes</Typography>
            </div>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Home;
