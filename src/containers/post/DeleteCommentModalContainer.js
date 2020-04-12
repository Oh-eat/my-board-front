import React, { useEffect, useCallback } from "react";
import DeleteModal from "../../components/post/DeleteModal";
import { useDispatch, useSelector } from "react-redux";
import { hideModal } from "../../modules/modal";
import {
  deleteComment,
  changeField,
  checkDelete,
  initializeDelete,
} from "../../modules/comment";
import { deleteComment as deletePostComment } from "../../modules/post";

function DeleteCommentModalContainer(props) {
  const dispatch = useDispatch();
  const { user } = useSelector(({ user }) => user);
  const { target, password, permission, deleted, error } = useSelector(
    ({ comment }) => comment.delete
  );

  const onRemoveExecute = useCallback(() => {
    dispatch(
      deleteComment({
        id: target._id,
        ...(target.author._id ? {} : { password }),
      })
    );
  }, [dispatch, target, password]);

  const onCancel = useCallback(() => {
    dispatch(hideModal("deleteComment"));
  }, [dispatch]);

  const onChangePassword = useCallback(
    (e) => {
      const { name, value } = e.target;
      dispatch(changeField({ action: "delete", name, value }));
    },
    [dispatch]
  );

  const onCheck = useCallback(() => {
    dispatch(checkDelete({ id: target._id, password }));
  }, [dispatch, target, password]);

  useEffect(() => {
    if (!target) {
      dispatch(hideModal("deleteComment"));
      return;
    }

    if (error) {
      if (error.response.status === 404) {
        alert("존재하지 않는 댓글입니다.");
        dispatch(deletePostComment(target._id));
        dispatch(hideModal("deleteComment"));
        return;
      }
    }

    if (deleted) {
      dispatch(deletePostComment(target._id));
      dispatch(hideModal("deleteComment"));
    }
  }, [dispatch, target, error, deleted]);

  useEffect(() => {
    return () => {
      dispatch(initializeDelete());
    };
  }, [dispatch]);

  const showExecute =
    permission ||
    (target.author._id && user) ||
    (user && user.membership === "admin");

  const showCheck =
    !permission &&
    !target.author._id &&
    (!user || (user && user.membership !== "admin"));

  return (
    <DeleteModal
      type="댓글"
      permission={permission}
      error={error}
      onRemoveExecute={onRemoveExecute}
      onCheck={onCheck}
      onCancel={onCancel}
      password={password}
      onChangePassword={onChangePassword}
      showCheck={showCheck}
      showExecute={showExecute}
    />
  );
}

export default DeleteCommentModalContainer;
