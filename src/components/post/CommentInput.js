import React from "react";
import Button from "../common/Button";
import styled from "styled-components";

const CommentInputBlock = styled.div`
  margin-top: 2rem;
  display: grid;
  grid-template-areas:
    "label label label"
    "username body body"
    "password body body"
    "error error submit";
  grid-column-gap: 0.75rem;
  grid-row-gap: 0.75rem;
  grid-template-columns: 8rem 1fr min-content;

  #label {
    grid-area: label;
    margin-bottom: 1rem;
  }

  #username {
    padding: 0.5rem;
    grid-area: 2 / 1 / 4 / 2;
    align-self: center;
    justify-self: center;
  }

  #usernameInput {
    grid-area: username;
  }

  #password {
    grid-area: password;
  }

  #body {
    grid-area: body;
  }

  #submit {
    grid-area: submit;
    justify-self: flex-end;
  }

  .hidden {
    display: none;
  }

  .error {
    grid-area: error;
    justify-self: center;
    align-self: center;
    color: red;
    font-size: 0.9rem;
  }

  input {
    width: 100%;
    outline: none;
    border: none;
    font-size: 0.9rem;
    padding: 0.5rem;
    border-bottom: 1px solid gray;

    &:hover,
    &:focus {
      border-bottom: 1px solid black;
    }

    &::placeholder {
      font-size: 0.9rem;
    }
  }

  textarea {
    outline: none;
    border: none;
    font-size: 1rem;
    padding: 0.5rem;
    border-bottom: 1px solid gray;
    height: calc(100%);
    width: calc(100%);
    resize: none;
    font-family: inherit;

    &:hover,
    &:focus {
      border-bottom: 1px solid black;
    }

    &::placeholder {
      font-family: inherit;
    }
  }

  @media (max-width: 500px) {
    & {
      grid-template-areas:
        "label label label label"
        "username username password password"
        "body body body body"
        "error error error submit";
      grid-column-gap: 1rem;
      grid-row-gap: 0.75rem;
      grid-template-columns: repeat(4, 1fr);

      #username {
        grid-area: username;
        justify-self: flex-start;
      }
    }
  }
`;

function CommentInput({
  body,
  username,
  password,
  user,
  inputError,
  onCommentChange,
  onSubmit,
}) {
  return (
    <CommentInputBlock>
      <h2 id="label">댓글 작성</h2>
      <div id="username" className={user ? "" : "hidden"}>
        by <b>{user && user.username}</b>
      </div>
      <input
        id="usernameInput"
        className={user ? "hidden" : ""}
        placeholder="작성자명"
        name="username"
        value={username}
        onChange={onCommentChange}
        spellCheck={false}
        maxLength={15}
      />
      <input
        id="password"
        className={user ? "hidden" : ""}
        placeholder="비밀번호"
        name="password"
        type="password"
        value={password}
        onChange={onCommentChange}
        spellCheck={false}
        maxLength={15}
      />
      <textarea
        id="body"
        placeholder="댓글"
        name="body"
        value={body}
        onChange={onCommentChange}
        maxLength={100}
        spellCheck={false}
      />
      <Button id="submit" width="4rem" height="2rem" onClick={onSubmit}>
        작성
      </Button>
      {inputError && <div className="error">{inputError}</div>}
    </CommentInputBlock>
  );
}

export default CommentInput;
