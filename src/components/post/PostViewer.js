import React from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import Tag from "../common/Tag";
import styled from "styled-components";
import Toolbar from "../common/Toolbar";
import Button from "../common/Button";

const PostViewerBlock = styled.div`
  hr {
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    border: 1px solid dodgerblue;
  }
`;

const PostHead = styled.header`
  margin-top: 1rem;

  h1 {
    font-size: 2.5rem;
    word-break: break-all;
    margin-bottom: 0.5rem;
  }
`;

const SubInfo = styled.div`
  margin-top: 1rem;
  font-size: 1.25rem;

  .date {
    margin-top: 1rem;
    color: gray;
    font-size: 1rem;
  }
`;

const PostBody = styled.article`
  margin-top: 1rem;
  min-height: 40vh;
  word-break: break-all;
`;

function PostViewer({ post, showActionButtons, onUpdate, onRemoveClick }) {
  return (
    <PostViewerBlock>
      <Toolbar>
        <div className="left">
          <h2>포스트</h2>
        </div>
        {showActionButtons && (
          <div className="right">
            <Button onClick={onUpdate}>
              <FiEdit size="1.5rem" />
            </Button>
            <Button color="red" onClick={onRemoveClick}>
              <FiTrash size="1.5rem" />
            </Button>
          </div>
        )}
      </Toolbar>
      <PostHead>
        <h1>{post.title}</h1>
        {post.tags.map((tag) => (
          <Tag key={tag} tag={tag} />
        ))}
      </PostHead>
      <SubInfo>
        <div className="author">
          by <b>{post.author.username}</b>
        </div>
        <div className="date">
          {new Date(post.publishedDate).toLocaleString()}
        </div>
      </SubInfo>
      <hr />
      <PostBody>
        <p dangerouslySetInnerHTML={{ __html: post.body }}></p>
      </PostBody>
    </PostViewerBlock>
  );
}

export default PostViewer;
