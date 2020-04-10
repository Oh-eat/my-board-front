import React from "react";
import Button from "../common/Button";

function CommentInput({
  body,
  username,
  password,
  comment,
  error,
  user,
  onCommentChange,
}) {
  return (
    <div>
      <input
        placeholder="작성자명"
        name="username"
        value={username}
        onChange={onCommentChange}
        spellCheck={false}
        maxLength={15}
      />
      <input
        placeholder="비밀번호"
        name="password"
        type="password"
        value={password}
        onChange={onCommentChange}
        spellCheck={false}
        maxLength={15}
      />
      <textarea
        placeholder="댓글"
        name="body"
        value={body}
        onChange={onCommentChange}
        maxLength={100}
        spellCheck={false}
      />
      <Button>작성</Button>
    </div>
  );
}

export default CommentInput;
