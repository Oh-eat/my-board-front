import React from "react";
import styled from "styled-components";
import { TiPencil } from "react-icons/ti";
import Button from "../common/Button";
import PostItem from "./PostItem";
import Toolbar from "../common/Toolbar";
import PaginationContainer from "../../containers/posts/PaginationContainer";

const PostListViewerBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  .posts {
    margin-top: 1rem;
    padding: 0;
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
      <ul className="posts">
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </ul>
      <PaginationContainer />
    </PostListViewerBlock>
  );
}

export default PostListViewer;
