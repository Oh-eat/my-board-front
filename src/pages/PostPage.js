import React, { useEffect } from "react";
import PostViewerContainer from "../containers/post/PostViewerContainer";
import { useDispatch } from "react-redux";
import { clearCheck } from "../modules/post_action";
import CommentInputContainer from "../containers/post/CommentInputContainer";
import { initializeComment } from "../modules/comment";

function PostPage(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearCheck());
      dispatch(initializeComment());
    };
  });

  return (
    <>
      <PostViewerContainer />
      <CommentInputContainer />
    </>
  );
}

export default PostPage;
