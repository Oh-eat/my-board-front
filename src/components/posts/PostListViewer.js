import React from "react";
import styled from "styled-components";
import { TiPencil } from "react-icons/ti";
import Button from "../common/Button";
import PostItem from "./PostItem";

const PostListViewerBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  .head {
    display: flex;
    flex-direction: row-reverse;
  }

  .posts {
    margin-top: 1rem;
  }
`;

function PostListViewer({ posts }) {
  return (
    <PostListViewerBlock>
      <div className="head">
        <Button width="2.5rem" height="2.5rem" to="/write">
          <TiPencil size="1.5rem" />
        </Button>
      </div>
      <div className="posts">
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
      <div className="foot"></div>
    </PostListViewerBlock>
  );
}

export default PostListViewer;