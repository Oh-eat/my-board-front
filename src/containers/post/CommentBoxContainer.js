import React from "react";
import CommentBox from "../../components/post/CommentBox";
import { useSelector } from "react-redux";

function CommentBoxContainer(props) {
  const { comments } = useSelector(({ post }) => post);
  const { user } = useSelector(({ user }) => user);

  return <CommentBox comments={comments || []} user={user} />;
}

export default CommentBoxContainer;
