import React from "react";

const PostCard = ({ post }) => {
  return (
    <div>
      <p>{post._id}</p>
      <p>{post.title}</p>
      <p>{post.content}</p>
      
    </div>
  );
};

export default PostCard;
