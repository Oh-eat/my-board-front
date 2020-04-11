import React, { useEffect, useCallback } from "react";
import PostViewer from "../../components/post/PostViewer";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { readPost } from "../../modules/post";
import { setPost } from "../../modules/post_action";
import { showModal } from "../../modules/modal";

function PostViewerContainer({ match, history }) {
  const dispatch = useDispatch();
  const { user } = useSelector(({ user }) => user);
  const { post, error } = useSelector(({ post }) => post);
  const { loading } = useSelector(({ loading }) => ({
    loading: loading["post/READ_POST"],
  }));

  const onUpdate = useCallback(async () => {
    const { _id: postId, title, body, tags } = post;
    await dispatch(setPost({ postId, title, body, tags }));
    history.push("/post/write");
  }, [post, dispatch, history]);

  const onRemoveClick = useCallback(() => {
    dispatch(showModal("deletePost"));
  }, [dispatch]);

  useEffect(() => {
    const { postId: id } = match.params;
    dispatch(readPost(id));
  }, [dispatch, match]);

  if (error) return <h1>ERROR!</h1>;

  if (loading || !post) return null;

  const showActionButtons =
    !post.author._id ||
    (user && user.membership === "admin") ||
    post.author._id === (user && user._id);

  return (
    <>
      <PostViewer
        post={post}
        showActionButtons={showActionButtons}
        onUpdate={onUpdate}
        onRemoveClick={onRemoveClick}
      />
    </>
  );
}

export default withRouter(PostViewerContainer);
