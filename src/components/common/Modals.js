import React from "react";
import { useSelector } from "react-redux";
import DeletePostModalContainer from "../../containers/post/DeletePostModalContainer";
import DeleteCommentModalContainer from "../../containers/post/DeleteCommentModalContainer";

function Modals() {
  const { deletePost, deleteComment } = useSelector(({ modal }) => modal);
  return (
    <>
      {deletePost && <DeletePostModalContainer />}
      {deleteComment && <DeleteCommentModalContainer />}
    </>
  );
}

export default Modals;
