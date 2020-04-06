import React, { useEffect } from "react";
import PostViewer from "../../components/post/PostViewer";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { readPost } from "../../modules/post";

function PostViewerContainer({ match }) {
  const dispatch = useDispatch();
  const { post, error, loading } = useSelector(({ post, loading }) => ({
    post: post.post,
    error: post.error,
    loading: loading["post/READ_POST"],
  }));

  useEffect(() => {
    const { postId: id } = match.params;
    dispatch(readPost(id));
  }, [dispatch, match]);

  if (error) return <h1>ERROR!</h1>;

  if (loading || !post) return null;

  return <PostViewer post={post} />;
}

export default withRouter(PostViewerContainer);
