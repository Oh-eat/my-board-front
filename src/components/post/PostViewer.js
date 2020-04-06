import React from "react";
import Tag from "../common/Tag";

function PostViewer({ post }) {
  return (
    <div>
      <h1>{post.title}</h1>
      <div>
        {post.author.username} {post.publishedDate}
      </div>
      <p>{post.body}</p>
      {post.tags.map((tag) => (
        <Tag key={tag} tag={tag} />
      ))}
    </div>
  );
}

export default PostViewer;
