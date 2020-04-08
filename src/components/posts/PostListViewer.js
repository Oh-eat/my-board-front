import React from "react";
import styled from "styled-components";
import { TiPencil } from "react-icons/ti";
import Button from "../common/Button";
import PostItem from "./PostItem";
import Toolbar from "../common/Toolbar";

const PostListViewerBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  .posts {
    margin-top: 1rem;
  }
`;

function PostListViewer({ posts }) {
  return (
    <PostListViewerBlock>
      <Toolbar>
        <div className="left">
          <h2>포스트 목록</h2>
        </div>
        <div className="right">
          <Button to="/post/write">
            <TiPencil size="1.5rem" />
          </Button>
        </div>
      </Toolbar>
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
