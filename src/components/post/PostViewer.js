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

const PostHead = styled.div`
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
  display: flex;
  align-items: center;

  .bar {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
`;

const PostBody = styled.div`
  margin-top: 1rem;
  min-height: 40vh;
`;

function PostViewer({
  post,
  showActionButtons,
  commentBody,
  commentUsername,
  commentPassword,
  onUpdate,
  onRemoveClick,
  onCommentChange,
}) {
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
        <span className="author">
          by <b>{post.author.username}</b>
        </span>
        <span className="bar">|</span>
        <span className="date">
          {new Date(post.publishedDate).toLocaleString()}
        </span>
      </SubInfo>
      <hr />
      <PostBody>
        <p dangerouslySetInnerHTML={{ __html: post.body }}></p>
      </PostBody>
      <div>
        {post.comments.map((comment) => (
          <div key={comment._id}>
            {comment._id} | {comment.body}
          </div>
        ))}
      </div>
    </PostViewerBlock>
  );
}

export default PostViewer;
