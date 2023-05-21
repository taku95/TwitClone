import React, { useEffect, useState } from "react";
import { Typography, List, ListItem, Avatar } from "@mui/material";
import { orderBy, query, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Post from "../components/Post";

const Home = () => {
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
    <div>
      <Post setRefreshFlag={setRefreshFlag} />
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
