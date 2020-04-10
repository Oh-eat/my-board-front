import React, { useEffect, useCallback, useState } from "react";
import PostViewer from "../../components/post/PostViewer";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { readPost } from "../../modules/post";
import {
  setPost,
  checkDelete,
  deletePost,
  clearCheck,
} from "../../modules/post_action";
import DeleteModal from "../../components/post/DeleteModal";
import { changeField } from "../../modules/comment";

function PostViewerContainer({ match, history }) {
  const [modal, setModal] = useState(false);
  const [postPassword, setPostPassword] = useState("");
  const dispatch = useDispatch();
  const {
    post,
    postError,
    permission,
    permissionError,
    user,
    loading,
  } = useSelector(({ post, postAction, user, loading }) => ({
    post: post.post,
    postError: post.error,
    permission: postAction.permission,
    permissionError: postAction.error,
    user: user.user,
    loading: loading["post/READ_POST"],
  }));

  const onUpdate = useCallback(async () => {
    const { _id: postId, title, body, tags } = post;
    await dispatch(setPost({ postId, title, body, tags }));
    history.push("/post/write");
  }, [post, dispatch, history]);
  const onRemoveClick = useCallback(() => {
    setModal(true);
  }, []);
  const onRemoveExecute = useCallback(() => {
    dispatch(
      deletePost({
        id: post._id,
        ...(post.author._id ? {} : { password: postPassword }),
      })
    );
  }, [dispatch, post, postPassword]);
  const onCancel = useCallback(() => {
    dispatch(clearCheck());
    setModal(false);
  }, [dispatch]);
  const onChangePassword = useCallback((e) => {
    setPostPassword(e.target.value);
  }, []);
  const onCheck = useCallback(() => {
    dispatch(checkDelete({ id: post._id, password: postPassword }));
  }, [dispatch, post, postPassword]);

  useEffect(() => {
    const { postId: id } = match.params;
    dispatch(readPost(id));
  }, [dispatch, match]);

  useEffect(() => {
    if (permission === 204) {
      history.push("/post");
      return;
    }

    if (permissionError === 404) {
      alert("존재하지 않는 포스트입니다.");
      history.push("/post");
      return;
    }
  }, [permissionError, permission, history]);

  if (postError) return <h1>ERROR!</h1>;

  if (loading || !post) return null;

  const showActionButtons =
    !post.author._id || (user && user.membership === "admin")
      ? true
      : post.author._id === user && user._id
      ? true
      : false;

  return (
    <>
      <PostViewer
        post={post}
        showActionButtons={showActionButtons}
        onUpdate={onUpdate}
        onRemoveClick={onRemoveClick}
      />
      <DeleteModal
        visible={modal}
        user={user}
        post={post}
        permission={permission}
        permissionError={permissionError}
        onRemoveExecute={onRemoveExecute}
        onCheck={onCheck}
        onCancel={onCancel}
        postPassword={postPassword}
        onChangePassword={onChangePassword}
      />
    </>
  );
}

export default withRouter(PostViewerContainer);
