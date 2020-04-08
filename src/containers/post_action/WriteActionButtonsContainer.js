import React, { useEffect, useState, useCallback } from "react";
import WriteActionButtons from "../../components/post_action/WriteActionButtons";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { writePost, updatePost } from "../../modules/post_action";

function WriteActionButtonsContainer({ history }) {
  const [inputError, setInputError] = useState(null);
  const dispatch = useDispatch();
  const {
    write,
    edit,
    postId,
    username,
    password,
    post,
    error,
    user,
    loading,
  } = useSelector(({ postAction, user, loading }) => ({
    write: postAction.write,
    edit: postAction.edit,
    postId: postAction.postId,
    username: postAction.username,
    password: postAction.password,
    post: postAction.post,
    error: postAction.error,
    user: user.user,
    loading:
      loading[
        postAction.postId ? "postAction/UPDATE_POST" : "postAction/WRITE_POST"
      ],
  }));

  const onGoBack = useCallback(() => history.goBack(), [history]);
  const onSubmit = useCallback(() => {
    const posting = postId ? edit : write;
    const { title, body, tags } = posting;

    if (title.trim() === "" || body.trim() === "") {
      setInputError("제목과 내용을 빠짐없이 입력해 주세요.");
      return;
    }
    if (loading) {
      return;
    }

    if (postId) {
      dispatch(
        updatePost({
          id: postId,
          title,
          body,
          tags,
          ...(user ? {} : { password }),
        })
      );
      return;
    }
    dispatch(
      writePost({ title, body, tags, ...(user ? {} : { username, password }) })
    );
  }, [dispatch, loading, postId, edit, write, username, password, user]);

  useEffect(() => {
    if (!post) {
      return () => {
        const unblock = history.block("작성 중인 내용을 잃게 됩니다.");
        unblock();
      };
    }
    history.push(`/post/read/${post._id}`);
  }, [history, post]);

  useEffect(() => {
    if (error) {
      if (error.response.status === 400) {
        setInputError("조건에 맞게 포스트를 작성해 주세요.");
        return;
      }

      setInputError("요청 실패. 나중에 다시 시도해 주세요.");
      return;
    }
  }, [error]);

  return (
    <WriteActionButtons
      inputError={inputError}
      onGoBack={onGoBack}
      onSubmit={onSubmit}
    />
  );
}

export default withRouter(WriteActionButtonsContainer);
