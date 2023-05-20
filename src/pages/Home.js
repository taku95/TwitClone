import React, { useEffect, useState } from "react";
import { Typography, List, ListItem, Avatar } from "@mui/material";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

import Post from "../components/Post";
import { ConnectingAirportsOutlined } from "@mui/icons-material";

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
      <Post />
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
            {console.log(post)}
            <Avatar alt="User Avatar" style={{ marginRight: "8px" }}>
              {/* ユーザーアバター画像 */}
            </Avatar>
            <div>
              <Typography>{post.content}</Typography>
              {/* <Typography variant="caption">{post.comments}</Typography> */}
              <Typography variant="caption">
                {post.likes !== undefined ? post.likes : 0} Likes
              </Typography>
            </div>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Home;
