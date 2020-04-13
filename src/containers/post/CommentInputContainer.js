import React, { useCallback, useState, useEffect } from "react";
import CommentInput from "../../components/post/CommentInput";
import { useDispatch, useSelector } from "react-redux";
import {
  changeField,
  writeComment,
  initializeComment,
} from "../../modules/comment";
import { withRouter } from "react-router-dom";
import { addComment } from "../../modules/post";

function CommentInputContainer({ match, history }) {
  const { postId } = match.params;
  const [inputError, setInputError] = useState();
  const dispatch = useDispatch();
  const { body, username, password, comment, error } = useSelector(
    ({ comment }) => comment.write
  );
  const { post } = useSelector(({ post }) => post);
  const { user } = useSelector(({ user }) => user);
  const { loading } = useSelector(({ loading }) => ({
    loading: loading["post/READ_POST"],
  }));

  const onCommentChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      dispatch(changeField({ action: "write", name, value }));
    },
    [dispatch]
  );
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (body.trim() === "") {
        return;
      }

      if (!user) {
        if ([username, password].includes("")) {
          setInputError("작성자명과 비밀번호를 모두 입력해 주세요.");
          return;
        }

        dispatch(
          writeComment({ rootPostId: postId, body, username, password })
        );
        return;
      }
      dispatch(writeComment({ rootPostId: postId, body }));
    },
    [dispatch, postId, body, username, password, user]
  );

  useEffect(() => {
    if (error) {
      if (error.response.status === 404) {
        alert("존재하지 않는 포스트입니다.");
        history.goBack();
        return;
      }

      if (error.response.status === 400) {
        setInputError("작성자명과 비밀번호를 조건에 맞게 입력해 주세요.");
        return;
      }

      setInputError("에러가 발생했습니다. 잠시후 다시 시도해 주세요.");
      return;
    }

    if (comment) {
      dispatch(addComment(comment));
      dispatch(initializeComment());
      return;
    }
  }, [dispatch, history, comment, error]);

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
