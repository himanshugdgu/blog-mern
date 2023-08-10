import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";

const Home = () => {
  const BACKEND_URL = "http://localhost:4000";
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchAllPosts();
  }, []);

  // Function to fetch all posts
  const fetchAllPosts = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/post`); // Replace '/api/posts' with your actual API endpoint
      console.log("response:", response);
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  return (
    <div className="w-screen bg-teal-100">
      All Posts
      <div>
        {posts.map((post, index) => {
          return <PostCard post={post} key={index} />;
        })}
      </div>
    </div>
  );
};

export default Home;
