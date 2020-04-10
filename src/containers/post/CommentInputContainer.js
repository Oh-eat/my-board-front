import React, { useCallback, useState } from "react";
import CommentInput from "../../components/post/CommentInput";
import { useDispatch, useSelector } from "react-redux";
import { changeField, writeComment } from "../../modules/comment";
import { withRouter } from "react-router-dom";

function CommentInputContainer(props) {
  const postId = {};
  const [inputError, setInputError] = useState();
  const dispatch = useDispatch();
  const { body, username, password, comment, error } = useSelector(
    ({ comment }) => comment
  );
  const user = useSelector(({ user }) => user);

  const onCommentChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      dispatch(changeField({ name, value }));
    },
    [dispatch]
  );
  const onSubmit = useCallback(() => {
    if (body.trim() === "") {
      return;
    }

    if (!user) {
      if ([username, password].includes("")) {
        setInputError("작성자명과 비밀번호를 모두 입력해 주세요.");
        return;
      }

      dispatch(writeComment({}));
    }
  }, [dispatch]);

  return (
    <CommentInput
      body={body}
      username={username}
      password={password}
      comment={comment}
      error={error}
      user={user}
      onCommentChange={onCommentChange}
    />
  );
}

export default withRouter(CommentInputContainer);
