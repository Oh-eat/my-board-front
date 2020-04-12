import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import CommentBox from "../../components/post/CommentBox";
import { setTarget } from "../../modules/comment";
import { showModal } from "../../modules/modal";

function CommentBoxContainer(props) {
  const dispatch = useDispatch();
  const { comments } = useSelector(({ post }) => post);
  const { user } = useSelector(({ user }) => user);

  const onRemoveClick = useCallback(
    async (comment) => {
      await dispatch(setTarget(comment));
      dispatch(showModal("deleteComment"));
    },
    [dispatch]
  );

  return (
    <CommentBox
      comments={comments || []}
      user={user}
      onRemoveClick={onRemoveClick}
    />
  );
}

export default CommentBoxContainer;
