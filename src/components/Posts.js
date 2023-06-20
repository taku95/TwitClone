import React from "react";
import { Box, List } from "@mui/material";

import Post from "./Post";

const Posts = ({ posts, setRefreshFlag }) => {
  return (
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
        <Post posts={posts} setRefreshFlag={setRefreshFlag} />
      </List>
    </Box>
  );
};

export default Posts;
