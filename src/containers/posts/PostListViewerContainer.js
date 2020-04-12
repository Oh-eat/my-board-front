import React, { useEffect } from "react";
import qs from "qs";
import { withRouter } from "react-router-dom";
import PostListViewer from "../../components/posts/PostListViewer";
import { useSelector, useDispatch } from "react-redux";
import { listPosts } from "../../modules/posts";

function PostListViewerContainer({ location }) {
  const dispatch = useDispatch();
  const { posts, error, loading } = useSelector(({ posts, loading }) => ({
    posts: posts.posts,
    error: posts.error,
    loading: loading["posts/LIST_POSTS"],
  }));

  useEffect(() => {
    const query = qs.parse(location.search, { ignoreQueryPrefix: true });
    window.scrollTo({ top: 0 });
    dispatch(listPosts(query));
  }, [dispatch, location.search]);

  if (error) return <h1>ERROR</h1>;

  if (loading || !posts) return null;

  return <PostListViewer posts={posts} />;
}

export default withRouter(PostListViewerContainer);
