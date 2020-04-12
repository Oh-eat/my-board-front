import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import PostViewerContainer from "../containers/post/PostViewerContainer";
import { initializePost } from "../modules/post";
import { clearCheck } from "../modules/post_action";
import { initializeComment } from "../modules/comment";
import CommentInputContainer from "../containers/post/CommentInputContainer";
import CommentBoxContainer from "../containers/post/CommentBoxContainer";

function PostPage(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearCheck());
      dispatch(initializePost());
      dispatch(initializeComment());
    };
  });

  return (
    <>
      <PostViewerContainer />
      <CommentBoxContainer />
      <CommentInputContainer />
    </>
  );
}

export default PostPage;
