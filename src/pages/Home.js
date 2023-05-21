import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { orderBy, query, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import CreatePost from "../components/CreatePost";
import Posts from "../components/Posts";

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
        <CreatePost user={user} setRefreshFlag={setRefreshFlag} />
      </Box>
      <Posts setRefreshFlag={setRefreshFlag} posts={posts} />
    </Box>
  );
};

export default Home;
