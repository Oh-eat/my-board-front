import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { deletePost, clearCheck, checkDelete } from "../../modules/post_action";
import { hideModal } from "../../modules/modal";
import DeleteModal from "../../components/post/DeleteModal";

function DeletePostModalContainer({ history }) {
  const dispatch = useDispatch();
  const { post } = useSelector(({ post }) => post);
  const { user } = useSelector(({ user }) => user);
  const { permission, error } = useSelector(({ postAction }) => postAction);
  const [postPassword, setPostPassword] = useState("");

  const onRemoveExecute = useCallback(() => {
    dispatch(
      deletePost({
        id: post._id,
        ...(post.author._id ? {} : { password: postPassword }),
      })
    );
  }, [dispatch, post, postPassword]);

  const onCancel = useCallback(() => {
    dispatch(clearCheck());
    dispatch(hideModal("deletePost"));
  }, [dispatch]);

  const onChangePassword = useCallback((e) => {
    setPostPassword(e.target.value);
  }, []);

  const onCheck = useCallback(() => {
    dispatch(checkDelete({ id: post._id, password: postPassword }));
  }, [dispatch, post, postPassword]);

  useEffect(() => {
    if (permission === 204) {
      dispatch(hideModal("deletePost"));
      history.push("/post");
      return;
    }

    if (error === 404) {
      alert("존재하지 않는 포스트입니다.");
      history.push("/post");
      return;
    }
  }, [error, permission, history, dispatch]);

  const showExecute =
    permission ||
    (post.author._id && user) ||
    (user && user.membership === "admin");

  const showCheck =
    !permission &&
    !post.author._id &&
    (!user || (user && user.membership !== "admin"));

  return (
    <DeleteModal
      type="포스트"
      permission={permission}
      error={error}
      onRemoveExecute={onRemoveExecute}
      onCheck={onCheck}
      onCancel={onCancel}
      password={postPassword}
      onChangePassword={onChangePassword}
      showCheck={showCheck}
      showExecute={showExecute}
    />
  );
}

export default withRouter(DeletePostModalContainer);
