import React, { useEffect, useState } from "react";
import { Typography, List, ListItem, Avatar, Box } from "@mui/material";
import { orderBy, query, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Post from "../components/Post";

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
                {/* <Typography variant="caption">{post.comments}</Typography> */}
                <Typography variant="caption">
                  {post.likes !== undefined ? post.likes : 0} Likes
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
