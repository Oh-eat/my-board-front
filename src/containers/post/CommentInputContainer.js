import React, { useCallback, useState, useEffect } from "react";
import CommentInput from "../../components/post/CommentInput";
import { useDispatch, useSelector } from "react-redux";
import { changeField, writeComment } from "../../modules/comment";
import { withRouter } from "react-router-dom";
import { addComment } from "../../modules/post";

function CommentInputContainer({ match }) {
  const { postId } = match.params;
  const [inputError, setInputError] = useState();
  const dispatch = useDispatch();
  const { body, username, password, comment, error } = useSelector(
    ({ comment }) => comment
  );
  const { post } = useSelector(({ post }) => post);
  const { user } = useSelector(({ user }) => user);
  const { loading } = useSelector(({ loading }) => ({
    loading: loading["post/READ_POST"],
  }));

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

      dispatch(writeComment({ rootPostId: postId, body, username, password }));
      return;
    }
    dispatch(writeComment({ rootPostId: postId, body }));
  }, [dispatch, postId, body, username, password, user]);

  useEffect(() => {
    if (error) {
      if (error.response.status === 404) {
      }
      return;
    }

    if (comment) {
      dispatch(addComment(comment));
      return;
    }
  }, [dispatch, comment, error]);

  if (loading || !post) return null;

  return (
    <CommentInput
      body={body}
      username={username}
      password={password}
      user={user}
      postId={postId}
      inputError={inputError}
      onCommentChange={onCommentChange}
      onSubmit={onSubmit}
    />
  );
}

export default withRouter(CommentInputContainer);
