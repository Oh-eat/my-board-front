import React from "react";
import CommentBox from "../../components/post/CommentBox";
import { useSelector } from "react-redux";

function CommentBoxContainer(props) {
  const { comments } = useSelector(({ post }) => post);

  return <CommentBox comments={comments || []} />;
}

export default CommentBoxContainer;
