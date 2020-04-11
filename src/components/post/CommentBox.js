import React from "react";
import styled from "styled-components";
import user from "../../modules/user";

const CommentBoxBlock = styled.div`
  margin-top: 1rem;

  .label {
    margin-bottom: 1rem;
  }
`;

const CommentItemBlock = styled.div`
  padding: 0.5rem;
  display: grid;
  grid-row-gap: 0.5rem;
  grid-column-gap: 0.5rem;
  grid-template-columns: 1fr min-content;
  grid-template-areas:
    "username remove"
    "date date"
    "body body";
  align-items: center;

  .username {
    grid-area: username;
  }

  .date {
    grid-area: date;
    font-size: 0.9rem;
    color: gray;
  }

  .remove {
    cursor: pointer;
    grid-area: remove;
  }

  .body {
    margin-top: 0.5em;
    margin-bottom: 0.5rem;
    word-break: break-all;
    grid-area: body;
  }

  &:nth-child(even) {
    background: aliceblue;
  }
`;

function CommentItem({ comment, showRemoveButton }) {
  return (
    <CommentItemBlock>
      <div className="username">
        by <b>{comment.author.username}</b>
      </div>
      <div className="date">
        {new Date(comment.publishedDate).toLocaleString()}
      </div>
      {showRemoveButton && <div className="remove">×</div>}
      <div className="body">{comment.body}</div>
    </CommentItemBlock>
  );
}

function CommentBox({ comments }) {
  return (
    <CommentBoxBlock>
      {comments.length > 0 && (
        <>
          <h2 className="label">댓글</h2>
          <div className="comments">
            {comments.map((comment) => (
              <CommentItem
                key={comment._id}
                comment={comment}
                showRemoveButton={
                  (user && user._id === comment.author._id) ||
                  !comment.author._id
                }
              />
            ))}
          </div>
        </>
      )}
    </CommentBoxBlock>
  );
}

export default CommentBox;
