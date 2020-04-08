import React, { useEffect } from "react";
import PostViewerContainer from "../containers/post/PostViewerContainer";
import { useDispatch } from "react-redux";
import { clearCheck } from "../modules/post_action";

function PostPage(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearCheck());
    };
  });

  return <PostViewerContainer />;
}

export default PostPage;
